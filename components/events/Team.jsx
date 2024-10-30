"use client"
import React, {useState, useEffect} from 'react'
import { TimeInput,Card, CardHeader, CardBody, Spacer ,CardFooter, Link, Image, Divider,DatePicker, Input, Switch,Calendar,CheckboxGroup ,Tooltip,Checkbox,Select, SelectItem,RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'

export const Team = () => {
    const icon =           <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="4" rx="2" fill="#FBB03B"/>
  </svg> </div>
    const path = usePathname()
    const [events, setEvents] = useState([])

    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)

    }
    function searchArray(array, searchTerm) {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return array.filter(item => 
            item.toLowerCase().includes(lowercasedSearchTerm)
        );
    }
    function getStringAfterSecondSlash(path) {
        const parts = path.split('/');
        return parts[2] || null; 
    }
    useEffect(()=>{
        getEvents()
      },[])
  return (
    
        <div className=' flex justify-center w-full h-full items-center flex-col' style={{paddingLeft: '15%', gap: '20px'}}>
            <div>                    <div className='flex flex-row'> 
                <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card></div>

    </div>
            <div className='glass-background text-white flex flex-row w-full h-full' style={{borderRadius: '15px'}}>
                <div className='h-full w-full flex flex-col' style={{padding: '2%'}}>
                    <div className='header-team flex flex-row'>

                    <div></div>
                    </div>
                    <Divider style={{background: '#fff'}}/>
                </div>
                <div className='h-full flex flex-col ' style={{width:'30%', padding: '2%'}}>
                    <div className=''></div>
                </div>
            </div>
        </div>

  )
}
