from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print(f"User {user_id} connected.")

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            print(f"User {user_id} disconnected.")

    async def send_to_user(self, user_id: str, message: dict):
        connection = self.active_connections.get(user_id)
        if connection:
            await connection.send_json(message)
        else:
            print(f"User {user_id} is not connected")

# Define a model for the structure within `message`
# class MessageContent(BaseModel):
#     message: dict 
#     fromU: str
#     link: str
    

# Define the main Notification model, which includes `message` as a nested model
class Notification(BaseModel):
    message: str

# Initialize the connection manager
manager = ConnectionManager()

@app.websocket("/ws/notifications/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(user_id)

@app.post("/notify/{user_id}")
async def send_notification_to_user(user_id: str, notification: Notification):
    # Print the received notification for debugging
    print("Received notification body:", notification.message.dict())
    
    # Send the message to the specified user
    await manager.send_to_user(user_id, notification.message.dict())
    return {"message": f"Notification sent to user {user_id}"}
