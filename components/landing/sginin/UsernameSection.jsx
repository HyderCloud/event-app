"use client"
import React, {useState} from 'react'
import gradient2 from '@/image/landing/vec1.svg'
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
          <main className='sginin-container min-h-screen'>
          <div className='flex flex-row sginin-container min-h-screen'>
          <div className='sginin1sec-container'>
              <div className='flex items-center justify-center' style={{height: "90%"}}>
              <Image src={gradient2} className='sginin1sec-container-image'
              height={500}
              width={500}
              />
              </div>
          </div>
          <div className='sginin2sec-container flex flex-col space-y-12'>
            
              <form onSubmit={handleSubmit} className='sginin-form-container flex flex-col'>
          <div>צור שם משתמש</div>
          <div style={{height: '60px'}}></div>
          <Input type="email" variant={"flat"} onChange={handleChange} label="username" radius='lg'/>
          <div style={{height: '40px'}}></div>
          <Button color='primary' onPress={handleSubmit} className='signin-button'>לשלב הבא</Button>
          <div style={{height: '20px'}}></div>
          <div style={{height: '20px'}}></div>
          <Divider/>
          <div style={{height: '20px'}}></div>
          <div style={{height: '20px'}}></div>
              </form>
          </div>
          </div>
      </main>
        )
    }
}

export default UsernameSection