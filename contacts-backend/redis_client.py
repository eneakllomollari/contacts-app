import logging

import redis

from app.core.config import settings

logger = logging.getLogger(__name__)
redis_client = redis.Redis.from_url(settings.REDIS_URL)
pubsub = redis_client.pubsub()


def publish_contact_change():
    redis_client.publish("contact_changes", message="contact_changes")
