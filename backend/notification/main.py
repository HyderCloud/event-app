from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
allowed_origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://yourdomain.com",
]

# Add CORS middleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,       # Allows requests from these origins
    allow_credentials=True,               # Allows cookies and authentication headers
    allow_methods=["*"],                  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],                  # Allows all headers
)
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print(f"User {user_id} connected. Active connections: {list(self.active_connections.keys())}")

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            print(f"User {user_id} disconnected. Active connections: {list(self.active_connections.keys())}")

    async def send_to_user(self, user_id: str, message: dict):
        connection = self.active_connections.get(user_id)
        if connection:
            print(f"Sending message to {user_id}: {message}")
            await connection.send_json(message)
        else:
            print(f"user {user_id} is not connected. Active connections: {list(self.active_connections.keys())}")

# Initialize the connection manager
manager = ConnectionManager()

@app.websocket("/ws/notifications/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    try:
        while True:
            await websocket.receive_json()  # Keeps connection open
    except WebSocketDisconnect:
        manager.disconnect(user_id)

@app.post("/notify/{user_id}")
async def send_notification_to_user(user_id: str, notification: dict):
    print("Received notification body:", notification["message"])
    await manager.send_to_user(user_id, notification["message"])
    return {"message": f"Notification sent to user {user_id}"}


