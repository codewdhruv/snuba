from abc import ABC, abstractmethod
from typing import List, Optional, Sequence, Type, cast

from snuba.datasets.storage import (
    ReadableTableStorage,
    StorageAndMappers,
    WritableTableStorage,
)
from snuba.datasets.storages.storage_key import StorageKey
from snuba.query.logical import Query
from snuba.query.query_settings import QuerySettings
from snuba.utils.registered_class import RegisteredClass


class QueryStorageSelectorError(Exception):
    pass


class QueryStorageSelector(ABC, metaclass=RegisteredClass):
    """
    The component provided by a dataset and used at the beginning of the
    execution of a query to pick the storage query should be executed onto.
    """

    @classmethod
    def config_key(cls) -> str:
        return cls.__name__

    @classmethod
    def get_from_name(cls, name: str) -> Type["QueryStorageSelector"]:
        return cast(Type["QueryStorageSelector"], cls.class_from_name(name))

    @abstractmethod
    def select_storage(
        self,
        query: Query,
        query_settings: QuerySettings,
        storage_and_mappers: List[StorageAndMappers],
    ) -> StorageAndMappers:
        raise NotImplementedError

    def get_readable_storage_mapping(
        self, storage_and_mappers: Sequence[StorageAndMappers]
    ) -> Optional[StorageAndMappers]:
        return next(
            (
                storage
                for storage in storage_and_mappers
                if type(storage.storage) is ReadableTableStorage
            ),
            None,
        )

    def get_writable_storage_mapping(
        self, storage_and_mappers: Sequence[StorageAndMappers]
    ) -> Optional[StorageAndMappers]:
        return next(
            (
                storage
                for storage in storage_and_mappers
                if isinstance(storage.storage, WritableTableStorage)
            ),
            None,
        )


class DefaultQueryStorageSelector(QueryStorageSelector):
    """
    A default query storage selector which chooses the only storage specified in config.
    Entities which define multiple storages should not use this selector and should use
    custom ones.
    """

    def select_storage(
        self,
        query: Query,
        query_settings: QuerySettings,
        storage_and_mappers: List[StorageAndMappers],
    ) -> StorageAndMappers:
        assert len(storage_and_mappers) == 1
        return storage_and_mappers[0]


class ReadableQueryStorageSelector(QueryStorageSelector):
    """
    A query storage selector which always chooses the readable storage between
    a readable storage and a writable storage.
    """

    def select_storage(
        self,
        query: Query,
        query_settings: QuerySettings,
        storage_and_mappers: List[StorageAndMappers],
    ) -> StorageAndMappers:
        storage = self.get_readable_storage_mapping(storage_and_mappers)
        if not storage:
            raise QueryStorageSelectorError(
                "Unable to select query storage. There is no ReadableTableStorage to select."
            )
        return storage


class SimpleQueryStorageSelector(QueryStorageSelector):
    """
    A simple query storage selector which selects the storage passed an input.
    """

    def __init__(self, storage: str):
        self.storage_key = StorageKey(storage)

    def select_storage(
        self,
        query: Query,
        query_settings: QuerySettings,
        storage_and_mappers: List[StorageAndMappers],
    ) -> StorageAndMappers:
        for sm in storage_and_mappers:
            assert isinstance(sm.storage, ReadableTableStorage)
            if sm.storage.get_storage_key() == self.storage_key:
                return sm
        raise QueryStorageSelectorError(
            "The specified storage in selector does not exist in storage list."
        )
