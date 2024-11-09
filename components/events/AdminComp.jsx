"use client"
import React, { useState, useEffect } from 'react'
import { TimeInput, Card, CardHeader, CardBody, User, Link, Spacer, CardFooter, Image, Divider, DatePicker, Input, Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios';
const AdminComp = ({admin2}) => {
   const admin = ['בעלים','מפיק','יחצן',"עובד כללי","none"]
   const adminM = ['יחצן',"עובד כללי","none"]
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
            <div key={index} className='w-full h-full flex glass-background flex-col justify-center'style={{borderTop: "1px solid white", textAlign: 'right',
              padding: '15px', gap: '15px', height: '85px', borderRadius: '15px'}}>
                
              <div className=' w-full flex flex-row items-center justify-end' style={{gap: '15px',textAlign: 'right'}}  key={index}>

              <div className='w-full'> 
                {item.admin === "יוצר" || (admin2 === 'בעלים' && item.admin === 'בעלים') || 
                (admin2 === 'יחצן' || admin2 === 'עובד כללי' || admin2 === 'none') || (admin2 === item.admin) ? 
                <div></div>: admin2 === 'מפיק' ?
                <Select 
                onChange={(e)=>{
                    const arr = [...team]
                    const user = arr[index]
                    user.admin = admin[e.target.value]
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
          {adminM?.map((item,index) => (
            <SelectItem key={index} style={{textAlign: 'center'}} >
              {item}
            </SelectItem>
          ))}
        </Select>:
                        <Select 
                        onChange={(e)=>{
                            const arr = [...team]
                            const user = arr[index]
                            user.admin = admin[e.target.value]
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
                  {admin?.map((item,index) => (
                    <SelectItem key={index} style={{textAlign: 'center'}} >
                      {item}
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
            <div className='w-full '>
              <div className='team-slot-hover'>
              {item.admin}
              </div>
              </div>
              <div className='w-full '>
              <div className='team-slot-hover'>
              {item.role}
              </div>
              </div>
              <div className='w-full '>
              <div className='team-slot-hover'>
              {item.profession}
              </div>
              </div>
              <div className='w-full '>
              <div className='team-slot-hover'>
              {item.name}
              </div>
              </div>
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