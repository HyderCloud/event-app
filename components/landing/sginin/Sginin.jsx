"use client"
import React, {useState} from 'react'
import Link from 'next/link';
import {Button, Divider, Input} from "@nextui-org/react";
import { signIn } from "next-auth/react"
import Image from 'next/image'
import axios from 'axios';
import { loginAction } from '@/components/action';

const Sginin = () => {
    const [password, setPassword] = useState('')

    const [email, setEmail] = useState('')
   const handleOnChangePassword = (e)=>{
        setPassword(e.target.value)
   }
   const onSubmit = async (data)=>{
    const res = await loginAction(data)
    console.log("res:", res)
  }
  
   const handleOnChangeEmail = (e)=>{
    setEmail(e.target.value)
}



  return (
    <div className='glass-background w-screen h-screen'>
      <div className=' body2 flex flex-row' >

    <div className="form-container">
    <h1 className="title">LOGIN</h1>
    <form className="form">
      <div className="input-group">
        <label htmlFor="username" className="username" onChange={handleOnChangeEmail}>
          אימייל
        </label>
        <input type="text" name="username" required />
      </div>
      <div className="input-group">
        <label htmlFor="password" className="password">
          סיסמה
        </label>
        <input type="password" onChange={handleOnChangePassword} name="password" required />
      </div>
      <div className="forgot">
        <a href="#">שכחת את הסיסמה?</a>
      </div>
      <Button type="button" onPress={onSubmit} className="sign-in">
        התחברות
      </Button>
      <div className="social-messages">
        <div className="line"></div>
        <p className="message">התחברות עם רשתות חברתיות</p>
        <div className="line"></div>
      </div>
      <div className="icons" onClick={() => signIn("google")}>
        <div style={{height: '75px', width: '75px', cursor: 'pointer'}}>
        <Image 
        style=  {{ backgroundSize: 'cover',
        backgroundPosition: 'center'}}
        src={require('@/image/face2.png')}
        height={100}
        width={100}
        alt='fff' />
        </div>
        <div style={{height: '75px', width: '75px', cursor: 'pointer'}} onClick={() => signIn("google")}>
                <Image 
        style=  {{ backgroundSize: 'cover',
        backgroundPosition: 'center'}}
        src={require('@/image/google.png')}
        height={100}
        width={100}
        alt='fff' />
        </div>
        
     
      </div>
      <p className="sign-up">
        עדיין אין לך משתמש <Link href="/signup">הרשמה</Link>
      </p>
    </form>
  </div>

      </div>
    </div>
  )
}

export default Sginin