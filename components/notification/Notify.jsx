"use client"
import React, { useEffect, useState } from "react";

const WebSocketComponent = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket(`ws://localhost:8000/ws/notifications/user126`);

    // Set up the WebSocket event listeners
    ws.onopen = () => {
      console.log(`Connected to WebSocket server as ${userId}`);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      // Handle incoming messages from the server
      const message = JSON.parse(event.data);
      console.log("Message from server:", message);

      // Add the new message to the state
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (ws) ws.close();
    };
  }, [userId]);

  // Function to send a message (if needed)
  const sendMessage = (msg) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = { message: msg };
      socket.send(JSON.stringify(message));
      console.log("Message sent to server:", message);
    } else {
      console.log("WebSocket connection is not open.");
    }
  };

  return (
    <div>
      <h2>WebSocket Messages</h2>
      <button onClick={() => sendMessage("Hello from React!")}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
