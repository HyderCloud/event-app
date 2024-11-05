"use client"
import React, { useState, useEffect } from 'react'
import { TimeInput, Card, CardHeader, CardBody, User, Link, Spacer, CardFooter, Image, Divider, DatePicker, Input, Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios';
const AdminComp = () => {
   const admin = ['בעלים','מפיק','יחצן',"עובד כללי","none"]
    const [team, setTeam] = useState([])
    const [events, setEvents] = useState([])
    const path = usePathname()
  const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
    setEvents(getAllEvents.data.events)
    const eventU = getAllEvents.data.events
    setTeam(getAllEvents.data?.team)

  }
  const handleUpdateAdmin = async (data) => {
    const getAllEvents = await axios.patch(`http://localhost:9020/updateadmin/${getStringAfterSecondSlash(path)}`,{data: data})
    setTeam(getAllEvents.data?.team)

  }

  function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[2] || null;
  }
  useEffect(()=>{
    getEvents()
  },[])
  return (
    <div className=' flex justify-center w-full h-full items-center flex-col' style={{ paddingLeft: '15%', gap: '20px' }}>
        <div className='flex flex-row w-full' style={{height: '20%'}}></div>
        <div className='glass-background text-white flex flex-col w-full h-full' style={{ borderRadius: '15px', color: 'white' }}>
        <div className=' w-full flex flex-col justify-center items-center' style={{ padding: '2%', gap: '20px' }}>
         {team?.map((item, index)=>{
          return(
            <div className='w-full h-full flex glass-background flex-col justify-center'style={{borderTop: "1px solid white", textAlign: 'right',
              padding: '15px', gap: '15px', height: '85px', borderRadius: '15px'}}>
                
              <div className=' w-full flex flex-row items-center justify-end' style={{gap: '15px',textAlign: 'right'}}  key={index}>

              <div className='w-full'> 
                {item.admin === "יוצר" ? <div></div>:
                        <Select 
                        onChange={(e)=>{
                            const arr = [...team]
                            const user = arr[index]
                            user.admin = admin[e.target.value.slice(2)]
                            handleUpdateAdmin(arr)
                        }}
                         aria-label="Select your admin"
                        value={item.admin}
                          classNames={{
                              trigger: "justify-center",
                              value: "text-center",
                            }}
                  style={{position: 'absolute', textAlign: 'center'}}
                  placeholder='בחר הרשאה'
                  className="max-w-xs" 
                >
                  {admin.map((animal) => (
                    <SelectItem style={{textAlign: 'center'}} >
                      {animal}
                    </SelectItem>
                  ))}
                </Select>
                }           
      
           </div>
              <div className='w-full'>הרשאה</div>
              <div className='w-full'>תפקיד</div>
              <div className='w-full'>התמחות</div>
  
              <div className='w-full'>שם</div>
              <div className='w-full' style={{textAlign: 'right'}}>
                פרופיל
              </div>
              <div style={{width: '270px'}}>ID</div>
            </div>

            <div className=' w-full flex flex-row items-center justify-end' style={{gap: '15px', textAlign: 'right'}}  key={index}>
            <div className='w-full'></div>
            <div className='w-full'>{item.admin}</div>
              <div className='w-full'>{item.role}</div>
              <div className='w-full'>{item.profession}</div>
           
              <div className='w-full'>{item.name}</div>
              <div className='w-full flex justify-end '>
              <div className='bg-black ' style={{borderRadius: '100px', height:'40px', width: '40px', backgroundImage: `url(${item.profile_img})`,backgroundSize: 'cover',
                      backgroundPosition: 'center'}}></div>
              </div>
              <div style={{width: '270px'}}>
                {index+1}
              </div>
            </div>
            </div>
          )
         })}

        </div>
      </div>
    </div>
  )
}

export default AdminComp