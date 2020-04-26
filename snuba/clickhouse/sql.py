from abc import ABC, abstractmethod
from typing import Optional


class ClickhouseSqlQuery(ABC):
    """
    Formats a ClickhouseQuery into an SQL string Clickhouse understands.
    """

    @abstractmethod
    def _format_query_impl(self) -> str:
        """
        Produces the SQL representation of this query without the ``FORMAT``
        clause. Not intended to be used by external callers, but must be
        implemented by subclasses to enable ``format_sql`` to function.
        """
        raise NotImplementedError

    def format_sql(self, format: Optional[str] = None) -> str:
        """Produces the SQL representation of this query."""
        query = self._format_query_impl()
        if format is not None:
            query = f"{query} FORMAT {format}"
        return query
