"use client"
import React, { useState, useEffect } from 'react'
import { User } from "@nextui-org/user";
import axios from 'axios';
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Drawer, DrawerContent, DrawerHeader, Avatar, DrawerBody, DrawerFooter, AvatarGroup,
} from "@nextui-org/react";
import Image from 'next/image';
import { useAdmin } from '../contexts/admin/AdminEventsProvider';
import NavbarEvent from '../events/NavbarEvent';
import NavbarOffice from '../myoffice/NavbarOffice';

const NavBar = () => {
  const pathName = usePathname()
  const [cookie, setCookie, removeCookie] = useCookies('user')
  const [data, setData] = useState('')
  const [logOut, setlogOut] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { decodedToken, isExpired } = useJwt(cookie.user)

  const getUser = async () => {
    const user = await axios.get(`http://localhost:9020/getuser/${decodedToken?.email}`)
    setData(user?.data)
  }

  const handleSignOUt = async () => {
    try {
      setIsLoading(true)
      const result = await axios.post('/api/signout', { ack: false })
      console.log(result)
      if (result.data.acknowledge
      ) {
        setlogOut(false)
        window.location.href = '/signin';
      }
    } catch (error) {
      console.log("🚀 ~ handleSignOUt ~ error:", error)

    }

  }
  function checkString(str) {
    // Define the regular expression pattern
    const regex = /^\/events\/[^\/]+\/[^\/]+$/;

    // Test the string against the pattern
    return regex.test(str);
  }

  function checkString2(str) {
    // Define the regular expression pattern
    const regex = /^\/myoffice\/[^\/]+\/[^\/]+$/;

    // Test the string against the pattern
    return regex.test(str);
  }
  useEffect(() => {
    if (decodedToken) {
      getUser()

    }
  }, [decodedToken])


  if (pathName.split('/')[1] === 'dashbord' || pathName === '/buisness') {
    return (<div>

    </div>)
  } else {
    return (
      <div className='w-full' style={{ paddingRight: '180px' }}>
        <div className='fixes flex flex-row items-center bg-white justify-between'
          style={{ paddingTop: '0.5%', width: '100%', paddingLeft: '6%', height: "80px" }}>
          <div className='flex items-center justify-center text-center' style={{ width: "300px" }}>

            <div
              style={{ fontWeight: "bold", fontSize: "36px", }}>
              {checkString2(pathName) && "המשרד שלי"}
              {pathName === '/' && " סקירה כללית"}
              {pathName === '/wallet' && "  ארנק"}
              </div>
          </div>

          <div className='w-full flex flex-row items-center justify-end gap-4'>
            <div className='flex flex-row gap-2'>
              <Button isIconOnly className='navbar-cube'>
                <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 9.28302L34 9.28302" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                  <path d="M17 20.283L34 20.283" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                  <path d="M17 31.283L34 31.283" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                  <path d="M9 12.283C10.6569 12.283 12 10.9399 12 9.28302C12 7.62617 10.6569 6.28302 9 6.28302C7.34315 6.28302 6 7.62617 6 9.28302C6 10.9399 7.34315 12.283 9 12.283Z" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                  <path d="M9 23.283C10.6569 23.283 12 21.9399 12 20.283C12 18.6262 10.6569 17.283 9 17.283C7.34315 17.283 6 18.6262 6 20.283C6 21.9399 7.34315 23.283 9 23.283Z" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                  <path d="M9 34.283C10.6569 34.283 12 32.9399 12 31.283C12 29.6262 10.6569 28.283 9 28.283C7.34315 28.283 6 29.6262 6 31.283C6 32.9399 7.34315 34.283 9 34.283Z" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                </svg>
              </Button>
              <Button isIconOnly className='navbar-cube'>
                <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 5.5L13 9.5" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                  <path d="M27 5.5V9.5" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                  <path d="M35 15.5L5 15.5" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" />
                  <path d="M32 9.5L8 9.5C6.34315 9.5 5 10.8431 5 12.5L5 30.5C5 32.1569 6.34315 33.5 8 33.5L32 33.5C33.6569 33.5 35 32.1569 35 30.5V12.5C35 10.8431 33.6569 9.5 32 9.5Z" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                </svg>
              </Button>
              <Button isIconOnly className='navbar-cube'>
                <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5681 30.5C19.6311 31.8355 22.0428 32.5314 24.5001 32.5C25.6565 32.4999 26.8079 32.3506 27.9261 32.056L32.0001 34.5V30.094C33.819 28.8003 34.9288 26.7309 35.0001 24.5C34.9969 23.452 34.7337 22.4212 34.2341 21.5" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="round" />
                  <path d="M18.5 6.5C11.044 6.5 5 11.2 5 17C5.0504 19.5168 6.13557 21.9016 8 23.593L8 30.5L14.813 27.093C16.0236 27.3621 17.2599 27.4985 18.5 27.5C25.956 27.5 32 22.8 32 17C32 11.2 25.956 6.5 18.5 6.5Z" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="round" />
                </svg>
              </Button>
              <Button isIconOnly className='navbar-cube'>
                <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 23.5L9 34.5L31 34.5L31 23.5" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="square" />
                  <path d="M34.9731 15.5C34.7184 17.7779 32.7922 19.5004 30.5001 19.5C29.1394 19.4789 27.8579 18.8565 27.0001 17.8C26.1537 18.8708 24.865 19.4967 23.5001 19.5C22.1385 19.4828 20.8554 18.8596 20.0001 17.8C19.1448 18.8596 17.8617 19.4828 16.5001 19.5C15.1352 19.4967 13.8465 18.8708 13.0001 17.8C12.1362 18.8487 10.8585 19.4694 9.5001 19.5C7.20797 19.5004 5.28178 17.7779 5.0271 15.5L11.0001 6.5L29.0001 6.5L34.9731 15.5Z" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="round" />
                  <path d="M17 34.5L17 26.5H23V34.5" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" />
                </svg>

              </Button>
              <Button isIconOnly className='navbar-cube'>
                <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 34.222C17.7844 35.0385 18.8677 35.5 20 35.5C21.1323 35.5 22.2156 35.0385 23 34.222" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="round" />
                  <path d="M29.9999 19.5V15.4C29.8354 9.96331 25.438 5.60991 19.9999 5.5C14.5433 5.65674 10.1566 10.0434 9.9999 15.5V19.5C9.9999 24 6.3999 24.8 6.3999 27.3C6.3999 29.6 11.6999 31.4 19.9999 31.4C28.2999 31.4 33.5999 29.6 33.5999 27.3C33.5999 24.8 29.9999 24 29.9999 19.5Z" stroke="#666666" stroke-width="2.4" stroke-miterlimit="10" stroke-linecap="round" />
                </svg>
              </Button>
            </div>
            <div className='' style={{ width: "300px" }}>
              <Input placeholder='חפש...' />
            </div>
            <div style={{
              width: "40px", height: "40px", backgroundImage: `url(${data?.pr_image})`, backgroundSize: 'cover',
              backgroundPosition: 'center', borderRadius: "6px"
            }}>

            </div>
          </div>


        </div>
      </div>
    )
  }

}

export default NavBar