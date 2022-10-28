from datetime import timedelta
from typing import Optional
from uuid import UUID

from snuba.datasets.entities.entity_key import EntityKey
from snuba.datasets.entities.factory import get_entity
from snuba.datasets.entity_subscriptions.entity_subscription import (
    EntitySubscription,
    InvalidSubscriptionError,
)
from snuba.subscriptions.data import (
    PartitionId,
    Subscription,
    SubscriptionData,
    SubscriptionIdentifier,
)

UUIDS = [
    UUID("fac82541-049f-4435-982d-819082761a53"),
    UUID("49215ec6-939e-41e9-a209-f09b5514e884"),
]


def build_subscription(resolution: timedelta, sequence: int) -> Subscription:
    return Subscription(
        SubscriptionIdentifier(PartitionId(1), UUIDS[sequence]),
        SubscriptionData(
            project_id=1,
            time_window_sec=int(timedelta(minutes=5).total_seconds()),
            resolution_sec=int(resolution.total_seconds()),
            query="MATCH events SELECT count()",
            org_id=None,
            entity_subscription=EntitySubscription(),
        ),
    )


def create_entity_subscription(
    entity_key: EntityKey = EntityKey.EVENTS, org_id: Optional[int] = None
) -> EntitySubscription:
    entity_subscription = get_entity(entity_key).get_entity_subscription()
    if not entity_subscription:
        raise InvalidSubscriptionError(
            f"entity subscription for {entity_key} does not exist"
        )
    return entity_subscription
