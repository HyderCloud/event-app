"use client"
import React, {useState} from 'react'
import {Button, Divider, Input} from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image'
import axios from 'axios';

const UsernameSection = ({ onUsername}) => {
    const path = usePathname()
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(false)
    const [username, setUsername] = useState('')
    const handleChange = (e)=>{
        setUsername(e.target.value)
    }
    const handleSubmit = async (e)=>{
        setIsLoad(true)
        onUsername(username)
        router.push(`${path}?username=access`)

    }
    if (isLoad){
        return(
            <div>loading
            </div>
        )
    }else{
        return (
            <div className='glass-background w-screen h-screen'>
            <div className=' body2 flex flex-row' >
      
          <div className="form-container">
          <h1 className="title">Username</h1>
          <form className="form">
            <div className="input-group">
              <label htmlFor="username" className="username" >
                שם משתמש
              </label>
              <input type="text" name="username" required  onChange={handleChange}/>
            </div>
            <div className="input-group">
 
            </div>
            <div className="forgot">
       
            </div>
            <Button type="button" onPress={handleSubmit} className="sign-in">
              לשלב הבא
            </Button>
            <div className="social-messages">
              <div className="line"></div>
          
              <div className="line"></div>
            </div>

         
          </form>
        </div>

            </div>
          </div>
        )
    }
}

export default UsernameSection