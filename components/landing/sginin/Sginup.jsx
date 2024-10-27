"use client"
import React, {useState} from 'react'
import Link from 'next/link';
import {Button, Divider, Input} from "@nextui-org/react";
import { signIn } from "next-auth/react"
import Image from 'next/image'

const Sginup = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
   const handleOnChangePassword = (e)=>{
        setPassword(e.target.value)
   }
   const [username, setUsername] = useState('')
   const handleOnChangeUsername = (e)=>{
       setUsername(e.target.value)
   }
   const handleOnChangeEmail = (e)=>{
    setEmail(e.target.value)
}
  return (
    <main className='sginin-container min-h-screen'>
    <div className='flex flex-row sginin-container min-h-screen'>

    <div className='sginin2sec-container flex flex-col space-y-12'>
        <form className='sginin-form-container flex flex-col'>
    <div>הרשמה</div>
    <div style={{height: '40px'}}></div>
    <Input type="email" variant={"flat"} label="Email" onChange={handleOnChangeEmail} radius='lg'/>
    <div style={{height: '20px'}}></div>
    <Input type="email" variant={"flat"} label="Username" onChange={handleOnChangeUsername} radius='lg'/>
    <div style={{height: '20px'}}></div>
    <Input type="Password" variant={"bordered"} label="Password" onChange={handleOnChangePassword} radius='lg'/>
    <div style={{height: '30px'}}></div>
    <Button color='primary' className='signin-button'>הרשמה</Button>
    <div style={{height: '20px'}}></div>
    <Link href={'/signin'}>?כבר יש לך משתמש</Link>
    <div style={{height: '20px'}}></div>
    <Divider/>
    <div>או</div>
    <div style={{height: '20px'}}></div>
    <div className='flex flex-row'>
        <div>
        <Button onPress={() => signIn("google")} style={{height: '50px'}}></Button>
        </div>
        <div style={{width: '40px'}}></div>
        <div >
        <Button onPress={() => signIn("google")} style={{height: '50px'}}></Button>    
        </div>
    </div>
    <div style={{height: '20px'}}></div>
        </form>
    </div>
    </div>
</main>
  )
}

export default Sginup