from abc import ABC, abstractmethod
from typing import List, Optional, Sequence

import sentry_sdk

from snuba import state
from snuba.clickhouse.query import Query
from snuba.clickhouse.query_dsl.accessors import get_object_ids_in_query_ast
from snuba.clusters.cluster import ClickhouseCluster, get_cluster
from snuba.clusters.storage_sets import StorageSetKey
from snuba.datasets.plans.query_plan import (
    ClickhouseQueryPlan,
    ClickhouseQueryPlanBuilder,
    QueryPlanExecutionStrategy,
    QueryRunner,
)
from snuba.datasets.plans.splitters import QuerySplitStrategy
from snuba.datasets.plans.translator.query import QueryTranslator
from snuba.datasets.schemas import RelationalSource
from snuba.datasets.schemas.tables import TableSource
from snuba.datasets.slicing import (
    is_storage_set_sliced,
    map_logical_partition_to_slice,
    map_org_id_to_logical_partition,
)
from snuba.datasets.storage import (
    QueryStorageSelector,
    QueryStorageSelectorError,
    StorageAndMappers,
)
from snuba.query.data_source.simple import Table
from snuba.query.logical import Query as LogicalQuery
from snuba.query.processors.physical import ClickhouseQueryProcessor
from snuba.query.processors.physical.conditions_enforcer import (
    MandatoryConditionEnforcer,
)
from snuba.query.processors.physical.mandatory_condition_applier import (
    MandatoryConditionApplier,
)
from snuba.query.query_settings import QuerySettings
from snuba.util import with_span

# TODO: Importing snuba.web here is just wrong. What's need to be done to avoid this
# dependency is a refactoring of the methods that return RawQueryResult to make them
# depend on Result + some debug data structure instead. Also It requires removing
# extra data from the result of the query.
from snuba.web import QueryResult


class SimpleQueryPlanExecutionStrategy(QueryPlanExecutionStrategy[Query]):
    def __init__(
        self,
        cluster: ClickhouseCluster,
        db_query_processors: Sequence[ClickhouseQueryProcessor],
        splitters: Optional[Sequence[QuerySplitStrategy]] = None,
    ) -> None:
        self.__cluster = cluster
        self.__query_processors = db_query_processors
        self.__splitters = splitters or []

    @with_span()
    def execute(
        self,
        query: Query,
        query_settings: QuerySettings,
        runner: QueryRunner,
    ) -> QueryResult:
        def process_and_run_query(
            query: Query, query_settings: QuerySettings
        ) -> QueryResult:
            for processor in self.__query_processors:
                with sentry_sdk.start_span(
                    description=type(processor).__name__, op="processor"
                ):
                    processor.process_query(query, query_settings)
            return runner(query, query_settings, self.__cluster.get_reader())

        use_split = state.get_config("use_split", 1)
        if use_split:
            for splitter in self.__splitters:
                with sentry_sdk.start_span(
                    description=type(splitter).__name__, op="splitter"
                ):
                    result = splitter.execute(
                        query, query_settings, process_and_run_query
                    )
                    if result is not None:
                        return result

        return process_and_run_query(query, query_settings)


def get_query_data_source(
    relational_source: RelationalSource, final: bool, sampling_rate: Optional[float]
) -> Table:
    assert isinstance(relational_source, TableSource)
    return Table(
        table_name=relational_source.get_table_name(),
        schema=relational_source.get_columns(),
        final=final,
        sampling_rate=sampling_rate,
        mandatory_conditions=relational_source.get_mandatory_conditions(),
    )


MEGA_CLUSTER_RUNTIME_CONFIG_PREFIX = "slicing_mega_cluster_partitions"


class StorageClusterSelector(ABC):
    """
    The component provided by a dataset and used at the beginning of the
    execution of a query to pick the storage set a query should be executed
    onto.
    """

    @abstractmethod
    def select_cluster(
        self,
        query: LogicalQuery,
        query_settings: QuerySettings,
        storage_set: StorageSetKey,
    ) -> ClickhouseCluster:
        raise NotImplementedError


def _should_use_mega_cluster(
    storage_set: StorageSetKey, logical_partition: int
) -> bool:
    """
    Helper method to find out whether a logical partition of a sliced storage
    set needs to send queries to the mega cluster.

    Mega cluster needs to be used when a logical partition's data might be
    across multiple slices. This happens when a logical partition is mapped
    to a new slice. In such cases, the old data resides in some different
    slice than what the new mapping says.
    """
    key = f"{MEGA_CLUSTER_RUNTIME_CONFIG_PREFIX}_{storage_set.value}"
    state.get_config(key, None)
    slicing_read_override_config = state.get_config(key, None)

    if slicing_read_override_config is None:
        return False

    slicing_read_override_config = slicing_read_override_config[1:-1]
    if slicing_read_override_config:
        logical_partition_overrides = [
            int(p.strip()) for p in slicing_read_override_config.split(",")
        ]
        if logical_partition in logical_partition_overrides:
            return True

    return False


class ColumnBasedStorageSliceSelector(StorageClusterSelector):
    """
    Storage slice selector based on a specific column of the query. This is
    needed in order to select the cluster to use for a query. The cluster
    selection depends on the value of the partition_key_column_name.

    In most cases, the partition_key_column_name would get mapped to a logical
    partition and then to a slice. But when a logical partition is being
    transitioned to another slice, the old data resides in a different slice. In
    those cases, we need to use the mega cluster to query both the old data and
    the new data.
    """

    def __init__(
        self,
        partition_key_column_name: str,
    ) -> None:
        self.partition_key_column_name = partition_key_column_name

    def select_cluster(
        self,
        query: LogicalQuery,
        query_settings: QuerySettings,
        storage_set: StorageSetKey,
    ) -> ClickhouseCluster:
        """
        Selects the cluster to use for a query if the storage set is sliced.
        If the storage set is not sliced, it returns the default cluster.
        """
        if not is_storage_set_sliced(storage_set):
            return get_cluster(storage_set)

        org_ids = get_object_ids_in_query_ast(query, self.partition_key_column_name)
        assert org_ids is not None
        assert len(org_ids) == 1
        org_id = org_ids.pop()

        logical_partition = map_org_id_to_logical_partition(org_id)
        if _should_use_mega_cluster(storage_set, logical_partition):
            return get_cluster(storage_set)
        else:
            slice_id = map_logical_partition_to_slice(storage_set, logical_partition)
            cluster = get_cluster(storage_set, slice_id)
            return cluster


class StorageQueryPlanBuilder(ClickhouseQueryPlanBuilder):
    """
    Builds the Clickhouse Query Execution Plan for a dataset which supports single storages,
    multiple storages, unsliced storages, and sliced storages.
    """

    def __init__(
        self,
        storage_and_mappers: List[StorageAndMappers],
        selector: Optional[QueryStorageSelector] = None,
        post_processors: Optional[Sequence[ClickhouseQueryProcessor]] = None,
        partition_key_column_name: Optional[str] = None,
    ) -> None:
        self.__storage_and_mappers = storage_and_mappers
        self.__selector = selector
        self.__post_processors = post_processors or []
        self.__partition_key_column_name = partition_key_column_name

    @with_span()
    def build_and_rank_plans(
        self, query: LogicalQuery, settings: QuerySettings
    ) -> Sequence[ClickhouseQueryPlan]:
        if len(self.__storage_and_mappers) < 1:
            raise QueryStorageSelectorError("No storages specified to select from.")

        if not self.__selector:
            # Default to the first and only storage and mapper
            if len(self.__storage_and_mappers) == 1:
                storage, mappers, _ = self.__storage_and_mappers[0]
            else:
                # If there are both readable and writable storages, select the readable one.
                # Multiple writable storages are not supported.
                readable_storages = [
                    storage
                    for storage in self.__storage_and_mappers
                    if not storage.is_writable
                ]
                if len(readable_storages) > 1:
                    raise QueryStorageSelectorError(
                        "Multiple readable storages requires a storage selector."
                    )

                storage, mappers, _ = readable_storages[0]
        else:
            with sentry_sdk.start_span(
                op="build_plan.storage_query_plan_builder", description="select_storage"
            ):
                storage, mappers, _ = self.__selector.select_storage(
                    query, settings, self.__storage_and_mappers
                )

        if is_storage_set_sliced(storage.get_storage_set_key()):
            with sentry_sdk.start_span(
                op="build_plan.sliced_storage", description="select_storage"
            ):
                assert (
                    self.__partition_key_column_name is not None
                ), "partition key column name must be defined for a sliced storage"
                cluster = ColumnBasedStorageSliceSelector(
                    partition_key_column_name=self.__partition_key_column_name
                ).select_cluster(
                    query,
                    settings,
                    storage.get_storage_set_key(),
                )
        else:
            cluster = storage.get_cluster()

        with sentry_sdk.start_span(
            op="build_plan.storage_query_plan_builder", description="translate"
        ):
            # The QueryTranslator class should be instantiated once for each call to build_plan,
            # to avoid cache conflicts.
            clickhouse_query = QueryTranslator(mappers).translate(query)

        with sentry_sdk.start_span(
            op="build_plan.storage_query_plan_builder", description="set_from_clause"
        ):
            clickhouse_query.set_from_clause(
                get_query_data_source(
                    storage.get_schema().get_data_source(),
                    final=query.get_final(),
                    sampling_rate=query.get_sample(),
                )
            )

        db_query_processors = [
            *storage.get_query_processors(),
            *self.__post_processors,
            MandatoryConditionApplier(),
            MandatoryConditionEnforcer(storage.get_mandatory_condition_checkers()),
        ]

        return [
            ClickhouseQueryPlan(
                query=clickhouse_query,
                plan_query_processors=[],
                db_query_processors=db_query_processors,
                storage_set_key=storage.get_storage_set_key(),
                execution_strategy=SimpleQueryPlanExecutionStrategy(
                    cluster=cluster,
                    db_query_processors=db_query_processors,
                    splitters=storage.get_query_splitters(),
                ),
            )
        ]
