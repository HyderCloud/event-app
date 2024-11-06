"use client"
import { TimeInput, Divider, Input, Switch,Calendar,Select, SelectItem, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'
import DragAndDrop from '../DragImage';
const Main = ({admin}) => {
    const icon =           <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="4" rx="2" fill="#FBB03B"/>
  </svg> </div>
    const path = usePathname()
    const [isImage, setIsImage] = useState('')
    const [cookie, setCookie, removeCookie] = useCookies()
    const [age, setAge] = useState('')
    const {decodedToken, isExpired} = useJwt(cookie.store)
    const [type, setType] = useState('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isPrivate, setIsPrivate] = useState('')
    const [events, setEvents] = useState([])
    const [endTime, setEndTime] = useState('')
    const [place, setPlace] = useState('')
    const [startTime, setStartTime] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [tubnail, setTubnail] = useState('')
    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        setIsPrivate(getAllEvents.data.events.mode)
        setName(getAllEvents.data.events.name)
        setEndDate(getAllEvents.data.events.end_date)
        setStartDate(getAllEvents.data.events.start_date)
        setStartTime(getAllEvents.data.events.start_time)
        setEndTime(getAllEvents.data.events.end_time)
        setPlace(getAllEvents.data.events.place)
        setType(getAllEvents.data.events.type)
        setTubnail(getAllEvents.data.events.tubnail)
        setAge(getAllEvents.data.events.age)
    }
    useEffect(() => {
            getEvents()
    }, [])
    const handlePlace = (e)=>{
        setPlace(e.target.value)
    }
    const handleIstype = async (data)=>{
        const result =  await axios.patch(`http://localhost:9020/chnagetype/${events._id}`,{type: data})
        setType(result.data.type)
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
    function getStringAfterSecondSlash(path) {
        const parts = path.split('/');
        return parts[2] || null; // Returns the third part, or null if it doesn't exist
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
    const handleCheckAdmin = ()=>{

    }
    const handleClose = ()=>{

        setIsImage(false)
    }
    const handleChangeTubnail = async ()=>{
        const result =  await axios.patch(`http://localhost:9020/chnagetubnail/${events._id}`, {image: tubnail})
        setTubnail(result.data.image)
    }
    const handleChangeDetails = async ()=>{
        const result =  await axios.patch(`http://localhost:9020/chnagdetails/${events._id}`,
            {startDate: startDate, endDate: endDate,startTime: startTime, endTime: endTime, place: place})
        setStartDate(result.data.start_d)
        setEndDate(result.data.end_d)
        setEndTime(result.data.end_t)
        setStartTime(result.data.start_t)
        setPlace(result.data.place)
    }
    const handleFileUpload = (files) => {
        setTubnail(files)
    }

    const handleAge = (e)=>{
        setAge(e.target.value)
    }
    const handleChangeAge = async ()=>{
        const result =  await axios.patch(`http://localhost:9020/chnageage/${events._id}`, {age: age})
        setAge(result.data.age)
    }
        return (
            <div className='w-full h-full'>
                <div className=' flex justify-center items-center flex-col'>
                    <div className='event-lable font-bold'>{name}</div>
                    <div className='justify-center font-bold items-center text-white'>{type}</div>
                </div>
                <div style={{ paddingLeft: '100px' }} className='text-white'>{endDate} - {startDate}</div>
                <div style={{ paddingLeft: '100px' }} className='text-white'>{startTime} - {endTime}</div>
                <div style={{ paddingLeft: '100px' }} className='text-white'>{place}</div>
                <div className='header-main-event flex items-end flex-row justify-end '>
                    <div style={{ marginRight: '10px' }}>
                        <Button color='primary'>צפייה מוקדמת</Button>
                    </div>
                    <div className=''>
                        <Button isDisabled={(admin === 'בעלים'|| admin === "יוצר")?false:true} color='primary'>פרסם אירוע</Button>
                    </div>
                </div>
                <div className='h-4'></div>
                <Divider className='bg-white' />
                <div className='h-10'></div>
                {(admin === 'מפיק'|| admin ==='בעלים'||admin === "יוצר")&&
                <div className='flex flex-row  h-full ' style={{gap:"20px", paddingLeft: "10%", paddingRight: "10%"}}>
                <div className='w-full flex flex-row glass-background image-cont-main'>
                        <div className='image-event-cont cursor-pointer' 
                        style={{backgroundImage:  `url(${tubnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'}}
                        onClick={()=>{
                            setIsImage("image")
                            onOpen()
                        }}></div>
                        </div>
                <div className='flex flex-col ' style={{width:'50%', gap: '20px',}}>
                <div className='flex flex-col glass-background items-end ' style={{ borderRadius: '10px',paddingRight: '2%', paddingTop: '2%', paddingBottom: '2%'}}>
                <Button color='primary' onPress={()=>{onOpen()
                            setIsImage("details")
                        }}>עריכת האירוע</Button>
                </div>
                    <div className='flex flex-col glass-background w-full age-container 'style={{paddingRight: '2%'}}>
                        <div className='w-full flex flex-col pt-2 text-white font-semibold items-end' >
                           <div> פרטיות</div>
                           {icon}
                        </div>
                <div className=' justify-center flex-row items-center flex h-full' style={{gap: '30px'}}>
                            <Button color='primary' onClick={()=>{
                                setIsImage("ll")
                                onOpen()
                            }}> יצירת הגבלה</Button>
                                                <div className='flex flex-col justify-center items-center'>
                    <div className='text-white' >{isPrivate ? "אירוע פרטי": "אירוע ציבורי"}</div>
                <Switch isSelected={isPrivate} onChange={()=>{
                            handleIsPrivate(!isPrivate)
                            setIsPrivate(!isPrivate)}}/>
                    </div>
                            </div>
                    </div>
                    <div className='flex flex-col glass-background w-full age-container 'style={{paddingRight: '2%'}}>
                        <div className='w-full flex flex-col pt-2 text-white font-semibold items-end' >
                           <div>  סוג האירוע</div>
                           {icon}
                        </div>
                <div className=' justify-center items-center flex h-full'>
                <Select
                        onChange={(e)=>{
                            handleIstype(eventTypes[e.target.value])
                        }}
                        items={eventTypes}
                        label="Evet type"
                        placeholder={type}
                        className="max-w-xs"
                        >
                        {eventTypes.map((item, index) => (
                        <SelectItem key={index}>
                            {item}
                        </SelectItem>
                        ))}
                        </Select>
                            </div>
                    </div>
                </div>

                    <Modal className='change-details' isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className=" flex flex-col gap-1">
                                        {isImage === 'image'? "העלאת תמונת נושא":isImage === "details"? "שנה את פרטי האירוע": "הגבל גיל"}
                                    </ModalHeader>
                                    <ModalBody>
                                        {isImage==="image"? <DragAndDrop label={"תמונת נושא"} onFileUpload={handleFileUpload}/>: isImage === "details"?
                                        <div className='flex flex-col w-full items-center gap-6'>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>תאריך התחלה וסיום</div>
                                                <DateRangePicker label='Event date' onChange={handleDate} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>שעת התחלה</div>
                                                <TimeInput hourCycle={24} label='Start time' onChange={handleStartTime} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>שעת סיום</div>
                                                <TimeInput hourCycle={24} label='End time' onChange={handleEndTime} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>מיקום האירוע</div>
                                                <Input label='Event place' onChange={handlePlace} />
                                            </div>
                                        </div>:
                                        <div className='flex flex-col items-center'>
                                            <Input type='number' label="age" onChange={handleAge} value={age}/>
                                        </div>
                                        }
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={
                                            ()=>{onClose()
                                                handleClose()
                                            }
                                            
                                        }>
                                            סגור
                                        </Button>
                                        <Button color="primary" onPress={() => {
                                            if(isImage === "image"){
                                                handleChangeTubnail()
                                                handleClose()
                                                onClose()
                                            }
                                            else if(isImage === "details"){
                                                handleChangeDetails()
                                                handleClose()
                                                onClose()
                                            }else{
                                                handleChangeAge()
                                                onClose()
                                            }
                                        }}>
                                            החל
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
                }
            </div>
        )
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