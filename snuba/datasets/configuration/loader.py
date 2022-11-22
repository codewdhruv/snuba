from __future__ import annotations

from typing import Any, Mapping

import sentry_sdk
from jsonschema import validate
from yaml import safe_load


def load_configuration_data(
    path: str, validation_schemas: Mapping[str, Any]
) -> dict[str, Any]:
    """
    Loads a configuration file from the given path
    Returns an untyped dict of dicts
    """
    with sentry_sdk.start_span(op="load") as span:
        span.set_tag("file", path)
        file = open(path)
        config = safe_load(file)
        assert isinstance(config, dict)
    with sentry_sdk.start_span(op="validate") as span:
        span.set_tag("file", path)
        validate(config, validation_schemas[config["kind"]])
    return config
