"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { TimeInput, Divider, Input, Switch, Popover, PopoverTrigger, PopoverContent, Calendar, Tab, Tabs, Select, Progress, SelectItem, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, RangeCalendar } from '@nextui-org/react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import EventSlider from './EventSlider';
import EventConnection from './ConnectionEvent';
import { parseDate } from "@internationalized/date";
import { parseTime } from "@internationalized/date";
import DragAndDrop from '../DragImage'

const CraftingTable = () => {
  const router = useRouter()
  const [isOpenType,setIsOpenType] = useState(false)
  const [evenAge, setEvenAge] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [progress, setProgress] = useState(10)
  const [evenType, setEvenType] = useState('')
  const [isImage, setIsImage] = useState('')
  const [images, setImages] = useState([])
  const [tubnail, setTubnail] = useState('')
  const [prompt, setPrompt] = useState('')
  const [cont, setCont1] = useState(true)
  const [cont2, setCont2] = useState(false)
  const [cont3, setCont3] = useState(false)
  const [cont4, setCont4] = useState(false)
  const [cont5, setCont5] = useState(false)
  const [cont6, setCont6] = useState(false)
  const [cont7, setCont7] = useState(false)
  const [isMyevents, setIsMyevents] = useState("events")
  const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
  const [dateRange, setDateRange] = useState('')
  const [content, setContent] = useState('');
  const [isTicketSale, setIsTicketSale] = useState(true)
  const [cookie, setCookie, removeCookie] = useCookies()
  const [connectionEv, setConnectionEv] = useState([])
  const { decodedToken, isExpired } = useJwt(cookie.store)
  const { decodedToken: decodedTokens, isExpireds } = useJwt(cookie.user)
  const [endTime, setEndTime] = useState('')
  const [typeContent, setTypeContent] = useState('')
  const [place, setPlace] = useState('')
  const [startTime, setStartTime] = useState('')
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [data, setData] = useState('')
  const [team, setTeam] = useState([])
  const [events, setEvents] = useState([])
  const [formData, setFormData] = useState({
    cardName: "",
    dateRange: "",
    startTime: "",
    endTime: "",
    price: "",
    ticketQuantity: "",
  });

  const handleInputChange = (key) => (e) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };
  function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[3] || null; // Returns the third part, or null if it doesn't exist
  }
  const parseDateRange = (rangeString) => {

    return {
      start: parseDate(rangeString.start), // Convert start string to Date object
      end: parseDate(rangeString.end), // Convert end string to Date object
    };
  };

  const parseDate2 = (dateString) => {
    const date = new Date(dateString); // Create a Date object from the string
    return date.toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
  };
  // Handle date range change
  const handleDateRangeChange = (range) => {
    const start = parseDate2(range.start)
    const end = parseDate2(range.end)
    setFormData({
      ...formData,
      dateRange: { start: start, end: end }
    })
  };
  const parseTime3 = (time) => {
    return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
  }
  const handleStartTimeChange = (range) => {
    const start = parseTime3(range)
    setFormData({
      ...formData,
      startTime: start
    })
  };
  const handleEndTimeChange = (range) => {
    const end = parseTime3(range)
    setFormData({
      ...formData,
      endTime: end
    })
  };

  const storeName = usePathname()
  const getStore = async () => {
    const store = await axios.get(`http://localhost:9020/${getStringAfterSecondSlash(storeName)}`)
    setData(store.data.store)
  }
  const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevents/${decodedToken?.store_id}`)
    setEvents(getAllEvents.data.events)

  }
  const getEventConnection = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/geteventconnection/${decodedTokens?.user_id}`)
    setConnectionEv(getAllEvents.data.events)
  }
  useEffect(() => {
    getStore()
    if (decodedToken) {
      getEvents()

    }
  }, [decodedToken])
  useEffect(() => {

    if (decodedTokens) {
      getEventConnection()

    }

  }, [decodedTokens])

  const handleSentImages = async () => {
    try {
      const response = await axios.post("/api/generateimage",
        {
          prompt: prompt, type: type, endDate: endDate, startDate: startDate,
          startTime: startTime, endTime: endTime
        });
      setImages(response.data.images); // Store generated images
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  }

  const handleChange = (value) => {
    console.log(value)
    setContent(value);
  };

  const handleAddEvent = async () => {
    const event = await axios.post(`http://localhost:9020/addevent/${decodedToken?.store_id}/${decodedToken?.name}`,
      {
        name: name, dateRange: dateRange, startTime: startTime, id: decodedTokens?.user_id,
        endTime: endTime, place: place, ticket: isTicketSale, description: content, image: tubnail, age: evenAge,
        type: evenType, public: isPrivate, round: [formData]
      })
    if (event.data.acknowledge) {
      if (isTicketSale) {
        router.push(`${event.data.link}?section=tickets`)

      } else {
        router.push(`${event.data.link}`)
      }
      const getAllEvents = await axios.get(`http://localhost:9020/getevents/${decodedToken?.store_id}`)

      setEvents(getAllEvents.data.events)
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handlePlace = (e) => {
    setPlace(e.target.value)
  }
  const handleEndTime = (time) => {
    const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
    setStartTime(formattedTime)
  }
  const handleStartTime = (time) => {
    const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
    setEndTime(formattedTime)
  }
  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleDateRange = (range) => {
    const start = parseDate2(range.start)
    const end = parseDate2(range.end)
    setDateRange({ start: start, end: end })
  }
  return (
    <div className=' flex flex-col dashboard-container' style={{ paddingBottom: '30px' }}>
      <div style={{ overflowY: "auto" }}>
        <div style={{ height: "350px" }} className='w-full'>
          <div className='flex flex-col rectangle-crafting-table-bunner relative' >
            <div style={{ fontSize: "35px", fontWeight: 'bold', color: "white" }}>שולחן היצירה</div>
            <div className='absolute flex flex-row gap-2'>
              <div className='container-addevent flex flex-col  items-center gap-4' onClick={onOpen}>
                <div className='flex flex-col items-center w-full ' >
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>הוספת אירוע חדש</div>
                  <div style={{ fontSize: "12px" }}>חקור תכונות ניהול מתקדמות</div>
                </div>
                <div className='flex justify-center items-center' style={{ width: "70px", height: "70px", borderRadius: "100px", backgroundColor: "#F0F6FE" }}>
                  <svg width="53" height="54" viewBox="0 0 53 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.5 8.79999L26.5 45.2" stroke="#4285F4" stroke-width="2.184" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M44.7 27L8.30005 27" stroke="#4285F4" stroke-width="2.184" stroke-miterlimit="10" stroke-linecap="square" />
                  </svg>

                </div>
              </div>
              <EventSlider data={events} store={data} />
            </div>
          </div>
        </div>
        <Modal size='full' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className='w-full h-full flex flex-col image-background-addevent' style={{ padding: "1%", }}>
                  <div className='w-full h-full flex flex-col'>

                    <div className='flex flex-row h-full w-full' style={{ overflowY: "auto" }}>
                      <div className='flex flex-col h-full w-full gap-4' style={{ paddingRight: "30px", paddingLeft: "30px" }}>
                        <div className='flex flex-row w-full items-center gap-4'>
                          <div style={{

                            fontWeight: "bold", fontSize: "32px",
                            color: "#9095A1"
                          }}> בואו נבנה את האירוע שלך צעד אחר צעד</div>
                          <div style={{ paddingLeft: "130px", }} className='w-full'><Progress aria-label="Loading..." value={progress} /></div>
                        </div>
                        <div className='w-full h-full flex flex-row gap-4'>
                          {!cont &&
                            <div className='h-full justify-center flex items-center'>
                              <Button variant='ll' isIconOnly className='bg-white'
                                style={{
                                  width: "60px", height: "60px", borderRadius: "100px",
                                  boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                                }} onPress={() => {
                                  if (cont2) {
                                    setCont1(true)
                                    setCont2(false)
                                    setProgress(progress - 25)
                                  } else if (cont3) {
                                    setProgress(progress - 25)
                                    setCont2(true)
                                    setCont3(false)
                                  } else if (cont4) {
                                    if (isTicketSale) {
                                      setProgress(progress - 15)
                                    } else {
                                      setProgress(progress - 40)
                                    }
                                    setCont3(true)
                                    setCont4(false)
                                  } else if (cont5) {
                                    setCont4(true)
                                    setCont5(false)
                                  } else if (cont6) {
                                    setCont5(true)
                                    setCont6(false)
                                  }
                                }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.21045 20.2104C6.21045 19.8062 6.36413 19.4019 6.67255 19.0935L13.9778 11.7893L6.67255 4.48508C6.05676 3.86824 6.05676 2.86824 6.67255 2.25139C7.2894 1.6356 8.2894 1.6356 8.90624 2.25139L17.3273 10.6725C17.9431 11.2893 17.9431 12.2893 17.3273 12.9061L8.90624 21.3272C8.2894 21.943 7.2894 21.943 6.67255 21.3272C6.36413 21.0188 6.21045 20.6146 6.21045 20.2104Z" fill="black" />
                                </svg>
                              </Button>
                            </div>
                          }
                          {(cont4 && !isTicketSale) &&
                            <div className='w-full h-full flex items-center'>
                              <div className='flex flex-row '
                                style={{
                                  width: "600px", height: "300px", borderRadius: "16px",
                                  boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                                }}>
                                <div className='new-event-border'></div>
                                <div className='bg-white w-full h-full flex flex-col' style={{
                                  borderTopLeftRadius: "16px",
                                  borderBottomLeftRadius: "16px", padding: "10px"
                                }}>

                                  <div className='flex flex-row w-full justify-between'>
                                    <div className='flex flex-col gap-2 justify-between'>
                                      <div className='flex flex-col gap-2'>
                                        <div className='flex flex-row justify-between' style={{ width: "300px" }}>
                                          <div className='flex' style={{ fontSize: "34px", fontWeight: "bold" }}>סיכום</div>
                                          <div className='bg-black flex'
                                            style={{
                                              backgroundImage: `url(${tubnail})`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center', height: "70px",
                                              width: "70px", borderRadius: "6px", border: "1px solid gray"
                                            }}
                                          >
                                          </div>
                                        </div>
                                        <div style={{ fontSize: "28px", fontWeight: "bolder" }}>{name}</div>
                                        <div style={{ fontSize: "18px", }}>{startTime} - {endTime}</div>
                                        <div style={{ fontSize: "18px", }}>{place}</div>
                                      </div>
                                      <Button color='primary' onPress={() => { handleAddEvent() }} variant='flat'>יצירת אירוע</Button>
                                    </div>
                                    <div className='h-full'><RangeCalendar className='h-full' isReadOnly value={
                                      parseDateRange(dateRange)} /></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                          {(cont3 || (cont4 && isTicketSale)) &&
                            <div className='flex flex-col items-center h-full w-full' style={{ overflowY: "auto", paddingRight: "50px" }}>
                              <div className='flex flex-col w-full gap-4' >
                                <div className='flex flex-col'>
                                  <div className='flex flex-row '
                                    style={{
                                      width: "370px", height: "400px", borderRadius: "16px", marginTop: "20px",
                                      boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px"
                                    }}>
                                    <div className='new-event-border-green'></div>
                                    <div className='flex flex-col w-full bg-white h-full gap-4'
                                      style={{ padding: "10px", borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px" }}>
                                      <div className='flex justify-between'>
                                        <div style={{ fontSize: "18px", fontWeight: "bold" }}>צעד 4 - תמונת האירוע</div>
                                        <div><Button isIconOnly color='secondary' variant='flat' >AI</Button></div>
                                      </div>
                                      <div className='flex flex-col gap-2  w-full h-full'
                                      >
                                        <div className='flex flex-col gap-2 justify-center items-center' >
                                          <div className='bg-black'
                                            style={{
                                              backgroundImage: `url(${tubnail})`,
                                              backgroundSize: 'cover',
                                              backgroundPosition: 'center', height: "70px",
                                              width: "70px", borderRadius: "6px", border: "1px solid gray"
                                            }}
                                          >
                                          </div>
                                          <div className='w-full flex justify-center items-center'>
                                          </div>
                                        </div>
                                        <div className='w-full h-full'>
                                          <DragAndDrop />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>




                            </div>
                          }
                          {(cont2 || cont3) &&
                            <div className='flex flex-col w-full h-full justify-center items-center gap-4' >
                              <div className='flex flex-col' style={{
                                width: "350px", height: "150px", borderRadius: "16px",
                                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", marginLeft: "140px"
                              }}>
                                <div className='new-event-border-red'></div>
                                <div className='flex flex-col w-full h-full bg-white '
                                  style={{
                                    gap: "10px", padding: "20px",
                                    borderBottomRightRadius: "16px"
                                    , borderBottomLeftRadius: "16px"
                                  }}>
                                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    צעד 3 - סוג
                                  </div>
                                  <div>
                                    <Popover placement="bottom" isOpen={isOpenType} onOpenChange={(open) => setIsOpenType(open)} style={{width: "300px", height: "300px", overflowY: "auto"}}>
                                      <PopoverTrigger>
                                        <Input label='  סוג אירוע' variant='bordered' value={typeContent} color='danger' placeholder='חפש אירוע' />
                                      </PopoverTrigger>
                                      <PopoverContent className='' style={{padding: "10px"}}>
                                          {eventTypes.map((items)=>(
                                          <div className='w-full cursor-pointer flex items-center type-events-holder'
                                          onClick={()=>{setTypeContent(items)
                                         setIsOpenType(false)
                                          }}
                                           style={{height: "40px", borderBottom: "1px solid #e7e9ed"}}>
                                          <div>
                                          {items}
                                          </div>
                                          </div>
                                          ))}
                                     
                                   
                                      </PopoverContent>
                                    </Popover>

                                  </div>
                                </div>
                              </div>
                              <div className='flex flex-col' style={{
                                width: "350px", height: "270px", borderRadius: "16px",
                                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                              }}>
                                <div className='new-event-border-blue'></div>
                                <div className='flex flex-col w-full h-full bg-white '
                                  style={{
                                    gap: "30px", padding: "20px",
                                    borderBottomRightRadius: "16px"
                                    , borderBottomLeftRadius: "16px"
                                  }}>
                                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    צעד 4 - זמן
                                  </div>
                                  <div className='flex flex-col  text-right' style={{ width: '100%' }}>
                                    <DateRangePicker variant='underlined' color='primary' label='תאריכי האירוע'
                                      value={dateRange !== '' &&
                                        parseDateRange(dateRange)
                                      }
                                      onChange={handleDateRange} />
                                  </div>
                                  <div className='flex flex-row gap-4 text-right' style={{
                                    width: '100%', direction: "ltr",
                                    paddingLeft: "50px"
                                    , paddingRight: "50px", gap: "40px"
                                  }}>

                                    <TimeInput color='primary' hourCycle={24} label='שעת התחלה' onChange={handleStartTime} />
                                    <TimeInput color='primary' hourCycle={24} label='שעת סיום' onChange={handleEndTime} />
                                  </div>

                                </div>
                              </div>
                            </div>
                          }
                          {(cont || cont2) &&
                            <div className='flex flex-row  w-full h-full' style={{ gap: "40px" }}>
                              <div className='flex flex-col'>
                                <div className=' flex flex-row main-addevent' style={{ width: '420px', height: "160px", marginRight: "20px" }}>
                                  <div className='new-event-border'></div>
                                  <div className='flex form-container-new-event flex-col gap-2 justify-center w-full' style={{ padding: "15px" }}>
                                    <div style={{ fontSize: "18px", fontWeight: "bold" }}> צעד 1 - הגדרות בסיס</div>
                                    <div className='flex flex-col  text-right' style={{ width: "100%" }} >

                                      <Input label='שם האירוע' variant='bordered' color='warning' value={name} onChange={handleName} />


                                    </div>
                                    <div className='flex flex-row gap-4 text-right justify-center' style={{ width: '100%' }}>
                                      <div className='flex flex-col items-center'>
                                        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>האירוע כולל מכירת כרטיסים?</div>
                                        <Switch color='warning' style={{ direction: 'ltr' }} isSelected={isTicketSale} onChange={() => { setIsTicketSale(!isTicketSale) }}>
                                        </Switch>
                                      </div>
                                      <div className='flex flex-col items-center'>
                                        <div style={{ fontSize: "14px", fontWeight: "bolder" }}>האם האירוע פרטי</div>
                                        <Switch color='warning' style={{ direction: 'ltr' }} isSelected={isPrivate} onChange={() => { setIsPrivate(!isPrivate) }}>
                                        </Switch>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className=' flex flex-row main-addevent' style={{ width: '420px', height: "160px", marginRight: "140px", marginTop: "70px" }}>
                                  <div className='new-event-border-green'></div>
                                  <div className='flex form-container-new-event flex-col gap-2 justify-center w-full'>
                                    <div className='flex flex-row justify-between items-center'>
                                      <div style={{ fontSize: "18px", fontWeight: "bold" }}> צעד 2 - מיקום</div>
                                      <Button variant='ff' isIconOnly><svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M29.45 10.7538L33.25 9.61383V28.6138L23.75 32.4138L14.25 28.6138L4.75 32.4138L4.75 13.4138L8.55 11.8938" stroke="#171A1F" stroke-width="2.28" stroke-miterlimit="10" stroke-linecap="square" />
                                        <path d="M25.6501 11.3409C25.6501 15.3385 19.0001 21.9638 19.0001 21.9638C19.0001 21.9638 12.3501 15.3385 12.3501 11.3409C12.3501 7.24263 15.7862 4.86383 19.0001 4.86383C22.2139 4.86383 25.6501 7.24263 25.6501 11.3409Z" stroke="#171A1F" stroke-width="2.28" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M19.0001 13.4138C20.0494 13.4138 20.9001 12.5632 20.9001 11.5138C20.9001 10.4645 20.0494 9.61383 19.0001 9.61383C17.9508 9.61383 17.1001 10.4645 17.1001 11.5138C17.1001 12.5632 17.9508 13.4138 19.0001 13.4138Z" stroke="#171A1F" stroke-width="2.28" stroke-miterlimit="10" stroke-linecap="square" />
                                      </svg></Button>
                                    </div>
                                    <Input label='מיקום האירוע' color='success' value={place} onChange={handlePlace} />
                                  </div>
                                </div>
                              </div>

                            </div>
                          }
                          <div className='h-full justify-center flex items-center'>
                            <Button variant='ll' isIconOnly className='bg-white'
                              style={{
                                width: "60px", height: "60px", borderRadius: "100px",
                                boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                              }}
                              onPress={() => {
                                if (cont) {
                                  setCont1(false)
                                  setProgress(progress + 25)
                                  setCont2(true)
                                } else if (cont2) {
                                  setProgress(progress + 25)
                                  setCont2(false)
                                  setCont3(true)
                                } else if (cont3) {
                                  if (isTicketSale) {
                                    setProgress(progress + 15)
                                  } else {
                                    setProgress(progress + 40)
                                  }
                                  setCont3(false)
                                  setCont4(true)
                                } else if (cont4 && isTicketSale) {
                                  setCont4(false)
                                  setCont5(true)
                                } else if (cont4 && !isTicketSale) {

                                }
                                else if (cont5) {
                                  handleAddEvent()
                                }
                              }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.9999 21.5001C15.6025 21.4987 15.2216 21.3406 14.9399 21.0601L6.93993 13.0601C6.65656 12.7802 6.49707 12.3984 6.49707 12.0001C6.49707 11.6018 6.65656 11.22 6.93993 10.9401L14.9399 2.9401C15.3139 2.5388 15.877 2.37361 16.4085 2.50933C16.94 2.64506 17.355 3.06006 17.4907 3.59153C17.6264 4.12299 17.4612 4.68616 17.0599 5.0601L10.1199 12.0001L17.0599 18.9401C17.3433 19.22 17.5028 19.6018 17.5028 20.0001C17.5028 20.3984 17.3433 20.7802 17.0599 21.0601C16.7783 21.3406 16.3974 21.4987 15.9999 21.5001Z" fill="black" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>

                    </div>
                    {cont5 &&
                      <div className='flex flex-row' style={{ height: "500px", overflowY: "auto" }}>
                        <div className='flex flex-col w-full'>
                          <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                            <div>פרטיות</div>
                            <div className='flex flex-row'>
                              <div className='flex flex-col'>
                                <div>הגבלת גיל</div>
                                <Input type='number' onChange={(e) => setEvenAge(e.target.value)} />
                              </div>
                              <div className='flex flex-col'>
                                <Switch isSelected={isPrivate} style={{ direction: "ltr" }} onChange={() => { setIsPrivate(!isPrivate) }}>
                                  {isPrivate ? "פרטי" : "ציבורי"}
                                </Switch>
                              </div>
                            </div>
                            <Select
                              onChange={(e) => {
                                setEvenType(eventTypes[e.target.value])
                              }}
                              items={eventTypes}
                              label="Evet type"
                              placeholder={evenType}
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
                        <div className='h-full' style={{ width: "350px" }}>
                          תמונה
                        </div>
                      </div>
                    }
                    {cont6 &&
                      <div className='flex flex-row' style={{ height: "300px", overflowY: "auto" }}>
                        <div className='flex flex-col w-full' style={{ padding: "10px", gap: "10px" }}>
                          <div>בואו ניצור כרטיס ראשוני</div>
                          <div
                            className="flex flex-col absolute text-right"
                            style={{
                              width: '50%',
                              top: '50%',
                              left: '40%',
                              transform: 'translate(-50%, -50%)', // Centers the div
                            }}
                          >
                            <div
                              className="flex flex-col"
                              style={{
                                height: "450px",
                                width: "320px",
                                borderRadius: "15px",
                                boxShadow:
                                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                padding: "10px",
                                gap: "60px"
                              }}
                            >
                              <div className="flex flex-row justify-between items-center gap-4">
                                <Input
                                  label="שם הכרטיס"
                                  variant="underlined"
                                  color="primary"
                                  value={formData.cardName}
                                  onChange={handleInputChange("cardName")}
                                />
                                <div style={{ width: "40px", }}>
                                  <DateRangePicker
                                    color="primary"
                                    value={formData.dateRange.length > 0 &&
                                      parseDateRange(formData.dateRange)} // Parse and pass to DateRangePicker
                                    onChange={handleDateRangeChange} // Update state on change
                                    classNames={{
                                      base: "max-w-fit",
                                      input: "hidden",
                                      value: "hidden",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className='flex flex-col w-full'>

                                <div className='flex flex-row items-center justify-center w-full ' style={{ gap: "40px" }}>

                                  <div style={{ width: "75px", direction: "ltr" }}>
                                    <TimeInput

                                      label="שעת סיום"
                                      labelPlacement="outside"
                                      variant="bordered"
                                      value={formData.endTime.length > 0 &&
                                        parseTime(formData.endTime)}
                                      onChange={handleEndTimeChange}
                                    />
                                  </div>
                                  <div style={{ width: "75px", direction: "ltr" }}>
                                    <TimeInput

                                      label="שעת התחלה"
                                      labelPlacement="outside"
                                      variant="bordered"
                                      value={formData.startTime.length > 0 &&
                                        parseTime(formData.startTime)}
                                      onChange={handleStartTimeChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='flex flex-col gap-4'>


                                <div style={{ width: "120px" }}> <Input
                                  type="number"
                                  variant="faded"
                                  label="מחיר"
                                  labelPlacement="outside"
                                  value={formData.price}
                                  onChange={handleInputChange("price")}
                                /></div>

                                <div style={{ width: "180px" }}>  <Input
                                  type="number"
                                  radius="full"
                                  variant="flat"
                                  label="כמות כרטיסים"
                                  labelPlacement="outside"
                                  value={formData.ticketQuantity}
                                  onChange={handleInputChange("ticketQuantity")}
                                /></div>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div className='h-full' style={{ width: "350px" }}>
                          תמונה
                        </div>
                      </div>
                    }
                    <div className='flex flex-row' style={{ paddingLeft: "25px" }}>



                    </div>

                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className='flex flex-row w-full ' style={{ height: "600px" }}>
          <div className='flex flex-col gap-4' style={{ width: "50%", paddingTop: "50px" }}>
            <Tabs aria-label="Tabs variants" color='primary' variant={"underlined"} onSelectionChange={(key) => { setIsMyevents(key) }}>
              <Tab key="events" title="האירועים שלי" />
              <Tab key="apss" title="אפליקציות & תוספים" />
            </Tabs>
            <div className='h-full w-full'>
              {isMyevents === "events" &&
                <div className='flex flex-col w-full h-full'>
                  <div className='flex flex-row gap-1 items-center'>
                    <div className='text-center'
                      style={{ fontWeight: "bold", fontSize: "32px", color: "#9095A1", textAlign: "center" }}>תיבת דואר</div>
                    <div className=''><svg width="24" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.69995 15.355L9.27995 15.355V18.145L16.72 18.145V15.355L22.3 15.355" stroke="#9095A1" stroke-width="2.232" stroke-miterlimit="10" />
                      <path d="M20.44 4.2L5.55995 4.2C4.5327 4.2 3.69995 5.03275 3.69995 6.06L3.69995 20.94C3.69995 21.9673 4.5327 22.8 5.55995 22.8L20.44 22.8C21.4672 22.8 22.3 21.9673 22.3 20.94L22.3 6.06C22.3 5.03275 21.4672 4.2 20.44 4.2Z" stroke="#9095A1" stroke-width="2.232" stroke-miterlimit="10" stroke-linecap="square" />
                    </svg></div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className='flex flex-col h-full' style={{ width: "50%", borderRight: "1px solid #BDC1CA" }}>

          </div>

        </div>
      </div>
    </div>
  )
}

export default CraftingTable

const eventTypes = [
  "יום הולדת",
  "חתונה",
  "מסיבה",
  "בר/בת מצווה",
  "אירוע חברה",
  "כנס",
  "פסטיבל",
  "מופע אמנותי",
  "הופעת מוזיקה",
  "מסיבת רווקים/רווקות",
  "חגיגה משפחתית",
  "אירוע ספורט",
  "סדנה",
  "יריד",
  "תערוכה",
  "ערב התרמה",
  "אירוע פרטי",
  "אירוע ציבורי",
  "הרצאה",
  "חגיגה שנתית",
  "טקס הענקת פרסים",
  "אירוע השקה",
  "מסיבת קוקטייל",
  "ערב שירה בציבור",
  "מופע סטנדאפ",
  "הצגה",
  "תיאטרון",
  "מסיבת טבע"
];
