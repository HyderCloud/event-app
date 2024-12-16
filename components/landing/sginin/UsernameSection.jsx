"use client"
import React, { useState } from 'react'
import { Button, Divider, Input, user } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import Image from 'next/image'
import axios from 'axios';

const UsernameSection = ({ email }) => {
  const path = usePathname()
  const router = useRouter()
  const [isLoad, setIsLoad] = useState(false)
  const [username, setUsername] = useState('')
  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  const handleSubmit = async (e) => {
    setIsLoad(true)
    const result = await axios.post('http://localhost:9020/updateusername', { username: username, email: email })
    if (result.data.acknowledge) {
      router.push(`/?isbuissness=true`)
    }

  }

  return (
    <div className='glass-background w-screen h-screen'>
      <div className=' body2 flex flex-row' >
        {console.log(email)}
        <div className="form-container">
          <h1 className="title">Username</h1>
          <form className="form">
            <div className="input-group">
              <label htmlFor="username" className="username" >
                שם משתמש
              </label>
              <input type="text" name="username" required onChange={handleChange} />
            </div>
            <div className="input-group">

            </div>
            <div className="forgot">

            </div>
            <Button isLoading={isLoad} type="button" color='primary' onPress={handleSubmit} className="sign-in">
              לשלב הבא
            </Button>
            <div className="social-messages">
              <div className="line"></div>

              <div className="line"></div>
            </div>


          </form>
        </div>
        <div className='user-interaction flex flex-col bg-white' style={{
          width: '700px', height: '450px', borderRadius: '20px',
          boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
        }}>

        </div>
      </div>
    </div>
  )

}

export default UsernameSection