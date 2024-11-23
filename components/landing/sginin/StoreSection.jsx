"use client"
import React, {useState} from 'react'

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
            setCookie('store',addStore?.data?.token,{
                path: '/'
            })
            console.log(addStore?.data?.token)
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
            <div className='glass-background w-screen h-screen'>
            <div className=' body2 flex flex-row' >
      
          <div className="form-container">
          <h1 className="title">Buisness name</h1>
          <form className="form">
            <div className="input-group">
              <label htmlFor="username" className="username" >
                שם העסק
              </label>
              <input type="text" name="username" required  onChange={handleChange}/>
            </div>
            <div className="input-group">
 
            </div>
            <div className="forgot">
       
            </div>
            <Button type="button" onPress={handleSubmit} className="sign-in">
              סיום
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

export default StoreSection
