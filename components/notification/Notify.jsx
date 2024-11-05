"use client"
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from 'axios'
import { Button } from "@nextui-org/react";
const WebSocketComponent = ({ userId }) => {
  const icon = <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="4" rx="2" fill="#FBB03B" />
  </svg> </div>
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const path = usePathname()
  const router = useRouter()
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
  function removeElementAtIndex(arr, index) {
    if (index >= 0 && index < arr.length) {
        arr.splice(index, 1);  // Remove 1 element at the specified index
    }
    return arr;
}

  // Function to send a message (if needed)
  const handleAllowRewquest = async (index)=>{
    const arr = messages[index]
    const newArr = removeElementAtIndex(messages,index)
    setMessages(newArr)
    const result = await axios.patch(`http://localhost:9020/allowjob/${getStringAfterSecondSlash(path)}`,
    {id: arr._id, key: arr.key, from: arr.from, role:  arr.role, name:arr.name})
    router.push(result.data.link)
  }

  return (
    <div className=' flex w-full h-full items-center flex-col bg-black' style={{paddingLeft: '15%', gap: '5%', color: 'white', paddingTop: '10%'}}>
      <div className="notification-header">התראות</div>
      <div className="flex flex-col w-full h-full items-center" style={{gap: '20px', overflow: 'auto'}}>
        {messages?.map((item,index)=>{
          return(
            <div className="glass-background flex flex-row notification-container">
              <div>
                {item.date}
              </div>
              <div className="flex flex-col w-full h-full items-end justify-between"style={{textAlign: 'right'}}>
                <div style={{color:'white'}}>
                {item.title}
                </div>
                <div>
                {item.message}
                </div>
                <div className="flex flex-row" style={{gap: '10px'}}>
                <Button color="danger">דחה</Button>
                <Button onPress={()=>{
                  handleAllowRewquest(index)
                }} color="primary">אשר</Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default WebSocketComponent;

const message = <div>

</div>