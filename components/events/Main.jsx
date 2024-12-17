"use client"
import { TimeInput, Divider, Input, Switch, Calendar, Select, SelectItem, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, User } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'
import DragAndDrop from '../DragImage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
const Main = ({ admin }) => {
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
        return parts[2] || null; // Returns the third part, or null if it doesn't exist
    }
    const getUser = async () => {
        const result = await axios.get(`http://localhost:9020/getuser/${decodedToken2?.email}`)
        setUser(result.data)
        const currentHour = new Date().getHours(); // מקבלים את השעה הנוכחית

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
        getEvents()



    }, [])
    useEffect(() => {

        if (decodedToken2) {
            getUser()

        }

    }, [decodedToken2])

    return (

        <div className='w-full' style={{ paddingTop: '20px' }}>
            <div className='flex  w-full flex-col bg-white '
                style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px", padding: "30px" }}>
                <div className='w-full flex flex-col gap-4'>

                    <div className='flex flex-row w-full gap-4' style={{
                        background: '#252323',
                        padding: '40px', borderRadius: '20px', boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px"
                    }}>

                        <div className="flex flex-col">
                            <motion.h1
                                className="greeting-text"
                                initial={{ opacity: 0, y: -50 }} // התחל מ-opacity 0 ומיקום Y שלילי
                                animate={{ opacity: 1, y: 0 }}   // הגדר את האנימציה לאופסיטי 1 ו-Y 0
                                transition={{ duration: 1 }}
                            >
                                {greeting}
                            </motion.h1>
                        </div>
                        <div className='flex flex-col w-full' style={{ height: '200px' }}>
                            <motion.div
                                className="w-full flex flex-row gap-4 justify-end"
                                initial={{ x: -100 }} // Start from the left, off-screen
                                animate={{ x: 0 }} // Slide to original position
                                transition={{ duration: 0.8, ease: 'easeOut' }} // Smooth transition
                            >
                                <motion.div
                                    className="flex"
                                    initial={{ scale: 0.8, x: -50 }} // Start slightly smaller and shifted to the left
                                    animate={{ scale: 1, x: 0 }}    // Grow to full size and slide into place
                                    transition={{ delay: 0.2, duration: 0.5 }} // Delay to create staggered animation
                                >
                                    <Button isIconOnly color="secondary" radius="full" variant="flat">
                                        AI
                                    </Button>
                                </motion.div>
                                <motion.div
                                    className="flex"
                                    initial={{ scale: 0.8, x: -50 }} // Start slightly smaller and shifted to the left
                                    animate={{ scale: 1, x: 0 }}    // Grow to full size and slide into place
                                    transition={{ delay: 0.4, duration: 0.5 }} // Delay to create staggered animation
                                >
                                    <Button isIconOnly color="success" radius="full" variant="flat">
                                        AI
                                    </Button>
                                </motion.div>
                                <motion.div
                                    className="flex"
                                    initial={{ scale: 0.8, x: -50 }} // Start slightly smaller and shifted to the left
                                    animate={{ scale: 1, x: 0 }}    // Grow to full size and slide into place
                                    transition={{ delay: 0.6, duration: 0.5 }} // Delay to create staggered animation
                                >
                                    <Button isIconOnly color="warning" radius="full" variant="flat">
                                        AI
                                    </Button>
                                </motion.div>
                                <motion.div
                                    className="flex"
                                    initial={{ scale: 0.8, x: -50 }} // Start slightly smaller and shifted to the left
                                    animate={{ scale: 1, x: 0 }}    // Grow to full size and slide into place
                                    transition={{ delay: 0.8, duration: 0.5 }} // Delay to create staggered animation
                                >
                                    <Button isIconOnly radius="full" variant="flat">
                                        i
                                    </Button>
                                </motion.div>
                            </motion.div>
                            <div
                                className='flex flex-row w-full absolute flex-wrap'
                                style={{ marginTop: '140px', gap: '40px', paddingLeft: '20%' }}
                            >
                                <motion.div
                                    className='bg-white flex'
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '15px',
                                        boxShadow: "#fbbc05 0px 0px 0px 3px"
                                    }}
                                    initial={{ y: -500 }}  // Start from 500px above the screen
                                    animate={{ y: 0 }}     // Fall to the normal position
                                    transition={{
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 25,  // Add damping for a natural "bounce" effect
                                        duration: 1,
                                      
                                    }}
                                >
                                </motion.div>

                                <motion.div
                                    className='bg-white flex'
                                    style={{
                                        width: '400px',
                                        height: '200px',
                                        borderRadius: '15px',
                                        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                                    }}
                                    initial={{ y: -500 }}  // Start from 500px above the screen
                                    animate={{ y: 0 }}     // Fall to the normal position
                                    transition={{
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 25,  // Bounce effect for a more natural fall
                                        duration: 1,
                                      
                                    }}
                                ></motion.div>

                                <motion.div
                                    className='bg-white flex'
                                    style={{
                                        width: '300px',
                                        height: '200px',
                                        borderRadius: '15px',
                                        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                                    }}
                                    initial={{ y: -500 }}  // Start from 500px above the screen
                                    animate={{ y: 0 }}     // Fall to the normal position
                                    transition={{
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 25,  // Bounce effect for a more natural fall
                                        duration: 1,
                                   
                                    }}
                                ></motion.div>

                                <motion.div
                                    className='bg-white flex'
                                    style={{
                                        width: '600px',
                                        height: '300px',
                                        borderRadius: '15px',
                                        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                                    }}
                                    initial={{ y: -500 }}  // Start from 500px above the screen
                                    animate={{ y: 0 }}     // Fall to the normal position
                                    transition={{
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 25,  // Bounce effect for a more natural fall
                                        duration: 1,
                                       
                                    }}
                                ></motion.div>
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