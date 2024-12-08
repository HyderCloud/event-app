"use client"
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Main from './Main'
import Tickets from './Tickets'
import { Team } from './Team'
import Cuppons from './Cuppons'
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip,
  Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@nextui-org/react";
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import Adds from './Adds'
import Missions from './Missions'
import Budgets from './Budgets'
import Calendar from './Calendar'
import { list } from 'postcss'
import Image from 'next/image'
const EventComp = ({ }) => {
  const [isDroped, setIsDroped] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [socket, setSocket] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies()
  const [messages, setMessages] = useState([]);
  const { decodedToken, isExpired } = useJwt(cookie.user)
  const [team2, setTeam2] = useState([])
  const [user, setUser] = useState([])
  const [admin, setAdmin] = useState('')
  const icon = <div >
    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="4" rx="2" fill="#FBB03B" />
    </svg> </div>
  const router = useRouter()
  const [events, setEvents] = useState([])
  const path = usePathname()
  const searchParams = useSearchParams();
  const [chat, setChat] = useState('')
  const [chat2, setChat2] = useState('')
  const section = searchParams.get('section');
  const scrollableDivRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  };
  const getchat = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/chat/${events._id}`)
    setChat2(getAllEvents.data.chat)
    scrollToBottom()

  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && chat.length > 0) {
      console.log("Enter key was pressed!");
      handleSendChat()
    }
  };

  const getUser = async () => {
    const getUser1 = await axios.get(`http://localhost:9020/getuser/${decodedToken?.email}`)
    setUser(getUser1?.data)
  }



  const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
    setEvents(getAllEvents.data.events)
    setTeam2(getAllEvents.data?.team)
  }
  function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[2] || null; // Returns the third part, or null if it doesn't exist
  }
  const handleCheckAdmin = () => {
    let isAdminFound = false;

    for (let index = 0; index < team2?.length; index++) {
      const item = team2[index];
      if (item?.key === decodedToken?.user_id) {
        setAdmin(item.admin);
        isAdminFound = true;
        break; // Exit the loop if condition is true
      }
    }
    if (!isAdminFound) {
      setAdmin("visitor");
    }
  }

  const handleSendChat = async () => {
    setChat('')
    await axios.post(`http://localhost:7000/chat/${getStringAfterSecondSlash(path)}`, {
      message: {
        key: events._id,
        from: user.username,
        profile: user.pr_image,
        content: chat
      }
    })
    scrollToBottom()
    await axios.post(`http://localhost:9020/addmessage`, {
      data: {
        key: events._id,
        from: user.username,
        profile: user.pr_image,
        content: chat
      }
    })

  }

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    if (events?._id) {
      getchat()
    }
  }, [events])

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:7000/ws/chase/${getStringAfterSecondSlash(path)}`);

    ws.onopen = () => {
      console.log(`Connected to WebSocket server as ${getStringAfterSecondSlash(path)}`);
      setSocket(ws);
    }

    ws.onmessage = (event) => {

      const message2 = JSON.parse(event.data);
      scrollToBottom()
      setChat2((prevMessages) => [...prevMessages, message2]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (ws) ws.close();
    };
  }, [])

  useEffect(() => {
    if (decodedToken) {
      getUser()
      handleCheckAdmin()
    }
  }, [decodedToken, admin, team2])

  return (
    <div className='dashboard-container  flex flex-col'>
      <div className='w-full navbar-event flex flex-row items-center   ' style={{ paddingRight: '5%' }}>
        <Tooltip placement='bottom' isOpen={isDroped} content={<div className='flex flex-row cursor-default flex-wrap'
          style={{ padding: "10px", rowGap: "20px", columnGap: "50px" }}>
          <div className='flex h-24' style={{ width: '200px', height: '100px' }} onClick={() => {
            router.push(`${path}`)
            setIsDroped(false)
          }} key="main">ראשי</div>
          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר' && events.isTicketSale) &&
            <div className='flex' style={{ width: '200px', height: '100px' }} onClick={() => {
              router.push(`${path}?section=tickets`)
              setIsDroped(false)
            }} key="tickets">כרטיסים</div>
          }
          {(admin === 'בעלים' || admin === 'יוצר') &&
            <div className='flex' style={{ width: '200px', height: '100px' }} onClick={() => {
              router.push(`${path}?section=budget`)
              setIsDroped(false)
            }} key="5">תקציבים</div>
          }
          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
            <div className='flex' style={{ width: '200px', height: '100px' }} onClick={() => {
              router.push(`${path}?section=statistics`)
              setIsDroped(false)
            }} key="4">סטטיסטיקה</div>
          }
          {(admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
            <div className='flex' style={{ width: '200px', height: '100px' }} onClick={() => {
              router.push(`${path}?section=team`)
              setIsDroped(false)
            }} key="3">צוות</div>
          }
          {(admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
            <div className='flex' style={{ width: '200px', height: '100px' }} onClick={() => {
              router.push(`${path}?section=client`)
              setIsDroped(false)
            }} key="2">לקוחות</div>
          }
          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'עובד כללי' || admin === 'יוצר') &&
            <div className='flex' style={{ width: '200px', height: '100px' }} onClick={() => {
              router.push(`${path}?section=add`)
              setIsDroped(false)
            }} key="2">פרסום</div>
          }
          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
            <div className='flex' style={{ width: '200px', height: '100px' }} onClick={() => {
              router.push(`${path}?section=cuppons`)
              setIsDroped(false)
            }} key="2">קופונים</div>
          }
          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'עובד כללי' || admin === 'יוצר') &&
            <div className='flex' style={{ width: '200px', height: '100px' }} key="delete" onClick={() => {
              router.push(`${path}?section=scanner`)
              setIsDroped(false)
            }} >
              סורק
            </div>
          }
        </div>}>
          <Button variant='bordered' isIconOnly onPress={() => setIsDroped(!isDroped)} >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.62 11H6C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9H15.62C16.1723 9 16.62 9.44772 16.62 10C16.62 10.5523 16.1723 11 15.62 11Z" fill="black"/>
<path d="M6 14H18.82C19.3723 14 19.82 14.4477 19.82 15C19.82 15.5523 19.3723 16 18.82 16H6C5.44772 16 5 15.5523 5 15C5 14.4477 5.44772 14 6 14Z" fill="black"/>
</svg>

          </Button>
        </Tooltip>


        <Tooltip showArrow color='primary' content={<div>היומן של {events?.name}</div>}>
          <Button variant='ffe' onPress={() => { router.push(`${path}?section=calendar`) }} isIconOnly>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9 3.57H17C19.7614 3.57 22 5.80858 22 8.57V17.57C22 20.3314 19.7614 22.57 17 22.57H7C5.67392 22.57 4.40215 22.0432 3.46447 21.1055C2.52678 20.1679 2 18.8961 2 17.57V8.57C2 5.80858 4.23858 3.57 7 3.57H7.1V1.75C7.1 1.33579 7.43579 1 7.85 1C8.26421 1 8.6 1.33579 8.6 1.75V3.57H15.4V1.75C15.4 1.33579 15.7358 1 16.15 1C16.5642 1 16.9 1.33579 16.9 1.75V3.57ZM7.5 9.66H16.5C16.9142 9.66 17.25 9.32421 17.25 8.91C17.25 8.49579 16.9142 8.16 16.5 8.16H7.5C7.08579 8.16 6.75 8.49579 6.75 8.91C6.75 9.32421 7.08579 9.66 7.5 9.66Z" fill="#252323" />
            </svg>

          </Button>
        </Tooltip>
        <Tooltip showArrow color='primary' content={'משימות'}>
          <Button variant='ffe' onPress={() => { router.push(`${path}?section=mission`) }} isIconOnly><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.62012 14.75C1.62012 13.5074 2.62748 12.5 3.87012 12.5H7.37012C8.61276 12.5 9.62012 13.5074 9.62012 14.75V18.25C9.62012 19.4926 8.61276 20.5 7.37012 20.5H3.87012C2.62748 20.5 1.62012 19.4926 1.62012 18.25V14.75Z" fill="#252323" />
            <path d="M13.6201 13.75C13.2059 13.75 12.8701 14.0858 12.8701 14.5C12.8701 14.9142 13.2059 15.25 13.6201 15.25H18.6201C19.0343 15.25 19.3701 14.9142 19.3701 14.5C19.3701 14.0858 19.0343 13.75 18.6201 13.75H13.6201Z" fill="#34a853" />
            <path d="M21.6201 17.75H13.6201C13.2059 17.75 12.8701 18.0858 12.8701 18.5C12.8701 18.9142 13.2059 19.25 13.6201 19.25H21.6201C22.0343 19.25 22.3701 18.9142 22.3701 18.5C22.3701 18.0858 22.0343 17.75 21.6201 17.75Z" fill="#fbbc05" />
            <path d="M1.62012 5.5C1.62012 4.39543 2.51555 3.5 3.62012 3.5H19.6201C20.7247 3.5 21.6201 4.39543 21.6201 5.5V8.5C21.6201 9.60457 20.7247 10.5 19.6201 10.5H3.62012C2.51555 10.5 1.62012 9.60457 1.62012 8.5V5.5Z" fill="#252323" />
          </svg></Button>
        </Tooltip>
      </div>
      <div className='w-full h-full'>
        <Modal size='4xl' className='glass-payment' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader style={{ paddingLeft: '5%', paddingRight: '5%' }} className="flex flex-col gap-1 ">הצא'ט של {events.name}</ModalHeader>
                <ModalBody>
                  <div style={{ height: '410px', paddingBottom: '6%', color: 'white', gap: '10px' }}>
                    <div ref={scrollableDivRef} className='w-full flex flex-col h-full' style={{ gap: '10px', overflow: 'auto', paddingBottom: '20px' }}>
                      {chat2?.map((item, id) => {
                        return (
                          <div>
                            {item.from === user.username ?
                              <div className=' w-full flex flex-row items-center' style={{ gap: '10px' }} key={id}>

                                <div style={{
                                  height: '30px', width: '30px', backgroundImage: `url(${item.profile})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  borderRadius: '50px'
                                }}>

                                </div>
                                <div className={`message-style glass-background-message flex flex-col`}>
                                  <div style={{ opacity: '70%' }}>{item.from}</div>
                                  <div>{item.content}</div>
                                </div>
                              </div> : <div>
                                <div className=' w-full flex flex-row items-center justify-end' style={{ gap: '10px', paddingLeft: '20px' }} key={id}>


                                  <div className={`message-style glass-background flex flex-col`}>
                                    <div style={{ opacity: '70%', textAlign: 'left' }}>{item.from}</div>
                                    <div>{item.content}</div>
                                  </div>

                                  <div style={{
                                    height: '30px', width: '30px', backgroundImage: `url(${item.profile})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '50px'
                                  }}>

                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        )
                      })}
                    </div>
                    <div style={{ paddingLeft: '8%', paddingRight: '8%', position: 'relative', maxHeight: '60px', paddingTop: '10px' }}>
                      {/* Textarea */}

                      <Textarea
                        onKeyDown={handleKeyDown}
                        value={chat}
                        onChange={(e) => { setChat(e.target.value) }}
                        className='chat-Input'
                        variant='bordered'
                        disableAutosize
                        style={{
                          height: '60px',
                          overflowY: 'auto',
                          resize: 'none',
                        }}
                        placeholder='תכתוב הודעה....'
                      />

                      {/* Icon positioned on the Textarea */}
                      <Button onPress={handleSendChat} isDisabled={chat.length === 0} isIconOnly
                        style={{
                          cursor: 'pointer',
                          background: '#34a853',
                          borderRadius: '100px',
                          position: 'absolute',
                          top: '70%', // Center vertically on the textarea
                          right: '5px', // Adjust icon position horizontally
                          transform: 'translateY(-50%)', // Center adjustment

                        }}
                      >
                        <svg
                          style={{ cursor: 'pointer' }}
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_229_4)">
                            <path
                              d="M28.5364 17.5101L12.7841 26.5358C12.6509 26.6135 12.497 26.6483 12.3433 26.6353C12.1896 26.6224 12.0437 26.5624 11.9253 26.4635C11.807 26.3646 11.722 26.2316 11.682 26.0827C11.6419 25.9338 11.6488 25.7761 11.7016 25.6312L14.6121 17.244C14.6703 17.0808 14.6686 16.9023 14.6074 16.7402L11.5387 8.40952C11.4832 8.26564 11.4734 8.10815 11.5106 7.95849C11.5478 7.80884 11.6303 7.67429 11.7467 7.57318C11.8632 7.47207 12.0079 7.40931 12.1613 7.39346C12.3147 7.37761 12.4693 7.40943 12.604 7.48459L28.5242 16.2108C28.6413 16.2735 28.7394 16.3666 28.8082 16.4802C28.877 16.5939 28.914 16.724 28.9153 16.8568C28.9165 16.9897 28.882 17.1204 28.8154 17.2354C28.7487 17.3503 28.6524 17.4452 28.5364 17.5101Z"
                              stroke="white"
                              strokeWidth="2.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.702 16.9913L20.6945 16.9346"
                              stroke="white"
                              strokeWidth="2.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_229_4">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="matrix(0.700389 -0.713761 -0.713761 -0.700389 17.1299 33.9396)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </Button>
                    </div>


                  </div>
                </ModalBody>
                <ModalFooter>
                  <div style={{ height: '20px' }}></div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {!section && <Main data={events} admin={admin} />}
        
        {(events.isTicketSale && section === 'tickets') && <Tickets admin={admin} />}
        {section === "team" && <Team admin2={admin} />}
        {section === "cuppons" && <Cuppons admin={admin} />}
        {section === "add" && <Adds admin2={admin} />}
        {section === "mission" && <Missions admin={admin} />}
        {section === "budget" && <Budgets admin={admin} />}
        {section === "calendar" && <Calendar admin={admin} />}
        <div className='absolute chat-btn glass-background-chat' style={{ left: '15px', bottom: '50px' }}>
          <Button className='w-full h-full' onPress={() => {
            scrollToBottom()
            onOpen()
          }} isIconOnly variant='kff'><svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.49994 2.22024C10.1802 2.07399 10.8741 2.00025 11.5699 2.00024C14.3518 1.98663 17.0031 3.1792 18.8385 5.26971C20.6739 7.36021 21.5134 10.1435 21.1399 12.9002C20.5399 17.5002 15.9999 21.2202 11.3599 21.2202H4.69994C4.13381 21.2205 3.60916 20.9233 3.31819 20.4377C3.02722 19.9521 3.0127 19.3493 3.27994 18.8502L3.54994 18.3302C3.81866 17.8294 3.79959 17.2232 3.49994 16.7402C1.82164 14.1018 1.53349 10.8114 2.72768 7.92145C3.92187 5.03152 6.44873 2.90429 9.49994 2.22024ZM11.2799 19.7102C15.3566 19.6459 18.8235 16.7185 19.5699 12.7102C19.909 10.3873 19.2106 8.03269 17.6599 6.27024C16.1239 4.51251 13.9042 3.50291 11.5699 3.50024C10.9787 3.50137 10.3891 3.56167 9.80993 3.68024C7.23508 4.25314 5.09972 6.04251 4.08517 8.47742C3.07063 10.9123 3.30366 13.6885 4.70993 15.9202C5.30823 16.8601 5.35032 18.0504 4.81993 19.0302L4.54993 19.5402C4.52795 19.5736 4.52795 19.6169 4.54993 19.6502C4.58993 19.7102 4.64993 19.7102 4.64993 19.7102H11.2799Z" fill="white" />
            </svg></Button>
        </div>
      </div>
    </div>
  )
}

export default EventComp