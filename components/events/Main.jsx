"use client"
import { TimeInput, Divider, Input, Switch, Calendar, Select, Tab, Tabs, SelectItem, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, User } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'
import { useAdmin } from '../contexts/admin/AdminEventsProvider'
import DragAndDrop from '../DragImage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import EventSlideBar from '../bars/EventSlideBar';
const Main = () => {
    const [greeting, setGreeting] = useState('');
    const icon = <div >
        <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="4" rx="2" fill="#FBB03B" />
        </svg> </div>
    const path = usePathname()
    const [content, setContent] = useState('');
    const [prompt, setPrompt] = useState('')
    const [images, setImages] = useState([])
    const [isImage, setIsImage] = useState('')
    const [isGenerate, setIsgenerate] = useState(false)
    const [isUsed, setIsUsed] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies()
    const [age, setAge] = useState('')
    const { decodedToken, isExpired } = useJwt(cookie.store)
    const { decodedToken: decodedToken2, isExpired: isExpired2 } = useJwt(cookie.user)
    const { admin, setAdmin } = useAdmin();
    const [type, setType] = useState('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [isPrivate, setIsPrivate] = useState('')
    const [events, setEvents] = useState([])
    const [endTime, setEndTime] = useState('')
    const [place, setPlace] = useState('')
    const [startTime, setStartTime] = useState('')
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [tubnail, setTubnail] = useState('')

    function getStringAfterSecondSlash(path) {
        const parts = path.split('/');
        return parts[4] || null; // Returns the third part, or null if it doesn't exist
    }
    const getUser = async () => {
        const result = await axios.get(`http://localhost:9020/getuser/${decodedToken2?.email}`)
        setUser(result.data)
        const currentHour = new Date().getHours()
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting(`בוקר טוב ${result.data?.username} `);
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting(`צהריים טובים ${result.data?.username} `);
        } else {
            setGreeting(`ערב טוב ${result.data?.username} `);
        }
    }
    const getEvents = async () => {
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
        setContent(getAllEvents.data.events.description)
    }
    useEffect(() => {
        if (decodedToken) {
            getEvents()
        }
    }, [decodedToken])
    useEffect(() => {
        if (decodedToken2) {
            getUser()
        }
    }, [decodedToken2])

    return (
        <div className='dashboard-container flex flex-row' >
            <div className='main-event-container ' style={{ padding: "20px" }}>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row w-full gap-3' style={{ height: "400px" }}>
                        <div className='flex flex-col w-full gap-4'>
                            <div className='flex flex-row w-full gap-4 items-center' style={{ paddingTop: "30px" }}>
                                <div className='flex'></div>
                                <div className='flex' style={{ color: "#BDC1CA", fontWeight: "bold", fontSize: "44px" }}>ראשי</div>
                            </div>
                            <div className='w-full'>
                                <Calendar calendarWidth="100%" />
                            </div>
                        </div>
                        <div className='w-full h-full flex flex-col'>
                            <div style={{ color: "#9095A1", fontWeight: "bold", fontSize: "32px" }}>המשימות שלי</div>
                        </div>
                    </div>
                    <div className='workspace-container w-full flex flex-col bg-white'>
                        <div style={{ color: "#9095A1", fontWeight: "bold", fontSize: "32px" }}>מרחבי העבודה שלי</div>
                    </div>
                    <div className='flex flex-col' style={{ height: "400px" }}>
                        <div> <Tabs aria-label="Tabs colors" color={"warning"} variant='light'>
                            <Tab key="photos" title="אפליקציות בשימוש" />
                            <Tab key="music" title="האפליקציות שלי" />
                            <Tab key="videos" title=" חפש ב- CraftStore" />
                        </Tabs></div>
                    </div>
                </div>

            </div>
            <div className='dashboard-main-event flex flex-col'>
                <div className='w-full h-full flex flex-col'>
                    <div className='header-container-main flex flex-col items-center justify-center'>
                        <div></div>
                        <div className='flex flex-row justify-between w-full' style={{ paddingRight: "50%" }}>
                            <div className='flex flex-col'>
                                <div style={{ fontSize: "20px" }}>
                                    {events?.name}
                                </div>
                                <div style={{ fontSize: "16px", color: "#9095A1", paddingRight: "2px" }}>
                                    {decodedToken?.name}
                                </div>
                                <div>

                                </div>
                            </div> 
                            <div className='flex items-center'>
                                <Button style={{width: "22px", height: "26px"}} color='primary' variant='flat' isIconOnly><svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.75 13.86L15.75 17.81C15.75 18.6826 15.0426 19.39 14.17 19.39L4.68999 19.39C3.81738 19.39 3.10999 18.6826 3.10999 17.81L3.10999 9.91002C3.10999 9.03741 3.81738 8.33002 4.68999 8.33002L7.05999 8.33002" stroke="#4285F4" stroke-width="1.896" stroke-miterlimit="10" stroke-linecap="round" />
                                    <path d="M8.61499 14.66C8.61499 10.297 12.1519 6.76001 16.515 6.76001L18.885 6.76001" stroke="#4285F4" stroke-width="1.896" stroke-miterlimit="10" stroke-linecap="round" />
                                    <path d="M15.71 9.95001L18.87 6.79L15.71 3.63" stroke="#4285F4" stroke-width="1.896" stroke-miterlimit="10" stroke-linecap="square" />
                                </svg>
                                </Button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
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