"use client"
import React, {useState} from 'react'
import {Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const Sginout = ({form}) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(true);

    const togglePopup = () =>{router.push('/')} 

  return (
    <div>
      <button onClick={togglePopup}>Open Popup</button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button flex items-center justify-center" onClick={togglePopup}>✖</button>
            <div className='w-full items-center flex justify-center'>
                {form}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Sginout