import logging
import time
from typing import Sequence

from confluent_kafka import KafkaError, KafkaException
from confluent_kafka.admin import AdminClient, NewTopic

from snuba.datasets.table_storage import KafkaTopicSpec
from snuba.utils.streams.topics import Topic, get_topic_creation_config

logger = logging.getLogger(__name__)


def create_topics(
    client: AdminClient,
    topics: Sequence[Topic],
    num_partitions: int = 1,
    replication_factor: int = 1,
) -> None:
    topics_to_create = {}

    for topic in topics:
        topic_spec = KafkaTopicSpec(topic)
        logger.debug("Adding topic %s to creation list", topic_spec.topic_name)
        topics_to_create[topic_spec.topic_name] = NewTopic(
            topic_spec.topic_name,
            num_partitions=num_partitions,
            replication_factor=replication_factor,
            config=get_topic_creation_config(topic),
        )

    logger.info("Creating Kafka topics...")
    for topic, future in client.create_topics(
        list(topics_to_create.values()), operation_timeout=1
    ).items():
        try:
            future.result()
            logger.info("Topic %s created", topic)
        except KafkaException as err:
            if err.args[0].code() != KafkaError.TOPIC_ALREADY_EXISTS:
                logger.error("Failed to create topic %s", topic, exc_info=err)


def delete_topics(client: AdminClient, topics: Sequence[Topic]) -> None:
    topic_names = [KafkaTopicSpec(topic).topic_name for topic in topics]

    try:
        client.delete_topics(topics=topic_names)
    except Exception as e:
        print(e)


def recreate_topics(
    client: AdminClient,
    topics: Sequence[Topic],
    num_partitions: int = 1,
    replication_factor: int = 1,
) -> None:
    delete_topics(client, topics)
    create_topics(client, topics, num_partitions, replication_factor)
    wait_for_topics(client, topics)


def wait_for_topics(client: AdminClient, topics: Sequence[Topic]) -> None:
    topic_names = {KafkaTopicSpec(topic).topic_name for topic in topics}

    retries = 3

    while retries > 0:
        retries -= 1
        topic_list = set(client.list_topics().topics.keys())
        if topic_names.issubset(topic_list):
            return
        else:
            time.sleep(0.1)
