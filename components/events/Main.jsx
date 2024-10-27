"use client"
import { TimeInput, Divider, Input, Switch,Calendar, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { today, getLocalTimeZone } from "@internationalized/date";
import axios from 'axios'
const Main = ({ data }) => {
    const [cookie, setCookie, removeCookie] = useCookies()
    const {decodedToken, isExpired} = useJwt(cookie.store)
    const [modalType, setModalType] = useState('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isPrivate, setIsPrivate] = useState('')
    const [events, setEvents] = useState([])
    const [endTime, setEndTime] = useState('')
    const [place, setPlace] = useState('')
    const [startTime, setStartTime] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevents/${decodedToken?.store_id}`)
        setEvents(getAllEvents.data.events[0])
        setIsPrivate(getAllEvents.data.events[0].mode)
        setName(getAllEvents.data.events[0].name)
        setEndDate(getAllEvents.data.events[0].end_date)
        setStartDate(getAllEvents.data.events[0].start_date)
        setStartTime(getAllEvents.data.events[0].start_time)
        setEndTime(getAllEvents.data.events[0].end_time)
        setPlace(getAllEvents.data.events[0].place)
    }
    useEffect(() => {
        if(decodedToken){
            getEvents()
        }
    }, [decodedToken])
    const handlePlace = (e)=>{
        setPlace(e.target.value)
    }
    const handleIsPrivate = async (data)=>{
        const result =  await axios.patch(`http://localhost:9020/chnagemode/${events._id}`,{mode: data})
        setIsPrivate(result.mode)
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
    if(data){
        return (
            <div className='w-full h-full'>
                <div className=' flex justify-center items-center flex-col'>
                    <div className='event-lable font-bold'>{data.name}</div>
                    <div className='justify-center font-bold items-center text-white'>{data.type}</div>
                </div>
                <div style={{ paddingLeft: '100px' }} className='text-white'>{data.start_date} - {data.end_date}</div>
                <div style={{ paddingLeft: '100px' }} className='text-white'>{data.start_time} - {data.end_time}</div>
                <div style={{ paddingLeft: '100px' }} className='text-white'>{data.place}</div>
                <div className='header-main-event flex items-end flex-row justify-end '>
                    <div style={{ marginRight: '10px' }}>
                        <Button color='primary'>צפייה מוקדמת</Button>
                    </div>
                    <div className=''>
                        <Button color='primary'>פרסם אירוע</Button>
                    </div>
                </div>
                <div className='h-4'></div>
                <Divider className='bg-white' />
                <div className='h-10'></div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full flex flex-row justify-end'>
                        <div className='image-event-cont'></div>
                        <div className='flex flex-row items-center justify-center' style={{ width: '80%' }}>
                            
                        </div>
                        <div className='flex flex-col'>
                        <Button color='primary' onPress={onOpen}>ערוך/י את האירוע</Button>
                        <div className='h-10'></div>
                        <div className='flex flex-row' style={{width: '120px'}}>
                            {console.log(isPrivate)}
                        <Switch isSelected={isPrivate} onChange={()=>{
                            handleIsPrivate(!isPrivate)
                            setIsPrivate(!isPrivate)}}/>
                            <div className='text-white' >{isPrivate ? "אירוע פרטי": "אירוע ציבורי"}</div>
                        </div>
                        </div>
                        
                    </div>
    
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                                                <DateRangePicker label='Event date' onChange={handleDate} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>שעת התחלה</div>
                                                <TimeInput label='Start time' onChange={handleStartTime} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>שעת סיום</div>
                                                <TimeInput label='End time' onChange={handleEndTime} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>מיקום האירוע</div>
                                                <Input label='Event place' onChange={handlePlace} />
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={() => {
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
        )
    }
}

export default Main

const eventTypes = [
    "חתונה",
    "בר מצווה",
    "בת מצווה",
    "ברית",
    "בריתה",
    "מסיבת רווקות",
    "מסיבת רווקים",
    "מסיבת יום הולדת",
    "חינה",
    "אירוע עסקי",
    "כנס מקצועי",
    "ערב חברה",
    "מסיבת השקה",
    "מסיבת גיוס",
    "מסיבת שחרור",
    "מסיבת תחפושות",
    "מסיבת פורים",
    "מסיבת טבע",
    "הרמת כוסית",
    "חתונת כסף",
    "חתונת זהב",
    "יום נישואין",
    "אירוע התרמה",
    "פסטיבל",
    "מופע מוסיקה",
    "סדנה",
    "מסיבת חנוכה",
    "מסיבת סילבסטר",
    "מסיבת סיום",
];