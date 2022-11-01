from __future__ import annotations

import pytest

from snuba.datasets.configuration.utils import serialize_columns
from snuba.datasets.storage import ReadableTableStorage
from snuba.datasets.storages.factory import initialize_storage_factory

initialize_storage_factory()
from typing import Any

from yaml import safe_load

from snuba.datasets.storages.generic_metrics import sets_bucket_storage, sets_storage


def unsafe_load_configuration_data(path: str) -> dict[str, Any]:
    """
    No validation
    """
    file = open(path)
    config = safe_load(file)
    assert isinstance(config, dict)
    return config


test_data = [
    pytest.param(
        sets_storage,
        "./snuba/datasets/configuration/generic_metrics/storages/sets.yaml",
        id="gen_metrics_sets",
    ),
    pytest.param(
        sets_bucket_storage,
        "./snuba/datasets/configuration/generic_metrics/storages/sets_bucket.yaml",
        id="gen_metrics_sets_bucket",
    ),
]


@pytest.mark.parametrize(
    "storage, path",
    test_data,
)
def test_serialize_columns(storage: ReadableTableStorage, path: str) -> None:
    assert (
        serialize_columns(storage.get_schema().get_columns().columns)
        == unsafe_load_configuration_data(path)["schema"]["columns"]
    )
