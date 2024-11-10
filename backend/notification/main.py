from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Dict, List
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
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        # Track connections by user_id and event_id
        self.user_connections: Dict[str, WebSocket] = {}
        self.event_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: str, event_id: str):
        await websocket.accept()
        
        # Track user-specific connection
        self.user_connections[user_id] = websocket
        print(f"User {user_id} connected.")

        # Track event-specific connection
        if event_id not in self.event_connections:
            self.event_connections[event_id] = []
        self.event_connections[event_id].append(websocket)
        print(f"User {user_id} added to event {event_id}. Active event connections: {len(self.event_connections[event_id])}")

    def disconnect(self, websocket: WebSocket, user_id: str, event_id: str):
        # Remove user-specific connection
        if user_id in self.user_connections:
            del self.user_connections[user_id]
            print(f"User {user_id} disconnected.")

        # Remove event-specific connection
        if event_id in self.event_connections:
            self.event_connections[event_id] = [
                ws for ws in self.event_connections[event_id] if ws != websocket
            ]
            # If no connections remain for this event, remove the event
            if not self.event_connections[event_id]:
                del self.event_connections[event_id]
            print(f"User {user_id} removed from event {event_id}.")

    async def send_to_user(self, user_id: str, message: dict):
        connection = self.user_connections.get(user_id)
        if connection:
            print(f"Sending message to user {user_id}: {message}")
            await connection.send_json(message)
        else:
            print(f"User {user_id} is not connected.")

    async def send_to_event(self, event_id: str, message: dict):
        connections = self.event_connections.get(event_id, [])
        if connections:
            print(f"Sending message to all connections in event {event_id}: {message}")
            for connection in connections[:]:  # Iterate over a copy to allow modifications
                try:
                    await connection.send_json(message)
                except (WebSocketDisconnect, RuntimeError) as e:
                    # Handle WebSocket closed connection
                    print(f"Connection closed or error in event {event_id}: {e}")
                    self.disconnect(connection, "unknown", event_id)  # Remove from active connections
        else:
            print(f"No active connections for event {event_id}")

# Initialize the connection manager
manager = ConnectionManager()

@app.websocket("/ws/{user_id}/{event_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str, event_id: str):
    await manager.connect(websocket, user_id, event_id)
    try:
        while True:
            await websocket.receive_json()  # Keeps connection open
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id, event_id)

# Endpoint to send a notification to a specific user
@app.post("/notify/{user_id}")
async def send_notification_to_user(user_id: str, notification: dict):
    await manager.send_to_user(user_id, notification["message"])
    return {"message": f"Notification sent to user {user_id}"}

# Endpoint to send a notification to all users in a specific event
@app.post("/notify/event/{event_id}")
async def send_notification_to_event(event_id: str, notification: dict):
    await manager.send_to_event(event_id, notification["message"])
    return {"message": f"Notification sent to all users in event {event_id}"}
