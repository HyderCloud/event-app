"use client"
import React, {useState, useEffect} from 'react'
import {User} from "@nextui-org/user";
import axios from 'axios';
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";
import Link from 'next/link';
import { Input } from '@nextui-org/react';
const NavBar = () => {
  const [cookie,setCookie,removeCookie] = useCookies('user')
  const [data, setData] = useState('')
  const {decodedToken, isExpired} = useJwt(cookie.user)
  const getUser = async ()=>{
    const user = await axios.get(`http://localhost:9020/getuser/${decodedToken?.email}`)
    setData(user.data)
  }
  useEffect(()=>{
    if(decodedToken){
      getUser()
    }
  },[decodedToken])
  return (
    <div className='nav-bar flex flex-row text-white gap-x-11'>
      <div className='flex'>
      <User  className='text-white'
      name={data.username}
      description={(
        <div  size="sm" isExternal>
          {data.email}
        </div>
      )}
      avatarProps={{
        src: data.pr_image
      }}
    />
      </div>
      <div className='w-full'></div>
    <div className='flex' style={{width: '350px'}}>
    <Input label='Search ...'/>
    </div>
    </div>
  )
}

export default NavBar