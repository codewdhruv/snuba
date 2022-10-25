from __future__ import annotations

import logging
import os
import time

import click
import sentry_sdk
import structlog

from snuba.environment import metrics as environment_metrics
from snuba.environment import setup_logging, setup_sentry
from snuba.utils.metrics.wrapper import MetricsWrapper

setup_sentry()

with sentry_sdk.start_transaction(
    op="snuba_init", name="Snuba CLI Initialization", sampled=True
):

    setup_logging("DEBUG")
    logger = logging.getLogger("snuba_init")

    start = time.perf_counter()
    logger.info("Initializing Snuba...")
    metrics = MetricsWrapper(environment_metrics, "cli")

    plugin_folder = os.path.dirname(__file__)

    class SnubaCLI(click.MultiCommand):
        def list_commands(self, ctx) -> list[str]:
            rv = []
            for filename in os.listdir(plugin_folder):
                if filename.endswith(".py") and filename != "__init__.py":
                    rv.append(filename[:-3])
            rv.sort()
            return rv

        def get_command(self, ctx, name):
            logger.info(f"Loading command {name}")
            with sentry_sdk.start_span(op="import", description=name):
                ns = {}
                fn = os.path.join(plugin_folder, name + ".py")
                with open(fn) as f:
                    code = compile(f.read(), fn, "exec")
                    eval(code, ns, ns)
                return ns[name]

    @click.command(cls=SnubaCLI)
    def main():
        """\b
                             o
                            O
                            O
                            o
        .oOo  'OoOo. O   o  OoOo. .oOoO'
        `Ooo.  o   O o   O  O   o O   o
            O  O   o O   o  o   O o   O
        `OoO'  o   O `OoO'o `OoO' `OoO'o"""

    init_time = time.perf_counter() - start
    metrics.gauge("snuba_init", init_time)
    logger.info(f"Snuba initialization took {init_time}s")

    structlog.reset_defaults()
