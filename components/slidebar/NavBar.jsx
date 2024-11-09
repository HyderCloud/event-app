"use client"
import React, {useState, useEffect} from 'react'
import {User} from "@nextui-org/user";
import axios from 'axios';
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@nextui-org/react';
import Image from 'next/image';

const NavBar = () => {
  const [cookie,setCookie,removeCookie] = useCookies('user')
  const [data, setData] = useState('')
  const {decodedToken, isExpired} = useJwt(cookie.user)
  const search = useSearchParams()
  const router = useRouter()
  const getUser = async ()=>{
    const user = await axios.get(`http://localhost:9020/getuser/${decodedToken?.email}`)
    setData(user?.data)
  }

  useEffect(()=>{
    if(decodedToken){
      getUser()
    }
  },[decodedToken])
  return (
    <div className='nav-bar flex flex-row items-center text-white ' style={{gap: '10px', paddingTop: '0.5%', width: '100%', paddingLeft: '7%'}}>
      <div style={{width: '20%'}}>
      <Image 
      className='cursor-pointer'
      onClick={()=>{router.push('/')}}
      src={require("@/image/evr.png")}
      width={220}
      height={290}
      alt={"logo"}
      />
      </div>
      <div className='flex flex-row items-center' style={{width: "70%", gap: '3%'}}>
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
<Link href={'/'}>
<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.28 1.81992L20.94 6.42992C21.3012 7.32256 21.2119 8.33431 20.7 9.14992C20.2644 9.76804 19.6342 10.2223 18.91 10.4399V17.2399C18.8943 18.0038 18.5756 18.7301 18.0242 19.259C17.4728 19.7879 16.7339 20.076 15.97 20.0599H6.31C5.53665 20.0896 4.78371 19.8078 4.21981 19.2778C3.65591 18.7477 3.32818 18.0136 3.31 17.2399V10.5399C2.60595 10.3787 1.97181 9.99679 1.5 9.44991C0.82159 8.60307 0.653338 7.4559 1.06 6.44992L2.71 1.82992C3.09914 0.844627 4.06092 0.2061 5.12 0.229915H16.87C17.9274 0.20157 18.89 0.83663 19.28 1.81992ZM12.3515 18.4299H12.36V18.4599C12.357 18.45 12.3541 18.44 12.3515 18.4299ZM12.3515 18.4299H9.81C9.81952 18.3535 9.81952 18.2763 9.81 18.1999V16.0899C9.82742 15.7726 9.97425 15.4764 10.2162 15.2703C10.4581 15.0643 10.774 14.9666 11.09 14.9999C11.7184 14.9538 12.2669 15.422 12.32 16.0499V18.1899C12.32 18.271 12.3306 18.3517 12.3515 18.4299ZM15.92 18.4299H13.81C13.8195 18.3535 13.8195 18.2763 13.81 18.1999V16.0899C13.7557 14.6174 12.5228 13.4649 11.05 13.5099C9.57333 13.4593 8.33426 14.6134 8.28 16.0899V18.2299C8.27048 18.3063 8.27048 18.3835 8.28 18.4599H6.26C5.52339 18.4939 4.89774 17.9263 4.86 17.1899V10.5199C6.19237 10.3188 7.26244 9.31634 7.55 7.99992C7.90221 9.59701 9.36806 10.6975 11 10.5899C12.6025 10.6571 14.0225 9.5657 14.37 7.99992C14.6514 9.39922 15.8103 10.4528 17.23 10.5999V17.2399C17.1688 17.9214 16.6041 18.4473 15.92 18.4599V18.4299ZM17.92 8.83992C18.4501 8.82599 18.9413 8.5581 19.24 8.11992V8.14992C19.4475 7.80032 19.4736 7.37209 19.31 6.99992L17.66 2.44992C17.5136 2.15234 17.2006 1.97405 16.87 1.99992H5.12C4.8019 1.97083 4.49641 2.13141 4.34 2.40992L2.69 6.99992C2.47556 7.42433 2.51407 7.93265 2.79 8.31992C3.03924 8.62618 3.39788 8.82343 3.79 8.86992C3.91624 8.88464 4.04376 8.88464 4.17 8.86992C4.93946 8.91195 5.6344 8.41259 5.84 7.66992C5.99257 6.82461 6.72116 6.20489 7.58 6.18992C8.44809 6.1895 9.18683 6.8221 9.32 7.67991C9.52355 8.42717 10.2275 8.92583 11 8.86992C11.7788 8.92182 12.4827 8.40763 12.67 7.64992C12.8146 6.79855 13.5465 6.17184 14.41 6.15991C15.2749 6.15873 16.0124 6.78608 16.15 7.63991C16.3537 8.3927 17.0621 8.8957 17.84 8.83992H17.92Z" fill="white"/>
</svg>
</Link>
    <div className='w-full'></div>
    <div className='flex' style={{width: '350px', height: '30px'}}>
    <Input label='Search ...' className='glass-background'/>
    </div>
      </div>
    </div>
  )
}

export default NavBar