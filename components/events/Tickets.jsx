"use client"
import {
    TimeInput, Divider, DatePicker, Input, Slider,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, link, Chip
} from '@nextui-org/react'
import React, { useState, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'
import DragAndDrop from '../DragImage';
import { CalendarDate } from '@internationalized/date';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import 'swiper/css/effect-cards';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { parseTime } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
const Tickets = ({ admin }) => {
    const isFetch = useRef(false)
    const icon = <div >
        <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="4" rx="2" fill="#FBB03B" />
        </svg> </div>
    const [roundForAi, setRoundForAi] = useState(1)
    const [budgetdForAi, setBudgetdForAi] = useState([1, 100])
    const [groupSelected, setGroupSelected] = useState(["credit"]);
    const [ticketsAmout, setTicketsAmount] = useState('ללא הגבלה')
    const [indexTicket, setIndexTicket] = useState('')
    const [formData, setFormData] = useState({
        cardName: "",
        dateRange: "",
        startTime: "",
        endTime: "",
        price: "",
        ticketQuantity: "",
    });
    const [section1, setSection1] = useState(true)
    const [section2, setSection2] = useState(false)
    const [section3, setSection3] = useState(false)
    const [ticketsTotalAmount, setTicketsTotalAmount] = useState('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const { isOpen: isOpen4, onOpen: onOpen4, onOpenChange: onOpenChange4 } = useDisclosure();
    const { isOpen: isOpen5, onOpen: onOpen5, onOpenChange: onOpenChange5 } = useDisclosure();
    const [isOpenLink, setIsOpenLink] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const [isOpenDeleteIndex, setIsOpenDeleteIndex] = useState(false)
    const [index1, setIndex1] = useState(null)
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
    const [link, setLink] = useState('http//:localhost:3000/')
    // settings states
    const [ticketSet, SetTicketSet] = useState({})
    const [cash, setCash] = useState(false)
    const [payment, setPayment] = useState(false)
    const [ID, setID] = useState(false)
    const [isdate, setIsdate] = useState(false)
    const [gender, setGender] = useState(false)
    const [isInstegram, setisInstegram] = useState(false)
    const [instegramLink, setInstegramLink] = useState(false)
    const [facebookLink, setFacebookLink] = useState(false)
    const [startDateForAi, setStartDateForAi] = useState('')
    const [endDateForAi, setEndDateForAi] = useState('')
    const ticketSettings =
    {
        cash: cash,
        payment: payment,
        ID: ID,
        date: isdate,
        gender: gender,
        isInstegram: isInstegram,
        instegramLink: instegramLink,
        facebookLink: facebookLink
    }
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
        cardName: "",
        dateRange: "",
        startTime: "",
        endTime: "",
        price: "",
        ticketQuantity: "",
    }
    const aiDoc = {
        name: events.name,
        amount: roundForAi,
        prices: budgetdForAi,
        startDate: startDateForAi,
        endDateForAi: endDateForAi,
        ticketsAmount: ticketsTotalAmount
    }
    function areObjectsEqual(obj1, obj2) {

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        console.log(obj1, obj2)
        // Check if the number of keys is the same
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Check if values for each key are the same
        for (let key of keys1) {

            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        // If all checks pass, the objects are equal
        return true;
    }
    const handleInputChange = (key) => (e) => {
        setFormData({
            ...formData,
            [key]: e.target.value,
        });
    };

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
    const getEvents = async () => {
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        setTicketsAmount(getAllEvents.data.events.tickets)
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
    const handleAddRound = () => {
        setRounds([...rounds, round])
        handleroundUpdate([...rounds, round])
    }
    const handleEndTime = (time) => {
        const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        setStartTime(formattedTime)
    }
    const handleStartTime = (time) => {
        const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        setEndTime(formattedTime)
    }
    const handleDate = (newRange) => {
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
    const handleDateForAi = (newRange) => {
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
        setEndDateForAi(formattedDateEnd)
        setStartDateForAi(formattedDateStart)

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
    const handleSetSettings = async (data) => {
        const result = await axios.patch(`http://localhost:9020/ticketset/${events._id}`, { settings: data })
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
    useEffect(() => {
        if (events?._id?.length > 0 && isFetch.current === true) {
            console.log("hello")
            handleSetSettings(ticketSettings)
        } else {
            console.log("hi")
            isFetch.current = true
        }

    }, [cash,
        payment,
        ID,
        isdate,
        gender,
        isInstegram,
        instegramLink,
        facebookLink,])

    const handleTicketsAmountUpdate = async (arr) => {
        const result = await axios.patch(`http://localhost:9020/tamount/${events._id}`, { tamount: arr })
        setTicketsAmount(result.data.rounds)
    }
    const handleTicketsAmountUpdate2 = async () => {
        const result = await axios.post(`/api/generateticket`, { aiDoc })
        await handleroundUpdate(result.data)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleroundUpdate = async (arr) => {
        const result = await axios.patch(`http://localhost:9020/rounds/${events._id}`, { rounds: arr })
        setRounds(result.data.rounds)
    }
    return (
        <div className=''>

            <Modal className='glass-background' style={{ color: 'white' }} isOpen={isOpen5} onOpenChange={onOpenChange5}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">הגבלת כמות הכרטיסים לרכישה</ModalHeader>
                            <ModalBody >
                                <Input onChange={(e) => { setTicketsAmount(e.target.value) }}
                                    type='number' label={'כמות הכרטיסים'} value={ticketsAmout} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={async () => {
                                    if (ticketsAmout > 0) {
                                        await handleTicketsAmountUpdate(ticketsAmout)
                                        onClose()
                                        setPayment(!payment)
                                    }
                                }}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Rise AI</DrawerHeader>
                            <DrawerBody className='flex flex-col items-center'>
                                <div>
                                    תתן ל- Risy לעשות לך את זה
                                </div>
                                <div>
                                    Risy בונה סבבי מכירה אוטומטיים שמחולקים לפי פרמטרים שהוגדרו מראש (לדוגמה, "מכירה מוקדמת", "מכירה רגילה" או "סבב VIP").
                                    הסבבים מוגדרים כך שיכללו תאריכים מדויקים, מחירים משתנים בהתאם לזמן או לכמות, וניתן לעדכן אותם באופן דינמי.
                                </div>
                                <div className="flex flex-col bg-white"
                                    style={{
                                        height: "450px",
                                        width: "320px",
                                        borderRadius: "15px",
                                        boxShadow:
                                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                                        padding: "10px",
                                        gap: "40px"
                                    }}>
                                    <div className='w-full'>
                                        <DatePicker label='תאריך התחלת המכירה'/>
                                    </div>
                                    <div className='flex flex-col'>
                                    <Chip variant='dot' color='secondary'>הגדרת טוות מחירים</Chip>
                                    <div className='w-full flex flex-row items-center gap-4'>
                                        <Input color='secondary' type='number'  variant='underlined' label='מחיר מקסימום'/>
                                        <div>-</div>
                                        <Input color='secondary'  type='number' variant='underlined' 
                                         label='מחיר מינימום'/>
                                    </div>
                                    </div>
                                    <div className='px-4'>
                                    <Input color='secondary' labelPlacement='outside'  type='number' label='כמות כרטיסים כוללת למכירה'/>
                                    </div>
                                    <div className='w-full' style={{paddingLeft: "25%", paddingRight: "25%", marginTop: "35px"}}>
                                        <Button className='w-full' color='secondary'>צור לי מכירה</Button>
                                    </div>
                                </div>
                            </DrawerBody>
                            <DrawerFooter>
                
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
            <div className=' flex  w-full  flex-col ' style={{ paddingTop: "20px" }}>
                <div className='flex flex-row w-full  justify-center bg-white' style={{
                    padding: "2%",
                    borderRadius: "15px", paddingRight: "8%"
                }}>
                    <div className='flex flex-col gap-2' style={{ width: '20%' }}>
                        <div style={{ height: "80px" }}></div>
                        <div className='flex flex-col items-center '
                            style={{
                                width: '100%', height: '450px',
                                boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                                borderRadius: '10px', paddingTop: '1%', paddingRight: '1%', paddingLeft: '1%'
                            }}>
                            <div className=' flex flex-col ' style={{ width: '100%', height: '450px', fontSize: '20px', gap: '10px' }}>
                                <div className='flex flex-col '>
                                    <div> הגדרות כרטיסים</div>
                                    {icon}
                                </div>
                                <div className='flex flex-row w-full justify-between setting-tickets' style={{ gap: '15px', fontSize: '16px', fontWeight: 'bolder' }} >

                                    <div>מזומן:</div>
                                    <Switch style={{ direction: 'ltr' }} isSelected={cash} isDisabled={(admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר") ? false : true} onChange={() => { setCash(!cash) }} aria-label="Automatic updates" />


                                </div>
                                <Tooltip color='primary' placement='right'
                                    content={<div>כמות הרכישות שניתן לבצע: {ticketsAmout}</div>}>
                                    <div className='flex flex-row w-full justify-between  setting-tickets' style={{ gap: '15px', fontSize: '16px', fontWeight: 'bolder' }} >
                                        <div>

                                            <div>הגבלת רכישה:</div></div>
                                        <Switch onClick={() => {
                                            if (payment == false) {
                                                onOpen5()
                                            }
                                        }} style={{ direction: 'ltr' }} isSelected={payment} isDisabled={(admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר") ? false : true}
                                            onChange={async () => {
                                                if (payment) {
                                                    await handleTicketsAmountUpdate('ללא הגבלה')
                                                    setPayment(!payment)
                                                    setTicketsAmount('ללא הגבלה')
                                                }
                                            }} aria-label="Automatic updates" />

                                    </div>
                                </Tooltip>
                                <div className='flex flex-row w-full justify-between  setting-tickets' style={{ gap: '15px', fontSize: '16px', fontWeight: 'bolder' }} >
                                    <div>
                                        <div>מילוי ת"ז:</div></div>
                                    <Switch style={{ direction: 'ltr' }} isSelected={ID} isDisabled={(admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר") ? false : true} onChange={() => { setID(!ID) }} aria-label="Automatic updates" />
                                </div>
                                <div className='flex flex-row w-full justify-between  setting-tickets' style={{ gap: '15px', fontSize: '16px', fontWeight: 'bolder' }} >
                                    <div>
                                        <div>תאריך לידה:</div></div>
                                    <Switch style={{ direction: 'ltr' }} isSelected={isdate} isDisabled={(admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר") ? false : true} onChange={() => { setIsdate(!isdate) }} aria-label="Automatic updates" />
                                </div>
                                <div className='flex flex-row w-full justify-between  setting-tickets' style={{ gap: '15px', fontSize: '16px', fontWeight: 'bolder' }} >

                                    <div>
                                        <div>מגדר:</div></div>
                                    <Switch style={{ direction: 'ltr' }} isSelected={gender} isDisabled={(admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר") ? false : true} onChange={() => { setGender(!gender) }} aria-label="Automatic updates" />
                                </div>
                                <div className='flex flex-row w-full justify-between  setting-tickets' style={{ gap: '15px', fontSize: '16px', fontWeight: 'bolder' }} >

                                    <div>
                                        <div>אינסטגרם או פייסבוק:</div></div>
                                    <Switch style={{ direction: 'ltr' }} isSelected={isInstegram} isDisabled={(admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר") ? false : true} onChange={() => { setisInstegram(!isInstegram) }} aria-label="Automatic updates" />
                                </div>
                                <div className='flex flex-row w-full justify-between  setting-tickets' style={{ gap: '15px', fontSize: '16px', fontWeight: 'bolder' }} >


                                    <div>
                                        <div>קישור לפייסבוק:</div></div>
                                    <Switch style={{ direction: 'ltr' }} isSelected={facebookLink} isDisabled={(admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר") ? false : true} onChange={() => { setFacebookLink(!facebookLink) }} aria-label="Automatic updates" />
                                </div>

                                <div className='flex flex-row w-full justify-between  setting-tickets' style={{ gap: '15px', fontSize: '16px', fontWeight: 'bolder' }} >

                                    <div>
                                        <div>משתמש לאינסטגרם:</div></div>
                                    <Switch style={{ direction: 'ltr' }} isSelected={instegramLink} isDisabled={(admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר") ? false : true} onChange={() => { setInstegramLink(!instegramLink) }} aria-label="Automatic updates" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full flex-col  justify-center items-center gap-2' >
                        <div className='flex flex-row w-full items-end' style={{
                            height: "80px", paddingRight: "440px", gap: "10px",
                            paddingBottom: "5px"
                        }}>
                            <div className='flex flex-row justify-between ' style={{
                                padding: "3px", width: "100px",
                                borderRadius: "25px",
                                backgroundColor: "#f2f2f2",
                            }}>
                                       <Tooltip showArrow content={"כרטיס חדש"} color='success'>
                                <Button isIconOnly onPress={handleAddRound} color='success' radius='full' variant='flat'
                                    isDisabled={admin === 'מפיק' || admin === 'בעלים' || admin === "יוצר" ? false : true}>

                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.44 2H12.56C17.7736 2 22 6.22643 22 11.44V12.56C22 17.7736 17.7736 22 12.56 22H11.44C6.22643 22 2 17.7736 2 12.56V11.44C2 6.22643 6.22643 2 11.44 2ZM12.75 12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H12.75V8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H11.25V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V12.75Z" fill="#34a853" />
                                    </svg>

                                </Button>
                                       </Tooltip>
                                <Tooltip showArrow placement='bottom' 
                                 isOpen={isOpenDelete}
                                    content={<div className='flex flex-col gap-2'
                                        style={{ height: "300px", width: "250px", padding: "5px" }}>
                                        <div className='w-full' style={{ height: "30px" }}>
                                            <Chip variant='dot' color='danger'>מחיקת כרטיסים</Chip>
                                        </div>
                                        <div className='w-full h-full flex flex-col gap-2 p-4' style={{ overflowY: "auto" }}>
                                            {rounds?.map((items, index) => {
                                                return (
                                                    <div className='w-full flex flex-row items-center' onMouseEnter={() => {
                                                        setIsOpenDeleteIndex(index)
                                                    }}
                                                        onMouseLeave={() => {
                                                            setIsOpenDeleteIndex('')
                                                        }}
                                                        style={{ height: "30px", borderBottom: "1px solid rgb(203 213 225)" }}>
                                                        <div className='flex h-full w-full'>
                                                            {items.cardName.length === 0 ? `כרטיס ${index + 1}` : items.cardName}
                                                        </div>
                                                        {isOpenDeleteIndex === index &&
                                                            <div className='cursor-pointer' onClick={async () => {
                                                                const arr = rounds
                                                                const newArr = removeElementAtIndex(rounds, index)
                                                                await handleroundUpdate(newArr)
                                                            }}>
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="#ea4335" />
                                                                </svg>

                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>}>
                                    <div>
                                        <Tooltip showArrow content={"מחיקת כרטיס"} color='danger'
                                      >
                                            <Button isIconOnly onPress={() => setIsOpenDelete(!isOpenDelete)}
                                                color='danger' radius='full' variant='flat'>
                                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2ZM15.48 15.48C15.7725 15.1872 15.7725 14.7128 15.48 14.42L13.06 12L15.48 9.58C15.7554 9.28449 15.7472 8.82399 15.4616 8.53838C15.176 8.25277 14.7155 8.24464 14.42 8.52L12 10.94L9.58 8.52C9.28449 8.24464 8.82399 8.25277 8.53838 8.53838C8.25277 8.82399 8.24464 9.28449 8.52 9.58L10.94 12L8.52 14.42C8.22755 14.7128 8.22755 15.1872 8.52 15.48C8.66285 15.6172 8.852 15.6957 9.05 15.7C9.24841 15.6977 9.43828 15.6189 9.58 15.48L12 13.06L14.42 15.48C14.5617 15.6189 14.7516 15.6977 14.95 15.7C15.148 15.6957 15.3372 15.6172 15.48 15.48Z" fill="#ea4335" />
                                                </svg>
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </Tooltip>
                            </div>
                            <Tooltip showArrow content={"צפייה מוקדמת"} color='warning'>
                            <Button isIconOnly color='warning' radius='full' variant='flat'>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0276 7.64929L21.2076 10.9893C21.4779 11.2056 21.6352 11.5331 21.6352 11.8793C21.6352 12.2255 21.4779 12.5529 21.2076 12.7693L17.0276 16.1093C14.2726 18.3083 10.3626 18.3083 7.60761 16.1093L3.42761 12.7693C3.15733 12.5529 3 12.2255 3 11.8793C3 11.5331 3.15733 11.2056 3.42761 10.9893L7.60761 7.64929C10.3626 5.45024 14.2726 5.45024 17.0276 7.64929ZM10.0176 11.8793C10.0176 13.1495 11.0474 14.1793 12.3176 14.1793C13.5879 14.1793 14.6176 13.1495 14.6176 11.8793C14.6176 10.609 13.5879 9.57929 12.3176 9.57929C11.0474 9.57929 10.0176 10.609 10.0176 11.8793Z" fill="#fbbc05" />
                                </svg>
                            </Button>
                            </Tooltip>
                            <Tooltip showArrow isOpen={isOpenLink} placement='bottom'
                                content={<div className='flex flex-col justify-center items-center gap-4' style={{ height: "200px", width: "250px" }}>
                                    <Input label='לינק הרכישה' color='primary' />
                                    <Button color='primary'  >שמירה</Button>
                                </div>}>
                                <div>
                                    <Tooltip showArrow content='הגדרת לינק לרכישה' color='primary'>
                                        <Button isIconOnly color='primary' onPress={() => setIsOpenLink(!isOpenLink)}
                                            radius='full' variant='flat'>
                                            <svg width="26" height="24" viewBox="0 0 26 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M24.4598 36.9291L24.8429 27.3368L20.0467 27.1452L19.6636 36.7376C19.5056 40.6944 16.1388 43.8025 12.182 43.6445C8.22515 43.4864 5.11704 40.1197 5.27508 36.1629L5.65822 26.5705L0.862043 26.379L0.478909 35.9713C0.214545 42.59 5.37171 48.1763 11.9904 48.4407C18.6092 48.705 24.1954 43.5479 24.4598 36.9291ZM5.84979 21.7743L6.23292 12.182C6.39097 8.22515 9.75769 5.11704 13.7145 5.27508C17.6714 5.43313 20.7795 8.79985 20.6215 12.7567L20.2383 22.349L25.0345 22.5406L25.4176 12.9483C25.682 6.32954 20.5248 0.743269 13.9061 0.478906C7.28738 0.214543 1.70111 5.3717 1.43675 11.9904L1.05361 21.5828L5.84979 21.7743ZM15.7295 14.9632L14.9632 34.1479L10.167 33.9564L10.9333 14.7717L15.7295 14.9632Z" fill="#4285f4" />
                                            </svg>
                                        </Button>
                                    </Tooltip>
                                </div>
                            </Tooltip>
                            <Tooltip showArrow content={"Risy"} color='secondary'>
                            <Button isIconOnly color='secondary' radius='full' onPress={() => { onOpen() }} variant='flat'>
                                AI
                            </Button>
                            </Tooltip>
                        </div>
                        <Swiper
                            style={{ width: '600px', height: "470px", gap: '20px' }}
                            className="felx justify-center items-center "
                            spaceBetween={2}
                            perSlideOffset={10} // Adjust space between cards
                            pagination={{ clickable: true }}
                            navigation
                            cardsEffect={{ slideShadows: false, }}
                            centeredSlides
                            modules={[EffectCards, Navigation, Pagination]}
                            effect='cards'
                        >
                            {rounds?.map((item, index) => {

                                return (
                                    <SwiperSlide className='felx justify-center items-center '
                                        style={{ padding: "5px", boxShadow: 'none', paddingRight: "120px" }}
                                        key={index}>

                                        <div
                                            onMouseEnter={() => {
                                                setIndexTicket(index)
                                                setFormData({
                                                    cardName: item.cardName,
                                                    dateRange: item.dateRange,
                                                    startTime: item.startTime,
                                                    endTime: item.endTime,
                                                    price: item.price,
                                                    ticketQuantity: item.ticketQuantity,
                                                })
                                            }}
                                            onMouseLeave={async () => {
                                                const arr = rounds
                                                const data = formData
                                                const indexData = indexTicket
                                                const isPost = areObjectsEqual(arr[indexData], data)
                                                arr[indexData] = data
                                                setIndexTicket('')
                                                setFormData({
                                                    cardName: "",
                                                    dateRange: "",
                                                    startTime: "",
                                                    endTime: "",
                                                    price: "",
                                                    ticketQuantity: "",
                                                })
                                                console.log(isPost)
                                                if (!isPost) {
                                                    await handleroundUpdate(arr)
                                                }
                                            }}
                                            className="flex flex-col bg-white"
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
                                                    value={(formData.cardName.length >= 0 && index === indexTicket) ? formData.cardName : item.cardName}
                                                    onChange={handleInputChange("cardName")}
                                                />
                                                <div style={{ width: "40px", }}>
                                                    <DateRangePicker
                                                        color="primary"
                                                        value={(item.dateRange) &&
                                                            parseDateRange((formData.dateRange.length >= 0 && index === indexTicket) ? formData.dateRange : item.dateRange)
                                                        } // Parse and pass to DateRangePicker
                                                        onChange={(range) => {
                                                            const start = parseDate2(range.start)
                                                            const end = parseDate2(range.end)
                                                            setFormData({
                                                                ...formData,
                                                                dateRange: { start: start, end: end }
                                                            })
                                                        }} // Update state on change
                                                        classNames={{
                                                            base: "max-w-fit",
                                                            input: "hidden",
                                                            value: "hidden",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-col w-full'>

                                                <div className='flex flex-row formDatas-center justify-center w-full ' style={{ gap: "40px" }}>

                                                    <div style={{ width: "75px", direction: "ltr" }}>
                                                        <TimeInput
                                                            label="שעת סיום"
                                                            labelPlacement="outside"
                                                            variant="bordered"
                                                            value={(item.endTime.length > 0) &&
                                                                parseTime((formData.endTime.length >= 0 && index === indexTicket) ?
                                                                    formData.endTime : item.endTime)
                                                            }
                                                            onChange={handleEndTimeChange}
                                                        />
                                                    </div>
                                                    <div style={{ width: "75px", direction: "ltr" }}>
                                                        <TimeInput

                                                            label="שעת התחלה"
                                                            labelPlacement="outside"
                                                            variant="bordered"
                                                            value={
                                                                (item.startTime.length > 0) &&
                                                                parseTime((formData.startTime.length >= 0 && index === indexTicket)
                                                                    ? formData.startTime : item.startTime)

                                                            }
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
                                                    value={(formData.price.length >= 0 && index === indexTicket) ? formData.price : item.price}
                                                    onChange={handleInputChange("price")}
                                                /></div>

                                                <div style={{ width: "180px" }}>  <Input
                                                    type="number"
                                                    radius="full"
                                                    variant="flat"
                                                    label="כמות כרטיסים"
                                                    labelPlacement="outside"
                                                    value={(formData.ticketQuantity.length >= 0 && index === indexTicket) ? formData.ticketQuantity : item.ticketQuantity}
                                                    onChange={handleInputChange("ticketQuantity")}
                                                /></div>
                                            </div>
                                        </div>

                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>

                    </div>

                </div>



                <div>
                    <Modal size='4xl' className='event-modal-container' isOpen={isOpen2} onOpenChange={onOpenChange2} style={{ background: 'black' }}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex  flex-col gap-1">תצוגה מוקדמת</ModalHeader>
                                    <ModalBody style={{ gap: '10px' }} >
                                        {section1 &&
                                            <div className='flex flex-col w-full items-center' style={{ gap: '10px' }}>
                                                {rounds.map((item, index4) => {
                                                    return (
                                                        <div style={{ gap: '10px' }} className='glass-background tickets-container w-full flex flex-row' onClick={() => {
                                                            setSection1(false)
                                                            setSection2(true)
                                                        }} onMouseEnter={() => { setIndex2(index4) }} onMouseLeave={() => { setIndex2(null) }}>
                                                            <div style={{ gap: '4px', fontSize: '20px', fontWeight: 'bold', width: "100%", paddingRight: '2%', paddingLeft: '5px' }} className='flex h-full  flex-row '>
                                                                <div className='flex flex-col  w-full'>

                                                                    <div className='flex flex-row' style={{ gap: '10px' }}>
                                                                        <div>
                                                                            סבב {index4 + 1} -
                                                                        </div>
                                                                        <div>
                                                                            {item?.name === '' ? <div style={{ fontSize: '20px', fontWeight: 'lighter', }}> יש לערוך סבב </div>
                                                                                : <div className='flex flex-row w-full justify-between' style={{ gap: '140px' }}>
                                                                                    <div className='element-ticket'>
                                                                                        {item.name}
                                                                                    </div>
                                                                                    <div className='flex  flex-row ' style={{ gap: '10px' }}>
                                                                                        <div className='element-ticket'>
                                                                                            {item.startDate}
                                                                                        </div>
                                                                                        <div> -</div>
                                                                                        <div className='element-ticket'>
                                                                                            {item.endDate}
                                                                                        </div>
                                                                                    </div>

                                                                                </div>}
                                                                        </div>

                                                                    </div>
                                                                    {icon}

                                                                    <div className='flex    flex-row' style={{ paddingTop: '5%', fontWeight: 'lighter', fontSize: '16px', gap: '20px' }}>
                                                                        <div className='flex  flex-row ' style={{ gap: '10px' }}>

                                                                            <div>
                                                                                מחיר:
                                                                            </div>
                                                                            <div className='element-ticket'>
                                                                                {item.price}
                                                                            </div>
                                                                        </div>

                                                                        <div className='flex flex-row ' style={{ gap: '10px' }}>

                                                                            <div>
                                                                                כמות כרטיסים
                                                                            </div>
                                                                            <div className='element-ticket'>
                                                                                {item.amount}
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex  flex-row ' style={{ gap: '10px' }}>
                                                                            <div className='element-ticket'>
                                                                                {item.startTime}

                                                                            </div>
                                                                            <div> -</div>
                                                                            <div className='element-ticket'>
                                                                                {item.endTime}
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
                                        {section2 &&
                                            <div className='flex flex-col w-full items-center' style={{ gap: '10px', paddingRight: '25%', paddingLeft: '25%' }}>
                                                <Input label="Full name" variant='bordered' className='input-glass-background' style={{ borderRadius: '10px' }} />
                                                <Input label="Email" variant='bordered' className='input-glass-background' style={{ borderRadius: '10px' }} />
                                                <Input label="Phone" variant='bordered' className='input-glass-background' style={{ borderRadius: '10px' }} />
                                                {ID &&
                                                    <Input label="ID" variant='bordered' className='input-glass-background' style={{ borderRadius: '10px' }} />
                                                }
                                                {isdate &&
                                                    <DatePicker label="Birthday" variant='bordered' className='input-glass-background' style={{ borderRadius: '10px' }} />
                                                }
                                                {gender &&
                                                    <RadioGroup
                                                        label="Select your gender"
                                                        orientation="horizontal"
                                                    >
                                                        <Radio value="hgfdh"><div className=''>גבר</div></Radio>
                                                        <Radio value="buenos-aires"><div className=''>אישה</div></Radio>
                                                        <Radio value="sydney"><div className=''>אחר</div></Radio>
                                                    </RadioGroup>
                                                }
                                                {instegramLink &&
                                                    <Input label="Instegram link" variant='bordered' className='input-glass-background' style={{ borderRadius: '10px' }} />}
                                                {facebookLink &&
                                                    <Input label="Facebook link" variant='bordered' className='input-glass-background' style={{ borderRadius: '10px' }} />
                                                }
                                            </div>
                                        }
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={() => {
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