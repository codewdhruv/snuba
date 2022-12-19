from __future__ import annotations

import sys
from typing import Any, Sequence

import yaml
from arroyo.processing.strategies.dead_letter_queue import ProduceInvalidMessagePolicy

from snuba.datasets.configuration.utils import serialize_columns
from snuba.datasets.schemas import Schema
from snuba.datasets.schemas.tables import TableSchema
from snuba.datasets.storage import WritableStorage, WritableTableStorage
from snuba.datasets.storages.factory import get_storage, initialize_storage_factory
from snuba.datasets.storages.storage_key import StorageKey
from snuba.datasets.table_storage import KafkaStreamLoader
from snuba.query.conditions import ConditionFunctions
from snuba.query.expressions import Column, Literal

initialize_storage_factory()


def _convert_registered_class(cls: Any, name: str) -> dict[str, Any]:
    res = {}
    res[name] = cls.config_key()
    if cls.init_kwargs:
        res["args"] = cls.init_kwargs
    return res


def _convert_registered_classes(
    cls_list: Sequence[Any], name: str
) -> list[dict[str, Any]]:
    res = []
    for cls in cls_list:
        res.append(_convert_registered_class(cls, name))

    return res


def _convert_stream_loader(stream_loader: KafkaStreamLoader) -> dict[str, Any]:
    res = {
        "processor": _convert_registered_class(stream_loader.get_processor(), "name"),
        "default_topic": stream_loader.get_default_topic_spec().topic_name,
    }
    if spec := stream_loader.get_replacement_topic_spec():
        res["replacement_topic"] = spec.topic_name
    if spec := stream_loader.get_commit_log_topic_spec():
        res["commit_log_topic"] = spec.topic_name
    if mode := stream_loader.get_subscription_scheduler_mode():
        res["subscription_scheduler_mode"] = mode.value
    if spec := stream_loader.get_subscription_scheduled_topic_spec():
        res["subscription_scheduled_topic"] = spec.topic_name
    if spec := stream_loader.get_subscription_result_topic_spec():
        res["subscription_result_topic"] = spec.topic_name
    if creator := stream_loader.get_dead_letter_queue_policy_creator():
        policy = creator()
        if isinstance(policy, ProduceInvalidMessagePolicy):
            res["dlq_policy"] = {
                "type": "produce",
                "args": [policy._ProduceInvalidMessagePolicy__dead_letter_topic.name],  # type: ignore
            }
        policy.terminate()
    if prefilter := stream_loader.get_pre_filter():
        res["pre_filter"] = {
            "type": prefilter.__class__.__name__,
            "args": prefilter.init_kwargs,
        }
    return res


def _convert_schema(schema: Schema) -> dict[str, Any]:
    assert isinstance(schema, TableSchema)
    res = {
        "columns": str(serialize_columns(schema.get_columns().columns)).replace(
            "'", ""
        ),
        "local_table_name": schema.get_local_table_name(),
        "dist_table_name": schema._TableSchema__dist_table_name,  # type: ignore
    }
    if part_format := schema.get_partition_format():
        res["partition_format"] = [segment.value for segment in part_format]
    if mandatory_conditions := schema.get_data_source().get_mandatory_conditions():
        # assumed only 1 condition and it's the binary "not deleted" condition
        [condition] = mandatory_conditions
        assert condition.function_name == ConditionFunctions.EQ
        column, literal = condition.parameters
        assert isinstance(column, Column)
        assert isinstance(literal, Literal) and literal.value == 0
        res["not_deleted_mandatory_condition"] = column.column_name

    return res


def convert_to_yaml(key: StorageKey, result_path: str) -> None:
    storage = get_storage(key)
    res: dict[str, Any] = {
        "version": "v1",
        "kind": "writable_storage"
        if isinstance(storage, WritableStorage)
        else "readable_storage",
        "name": key.value,
        "storage": {"key": key.value, "set_key": storage.get_storage_set_key().value},
    }
    res["schema"] = _convert_schema(storage.get_schema())

    if processors := _convert_registered_classes(
        storage.get_query_processors(), "processor"
    ):
        res["query_processors"] = processors
    if splitters := _convert_registered_classes(
        storage.get_query_splitters(), "splitter"
    ):
        res["query_splitters"] = splitters
    if checkers := _convert_registered_classes(
        storage.get_mandatory_condition_checkers(), "condition"
    ):
        res["mandatory_condition_checkers"] = checkers
    if isinstance(storage, WritableTableStorage):
        writer_options = storage.get_table_writer()._TableWriter__writer_options  # type: ignore
        if replacer := storage.get_table_writer().get_replacer_processor():
            res["replacer_processor"] = _convert_registered_class(
                replacer, "errors_replacer"
            )
        if writer_options:
            res["writer_options"] = writer_options
        stream_loader = storage.get_table_writer().get_stream_loader()
        res["stream_loader"] = _convert_stream_loader(stream_loader)
    with open(result_path, "w") as f:
        yaml.dump(res, f, sort_keys=False)


if __name__ == "__main__":
    convert_to_yaml(StorageKey(sys.argv[1]), sys.argv[2])
