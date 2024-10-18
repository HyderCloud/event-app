"use client"
import React, {useState} from 'react'
import gradient2 from '@/image/landing/vec1.svg'
import {Button, Divider, Input} from "@nextui-org/react";
import { useCookies } from 'react-cookie';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import axios from 'axios';


const StoreSection = ({ username, id, profession, email}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['store']);
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(false)
    const [store, setStore] = useState('')
    const handleChange = (e)=>{
        setStore(e.target.value)
    }
    
    const handleSubmit = async ()=>{
        setIsLoad(true)
        const addStore = await axios.patch(`http://localhost:9020/insertstore/${id}`,{store: store, username: username, profession: profession, email: email})
        if (addStore?.data?.acknowledge){
            setCookie('store',addStore?.data?.token)
            router.push(`/${addStore?.data?.username}`)
        }
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
          <div>צור את העסק שלך</div>
          <div style={{height: '60px'}}></div>
          <Input type="email" variant={"flat"} onChange={handleChange} label="name" radius='lg'/>
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

export default StoreSection
