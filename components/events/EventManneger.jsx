"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { TimeInput, Divider, Input, Switch, Calendar, Select, SelectItem, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from '@nextui-org/react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import EventSlider from './EventSlider';
import EventConnection from './ConnectionEvent';
import { parseDate } from "@internationalized/date";
import { parseTime } from "@internationalized/date";
const EventManneger = ({ }) => {
    const router = useRouter()
    const [evenAge, setEvenAge] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
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
    const [cont8, setCont8] = useState(false)
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [dateRange, setDateRange] = useState('')
    const [content, setContent] = useState('');
    const [isTicketSale, setIsTicketSale] = useState(true)
    const [cookie, setCookie, removeCookie] = useCookies()
    const [connectionEv, setConnectionEv] = useState([])
    const { decodedToken, isExpired } = useJwt(cookie.store)
    const { decodedToken: decodedTokens, isExpireds } = useJwt(cookie.user)
    const [endTime, setEndTime] = useState('')
    const [place, setPlace] = useState('')
    const [startTime, setStartTime] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [data, setData] = useState('')
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
        const store = await axios.get(`http://localhost:9020/${storeName.slice(1)}`)
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
            console.log(decodedTokens)
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
            router.push(`${event.data.link}?section=tickets`)
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
        <div className='dashboard-container flex flex-col ' >
            <div className='add-event-container flex flex-col '>

                <div className='flex flex-row w-full h-full  gap-48' style={{ paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px' }}>


                    <div className='flex flex-col  ' style={{ height: '170px' }}>
                        <div></div>
                        <div className='text-right header-events-maneger' >

                            מנהל האירועים של {data?.name}

                        </div>
                        <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="18" height="4" rx="2" fill="#FBB03B" />
                        </svg>
                        <div style={{ height: '40%' }}></div>
                        <div style={{ paddingRight: '40px', width: '160px' }}>
                            <Button className='w-full' onPress={onOpen} color='primary'>אירוע חדש</Button>
                        </div>
                        <Modal size='full' className='event-modal-container dashboard-container2' isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalBody className='w-full h-full' style={{ padding: "8%", }}>
                                            <div className='flex flex-col w-full bg-white gap-6 h-full'
                                                style={{
                                                    gap: "20px", padding: "30px", borderRadius: "15px"

                                                }}>
                                                {cont &&
                                                    <div className='flex flex-row ' style={{ height: "500px", overflowY: "auto" }}>
                                                        <div className='flex flex-col w-full'>
                                                            <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                                                                <div className='opacity-70'>שם האירוע</div>
                                                                <Input label='Event name' onChange={handleName} />
                                                            </div>
                                                            <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                                                                <div className='opacity-70'>האירוע כולל מכירת כרטיסים?</div>
                                                                <Switch style={{ direction: 'ltr' }} isSelected={isTicketSale} onChange={() => { setIsTicketSale(!isTicketSale) }}>
                                                                    {isTicketSale ? "כן " : "לא"}
                                                                </Switch>
                                                            </div>
                                                        </div>
                                                        <div className='h-full' style={{ width: "350px" }}>
                                                            תמונה
                                                        </div>
                                                    </div>
                                                }
                                                {cont2 &&
                                                    <div className='flex flex-row' style={{ height: "500px", overflowY: "auto", }}>
                                                        <div className='flex flex-col w-full' style={{ gap: "30px" }}>
                                                            <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                                                                <DateRangePicker label='תאריכי האירוע'
                                                                    value={dateRange.length > 0 &&
                                                                        parseDateRange(dateRange)
                                                                    }
                                                                    onChange={handleDateRange} />
                                                            </div>
                                                            <div className='flex flex-col  text-right' style={{ width: '50%',direction: "ltr" }}>

                                                                <TimeInput hourCycle={24} label='שעת התחלה' onChange={handleStartTime} />
                                                            </div>
                                                            <div className='flex flex-col  text-right' style={{ width: '50%',direction: "ltr" }}>

                                                                <TimeInput hourCycle={24} label='שעת סיום' onChange={handleEndTime} />
                                                            </div>
                                                        </div>
                                                        <div className='h-full' style={{ width: "350px" }}>
                                                            תמונה
                                                        </div>
                                                    </div>
                                                }
                                                {cont3 &&
                                                    <div className='flex flex-row' style={{ height: "500px", overflowY: "auto" }}>
                                                        <div className='flex flex-col w-full'>
                                                            <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                                                                <div className='opacity-70'>מיקום האירוע</div>
                                                                <Input label='Event place' onChange={handlePlace} />
                                                            </div>
                                                        </div>
                                                        <div className='h-full' style={{ width: "350px" }}>
                                                            תמונה
                                                        </div>
                                                    </div>

                                                }
                                                {cont4 &&
                                                    <div className='flex flex-row' style={{ height: "500px", overflowY: "auto" }}>
                                                        <div className='flex flex-col w-full'>
                                                            <div>פרטי האירוע</div>
                                                            <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                                                                <div className='w-full flex flex-row ' style={{ padding: '5px', borderRadius: '15px', gap: '5px' }}>
                                                                    <div className='flex flex-row w-full' style={{ gap: '20%' }}>
                                                                        <div className='flex flex-col'>
                                                                            <div className=' flex flex-col gap-4' >
                                                                                <div className='image-event-cont cursor-pointer'
                                                                                    style={{
                                                                                        backgroundImage: `url(${tubnail})`,
                                                                                        backgroundSize: 'cover',
                                                                                        backgroundPosition: 'center', height: "200px"
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        setIsImage("image")
                                                                                        onOpen()
                                                                                    }}></div>
                                                                                <div className='w-full flex justify-center items-center'>
                                                                                    <Button color='secondary' variant='flat' onPress={onOpen3}> עשה זאת עם AI</Button>
                                                                                </div>
                                                                            </div>
                                                                            <Modal className='glass-background' style={{ color: 'white' }} size='5xl' isOpen={isOpen3} onOpenChange={onOpenChange3}>
                                                                                <ModalContent>
                                                                                    {(onClose) => (
                                                                                        <>
                                                                                            <ModalHeader style={{ direction: 'ltr' }} className="flex flex-col gap-1">riseAI</ModalHeader>
                                                                                            <ModalBody >
                                                                                                <div className='w-full flex flex-col items-center' style={{ height: '500px', gap: '15px', paddingBottom: '2%' }}>
                                                                                                    <div className='w-full flex justify-center h-full' style={{ borderRadius: '5px' }}>
                                                                                                        <div style={{ display: "flex", flexWrap: "wrap" }}>

                                                                                                            {images.map((img, index) => (
                                                                                                                <div
                                                                                                                    className="h-full relative"
                                                                                                                    onMouseEnter={() => {
                                                                                                                        setIsUsed(true);
                                                                                                                    }}
                                                                                                                    onMouseLeave={() => {
                                                                                                                        setIsUsed(false);
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <button
                                                                                                                        className="absolute"
                                                                                                                        style={{ top: "3px", right: "3px", color: 'white', backgroundColor: '#4285f4', borderRadius: '8px' }}
                                                                                                                        onClick={async () => {
                                                                                                                            await handleChangeTubnailAi(img);
                                                                                                                            onClose()
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        השתמש/י
                                                                                                                    </button>
                                                                                                                    <img
                                                                                                                        key={index}
                                                                                                                        src={img}
                                                                                                                        alt={`Generated ${index}`}
                                                                                                                        style={{ width: "250px", margin: "10px", height: "100%" }}
                                                                                                                    />
                                                                                                                </div>


                                                                                                            ))}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className='w-full' style={{ paddingRight: "15%", paddingLeft: "15%" }}>
                                                                                                        <Textarea onChange={(e) => { setPrompt(e.target.value) }} style={{}} label={'איזו תמונה תרצה היום...'} />
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <Button onPress={() => {
                                                                                                            handleSentImages()
                                                                                                        }} isDisabled={prompt.length === 0} color='primary'>צור תמונת נושא</Button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </ModalBody>
                                                                                            <ModalFooter>

                                                                                                <Button color="primary" onPress={onClose}>
                                                                                                    סיום
                                                                                                </Button>
                                                                                            </ModalFooter>
                                                                                        </>
                                                                                    )}
                                                                                </ModalContent>
                                                                            </Modal>
                                                                        </div>
                                                                        <div className='w-full flex flex-col   font-semibold items-start' >
                                                                            <div className='flex flex-row w-full justify-between'>
                                                                                <div> תיאור האירוע</div>
                                                                                <div><Button onPress={""} color='primary'>עשה/י זאת עם AI</Button></div>
                                                                            </div>
                                                                            <div className='flex justify-center items-center' style={{ width: "300px", height: "300px" }}>
                                                                                <ReactQuill
                                                                                    value={content}
                                                                                    className='bg-white quil'
                                                                                    style={{ position: 'static', height: '100%', paddingBottom: '35%', paddingLeft: '3%', width: '350px', paddingRight: '3%', paddingTop: '3%', borderRadius: '15px' }}
                                                                                    onChange={handleChange}
                                                                                    theme="snow"
                                                                                    placeholder="Type here..."
                                                                                    modules={{
                                                                                        toolbar: [
                                                                                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                                                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                                                                            [{ 'align': [] }],
                                                                                            ['link', 'image'],
                                                                                            ['clean']                                         // remove formatting button
                                                                                        ]
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='flex flex-row gap-4 w-full'>


                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className='h-full' style={{ width: "350px" }}>
                                                            תמונה
                                                        </div>
                                                    </div>
                                                }
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
                                                <div className='w-full flex flex-row  items-center '>
                                                    <div style={{ width: "350px", height: "50px" }}>

                                                        <Button color='primary' className='w-full h-full' onClick={() => {
                                                            if (cont) {
                                                                setCont1(false)
                                                                setCont2(true)
                                                            } else if (cont2) {
                                                                setCont2(false)
                                                                setCont3(true)
                                                            } else if (cont3) {
                                                                setCont3(false)
                                                                setCont4(true)
                                                            } else if (cont4) {
                                                                setCont4(false)
                                                                setCont5(true)
                                                            } else if (cont5 && isTicketSale) {
                                                                setCont5(false)
                                                                setCont6(true)
                                                            } else if (cont5 && !isTicketSale) {
                                                                handleAddEvent()
                                                            }
                                                            else if (cont6) {
                                                                handleAddEvent()
                                                            }
                                                        }}>
                                                            {(cont5 && !isTicketSale || cont6) ? 'יצירת אירוע': "המשך"}
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className='w-full flex flex-row  items-center gap-4' style={{ minHeight: "70px" }}>
                                                    {(cont4 || cont5 && isTicketSale) &&
                                                        <div style={{ width: "70px", height: "40px" }}>

                                                            <Button color='primary' radius='full' variant='flat' className='w-full h-full' onClick={() => {
                                                                if (cont4) {
                                                                    setCont4(false)
                                                                    setCont5(true)
                                                                } else if (cont5) {
                                                                    setCont5(false)
                                                                    setCont6(true)
                                                                }
                                                            }}>דלג</Button>
                                                        </div>
                                                    }
                                                    {!cont &&
                                                        <div style={{ width: "70px", height: "40px" }}>
                                                            <Button color='danger' radius='full' variant='light' className='w-full h-full' onClick={() => {
                                                                if (cont2) {
                                                                    setCont1(true)
                                                                    setCont2(false)
                                                                } else if (cont3) {
                                                                    setCont2(true)
                                                                    setCont3(false)
                                                                } else if (cont4) {
                                                                    setCont3(true)
                                                                    setCont4(false)
                                                                } else if (cont5) {
                                                                    setCont4(true)
                                                                    setCont5(false)
                                                                } else if (cont6) {
                                                                    setCont5(true)
                                                                    setCont6(false)
                                                                }
                                                            }}>חזור</Button>
                                                        </div>
                                                    }
                                                </div>

                                            </div>
                                        </ModalBody>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
                <Divider className='bg-white opacity-70' />
            </div>
            <div className='flex flex-col w-full h-full0' style={{ color: "#252323" }}>
                <div className='flex flex-col'>
                    <div className='w-full flex ' style={{ height: '30%', paddingRight: '5%', fontSize: '35px', fontWeight: 'bolder' }}>
                        <div>
                            האירועים שלך
                        </div>
                    </div>
                    <div className='main-container-event flex flex-row w-full h-full justify-center' style={{ paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px' }}>
                        <EventSlider data={events} store={data} />
                    </div>
                    <div className='w-full flex ' style={{ height: '30%', paddingRight: '5%', fontSize: '35px', fontWeight: 'bolder' }}>
                        <div>
                            אירועים קשורים
                        </div>
                    </div>
                    <div className='main-container-event flex flex-row w-full h-full justify-center' style={{ paddingRight: '20px', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px' }}>
                        <EventConnection data={connectionEv} store={data} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EventManneger

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