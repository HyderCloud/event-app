"use client"
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from 'axios'
const WebSocketComponent = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const path = usePathname()
  function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[2] || null; 
}

 const handleNotification = async ()=>{
  const result = await axios.get(`http://localhost:9020/notification/${getStringAfterSecondSlash(path)}`)
  console.log(result.data)
  setMessages(result.data?.notify)
 }

  useEffect(() => {
    handleNotification()
    const ws = new WebSocket(`ws://localhost:8000/ws/notifications/${getStringAfterSecondSlash(path)}`);

    // Set up the WebSocket event listeners
    ws.onopen = () => {
      console.log(`Connected to WebSocket server as ${userId}`);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      // Handle incoming messages from the server
      const message = JSON.parse(event.data);
      console.log("Message from server:", message);
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


  return (
    <div className=' flex w-full h-full items-center flex-col' style={{paddingLeft: '15%', gap: '20px', color: 'white', paddingTop: '10%'}}>
      <div className="notification-header">התראות</div>
      <div className="flex flex-col w-full h-full items-center">
        {messages?.map((item,index)=>{
          return(
            <div className="glass-background notification-container"></div>

          )
        })}
      </div>
    </div>
  );
};

export default WebSocketComponent;
