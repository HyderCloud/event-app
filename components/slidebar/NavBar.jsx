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
    <div className='nav-bar flex flex-row items-center text-white ' style={{gap: '10px'}}>
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
      <Link href={`/notification/${data?._id}`} className='h-5 w-5'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18 4H6C3.79086 4 2 5.79086 2 8V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V8C22 5.79086 20.2091 4 18 4ZM6 5.59H18C19.0657 5.59204 20.0025 6.29663 20.3 7.32L12.76 12.91C12.5534 13.112 12.2732 13.221 11.9843 13.2115C11.6955 13.2021 11.423 13.0751 11.23 12.86L3.72 7.33C4.01175 6.30973 4.9389 5.60216 6 5.59ZM3.59 17C3.59 18.331 4.66899 19.41 6 19.41H18C19.3271 19.4045 20.4 18.3271 20.4 17V8.97L13.6 13.97C13.1654 14.3746 12.5938 14.5997 12 14.6C11.3827 14.5902 10.7911 14.3514 10.34 13.93L3.59 8.93V17Z" fill="white"/>
</svg>
</Link>
      <div className='w-full'></div>
    <div className='flex' style={{width: '350px', height: '30px'}}>
    <Input label='Search ...'/>
    </div>
    </div>
  )
}

export default NavBar