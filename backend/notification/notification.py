import redis
import json

# Connect to Redis
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Publish a notification
def create_notification(message: str):
    notification_data = json.dumps({"message": message})
    redis_client.publish("notifications", notification_data)
    print("Notification published to Redis")

# Subscribe to notifications
def subscribe_notifications():
    pubsub = redis_client.pubsub()
    pubsub.subscribe("notifications")
    return pubsub
