"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion';
import {
  TimeInput, Divider, DatePicker, Slider, Input, Image, Switch, Calendar,
  Popover, PopoverTrigger, PopoverContent,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  CheckboxGroup, User, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,
  Avatar
} from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import PieChart3D from '@/components/events/Cake.jsx'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/parallax';
import { Navigation, Pagination, Parallax } from 'swiper/modules';
import Link from 'next/link'
const Budgets = ({ admin }) => {
  const icon = <div >
    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="4" rx="2" fill="#4285F4" />
    </svg> </div>
  const [columnDefs] = useState([
    { field: 'name', width: 200 },
    { field: 'budget', width: 200 },
  ]);
  const swiper = useSwiper();
  const [index, setIndex] = useState(null)
  const [isUserOpen, setIsUserOpen] = useState(false)

  const [isUserOpenBudget, setIsUserOpenBudget] = useState(false)
  const [isUserOpenBudgetHover, setIsUserOpenBudgetHover] = useState(false)
  const [section1, setSection1] = useState(false)
  const [section2, setSection2] = useState(false)
  const [isCake, setIsCake] = useState(false)
  const [isSubCake, setIsSubCake] = useState(false)
  const [isButtonHover, setIsButtonHover] = useState(false)
  const [isButtonHover2, setIsButtonHover2] = useState(false)
  const [isButtonHover3, setIsButtonHover3] = useState(false)
  const [isButtonHover4, setIsButtonHover4] = useState(false)
  const [messages, setMessages] = useState([]);
  const [fieldUsers, setFieldUsers] = useState([])
  const [subBudget, setSubBudget] = useState(null)
  const [subTableBudget, setSubTableBudget] = useState(null)
  const [subIndex, setSubIndex] = useState(null)
  const [subIndexHover, setSubIndexHover] = useState(false)
  const [socket, setSocket] = useState(null);
  const [team, setTeam] = useState([])
  const [events, setEvents] = useState([])
  const [role, setRole] = useState([])
  const [amount, setAmount] = useState(0)
  const [field, setField] = useState([])
  const [grapghHover, setGraphHover] = useState(false)
  const [subGrapghHover, setSubGraphHover] = useState(false)
  const router = useRouter()
  const [section, setSection] = useState('')
  const path = usePathname()
  const [eventBudget, setEventBudget] = useState('')
  const [newBudget, setNewBudget] = useState(0)
  const [budget, setBudget] = useState([])
  const [changedField, setChangeField] = useState('')
  const [indexBud, setIndexBud] = useState(false)
  const [teamBudget, setTeamBudget] = useState([])
  const [currentNumber, setCurrentNumber] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDeleteHover, setIsDeleteHover] = useState(false)
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
  const { isOpen: isOpen4, onOpen: onOpen4, onOpenChange: onOpenChange4 } = useDisclosure();
  const { isOpen: isOpen5, onOpen: onOpen5, onOpenChange: onOpenChange5 } = useDisclosure();
  const { isOpen: isOpen6, onOpen: onOpen6, onOpenChange: onOpenChange6 } = useDisclosure();
  const { isOpen: isOpen7, onOpen: onOpen7, onOpenChange: onOpenChange7 } = useDisclosure();
  const [tableBudget, setTableBudget] = useState([])
  const [match, setMatch] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [waiting, setWaiting] = useState([])
  const [waitWorkers, setWaitWorkers] = useState([])
  const [searchTem, setSearchTerm] = useState('')
  const [teamBud, setTeamBud] = useState([])
  function removeByName(array, name) {
    return array.filter(item => item.name !== name);
  }
  function changeKeyToBudget(arr) {
    return arr.map(item => {
      const { y, ...rest } = item; // Destructure the item to exclude `y`
      console.log({ ...rest, budget: y })
      return { ...rest, budget: y }; // Add the new `budget` key
    });
  }
  function findNameIndex(arr, name) {
    return arr.findIndex(item => item.name === name);
  }
  const handleSearch = (e) => {
    setIsUserOpen(true)
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = teamBud.filter(item =>
      item.name.toLowerCase().startsWith(term.toLowerCase())
    );
    setMatch(filtered);
  };

  function roundUp(number) {
    return Math.ceil(number);
  }

  function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[2] || null; // Returns the third part, or null if it doesn't exist
  }
  function removeMatchingObjects(arr1, arr2) {
    // Create a new array to store removed objects
    const removedObjects = [];

    // Create a set of names from the second array for quick lookup
    const namesInArr2 = new Set(arr2.map(item => item.name));

    // Filter arr1 and collect removed objects
    const updatedArr1 = arr1.filter(item => {
      if (namesInArr2.has(item.name)) {
        // If the name exists in arr2, remove the item from arr1 and push to removedObjects
        removedObjects.push(item);
        return false; // Remove the item from arr1
      }
      return true; // Keep the item in arr1
    });
    setTeamBud(updatedArr1)
    return removedObjects;
  }
  const updateBudget = async (data) => {
    const result = await axios.patch(`http://localhost:9020/budget/${getStringAfterSecondSlash(path)}`, { budget: data })
    if (result.data.acknowledge) {
      console.log('hi')
      await handleUpdatemission()
    }
  }
  const handleUpdatemission = async () => {

    await axios.post(`http://localhost:8000/notify/event/${getStringAfterSecondSlash(path)}`, {
      message: 'Hello, Event!'
    })

  }
  function isIdUnique(id) {
    const exists = waitWorkers?.some(item => item._id === id);
    return !exists; // Returns true if id is unique, false if it exists
  }
  const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
    setEvents(getAllEvents.data.events)
    setTeam(getAllEvents.data?.team)
    setBudget(getAllEvents.data.events.budget)
    setTableBudget(changeKeyToBudget(getAllEvents.data.events.budget))
    setAmount(getSumOfNums(getAllEvents.data.events.budget))
    setField(extractNames(getAllEvents.data.events.budget))
    setRole(getAllEvents.data.events.roles)
    if (subTableBudget != null && subBudget != null) {
      setSubBudget(getAllEvents.data.events.budget[subIndex + 1]?.users)
      setSubTableBudget(changeKeyToBudget(getAllEvents.data.events.budget[subIndex + 1]?.users))
    }
  }
  function removeElementAtIndex(arr, index) {
    // Check if the index is within bounds
    if (index < 0 || index >= arr.length) {
      return arr; // Return the original array if index is invalid
    }
    const newArray = [...arr];
    newArray.splice(index, 1);

    return newArray;
  }
  function getSumOfNums(array) {
    return array.reduce((sum, current) => sum + current.y, 0);
  }
  function extractNames(array) {
    const names = array.map(item => item.name); // Extract names
    names.shift(); // Remove the first item (index 0)
    return names; // Return the modified array
  }
  useEffect(() => {
    getEvents()
    const ws = new WebSocket(`ws://localhost:8000/ws/notification/${getStringAfterSecondSlash(path)}`);

    ws.onopen = () => {
      console.log(`Connected to WebSocket server as ${getStringAfterSecondSlash(path)}`);
      setSocket(ws);
    }

    ws.onmessage = (event) => {
      console.log("martin")
      getEvents()

    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    };
    ws.onerror = (err) => {
      console.log("🚀 ~ useEffect ~ err:", err)
    }
    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (ws) ws.close();
    };

  }, [])
  useEffect(() => {
    let start = 0;
    const end = amount;
    const duration = 2000; // משך הזמן של העלייה (2 שניות)
    const incrementTime = 50; // זמן בין כל עדכון (50ms)
    const incrementStep = Math.ceil(end / (duration / incrementTime)); // מספר העדכונים בכל שנייה

    const interval = setInterval(() => {
      start += incrementStep;
      if (start >= end) {
        clearInterval(interval);
        setCurrentNumber(end); // להבטיח שהמספר הסופי יוגדר בצורה מדויקת
      } else {
        setCurrentNumber(start);
      }
    }, incrementTime);

    return () => clearInterval(interval); // נקודה טובה לנקות את ה-intervall אם הקומפוננטה נעלמת
  }, [amount]);
  return (
    <div className=' flex  items-center flex-col w-full  ' style={{ gap: '20px' }}>
      {/* modals */}
      <Drawer
        isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent >
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-white">קבע את תקציב האירוע</DrawerHeader>
              <DrawerBody style={{ padding: '5%' }}>
                <Input label='evnet budget' onChange={(e) => { setEventBudget(Number(e.target.value)) }} type='number' />
              </DrawerBody >
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={async () => {
                  const arr = [...events?.budget]
                  arr[0] = { name: 'תקציב', y: eventBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                  await updateBudget(arr)
                  onClose()
                }}>
                  צור תקציב
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <Drawer backdrop='' hideCloseButton classNames={{
        base: "bg-transparent shadow-none px-0 pb-0",

      }} isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <DrawerContent>
          {(onClose) => (
            <>
              {console.log(budget[0].y)}
              <DrawerBody className='flex justify-center' style={{}}>
                <div className='flex flex-col bg-white' style={{
                  height: "450px", padding: "15px", borderRadius: "15px", gap: "5px"
                  , boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", width: "350px"
                }}>
                  <div className='w-full flex flex-row items-center gap-2'>
                    <Button variant={(isButtonHover4) ? "flat" : 'dsfadsa'} color='danger' isIconOnly onMouseEnter={() => { setIsButtonHover4(true) }}
                      onMouseLeave={() => setIsButtonHover4(false)}
                      radius="full"
                      onPress={() => {
                        setSection('')
                        setNewBudget(0)
                        onClose()
                      }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="black" />
                      </svg></Button>
                    <div style={{ fontWeight: "bolder" }} >צור תקציב עבור תחום</div>
                  </div>
                  <div className='w-full flex flex-col gap-4 px-4'>
                    <Slider
                      isDisabled
                      color='secondary'
                      size='lg'
                      label="תקציב"
                      step={0.01}
                      style={{ direction: 'rtl' }}
                      maxValue={events.budget[0]?.y}
                      minValue={1}
                      value={newBudget}
                      defaultValue={budget[0]?.y / 2}
                      className={'text-white'}
                    />
                    <div className='flex flex-col gap-2'>
                      <div style={{ width: "65%" }}>
                        <Input label='שם התקציב ' variant='bordered' color='secondary'
                          onChange={(e) => { setSection(e.target.value) }} />
                      </div>
                      <div style={{ width: "40%" }}>
                        <Input label='סכום' color='secondary' variant='underlined'
                          maxValue={events.budget[0]?.y} onChange={(e) => { setNewBudget(Number(e.target.value)) }} type='number' />
                      </div>
                    </div>
                    <div style={{ paddingTop: "10%" }}>
                      <Button color="primary" isDisabled={newBudget === 0 || section.length < 2} onPress={async () => {
                        const arr = [...events?.budget]
                        arr[0] = { name: "תקציב", y: events.budget[0].y - newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                        arr.push({ name: section, y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } }, users: [{ name: section, y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }] })
                        await updateBudget(arr)
                        onClose()
                      }}>
                        צור תקציב
                      </Button>
                    </div>
                  </div>
                </div>
              </DrawerBody >
            </>
          )}
        </DrawerContent>
      </Drawer>
      <Drawer backdrop='' hideCloseButton classNames={{
        base: "bg-transparent shadow-none px-0 pb-0",

      }} isOpen={isOpen3} onOpenChange={onOpenChange3}>
        <DrawerContent>
          {(onClose) => (
            <>

              <DrawerBody className='flex justify-center' >
                <div className='flex flex-col bg-white' style={{
                  height: "450px", padding: "15px", borderRadius: "15px", gap: "5px"
                  , boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", width: "350px"
                }}>
                  <Button variant={(isButtonHover3) ? "flat" : 'dsfadsa'} color='danger' isIconOnly onMouseEnter={() => { setIsButtonHover3(true) }}
                    onMouseLeave={() => setIsButtonHover3(false)}
                    radius="full"
                    onPress={() => {
                      setSection('')
                      setNewBudget(0)
                      onClose()
                    }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="black" />
                    </svg>
                  </Button>
                  <div style={{ width: "80%" }}>
                    <Select
                      color='secondary'
                      variant='underlined'
                      items={field}
                      onChange={(e) => {
                        setChangeField(e.target.value)
                        setSection(e.target.value)
                      }}
                      label="בחר תחום"

                    >
                      {field.map((item, index) => (
                        <SelectItem color='secondary' variant='flat' onClick={() => {
                          setIndex(index)
                        }} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  {/* {index !== false && */}
                  <div className='flex flex-col' style={{ gap: '10px', }}>

                    <Slider
                      color='secondary'
                      label="budget"
                      step={0.01}
                      maxValue={events.budget[0]?.y + events.budget[index + 1]?.y}
                      minValue={1}
                      isDisabled
                      value={newBudget}
                      defaultValue={budget[0]?.y / 2}
                      size='lg'
                      className={'text-white'}
                    />
                    <div className='w-full flex flex-col gap-4'>
                      <div style={{ width: "60%" }}>
                        <Input minValue={1}
                          description={section.length > 0 ? `שנה את סכום ה-${section}, הסכום הנוכחי: ${budget[index + 1]?.y}` : ''}
                          color='secondary'
                          variant='bordered'
                          labelPlacement='outside'
                          label='סכום' maxValue={events.budget[0]?.y + events.budget[index + 1]?.y}
                          onChange={(e) => { setNewBudget(Number(e.target.value)) }} type='number' />
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row gap-4' style={{ paddingTop: "20%" }}>

                    <Button color="primary" isDisabled={newBudget === 0 || section.length < 2} onPress={async () => {
                      const arr = [...events?.budget]
                      arr[0] = { name: "תקציב", y: events.budget[0].y + (arr[index + 1].y - newBudget), dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                      if (index + 1 > 0) {
                        arr[index + 1] = { name: section, y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } }, users: arr[index + 1].users }
                      }
                      await updateBudget(arr)
                      setSection('')
                      setNewBudget(0)
                      setField([])
                      onClose()
                    }}>
                      שינוי תקציב
                    </Button>
                    <Button color='danger' isDisabled={section.length < 2} description="מחק את התחום הנבחר" variant='flat' onPress={() => {
                      setIndex(false)
                      onClose()
                    }}>מחק</Button>
                  </div>
                </div>
              </DrawerBody >
            </>
          )}
        </DrawerContent>
      </Drawer>
      <Drawer backdrop='' hideCloseButton classNames={{
        base: "bg-transparent shadow-none px-0 pb-0",

      }} isOpen={isOpen4} onOpenChange={onOpenChange4}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody className='flex flex-col justify-center' >
                <div className='flex flex-col bg-white' style={{
                  height: "450px", padding: "15px", borderRadius: "15px"
                  , boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset", width: "350px"
                }}>
                  <div className='w-full flex flex-row items-center gap-4'>
                    <Button variant={(isButtonHover2) ? "flat" : 'dsfadsa'} color='danger' isIconOnly onMouseEnter={() => { setIsButtonHover2(true) }}
                      onMouseLeave={() => setIsButtonHover2(false)}
                      radius="full"
                      onPress={() => {
                        setSection('')
                        setNewBudget(0)
                        onClose()
                      }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="black" />
                      </svg></Button>
                    <div style={{ fontWeight: "bolder" }}>{subTableBudget[0]?.name}</div>
                  </div>
                  <div className='flex flex-col ' style={{ padding: "20px" }}>
                    <Tooltip placement='bottom' isOpen={isUserOpen} showArrow content={
                      <div className=' flex flex-col gap-2' style={{ height: "300px", minWidth: "200px" }}>
                        <div className='flex flex-col'>
                          <Button variant='ff' onPress={() => { setIsUserOpen(false) }} isIconOnly>X</Button>

                        </div>
                        {match.length > 0 ? match.map((item, index) => {
                          return (
                            <div key={item._id} className='w-full onUserHover gap-1'
                              onClick={() => {
                                const isUnique = isIdUnique(item._id)
                                if (isUnique) {
                                  let arr = item

                                  setWaitWorkers([...waitWorkers, arr])

                                }
                                if (waitWorkers.length === 0) {
                                  let arr = item

                                  setWaitWorkers([...waitWorkers, arr])

                                }
                                const arr = [...events?.budget]
                                if (subIndex + 1 > 0) {
                                  const user = arr[subIndex + 1].users

                                  user.push({
                                    name: item.name,
                                    y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } }, profile: item.pr_image
                                  })
                                }
                              }}
                              style={{ height: '50px', width: "200px", padding: "8px" }}>
                              <User className='w-full flex  justify-start items-center'
                                name={<div className="w-full  flex flex-row justify-between" style={{ gap: '100%' }}>
                                  <div className="flex"> {item.name}</div>

                                </div>}
                                description={(
                                  <div className='w-full flex flex-col'>
                                    <Link href={`/${item.name}`} size="sm" color='primary' isExternal>
                                      {item.email}
                                    </Link>
                                  </div>
                                )}
                                avatarProps={{
                                  src: item.pr_image
                                }}
                              />
                              <Divider />
                            </div>

                          )
                        }) : teamBud.map((item, index) => {
                          return (
                            <div key={item._id} className='w-full onUserHover  gap-1'
                              onClick={async () => {
                                const isUnique = isIdUnique(item._id)
                                if (isUnique) {
                                  let arr = item
                                  setWaitWorkers([...waitWorkers, arr])

                                }
                                if (waitWorkers.length === 0) {
                                  let arr = item
                                  setWaitWorkers([...waitWorkers, arr])

                                }
                                const arr = [...events?.budget]
                                if (subIndex + 1 > 0) {
                                  const user = arr[subIndex + 1].users
                                  user.push({
                                    name: item.name,
                                    y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } }, profile: item.pr_image
                                  })
                                }
                                await updateBudget(arr)
                                setIsUserOpen(false)
                              }}
                              style={{ height: '50px', width: "200px", padding: "8px" }}>
                              <User className='w-full flex  justify-start items-center'
                                name={<div className="w-full flex flex-row justify-between" style={{ gap: '100%' }}>
                                  <div className="flex"> {item.name}</div>
                                </div>}
                                description={(
                                  <div className='w-full flex flex-col'>
                                    <Link href={`/${item.name}`} size="sm" color='primary' isExternal>
                                      {item.email}
                                    </Link>
                                  </div>
                                )}
                                avatarProps={{
                                  src: item.pr_image
                                }}
                              />
                              <Divider />
                            </div>

                          )
                        })}
                      </div>
                    }>
                      <div>
                        <Input label='חפש חבר צוות' placeholder='הוספת חברי צוות חדשים לתקציב' variant='underlined' onClick={() => { setIsUserOpen(!isUserOpen) }}
                          color='secondary' onChange={handleSearch} />
                      </div>
                    </Tooltip>

                  </div>
                  <div className='w-full h-full flex flex-col '>
                    <div className='flex w-full h-full flex-col gap-2'>
                      <div className='flex flex-col'>
                        <div>חברי הצוות</div>
                        <Divider />
                      </div>
                      <div className='flex flex-col w-full gap-4' style={{ overflowY: "auto", height: '80%' }}>
                        {waitWorkers?.map((items, index) => {
                          const arr2 = [...events?.budget]
                          const user2 = arr2[subIndex + 1].users
                          const indexUser2 = findNameIndex(user2, items.name)
                          return (
                            <div className='flex w-full flex-row justify-between onUserHover' onClick={() => { setIsUserOpenBudget(true) }}
                              onMouseEnter={() => { setIsUserOpenBudgetHover(index) }} onMouseLeave={() => {
                                setIsUserOpenBudgetHover(false)
                                setIsUserOpenBudget(false)
                              }}
                              style={{ gap: "1px", cursor: "pointer", padding: "5px" }}>
                              <Popover key={index} placement='bottom' isOpen={isUserOpenBudget && index === isUserOpenBudgetHover}
                                onOpenChange={setIsUserOpenBudget}>
                                <PopoverTrigger>
                                  <User
                                    avatarProps={{
                                      src: items.pr_image,
                                    }}
                                    description={`לחץ להגדרת סכום`}
                                    name={items.name}
                                  />
                                </PopoverTrigger>
                                <PopoverContent className='w-[200px]'>
                                  <div className='flex flex-col gap-4 ' style={{ paddingBottom: "10px" }}>
                                    <Button variant='light' onPress={() => setIsUserOpenBudget(false)} isIconOnly>X</Button>
                                    <Slider
                                      color='secondary'
                                      maxValue={events.budget[subIndex + 1].users[0].y}
                                      minValue={1}
                                      value={newBudget}
                                      defaultValue={budget[subIndex + 1].users[0]?.y / 2} />
                                    <Input
                                      label='סכום חדש'
                                      variant='faded'
                                      color='secondary'
                                      labelPlacement='outside'
                                      description={`הסכום הנוכחי: ${arr2[subIndex + 1].users[indexUser2]?.y}`}

                                      maxValue={events.budget[subIndex + 1].users[0].y}
                                      onChange={(e) => { setNewBudget(Number(e.target.value)) }}

                                      type='number'
                                    />
                                    <Button color='primary' onPress={async () => {
                                      const arr = [...events?.budget]
                                      const user = arr[subIndex + 1].users
                                      const indexUser = findNameIndex(user, items.name)
                                      arr[subIndex + 1].users[0] = { name: arr[subIndex + 1].users[0].name, y: user[0].y + (user[index + 1].y - newBudget), dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                                      arr[subIndex + 1].users[indexUser] = {
                                        name: items.name,
                                        y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } }, profile: items.pr_image
                                      }
                                      await updateBudget(arr)
                                      setIsUserOpenBudget(false)
                                      setNewBudget(0)
                                    }} variant='flat'>הגדר סכום</Button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                              {index === isUserOpenBudgetHover &&

                                <Button onPress={async () => {
                                  const arr = [...events?.budget]
                                  const worker = waitWorkers
                                  const user = arr[subIndex + 1].users
                                  const remove = removeByName(user, items.name)
                                  const removeWorker = removeByName(worker, items.name)
                                  arr[subIndex + 1].users = remove
                                  setWaitWorkers(removeWorker)
                                  removeMatchingObjects(team, arr[subIndex + 1].users)
                                  await updateBudget(arr)
                                }} onMouseEnter={() => { setIsDeleteHover(true) }}
                                  onMouseLeave={() => { setIsDeleteHover(false) }}
                                  radius='full' variant={isDeleteHover && 'flat'}
                                  isIconOnly><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.75 5H16.08L14.87 3.68C14.4271 3.24459 13.8311 3.00041 13.21 3H10.29C9.65816 3.00529 9.05413 3.26056 8.61 3.71L7.42 5H4.75C4.33579 5 4 5.33579 4 5.75C4 6.16421 4.33579 6.5 4.75 6.5H18.75C19.1642 6.5 19.5 6.16421 19.5 5.75C19.5 5.33579 19.1642 5 18.75 5ZM9.69 4.74C9.8496 4.58138 10.065 4.49163 10.29 4.49H13.21C13.4257 4.48936 13.6334 4.57171 13.79 4.72L14.04 4.99H9.46L9.69 4.74Z" fill="#252323" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.23 9.52V17C4.23 19.4632 6.22681 21.46 8.69 21.46H14.81C17.2732 21.46 19.27 19.4632 19.27 17V9.52C19.27 8.41543 18.3746 7.52 17.27 7.52H6.27C5.73267 7.50925 5.21363 7.71521 4.82986 8.09145C4.44609 8.4677 4.22989 8.98256 4.23 9.52ZM9.5 13.05C9.5 13.4642 9.16421 13.8 8.75 13.8C8.33579 13.8 8 13.4642 8 13.05V10.68C8 10.2658 8.33579 9.93 8.75 9.93C9.16421 9.93 9.5 10.2658 9.5 10.68V13.05ZM11.75 17.75C12.1642 17.75 12.5 17.4142 12.5 17V10.68C12.5 10.2658 12.1642 9.93 11.75 9.93C11.3358 9.93 11 10.2658 11 10.68V17C11 17.4142 11.3358 17.75 11.75 17.75ZM15.5 13.05C15.5 13.4642 15.1642 13.8 14.75 13.8C14.3358 13.8 14 13.4642 14 13.05V10.68C14 10.2658 14.3358 9.93 14.75 9.93C15.1642 9.93 15.5 10.2658 15.5 10.68V13.05Z" fill="#252323" />
                                  </svg></Button>
                              }
                            </div>
                          )

                        })}
                      </div>
                    </div>

                    <div>
                      <Button color="primary" onPress={() => {
                        onClose()
                        setSearchTerm('')
                        setNewBudget(0)
                        handleUpdatemission()
                        setWaitWorkers([])
                      }}>
                        סיים
                      </Button>
                    </div>
                  </div>
                </div>
              </DrawerBody>

            </>
          )}
        </DrawerContent>
      </Drawer>

      <div className='flex justify-between bg-white flex-row w-full' style={{ height: "350px", borderRadius: "20px", padding: "20px" }}>
        <div className='flex items-center flex-col w-full' style={{ backgroundColor: "#252323", borderRadius: "20px", padding: "25px" }}>
          <div className='flex justify-between flex-row w-full' >
            <motion.div className='flex-col'
              initial={{ opacity: 0 }} // Starts with zero opacity (invisible)
              animate={{ opacity: 1 }} // Animates to full opacity (visible)
              exit={{ opacity: 0 }} // Animates back to zero opacity on exit
              transition={{
                duration: 2.5, // The transition lasts 0.5 seconds
              }}
              style={{ color: "white", fontWeight: "bold", fontSize: "34px", }}>
              <div className='w-full'>מנהל התקציבים של- {events?.name}</div>
              {icon}
            </motion.div>
          </div>
          <div className='flex w-full relative gap-4 flex-row ' style={{ paddingRight: "5%", paddingLeft: "2%" }}>
            <motion.div className='bg-white flex flex-col'
              initial={{ y: '100vh' }} // Starts from below the screen (100vh)
              animate={{ y: 0 }} // Animates to the original position (y: 0)
              exit={{ y: '100vh' }} // Animates back to below the screen on exit
              transition={{
                type: 'spring', // Smooth, bouncy transition
                stiffness: 150, // Controls the bounce effect
                damping: 25, // Controls how smooth the animation feels
              }}
              style={{
                width: "45%", marginTop: "50px",
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', borderRadius: '20px', padding: '1%',
                height: '600px', transition: 'height 0.3s ease'
              }}>

              <div className='flex flex-col' style={{ gap: '25px' }}>
                <div className='w-full flex  justify-center'>
                  <div className='flex items-center flex-col text-center' style={{ width: '80%' }}>
                    <div className='style-lable-amount '>סכום התקציב הכולל</div>
                    {icon}
                    <div className='style-lable-amount-display ' style={{ fontWeight: "bolder" }}>{currentNumber}</div>
                  </div>
                </div>
                <Divider />
                <div className='w-full flex  flex-row ' style={{ paddingLeft: '2%', gap: "50px" }}
                  onMouseEnter={() => { setGraphHover(true) }} onMouseLeave={() => { setGraphHover(false) }}>

                  <div className='flex flex-col  h-full items-center ' style={{ width: "20%", borderLeft: "1px solid #11111126", paddingLeft: "10px" }}>
                    {(budget[0]?.y > 0 || budget.length > 1) &&
                      <div className='flex flex-col w-full h-full ' style={{ gap: '10px' }}>
                        {budget?.length < 1 &&
                          <div className='flex flex-col items-center'>
                            <Button variant='flat' onPress={onOpen} isDisabled={budget?.length > 1} isIconOnly color='primary'>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.44 2H12.56C17.7736 2 22 6.22643 22 11.44V12.56C22 17.7736 17.7736 22 12.56 22H11.44C6.22643 22 2 17.7736 2 12.56V11.44C2 6.22643 6.22643 2 11.44 2ZM12.75 12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H12.75V8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H11.25V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V12.75Z" fill="#4285f4" />
                              </svg>
                            </Button>
                            <div style={{ fontSize: "12px" }}>   יצירת תקציב</div>
                          </div>
                        }
                        <div className='flex flex-col items-center'>
                          <Button onPress={onOpen2} isIconOnly variant='flat'
                            isDisabled={budget[0]?.y <= 0} color='success'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.44 2H12.56C17.7736 2 22 6.22643 22 11.44V12.56C22 17.7736 17.7736 22 12.56 22H11.44C6.22643 22 2 17.7736 2 12.56V11.44C2 6.22643 6.22643 2 11.44 2ZM12.75 12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H12.75V8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H11.25V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V12.75Z" fill="#34a853" />
                            </svg>
                          </Button>
                          <div style={{ fontSize: "12px" }}>   הוספת תקציב</div>
                        </div>
                        <div className='flex flex-col items-center'>
                          <Button isIconOnly isDisabled={budget.length <= 1} variant='flat'
                            onPress={onOpen3} color='warning'> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.84344 21.2966L3.56343 22.0566C3.11868 22.1176 2.67107 21.9663 2.35462 21.6479C2.03817 21.3295 1.88962 20.8809 1.95344 20.4366L2.71343 15.1566C2.81211 14.4409 3.14223 13.7771 3.65343 13.2666L13.4034 3.52656C14.6588 2.22678 16.5178 1.7055 18.266 2.16308C20.0141 2.62066 21.3793 3.98588 21.8369 5.73403C22.2945 7.48218 21.7732 9.34119 20.4734 10.5966L10.7334 20.3566C10.2229 20.8678 9.55914 21.1979 8.84344 21.2966ZM12.2334 10.7066C11.941 10.9994 11.941 11.4737 12.2334 11.7666C12.5263 12.059 13.0006 12.059 13.2934 11.7666L17.5034 7.55656C17.7788 7.26105 17.7707 6.80055 17.4851 6.51494C17.1994 6.22933 16.7389 6.22121 16.4434 6.49656L12.2334 10.7066Z" fill="#fbbc05" />
                            </svg></Button>
                          <div style={{ fontSize: "12px" }}>   שינוי תקציב</div>
                        </div>
                        <div className='flex flex-col items-center'>
                          <Button isIconOnly className='buttonfade' radius='full' variant='flat' color='danger' onPress={async () => {
                            const arr = [{ name: "תקציב", y: 0, dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }]
                            await updateBudget(arr)
                          }}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.82001 12.17C2.26247 13.7313 2.26247 16.2587 3.82001 17.82L7.10001 21.11H12.18L14.36 18.93L5.71001 10.28L3.82001 12.17Z" fill="#ea4335" />
                              <path d="M20.18 7.45L17.18 4.45C16.4297 3.69889 15.4116 3.27686 14.35 3.27686C13.2884 3.27686 12.2703 3.69889 11.52 4.45L10.42 5.56L19.07 14.21L20.17 13.1C21.7303 11.5415 21.7348 9.01407 20.18 7.45Z" fill="#ea4335" />
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.42 17.87L6.77001 9.22L9.37001 6.62L18.02 15.27L15.42 17.87ZM15.96 14.21C15.96 13.7958 15.6242 13.46 15.21 13.46H14.1C13.6858 13.46 13.35 13.7958 13.35 14.21C13.35 14.6242 13.6858 14.96 14.1 14.96H15.21C15.6242 14.96 15.96 14.6242 15.96 14.21ZM13 11.23C13.4142 11.23 13.75 11.5658 13.75 11.98C13.75 12.3942 13.4142 12.73 13 12.73H11.87C11.4558 12.73 11.12 12.3942 11.12 11.98C11.12 11.5658 11.4558 11.23 11.87 11.23H13ZM11.51 9.75C11.51 9.33579 11.1742 9 10.76 9H9.65001C9.23579 9 8.90001 9.33579 8.90001 9.75C8.90001 10.1642 9.23579 10.5 9.65001 10.5H10.76C11.1742 10.5 11.51 10.1642 11.51 9.75Z" fill="#ea4335" />
                            </svg></Button>
                          <div style={{ fontSize: "12px" }}>   איפוס תקציב</div>
                        </div>
                        <Divider />
                        <div className='flex flex-col items-center'>
                          <Button onPress={() => { setIsCake(!isCake) }} isIconOnly variant='flat'
                            isDisabled={budget[0]?.y <= 0} color='primary'>
                            {isCake ?
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.29847 6.25C1.66598 3.42873 4.07855 1.25 7 1.25H17C19.9214 1.25 22.334 3.42873 22.7015 6.25H1.29847ZM1.25 7.75V17C1.25 20.1756 3.82436 22.75 7 22.75H17C20.1756 22.75 22.75 20.1756 22.75 17V7.75H1.25Z" fill="#4285f4" />
                              </svg> :
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 6C11 5.44772 10.5506 4.99356 10.0026 5.06242C8.77376 5.21683 7.59275 5.65513 6.55544 6.34824C5.23985 7.22729 4.21446 8.47672 3.60896 9.93853C3.00346 11.4003 2.84504 13.0089 3.15372 14.5607C3.4624 16.1126 4.22433 17.538 5.34315 18.6569C6.46197 19.7757 7.88743 20.5376 9.43928 20.8463C10.9911 21.155 12.5997 20.9965 14.0615 20.391C15.5233 19.7855 16.7727 18.7602 17.6518 17.4446C18.3449 16.4072 18.7832 15.2262 18.9376 13.9974C19.0064 13.4494 18.5523 13 18 13H12.5C11.6716 13 11 12.3284 11 11.5V6Z" fill="#4285f4" stroke="#4285f4" stroke-width="1.5" />
                                <path d="M14 4C14 3.44772 14.45 2.99268 14.9966 3.07131C15.5731 3.15423 16.1383 3.30896 16.6788 3.53284C17.5281 3.88463 18.2997 4.40024 18.9497 5.05025C19.5998 5.70026 20.1154 6.47194 20.4672 7.32122C20.691 7.86171 20.8458 8.4269 20.9287 9.00339C21.0073 9.55005 20.5523 10 20 10L14.2 10C14.0895 10 14 9.91046 14 9.8V4Z" fill="#004493" stroke="#004493" stroke-width="1.5" />
                              </svg>
                            }
                          </Button>
                          <div style={{ fontSize: "12px" }}> {isCake ? "הצגה בטבלה" : "הצגה בגרף"}</div>
                        </div>
                      </div>
                    }
                  </div>
                  <div
                    className="ag-theme-quartz"
                    style={{
                      width: '100%',
                      overflowy: 'auto', 
                      height: "400px"
                    }}
                  >
                    {isCake ?
                      <PieChart3D data={budget} title={"420"} /> :
                      <AgGridReact
                        rowData={tableBudget}
                        columnDefs={columnDefs}
                     
                      ></AgGridReact>
                    }
                  </div>
                </div>
              </div>
            </motion.div>
            <div className='flex flex-col' style={{ width: "60%", marginTop: "120px", gap: "25px" }}>
              <Swiper
                parallax={{ enabled: true }}

                slidesPerView={4}
                spaceBetween={0}
                pagination={{
                  clickable: true,
                }}

                modules={[Pagination, Parallax]}
                className=' flex flex-row w-full' style={{ height: "220px", paddingLeft: "5%", }}>
                {budget.slice(1)?.map((item, index) => {
                  return (
                    <SwiperSlide key={index} style={{ height: "180px", width: "180px" }}>
                      <motion.div className={` flex items-center justify-center flex-col bg-white`}
                        transition={{
                          // delay: 0.5,
                          type: 'spring', // Smooth, bouncy transition
                          stiffness: 130, // Controls the bounce effect
                          damping: 25, // Controls how smooth the animation feels
                        }}

                        initial={{ scale: 0.8, x: -50, x: '-100vw' }}
                        animate={{ scale: subIndex === index ? 0.92 : 1, x: 0 }}
                        whileHover={{
                          scale: 0.92,
                          transition: { type: 'spring', stiffness: 200 } // Smooth spring effect
                        }}
                        onClick={() => {
                          setSubBudget(item?.users)
                          setSubTableBudget(changeKeyToBudget(item?.users))
                          setSubIndex(index)
                          setIsButtonHover(false)
                        }} style={{
                          height: "180px", width: "180px",
                          cursor: "pointer",
                          boxShadow: " rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                          border: subIndex === index && "3px solid #006FEE", borderRadius: "15px",

                        }}>
                        <div style={{ fontWeight: "bolder", fontSize: "16px" }}>
                          תקציב  {item?.name}
                        </div>
                        <div >
                          <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="18" height="4" rx="2" fill={subIndex === index ? "#4285F4" : "purple"} />
                          </svg> </div>
                      </motion.div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>

              {(subTableBudget != null && subBudget != null) ?
                <motion.div className='w-full bg-white flex   flex-col'
                  initial={{ x: '-100vw' }}
                  animate={{ x: 0 }}
                  transition={{
                    type: 'spring', // Smooth, bouncy transition
                    stiffness: 150, // Controls the bounce effect
                    damping: 25, // Controls how smooth the animation feels
                  }}
                  style={{
                    minHeight: "300px",
                    boxShadow: " rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                    borderRadius: "5px"
                  }}>
                  <div className='w-full flex flex-row items-center' style={{ gap: "20px", padding: "8px", }}>
                    <div>
                      <Button variant={(isButtonHover) ? "flat" : 'dsfadsa'} color='danger' isIconOnly onMouseEnter={() => { setIsButtonHover(true) }}
                        onMouseLeave={() => setIsButtonHover(false)}
                        radius="full"
                        onPress={() => {
                          setSubIndex(null)
                          setSubBudget(null)
                          setSubTableBudget(null)
                        }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="black" />
                        </svg></Button>
                    </div>
                    <div style={{ fontWeight: "bolder" }}>
                      תקציב {subTableBudget[0]?.name}
                    </div>
                  </div>
                  <div className='flex flex-row ' style={{ padding: "8px", gap: "20px" }}>
                    <div className='flex flex-col' style={{ width: "20%" }}>
                      <div className=' flex flex-col' style={{ gap: '5px' }}>
                        <div className='flex flex-col items-center'>
                          <Button isIconOnly variant='flat' onPress={() => {
                            const arr = [...events?.budget]
                            const user = arr[subIndex + 1].users
                            const result = removeMatchingObjects(team, user)
                            setWaitWorkers(result)
                            onOpen4()
                          }} className='buttonfade' color='primary'> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.18 11.35C13.8176 11.3502 15.1528 10.0373 15.18 8.40001V7.28001C15.1801 6.61528 14.9134 5.97834 14.4396 5.51209C13.9658 5.04583 13.3247 4.78928 12.66 4.80001H11.71C10.3443 4.80551 9.24003 5.91424 9.24004 7.28001V8.40001C9.26663 10.0142 10.5659 11.3179 12.18 11.35Z" fill="#4285f4" />
                              <path d="M22.78 16.51L22.66 15C22.5303 14.2417 21.8793 13.683 21.11 13.67H16.79C16.7238 13.6597 16.6563 13.6597 16.59 13.67C16.2068 13.2395 15.6564 12.9953 15.08 13H9.29004C8.67968 12.9973 8.10151 13.2735 7.72004 13.75C7.55665 13.6903 7.38401 13.6598 7.21004 13.66H2.89004C2.11763 13.6739 1.46545 14.2377 1.34004 15L1.22004 16.56C1.11955 17.0384 1.23502 17.5368 1.53567 17.9222C1.83632 18.3077 2.29157 18.541 2.78004 18.56H7.33004C7.41974 18.5703 7.51034 18.5703 7.60004 18.56C7.99666 18.9978 8.55932 19.2482 9.15004 19.25H15.22C15.7928 19.2473 16.339 19.0085 16.73 18.59H21.22C21.7262 18.576 22.1984 18.3318 22.5022 17.9266C22.8061 17.5215 22.9084 16.9999 22.78 16.51Z" fill="#4285f4" />
                              <path d="M19 12.11C20.2151 12.11 21.2 11.125 21.2 9.91001V9.06001C21.2002 8.56057 20.9985 8.08227 20.6406 7.73386C20.2828 7.38544 19.7993 7.19651 19.3 7.21001H18.6C17.5783 7.21001 16.75 8.03828 16.75 9.06001V9.91001C16.7499 10.5022 16.9885 11.0695 17.412 11.4836C17.8354 11.8976 18.4079 12.1235 19 12.11Z" fill="#4285f4" />
                              <path d="M5.05004 12.11C6.26507 12.11 7.25004 11.125 7.25004 9.91001V9.06001C7.25004 8.03828 6.42177 7.21001 5.40004 7.21001H4.70004C3.67831 7.21001 2.85004 8.03828 2.85004 9.06001V9.91001C2.85004 11.125 3.83501 12.11 5.05004 12.11Z" fill="#4285f4" />
                            </svg></Button>
                          <div style={{ fontSize: "12px" }}>נהל את צוות התקציב</div>
                        </div>
                        <div className='flex flex-col items-center'>
                          <Button onPress={() => { setIsSubCake(!isSubCake) }} isIconOnly variant='flat'
                            isDisabled={budget[0]?.y <= 0} color='secondary'>
                            {isSubCake ?
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.29847 6.25C1.66598 3.42873 4.07855 1.25 7 1.25H17C19.9214 1.25 22.334 3.42873 22.7015 6.25H1.29847ZM1.25 7.75V17C1.25 20.1756 3.82436 22.75 7 22.75H17C20.1756 22.75 22.75 20.1756 22.75 17V7.75H1.25Z" fill="#7828C8" />
                              </svg> :
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 6C11 5.44772 10.5506 4.99356 10.0026 5.06242C8.77376 5.21683 7.59275 5.65513 6.55544 6.34824C5.23985 7.22729 4.21446 8.47672 3.60896 9.93853C3.00346 11.4003 2.84504 13.0089 3.15372 14.5607C3.4624 16.1126 4.22433 17.538 5.34315 18.6569C6.46197 19.7757 7.88743 20.5376 9.43928 20.8463C10.9911 21.155 12.5997 20.9965 14.0615 20.391C15.5233 19.7855 16.7727 18.7602 17.6518 17.4446C18.3449 16.4072 18.7832 15.2262 18.9376 13.9974C19.0064 13.4494 18.5523 13 18 13H12.5C11.6716 13 11 12.3284 11 11.5V6Z" fill="#7828C8" stroke="#7828C8" stroke-width="1.5" />
                                <path d="M14 4C14 3.44772 14.45 2.99268 14.9966 3.07131C15.5731 3.15423 16.1383 3.30896 16.6788 3.53284C17.5281 3.88463 18.2997 4.40024 18.9497 5.05025C19.5998 5.70026 20.1154 6.47194 20.4672 7.32122C20.691 7.86171 20.8458 8.4269 20.9287 9.00339C21.0073 9.55005 20.5523 10 20 10L14.2 10C14.0895 10 14 9.91046 14 9.8V4Z" fill="#481878" stroke="#481878" stroke-width="1.5" />
                              </svg>
                            }
                          </Button>
                          <div style={{ fontSize: "12px" }}> {isSubCake ? "הצגה בטבלה" : "הצגה בגרף"}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: "420px" }}>
                      <div
                        className="ag-theme-quartz"
                        style={{
                          width: '100%',
                          overflowX: 'auto', // Enable horizontal scrolling
                        }}
                      >
                        {isSubCake ?
                          <div style={{ height: "220px" }}>
                            <PieChart3D title={"220"} data={subBudget} />
                          </div> :
                          <AgGridReact
                            rowData={subTableBudget}
                            columnDefs={columnDefs}
                            domLayout="autoHeight"
                          ></AgGridReact>
                        }
                      </div>
                    </div>
                  </div>
                </motion.div> :
                <div>

                </div>
              }

            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '50px' }}>

      </div>
    </div>
  )
}

export default Budgets

