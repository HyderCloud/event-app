"use client"
import { TimeInput, Divider,DatePicker, Input, Switch,Calendar,CheckboxGroup ,Tooltip,Checkbox,Select, SelectItem,RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { useState, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie';

import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'
import DragAndDrop from '../DragImage';
import {CalendarDate} from '@internationalized/date';
const Tickets = () => {
    const isFetch = useRef(false)
    const icon =           <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="4" rx="2" fill="#FBB03B"/>
  </svg> </div>
    const [groupSelected, setGroupSelected] = useState(["credit"]);
    const [section1, setSection1] = useState(true)
    const [section2, setSection2] = useState(false)
    const [section3, setSection3] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

    const [index, setIndex] = useState(null)
    const [index2, setIndex2] = useState(null)
    const [name, setName] = useState('')
    const path = usePathname()
    const [events, setEvents] = useState([])
    const [endTime, setEndTime] = useState('')
    const [startTime, setStartTime] = useState(false)
    const [startDate, setStartDate] = useState(false)
    const [endDate, setEndDate] = useState('')
    const [rounds, setRounds] = useState([])
    const [price, setPrice] = useState('')
    const [amount, setAmount] = useState('')

    // settings states
    const [ticketSet,SetTicketSet] = useState({})
    const [cash, setCash] = useState(false)
    const [payment, setPayment] = useState(false)
    const [ID, setID] = useState(false)
    const [isdate, setIsdate] = useState(false)
    const [gender, setGender] = useState(false)
    const [isInstegram, setisInstegram] = useState(false)
    const [instegramLink, setInstegramLink] = useState(false)
    const [facebookLink, setFacebookLink] = useState(false)
    const ticketSettings =
            {cash: cash,
            payment: payment,
            ID: ID,
            date: isdate,
            gender: gender,
            isInstegram: isInstegram,
            instegramLink: instegramLink,
            facebookLink: facebookLink}
    const newRound = {
        name: name,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        price: price,
        amount: amount
    }
    const round = {
        name: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        price: '',
        amount: ''
    }
    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        setRounds(getAllEvents.data.events.rounds)
        const theSettings = getAllEvents.data.events.ticket_settings
        setCash(theSettings.cash)
        setPayment(theSettings.payment)
        setID(theSettings.ID)
        setIsdate(theSettings.date)
        setGender(theSettings.gender)
        setisInstegram(theSettings.isInstegram)
        setInstegramLink(theSettings.instegramLink)
        setFacebookLink(theSettings.facebookLink)
    }
    const handleAddRound = ()=>{
        setRounds([...rounds,round])
        handleroundUpdate([...rounds,round])
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
      function removeElementAtIndex(arr, index) {
        // Check if the index is within bounds
        if (index < 0 || index >= arr.length) {
            console.error("Index out of bounds");
            return arr; // Return the original array if index is invalid
        }
    
        // Create a copy of the array and remove the element at the specified index
        const newArray = [...arr];
        newArray.splice(index, 1);
        
        return newArray;
    }
    const handleSetSettings = async (data)=>{
        const result =  await axios.patch(`http://localhost:9020/ticketset/${events._id}`, {settings: data})
        const theSettings = result.data.settings
        setCash(theSettings.cash)
        setPayment(theSettings.payment)
        setID(theSettings.ID)
        setIsdate(theSettings.date)
        setGender(theSettings.gender)
        setisInstegram(theSettings.isInstegram)
        setInstegramLink(theSettings.instegramLink)
        setFacebookLink(theSettings.facebookLink)
    }
    useEffect(() => {
            getEvents()
    }, [])
    useEffect(()=>{
        if(events?._id?.length > 0 && isFetch.current===true){
                console.log("hello")
            handleSetSettings(ticketSettings)
        }else{
        console.log("hi")
        isFetch.current = true
        }

    },[cash,
        payment,
        ID,
        isdate,
        gender,
        isInstegram,
        instegramLink,
        facebookLink,])
    const handleName = (e)=>{
        setName(e.target.value)
    }
    const handleroundUpdate = async (arr)=>{
        const result =  await axios.patch(`http://localhost:9020/rounds/${events._id}`, {rounds: arr})
        setRounds(result.data.rounds)
    }
  return (
    <div className='w-full h-full'>
    <div className=' flex justify-center items-center flex-col'>
        <div className='w-full flex flex-row justify-between'style={{paddingLeft: '50%'}}>
        <div><Button className='text-white' onClick={handleAddRound} color='primary'>הוספת סבב מכירה</Button></div>
        <Tooltip  className='glass-background text-white'  content="צפייה מוקדמת בתהליך הרכישה של הלקוח">
        <div><Button className='text-white'color='primary' onClick={()=>{onOpen2()}} > צפייה מוקדמת</Button></div>
        </Tooltip>
        </div>
        <div className='h-10'></div>
        <Divider className='bg-white' />
        <div className='flex flex-col items-center justify-center w-full' style={{gap: '20px'}}>
        <div className='h-10 '></div>
        <div className='flex flex-row w-full h-full justify-center' style={{gap: '20px'}}>
        
        <div className='flex flex-col items-center' style={{width: '50%', height: '100%', gap: '20px'}}>
        {rounds.map((item,index)=>{

        return(
        <div className='glass-background tickets-container w-full flex flex-row'  onMouseEnter={()=>{setIndex2(index)}} onMouseLeave={()=>{setIndex2(null)}}>
                    <Modal size='4xl' className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Add an event</ModalHeader>
                                        <ModalBody>
                                            <div className='flex flex-col w-full items-center gap-6'>

                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שם הסבב</div>
                                                    <Input placeholder={item.name} label='Event name' onChange={handleName} />
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>תאריך התחלה וסיום</div>
                                                    <DateRangePicker   label='Event date' onChange={handleDate}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שעת התחלה</div>
                                                    <TimeInput placeholder={item.startTime} hourCycle={24} label='Start time' onChange={handleStartTime}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שעת סיום</div>
                                                    <TimeInput placeholder={item.endTime} hourCycle={24} label='End time' onChange={handleEndTime}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>כמות כרטיסים</div>
                                                    <Input type='number' placeholder={item.amount}  label='Tickets amount' onChange={(e)=>{setAmount(e.target.value)}}/>
                                                </div>
                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'> מחיר עבור כרטיס</div>
                                                    <Input type='number' placeholder={item.price}  label='Price' onChange={(e)=>{setPrice(e.target.value)}}/>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button color="primary" onPress={()=>{
                                                const newArr = [...rounds]
                                                newArr[index] = newRound
                                                setRounds(newArr)
                                                handleroundUpdate(newArr)
                                                onClose()
                                            }}>
                                                Action
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
        {index === index2 &&
        <div className='flex flex-row absolute ' style={{gap: '5px', left: '10px'}}>
            <Button color='danger' isDisabled={rounds.length > 1 ? false : true}  
             className={`${rounds.length > 1 ?"buttonfade":"buttonfade2"}`} onClick={()=>{
            const removedArr = removeElementAtIndex(rounds,index)
            setRounds(removedArr)
            handleroundUpdate(removedArr)
            }}>מחק</Button>
            <Button className='buttonfade'
            onClick={()=>{
                setStartDate(item.startDate)
                setEndDate(item.endDate)
                setName(item.name)
                setPrice(item.price)
                setAmount(item.amount)
                setEndTime(item.endTime)
                setStartTime(item.startTime)
                onOpen()
                setIndex(index)
            }} color='primary'>ערוך סיבוב</Button>
        </div>
        }
        <div style={{gap: '4px', fontSize: '20px', fontWeight: 'bold', width: "100%", paddingRight: '2%', paddingLeft: '5px'}} className='flex h-full  flex-row justify-end'>
            <div className='flex flex-col items-end w-full'>
            <div className='flex flex-row' style={{ gap: '10px'}}>
            <div>{item?.name === ''? <div style={{fontSize: '20px', fontWeight: 'lighter',}}> יש לערוך סבב </div>:<div className='flex flex-row w-full justify-between' style={{gap: '140px'}}> 

                <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                {item.startDate}  
                    </div>
                    <div> -</div>
                    <div className='element-ticket'>
                    {item.endDate} 
                    </div>
                </div>
                <div className='element-ticket'>
                {item.name} 
                </div>
                </div>}</div>
                <div>
                - {index + 1} סבב
                </div>
                </div>
            {icon}

            <div className='flex   justify-end flex-row'style={{paddingTop: '5%', fontWeight: 'lighter', fontSize: '16px',gap: '20px' }}>
            <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                    {item.endTime} 
                    </div>
                    <div> -</div>
                    <div className='element-ticket'> 
                {item.startTime}  
                    </div>
                </div>
            <div className='flex flex-row justify-end' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                {item.amount}
                    </div>
                    <div>
                :כמות כרטיסים  
                    </div>
                </div>
                <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                {item.price}
                    </div>
                    <div>
                :מחיר  
                    </div>
                </div>

            </div>
            </div>
         </div>
        
    </div>
)
})}
        </div>
        <div className='flex flex-col items-center glass-background' style={{width: '20%', height: '100%', borderRadius: '10px', paddingTop: '1%',paddingRight: '1%', paddingLeft: '1%'}}>
            <div className='text-white flex flex-col items-end' style={{width: '100%', height: '450px', fontSize: '20px', gap: '10px'}}>
            <div className='flex flex-col items-end'>
            <div> הגדרות כרטיסים</div>
            {icon}
            </div>
            <div className='flex flex-row w-full justify-between setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
            <div className=''>
            <Switch isSelected={cash} onChange={()=>{setCash(!cash)}} aria-label="Automatic updates"/>
           </div>
           <div>:מזומן</div>
        
                </div>
            <div className='flex flex-row w-full justify-between items-end setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
            <div>
            <Switch isSelected={payment} onChange={()=>{setPayment(!payment)}} aria-label="Automatic updates"/>
            
           </div>
           <div>:הגבלת רכישה</div></div>
            <div className='flex flex-row w-full justify-between items-end setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
            <div>
            <Switch isSelected={ID} onChange={()=>{setID(!ID)}} aria-label="Automatic updates"/>
           </div>
           <div>: מילוי תז</div></div>
            <div className='flex flex-row w-full justify-between items-end setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                            <div>
            <Switch isSelected={isdate} onChange={()=>{setIsdate(!isdate)}} aria-label="Automatic updates"/>
           </div>
           <div>:תאריך לידה</div></div>  
            <div className='flex flex-row w-full justify-between items-end setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                
            <div>
            <Switch isSelected={gender} onChange={()=>{setGender(!gender)}} aria-label="Automatic updates"/>
           </div>
           <div>: מגדר</div></div>
           <div className='flex flex-row w-full justify-between items-end setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                
                <div>
                <Switch isSelected={isInstegram} onChange={()=>{setisInstegram(!isInstegram)}} aria-label="Automatic updates"/>
               </div>
               <div>: אינסטגרם או פייסבוק</div></div>  
            <div className='flex flex-row w-full justify-between items-end setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                
            <div>
            <Switch isSelected={facebookLink} onChange={()=>{setFacebookLink(!facebookLink)}} aria-label="Automatic updates"/>
           </div>
                      
           <div>:קישור לפייסבוק</div></div>
            <div className='flex flex-row w-full justify-between items-end setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                
            <div>
            <Switch isSelected={instegramLink} onChange={()=>{setInstegramLink(!instegramLink)}} aria-label="Automatic updates"/>
           </div>
           <div>:  משתמש לאינסטגרם</div></div>  
            </div>
        </div>
        </div>


        </div>
        <div>
        <Modal size='4xl' className='event-modal-container' isOpen={isOpen2} onOpenChange={onOpenChange2} style={{background: 'black'}}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex  flex-col gap-1">תצוגה מוקדמת</ModalHeader>
                                        <ModalBody  style={{gap: '10px'}} >
                                            {section1 &&
                                            <div className='flex flex-col w-full items-center' style={{gap: '10px'}}>
                                            {rounds.map((item)=>{
                                                return(
                                            <div style={{gap: '10px'}} className='glass-background tickets-container w-full flex flex-row' onClick={()=>{
                                                setSection1(false)
                                                setSection2(true)
                                            }}  onMouseEnter={()=>{setIndex2(index)}} onMouseLeave={()=>{setIndex2(null)}}>
                                                        <div style={{gap: '4px', fontSize: '20px', fontWeight: 'bold', width: "100%", paddingRight: '2%', paddingLeft: '5px'}} className='flex h-full  flex-row justify-end'>
            <div className='flex flex-col items-end w-full'>
            <div className='flex flex-row' style={{ gap: '10px'}}>
            <div>{item?.name === ''? <div style={{fontSize: '20px', fontWeight: 'lighter',}}> יש לערוך סבב </div>:<div className='flex flex-row w-full justify-between' style={{gap: '140px'}}> 

                <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                {item.startDate}  
                    </div>
                    <div> -</div>
                    <div className='element-ticket'>
                    {item.endDate} 
                    </div>
                </div>
                <div className='element-ticket'>
                {item.name} 
                </div>
                </div>}</div>
                <div>
                - {index + 1} סבב
                </div>
                </div>
            {icon}

            <div className='flex   justify-end flex-row'style={{paddingTop: '5%', fontWeight: 'lighter', fontSize: '16px',gap: '20px' }}>
            <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                    {item.endTime} 
                    </div>
                    <div> -</div>
                    <div className='element-ticket'> 
                {item.startTime}  
                    </div>
                </div>
            <div className='flex flex-row justify-end' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                {item.amount}
                    </div>
                    <div>
                :כמות כרטיסים  
                    </div>
                </div>
                <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                {item.price}
                    </div>
                    <div>
                :מחיר  
                    </div>
                </div>

            </div>
            </div>
         </div>
                                            </div>
                                                )
                                            })}
                                            </div>
                                            }
                                            {section2&&
                                            <div className='flex flex-col w-full items-center' style={{gap: '10px', paddingRight: '25%',paddingLeft: '25%'}}>
                                                <Input label="Full name"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                <Input label="Email"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                <Input label="Phone"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                {ID&&
                                                <Input label="ID"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                }
                                                {isdate&&
                                                <DatePicker label="Birthday"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                }
                                                {gender&&
                                                        <RadioGroup
                                                        label="Select your gender"
                                                        orientation="horizontal"
                                                      >
                                                        <Radio  value="hgfdh"><div className='text-white'>גבר</div></Radio>
                                                        <Radio  value="buenos-aires"><div className='text-white'>אישה</div></Radio>
                                                        <Radio  value="sydney"><div className='text-white'>אחר</div></Radio>
                                                      </RadioGroup>
                                                }
                                                {instegramLink&&
                                                <Input label="Instegram link"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>}
                                                {facebookLink&&
                                                <Input label="Facebook link"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                }
                                            </div>
                                            }
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={()=>{
                                                onClose()
                                                setSection1(true)
                                                setSection2(false)
                                                setSection3(false)
                                            }}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
        </div>
    </div>
    </div>
  )
}

export default Tickets