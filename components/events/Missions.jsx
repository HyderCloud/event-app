import React, { useRef, useEffect, useState } from 'react';
import { TimeInput, Card, CardHeader, CardBody, User, Link, Accordion, AccordionItem, Textarea, Spacer, CardFooter, Divider, DatePicker, Input, Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import 'swiper/css/virtual';
import Image from 'next/image';

const Missions = ({ admin }) => {
  const [isLoadingSelect, setIsLoadingSelect] = useState(false)
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const status_u = [{ text: "בתהליך", color: '#fbbc05' }, { text: "בהמתנה", color: '#71717A' }, { text: "סיום", color: '#34a853' }, { text: "ביטול", color: '#ae4335' }]
  const [cookie, setCookie, removeCookie] = useCookies('')
  const { decodedToken, isExpired } = useJwt(cookie.store)

  const [match, setMatch] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const path = usePathname()
  const [section1, setSection1] = useState(false)
  const [team, setTeam] = useState([])
  const [events, setEvents] = useState([])
  const [waiting, setWaiting] = useState([])
  const [waitWorkers, setWaitWorkers] = useState([])
  const [role, setRole] = useState([])
  const [searchTem, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scale, setScale] = useState(1);
  const [items, setItems] = useState([

  ]);
  const [isPanning, setIsPanning] = useState(false);
  const [isMode, setIsMode] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // Months are zero-based, so we add 1
    const day = now.getDate();
    const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Pad minutes to ensure two digits
    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}`;
    return (formattedDateTime);
  };

  const addMissionDoc = {
    title: title,
    key: getStringAfterSecondSlash(path),
    content: description,
    startDate: startDate,
    endDate: endDate,
    endTime: endTime,
    participent: waitWorkers,
    when: getCurrentDateTime(),
    from: decodedToken?.name,
    x: 50,
    y: 50,
    width: 400,
    height: 200,
    connections: []
  }

  const handleEndTime = (time) => {
    const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
    setEndTime(formattedTime)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)

  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
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




  function isIdUnique(id) {
    const exists = waitWorkers?.some(item => item._id === id);
    return !exists; // Returns true if id is unique, false if it exists
  }
  const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
    setEvents(getAllEvents.data.events)
    setTeam(getAllEvents.data?.team)
    setRole(getAllEvents.data.events.roles)

  }
  const gethandleMission = async () => {
    const getAllMissions = await axios.get(`http://localhost:9020/missions/${getStringAfterSecondSlash(path)}`)
    setItems(getAllMissions?.data?.missions)
    console.log(getAllMissions?.data?.missions)
  }
  const handleUpdatemission = async () => {
    await axios.post(`http://localhost:8000/notify/event/${getStringAfterSecondSlash(path)}`, {
      message: 'Hello, Event!'
    })

  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = team.filter(item =>
      item.name.toLowerCase().startsWith(term.toLowerCase())
    );
    setMatch(filtered);
  };
  function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[2] || null;
  }
  useEffect(() => {
    getEvents()
    gethandleMission()

    const ws = new WebSocket(`ws://localhost:8000/ws/notification/${getStringAfterSecondSlash(path)}`);

    ws.onopen = () => {
      console.log(`Connected to WebSocket server as ${getStringAfterSecondSlash(path)}`);
      setSocket(ws);
    }

    ws.onmessage = (event) => {
      // Handle incoming messages from the server
      const message = JSON.parse(event.data);
      console.log(message)
      getEvents()
      gethandleMission()
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (ws) ws.close();
    };

    // Set up the WebSocket event listeners
  }, [])
  // Filter data by names that start with the search term
  function removeElementAtIndex(arr, index) {
    // Check if the index is within bounds
    if (index < 0 || index >= arr.length) {
      return arr; // Return the original array if index is invalid
    }
    const newArray = [...arr];
    newArray.splice(index, 1);

    return newArray;
  }



  const handleUpdateStatus = async (status, id) => {
    const result = await axios.patch(`http://localhost:9020/updatestatus/${getStringAfterSecondSlash(path)}`, { status: status, id: id })
    if (result?.data?.acknowledge) {
      await handleUpdatemission()
      setIsLoadingSelect(false)
    }
  }




  const handleAddNotification = (data) => {
    data.map(async (item) => {
      await axios.post(`http://localhost:8000/notify/${item?.key}`, { message: item })
    })
  }
  const handleAddMisiion = async (data) => {

    const result = await axios.post(`http://localhost:9020/addmission/${getStringAfterSecondSlash(path)}`, { data: data, request: waiting })
    if (result?.data?.acknowledge) {
      await gethandleMission()
    }
  }


  return (
    <div className='flex flex-col h-full w-full' style={{ gap: '10px' }}>
      {(admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
        <div className='flex flex-row justify-between'>
          <Button color='primary' onPress={onOpen} style={{ color: 'white' }}>
            הוסף משימה
          </Button>

        </div>
      }
      <div className='' style={{ padding: '5px' }}>
        <Swiper
          style={{ padding: '5px' }}
          slidesPerView={3.5}
          spaceBetween={2}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Virtual]}
          virtual
        >

          {items && items.map((item, index) => (
            <SwiperSlide key={index} >
              <div className=' flex flex-col'
                style={{
                  height: '550px', width: '350px', borderRadius: '15px', padding: '10px', gap: '10px', backgroundColor: 'white',
                  boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                }}>
                <div className='w-full flex flex-row items-center justify-between' style={{ height: '50px', borderBottom: '1px solid white', paddingLeft: '45%' }}>

                  <div style={{ fontSize: '20px', fontWeight: 'bolder' }}>{item.title}</div>
                  <Image
                    src={require('@/image/thumbtack.png')}
                    alt='jfdjg'
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <div className='w-full flex flex-row items-center justify-between' style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                    <dv>תאריך:</dv>
                    <div style={{ opacity: '70%', direction: 'ltr' }}>
                      {item.startDate}-{item.endDate}
                    </div>
                  </div>
                  <div className='w-full flex flex-row items-center justify-between' style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                    <div>שעת סיום:</div>
                    <div style={{ opacity: '70%', direction: 'ltr' }}>{item.endTime}</div>
                  </div>
                  <div >
                    <Accordion style={{ paddingTop: '20px', color: '#252323' }}>
                      <AccordionItem key="1" aria-label="Accordion 1" title={<div style={{}}>תיאור המשימה</div>}
                        className='w-full glass-background' style={{ borderRadius: '15px', padding: "10px", maxHeight: '200px', overflow: 'auto' }} >
                        <div style={{ color: '#252323' }}>
                          {item.content}
                        </div>
                      </AccordionItem>
                    </Accordion>
                    <div className='flex justify-center items-center'
                      style={{ paddingTop: '20px', }}>
                      <Tooltip showArrow color='success' content={<div style={{}}>מרחב העבודה</div>}>
                        <Button isIconOnly className='flex justify-center items-center workspace-style'
                          style={{ borderRadius: '100px', height: '45px', width: "45px", }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7545 10.0367C10.3931 10.633 9.74729 10.9979 9.05006 11H5.11006C4.40573 11.0121 3.74698 10.6527 3.37584 10.054C3.0047 9.45524 2.97592 8.70541 3.30006 8.07998L5.30006 4.27998C5.6472 3.61905 6.33353 3.20648 7.08006 3.20998C7.8122 3.22123 8.47967 3.63168 8.82006 4.27998L10.8201 8.07998C11.1408 8.69906 11.116 9.44048 10.7545 10.0367ZM9.05006 8.99998L7.11006 5.20998L5.11006 8.99998H9.05006Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9001 7C20.9001 9.20914 19.1092 11 16.9001 11C14.6909 11 12.9001 9.20914 12.9001 7C12.9001 4.79086 14.6909 3 16.9001 3C19.1092 3 20.9001 4.79086 20.9001 7ZM18.9001 7C18.9001 5.89543 18.0046 5 16.9001 5C15.7955 5 14.9001 5.89543 14.9001 7C14.9001 8.10457 15.7955 9 16.9001 9C18.0046 9 18.9001 8.10457 18.9001 7Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9001 13H18.9001C20.0046 13 20.9001 13.8954 20.9001 15V19C20.9001 20.1046 20.0046 21 18.9001 21H14.9001C13.7955 21 12.9001 20.1046 12.9001 19V15C12.9001 13.8954 13.7955 13 14.9001 13ZM14.9001 19H18.9001V15H14.9001V19Z" fill="white" />
                            <path d="M10.7801 13C10.39 12.6123 9.7601 12.6123 9.37006 13L7.08006 15.27L4.78006 13C4.3833 12.6602 3.79187 12.6831 3.4225 13.0524C3.05313 13.4218 3.03029 14.0132 3.37006 14.41L5.66006 16.71L3.37006 19C3.0816 19.2861 2.9949 19.7183 3.15069 20.0935C3.30648 20.4687 3.6738 20.7124 4.08006 20.71C4.34383 20.7062 4.59543 20.5984 4.78006 20.41L7.08006 18.12L9.37006 20.41C9.55714 20.6009 9.81282 20.7089 10.0801 20.71C10.4845 20.7083 10.8481 20.4632 11.0013 20.0889C11.1546 19.7146 11.0672 19.2848 10.7801 19L8.49006 16.69L10.7801 14.39C11.1547 14.0024 11.1547 13.3876 10.7801 13Z" fill="white" />
                          </svg>
                        </Button>
                      </Tooltip>
                    </div>
                    <div className='h-full flex flex-col' style={{ paddingTop: '30px', gap: '10px', maxHeight: '200px', overflow: 'auto' }}>
                      <div>חברי צוות</div>
                      {item.participent.map((item2, index2) => {
                        return (
                          <div className='flex flex-row glass-background w-full items-center'
                            style={{ borderRadius: '15px', padding: '10px', gap: '10px', height: '60px' }}>

                            <div style={{
                              backgroundImage: `url(${item2.profile_img})`,
                              borderRadius: '15px',
                              backgroundSize: 'cover',
                              height: '30px',
                              width: '140px',
                              backgroundPosition: 'center'
                            }}></div>
                            <div className='w-full text-center'>{item2.name}</div>
                            <div className='w-full text-center'>{item2.profession} </div>

                            {item2.name === decodedToken.name ? <div className='w-full'
                              style={{ color: 'white', }}
                            >
                              <Select
                                isLoading={isLoadingSelect}
                                onChange={async (e) => {

                                  if (e.target.value === status_u[0].text) {
                                    console.log(items[index])
                                    items[index].participent[index2].status.text = e.target.value
                                    items[index].participent[index2].status.color = status_u[0].color
                                  } else if (e.target.value === status_u[1].text) {
                                    items[index].participent[index2].status.text = e.target.value
                                    items[index].participent[index2].status.color = status_u[1].color
                                    console.log(e.target.value)
                                  } else if (e.target.value === status_u[2].text) {
                                    items[index].participent[index2].status.text = e.target.value
                                    items[index].participent[index2].status.color = status_u[2].color
                                    console.log(e.target.value)
                                  } else if (e.target.value === status_u[3].text) {
                                    items[index].participent[index2].status.text = e.target.value
                                    items[index].participent[index2].status.color = status_u[3].color
                                    console.log(e.target.value)
                                  }
                                  setIsLoadingSelect(true)
                                  await handleUpdateStatus(items[index].participent, item._id)
                                }}

                                radius='full'
                                className='w-full flex items-center text-center justify-center h-full'
                                style={{ backgroundColor: item2.status.color, height: '100%' }}
                                startContent={<div style={{ color: 'white', width: '70px' }}>{item2.status.text}</div>}

                              >
                                {status_u.map((status) => (
                                  <SelectItem key={status.text} className='text-center' style={{ color: 'white', backgroundColor: status.color }}>
                                    <div>{status.text}</div>
                                  </SelectItem>
                                ))}
                              </Select>
                            </div> : <div className='w-full text-center'
                              style={{ borderRadius: '10px', backgroundColor: item2.status.color, }}>
                              {item2.status.text}
                            </div>}
                          </div>

                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div style={{ height: '' }}></div>
      <Modal size='5xl' style={{ width: '80%' }} className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>

        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הוסף משימה</ModalHeader>
              {section1 ?
                <div className='flex flex-row' style={{ paddingLeft: '20px' }}>
                  <ModalBody style={{ gap: '10px' }}>
                    <div className='flex flex-col w-full h-full add-partner-cont'>
                      <div className='style-displaying-role flex w-full  flex-row'>
                        {role?.map((item, index) => {
                          return (
                            <Tooltip showArrow className=' text-white' color='primary' content="סנן לפי">
                              <div onClick={() => {
                                setFilterBy(item)
                              }} className='role-style glass-background cursor-pointer' style={{ background: filterBy === item && '#006FEE' }}>
                                {item}
                              </div>
                            </Tooltip>
                          )
                        })}
                      </div>
                      <div className='class-result-output flex flex-row  overflow-x-auto'>

                        {waitWorkers?.map((item, index) => {
                          return (
                            <div className='flex items-center justify-center flex-col' style={{ width: '70px' }}>
                              <Tooltip className='cursor-pointer text-white' color='danger' onClick={() => {
                                const removedArr = removeElementAtIndex(waitWorkers, index)
                                setWaitWorkers(removedArr)
                              }} content="מחק">
                                <div className='img-user-added'>
                                  <Image className='cursor-pointer' style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} isBlurred radius='full'
                                    borderRadius="full" width={40} height={40}
                                    alt="NextUI hero Image"
                                    src={item.profile_img?.length === 0 ? `https://app.requestly.io/delay/5000/https` : `${item.profile_img}`} />
                                </div>
                              </Tooltip>
                              <div>
                                {item.name}
                              </div>

                              <div className='w-full justify-center flex glass-background2'>
                                {waiting[index]?.role}
                              </div>
                              <div className='w-full'>

                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div style={{ paddingLeft: '20%' }}>
                        <Input label='Search for' onChange={handleSearch} placeholder='חפש חבר צוות' />

                      </div>

                    </div>

                  </ModalBody>
                  <div className='searchResult flex flex-col'>

                    {match.length > 0 ? match.map((item, index) => {

                      return (
                        <Tooltip placement='right' showArrow key={item._id} content={'הוספה לצוות'}
                          color="primary">
                          <Button key={item._id} className='w-full user-match glass-background '
                            onPress={() => {
                              const isUnique = isIdUnique(item._id)
                              if (isUnique) {
                                let arr = item
                                arr["status"] = status_u[1]
                                setWaitWorkers([...waitWorkers, arr])
                                setWaiting([...waiting, {
                                  key: item.key, name: item.name
                                  , fromName: decodedToken.name, date: getCurrentDateTime(), isRead: false, message: "ברכות קיבלת משימה חדשה",
                                  title: title,
                                  link: `/${path}?section=mission`,
                                  btn: 'לפרטים'
                                }])
                              }
                              if (waitWorkers.length === 0) {
                                let arr = item
                                arr["status"] = status_u[1]
                                setWaitWorkers([...waitWorkers, arr])
                                setWaiting([...waiting, {
                                  key: item.key, name: item.name
                                  , fromName: decodedToken.name, date: getCurrentDateTime(), isRead: false, message: "ברכות קיבלת משימה חדשה",
                                  title: title,
                                  link: `/${decodedToken.name}/${getStringAfterSecondSlash(path)}?section=mission`,
                                  btn: 'לפרטים'
                                }])
                              }
                            }}
                            style={{ height: '70px' }}>
                            <User className='w-full flex  justify-start items-center'
                              name={<div className="w-full text-white flex flex-row justify-between" style={{ gap: '100%' }}>
                                <div className="flex"> {item.name}</div>
                                <div className="flex text-white opacity-70">{item.profession}</div>
                              </div>}
                              description={(
                                <div className='w-full flex flex-col'>
                                  <Link href={`/${item.name}`} size="sm" color='primary' isExternal>
                                    {item.email}
                                  </Link>
                                </div>
                              )}
                              avatarProps={{
                                src: item.profile_img
                              }}
                            />

                          </Button>
                        </Tooltip>
                      )
                    }) : team.map((item, index) => {

                      return (
                        <Tooltip placement='right' showArrow key={item._id} content={'הוספה לצוות'}
                          color="primary">
                          <Button key={item._id} className='w-full user-match glass-background '
                            onPress={() => {
                              const isUnique = isIdUnique(item._id)
                              if (isUnique) {
                                let arr = item
                                arr["status"] = status_u[1]
                                setWaitWorkers([...waitWorkers, arr])
                                setWaiting([...waiting, {
                                  key: item.key, name: item.name
                                  , fromName: decodedToken.name, date: getCurrentDateTime(), isRead: false, message: "ברכות קיבלת משימה חדשה",
                                  title: title,
                                  link: `/${decodedToken.name}/${getStringAfterSecondSlash(path)}?section=mission`,
                                  btn: 'לפרטים'
                                }])
                              }
                              if (waitWorkers.length === 0) {
                                let arr = item
                                arr["status"] = status_u[1]
                                setWaitWorkers([...waitWorkers, arr])
                                setWaiting([...waiting, {
                                  key: item.key, name: item.name
                                  , fromName: decodedToken.name, date: getCurrentDateTime(), isRead: false, message: "ברכות קיבלת משימה חדשה",
                                  title: title,
                                  link: `/${decodedToken.name}/${getStringAfterSecondSlash(path)}?section=mission`,
                                  btn: 'לפרטים'
                                }])
                              }
                            }}
                            style={{ height: '70px' }}>
                            <User className='w-full flex  justify-start items-center'
                              name={<div className="w-full text-white flex flex-row justify-between" style={{ gap: '100%' }}>
                                <div className="flex"> {item.name}</div>
                                <div className="flex text-white opacity-70">{item.profession}</div>
                              </div>}
                              description={(
                                <div className='w-full flex flex-col'>
                                  <Link href={`/${item.name}`} size="sm" color='primary' isExternal>
                                    {item.email}
                                  </Link>
                                </div>
                              )}
                              avatarProps={{
                                src: item.profile_img
                              }}
                            />

                          </Button>
                        </Tooltip>
                      )
                    })}
                  </div>

                </div> :
                <div className='flex flex-col justify-center  w-full'
                  style={{ paddingLeft: '30%', height: '400px', paddingRight: '30%', color: 'white', gap: '15px' }}>
                  <div className='flex flex-col w-full '>
                    <div className='opacity-70'>כותרת המשימה</div>
                    <Input onChange={handleTitle} label='Mission title' />
                  </div>
                  <div className='flex flex-col w-full '>
                    <div className='opacity-70'>תיאור המשימה</div>
                    <Textarea
                      onChange={handleDescription}
                      label="Description"
                      placeholder="...פרט על המשימה"
                      style={{ textAlign: 'right' }}
                    />
                  </div>
                  <div style={{ direction: 'ltr' }} className='flex flex-col w-full '>
                    <div className='opacity-70'>תאריך התחלה וסיום</div>
                    <DateRangePicker label='Event date' style={{ direction: 'ltr' }} onChange={handleDate} />
                  </div>
                  <div className='flex flex-col w-full ' style={{ direction: 'ltr' }}>
                    <div className='opacity-70'>שעת סיום</div>
                    <TimeInput hourCycle={24} label='End time' onChange={handleEndTime} />
                  </div>
                </div>
              }
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  setSection1(false)
                  onClose()
                  setSearchTerm('')
                }}>
                  סגור
                </Button>
                <Button color="primary" onPress={() => {
                  if (section1) {
                    onClose()
                    setSearchTerm('')
                    setSection1(false)
                  } else {
                    setSection1(true)
                  }
                  if (waiting.length > 0) {
                    handleAddNotification(waiting)
                    setItems([...items, addMissionDoc])
                    handleAddMisiion(addMissionDoc)
                    handleUpdatemission()
                  }
                }}>
                  {section1 ?
                    " הוסף לצוות" :
                    'לשלב הבא'
                  }
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  );
};

export default Missions;
