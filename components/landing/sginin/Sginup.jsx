"use client"
import React from 'react'
import gradient2 from '@/image/landing/vec1.svg'
import {Button, Divider, Input} from "@nextui-org/react";
import { signIn } from "next-auth/react"
import Image from 'next/image'

const Sginup = () => {
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
        <form className='sginin-form-container flex flex-col'>
    <div>אנחנו שמחים לראותכם</div>
    <div style={{height: '60px'}}></div>
    <Input type="email" variant={"flat"} label="Email" radius='lg'/>
    <div style={{height: '40px'}}></div>
    <Input type="Password" variant={"bordered"} label="password" radius='lg'/>
    <div style={{height: '50px'}}></div>
    <Button color='primary' className='signin-button'>התחברות</Button>
    <div style={{height: '20px'}}></div>
    <div>יצירת משתמש חדש</div>
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