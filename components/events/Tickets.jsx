"use client"
import { TimeInput, Divider, Input, Switch,Calendar,Select, SelectItem, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import DragAndDrop from '../DragImage';
import axios from 'axios'
import {CalendarDate} from '@internationalized/date';
const Tickets = () => {
    const round = {
        name: '',
        startDate: false,
        endDate: false,
        startTime: '',
        endTime: '',
        price: '',
        amount: ''
    }

    const icon =           <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="4" rx="2" fill="#FBB03B"/>
  </svg> </div>
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [index, setIndex] = useState(null)
    const [index2, setIndex2] = useState(null)
    const [name, setName] = useState('')
    const path = usePathname()
    const [events, setEvents] = useState([])
    const [endTime, setEndTime] = useState('')
    const [startTime, setStartTime] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [rounds, setRounds] = useState([])
    const [price, setPrice] = useState('')
    const [amount, setAmount] = useState('')
    const newRound = {
        name: name,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        price: price,
        amount: amount
    }
    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        setRounds(getAllEvents.data.events.rounds)
    }
    const handleAddRound = ()=>{
        setRounds([...rounds,round])
    }
    const handleEndTime = (time)=>{
        const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        setStartTime(formattedTime)
    }
    const handleStartTime = (time)=>{
          const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
          setEndTime(formattedTime)
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
    function parseDateString(dateString) {
        console.log(dateString.split("/").map(part => parseInt(part, 10)))
        return dateString.split("/").map(part => parseInt(part, 10));
      }
    function getStringAfterSecondSlash(path) {
        const parts = path.split('/');
        return parts[2] || null; // Returns the third part, or null if it doesn't exist
      }
    useEffect(() => {
            getEvents()
    }, [])
    const handleName = (e)=>{
        setName(e.target.value)
    }
    const handleAddRoute = ()=>{

    }
  return (
    <div className='w-full h-full'>
        {console.log(rounds)}
    <div className=' flex justify-center items-center flex-col'>
        <div><Button className='text-white' onClick={handleAddRound} color='primary'>הוספת סבב מכירה</Button></div>
        <div className='h-10'></div>
        <Divider className='bg-white' />
        <div className='flex flex-col items-center justify-center w-full' style={{gap: '20px'}}>
        <div className='h-10 '></div>
        <Modal size='4xl' className='event-modal-container' isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Add an event</ModalHeader>
                                        <ModalBody>
                                            <div className='flex flex-col w-full items-center gap-6'>

                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שם הסבב</div>
                                                    <Input label='Event name' onChange={handleName} />
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>תאריך התחלה וסיום</div>
                                                    <DateRangePicker value={{   start: new CalendarDate(startDate[0], startDate[1],startDate[1]),
                                                     end: new CalendarDate(endDate[2], endDate[1],endDate[1])}}   label='Event date' onChange={handleDate}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שעת התחלה</div>
                                                    <TimeInput hourCycle={24} label='Start time' onChange={handleStartTime}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שעת סיום</div>
                                                    <TimeInput hourCycle={24} label='End time' onChange={handleEndTime}/>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button color="primary" onPress={()=>{

                                                onClose()
                                            }}>
                                                Action
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
        {rounds.map((item,index)=>{

            return(
                <div className='glass-background tickets-container flex flex-row'onMouseEnter={()=>{setIndex2(index)}} onMouseLeave={()=>{setIndex2(null)}}>

                    {index === index2 &&
                    <Button className='buttonfade'
                    onClick={()=>{
                        if(item.endDate === false||item.startDate === false ){
                            console.log(item.endDate)
                          
                            setEndDate(parseDateString(events.end_date))
                            setStartDate(parseDateString(events.start_date))
                        }else{
                            setEndDate(parseDateString(item.endDate))
                            setStartDate(parseDateString(item.startDate))
                        }
                        setName(item.name)
                        setPrice(item.price)
                        setAmount(item.amount)
                        setEndTime(item.endTime)
                        setStartTime(item.startTime)
                        onOpen()
                        setIndex(index)
                    }} color='primary'>ערוך סיבוב</Button>
                    }
                    <div style={{gap: '4px', fontSize: '20px', fontWeight: 'bold', width: "100%"}} className='flex h-full  flex-row justify-end'>
                        <div>{item?.name === ''? <div style={{fontSize: '20px', fontWeight: 'lighter'}}></div>:<div></div>}</div>
                        <div className='flex flex-col items-end'>
                        <div>- {index + 1} סבב</div>
                        {icon}
                        </div>
                     </div>
                    
                </div>
            )
        })}
        </div>
        <div></div>
    </div>
    </div>
  )
}

export default Tickets