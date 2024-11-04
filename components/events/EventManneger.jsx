"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { Modal, ModalContent, ModalHeader, TimeInput, ModalBody, ModalFooter, Button, useDisclosure, Input, DateRangePicker, Divider } from "@nextui-org/react";
import EventForm from './EventForm';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import Image from 'next/image';
import EventSlider from './EventSlider';
const EventManneger = ({}) => {

    const [cookie, setCookie, removeCookie] = useCookies()
    const [connectionEv, setConnectionEv] = useState([])
    const {decodedToken, isExpired} = useJwt(cookie.store)
    const {decodedToken:decodedTokens, isExpireds} = useJwt(cookie.user)
    const [endTime, setEndTime] = useState('')
    const [place, setPlace] = useState('')
    const [startTime, setStartTime] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [data, setData] = useState('')
    const [events, setEvents] = useState([])
    const storeName = usePathname()
    const getStore = async () => {
        const store = await axios.get(`http://localhost:9020/${storeName.slice(1)}`)
        setData(store.data.store)
    }
    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevents/${decodedToken?.store_id}`)
        console.log(getAllEvents.data.events)
        setEvents(getAllEvents.data.events)
    }
    const getEventConnection = async ()=>{    
        const getAllEvents = await axios.get(`http://localhost:9020/geteventconnection/${decodedTokens?.user_id}`)
        setConnectionEv(getAllEvents.data.events)
    } 
    useEffect(() => {
        getStore()
        if(decodedToken){
            console.log(decodedTokens)
            getEvents()

        }
    }, [decodedToken])
    useEffect(() => {
   
        if(decodedTokens){
            getEventConnection()

        }
    }, [decodedTokens])
    const handleAddEvent = async ()=>{
        const event = await axios.post(`http://localhost:9020/addevent/${decodedToken?.store_id}/${decodedToken?.name}`, 
            {name: name, start_date: startDate, end_date: endDate, startTime: startTime,
            endTime: endTime, place: place}) 
    if(event.data.acknowledge === "allow"){
        const getAllEvents = await axios.get(`http://localhost:9020/getevents/${decodedToken?.store_id}`)
     
        setEvents(getAllEvents.data.events)
    }
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handlePlace = (e)=>{
        setPlace(e.target.value)
    }
    const handleEndTime = (time)=>{
        const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        setStartTime(formattedTime)
    }
    const handleStartTime = (time)=>{
          const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
          setEndTime(formattedTime)
    }
    const handleName = (e)=>{
        setName(e.target.value)
    }
    const handleDate = (newRange)=>{
        const data = { 
            start: new Date(newRange.start), 
            end: new Date(newRange.end) 
          };
          const formattedDateStart = data.start.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          const formattedDateEnd = data.end.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          setEndDate(formattedDateEnd)
          setStartDate(formattedDateStart)
        
    }
    return (
        <div className='dashboard-container flex flex-col ' style={{ background: 'radial-gradient(circle, #001731, #000000);' }}>
            <div className='add-event-container flex flex-col '>

                <div className='flex flex-row w-full h-full justify-end gap-48' style={{ paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px' }}>

                    <div style={{ width: '30%' }}></div>
                    <div className='flex flex-col items-end 'style={{height: '170px'}}>
                        <div></div>
                        <div className='text-right header-events-maneger' >

                            {data?.name}  מנהל האירועים של

                        </div>
                        <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="18" height="4" rx="2" fill="#FBB03B" />
                        </svg>
                        <div style={{ height: '40%' }}></div>
                        <div style={{ paddingRight: '40px', width: '160px' }}>
                            <Button className='w-full' onPress={onOpen} color='primary'>אירוע חדש</Button>
                        </div>
                        <Modal size='4xl' className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Add an event</ModalHeader>
                                        <ModalBody>
                                            <div className='flex flex-col w-full items-center gap-6'>

                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שם האירוע</div>
                                                    <Input label='Event name' onChange={handleName} />
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>תאריך התחלה וסיום</div>
                                                    <DateRangePicker label='Event date' onChange={handleDate}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שעת התחלה</div>
                                                    <TimeInput hourCycle={24} label='Start time' onChange={handleStartTime}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שעת סיום</div>
                                                    <TimeInput hourCycle={24} label='End time' onChange={handleEndTime}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>מיקום האירוע</div>
                                                    <Input label='Event place' onChange={handlePlace}/>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button color="primary" onPress={()=>{
                                                handleAddEvent()
                                                onClose()
                                            }}>
                                                Action
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
                <Divider className='bg-white opacity-70' />
            </div>
            <div className='flex flex-col w-full h-full0' style={{color: 'white'}}>
            <div className='flex flex-col'>
            <div className='w-full flex justify-end' style={{height:'30%', paddingRight: '5%', fontSize: '35px', fontWeight: 'bolder'}}> 
                <div>
                    האירועים שלך
                </div>
            </div>
            <div className='main-container-event flex flex-row w-full h-full justify-center' style={{ paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px' }}>
                <EventSlider data={events} store={data}/>
            </div>
            <div className='w-full flex justify-end' style={{height:'30%', paddingRight: '5%', fontSize: '35px', fontWeight: 'bolder'}}> 
                <div>
                    אירועים קשורים
                </div>
            </div>
            <div className='main-container-event flex flex-row w-full h-full justify-center' style={{ paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px' }}>
                <EventSlider data={connectionEv} store={data}/>
            </div>
            </div>
            </div>

        </div>
    )
}

export default EventManneger