"use client"
import React, { useState, useEffect } from 'react'
import { User } from "@nextui-org/user";
import axios from 'axios';
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Drawer, DrawerContent, DrawerHeader, Avatar, DrawerBody, DrawerFooter, AvatarGroup, } from "@nextui-org/react";
import { useAdmin } from '../contexts/admin/AdminEventsProvider';
const NavbarEvent = () => {
    const pathName = usePathname()
    const [cookie, setCookie, removeCookie] = useCookies('user')
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { admin, setAdmin } = useAdmin();
    const [team2, setTeam2] = useState([])
    const [data, setData] = useState('')
    const search = useSearchParams()
    const router = useRouter()
    const { decodedToken, isExpired } = useJwt(cookie.user)
    const [events, setEvents] = useState([])
    const getEvents = async () => {
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(pathName)}`)
        setEvents(getAllEvents.data.events)
        setTeam2(getAllEvents.data?.team)
    }
    const getUser = async () => {
        const user = await axios.get(`http://localhost:9020/getuser/${decodedToken?.email}`)
        setData(user?.data)
    }
    function getStringAfterSecondSlash(path) {
        const parts = path.split('/');
        return parts[3] || null; // Returns the third part, or null if it doesn't exist
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

    useEffect(() => {
        if (decodedToken) {
            getUser()
            getEvents()
        }
    }, [decodedToken])

    useEffect(() => {
        handleCheckAdmin()
    }, [team2])

    return (
        <>

            <div>
              <Button variant='bordered' isIconOnly onPress={() => onOpen2()} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.62 11H6C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9H15.62C16.1723 9 16.62 9.44772 16.62 10C16.62 10.5523 16.1723 11 15.62 11Z" fill="black" />
                  <path d="M6 14H18.82C19.3723 14 19.82 14.4477 19.82 15C19.82 15.5523 19.3723 16 18.82 16H6C5.44772 16 5 15.5523 5 15C5 14.4477 5.44772 14 6 14Z" fill="black" />
                </svg>

              </Button>


              <Drawer placement='top' isOpen={isOpen2} onOpenChange={onOpenChange2}>
                <DrawerContent>
                  {(onClose) => (
                    <>

                      <DrawerBody>
                        <div className='flex flex-row cursor-default flex-wrap '
                          style={{ padding: "10px", rowGap: "20px", columnGap: "10px" }}>
                          <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                            router.push(`/events/main/${events?._id}`)
                            onClose()
                          }} key="main">
                            <div className='w-full flex flex-col gap-1 relative'>
                              <div>
                                ראשי
                              </div>
                              <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '74px' }}>
                                <div>עצבו דפי נחיתה מותאמים אישית בקלות עם כלי עיצוב אינטואיטיביים ותבניות גמישות</div>
                                <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                  <AvatarGroup max={2}>
                                    <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                  </AvatarGroup>
                                </div>
                              </div>
                            </div>
                            <div className='borderSlot'></div>
                          </div>
                          <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                            router.push(`/events/design/${events?._id}`)
                            onClose()
                          }} key="main">
                            <div className='w-full flex flex-col gap-1 relative'>
                              <div>
                                עיצוב
                              </div>
                              <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '74px' }}>
                                <div>עצבו דפי נחיתה מותאמים אישית בקלות עם כלי עיצוב אינטואיטיביים ותבניות גמישות</div>
                                <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                  <AvatarGroup max={2}>
                                    <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                  </AvatarGroup>
                                </div>
                              </div>
                            </div>
                            <div className='borderSlot'></div>
                          </div>
                          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר' && events.isTicketSale) &&
                            <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                              router.push(`/events/tickets/${events?._id}`)
                              onClose()
                            }} key="tickets">         <div className='w-full flex flex-col gap-1 relative'>
                                <div>
                                  כרטיסים
                                </div>
                                <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '84px' }}>
                                  <div>צרו כרטיסים דיגיטליים מותאמים אישית במהירות ובקלות עם כלים פשוטים ו-AI</div>
                                  <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                    <AvatarGroup max={2}>
                                      <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    </AvatarGroup>
                                  </div>
                                </div>
                              </div>
                              <div className='borderSlot'></div></div>
                          }
                          {(admin === 'בעלים' || admin === 'יוצר') &&
                            <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                              router.push(`/events/budgets/${events?._id}`)
                              onClose()
                            }} key="5">         <div className='w-full flex flex-col gap-1 relative'>
                                <div>
                                  תקציבים
                                </div>
                                <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '74px' }}>
                                  <div>נהלו תקציבים בקלות וביעילות עם כלים חכמים ותצוגה נוחה להתאמה אישית</div>
                                  <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                    <AvatarGroup max={2}>
                                      <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    </AvatarGroup>
                                  </div>
                                </div>
                              </div>
                              <div className='borderSlot'></div></div>
                          }
                          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
                            <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                              router.push(`/events/analitycs/${events?._id}`)
                              onClose()
                            }} key="4">        <div className='w-full flex flex-col gap-1 relative'>
                                <div>
                                  אנליזה
                                </div>
                                <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '74px' }}>
                                  <div>נתחו נתונים בקלות עם כלים מתקדמים ותובנות ברורות בזמן אמת</div>
                                  <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                    <AvatarGroup max={2}>
                                      <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    </AvatarGroup>
                                  </div>
                                </div>
                              </div>
                              <div className='borderSlot'></div></div>
                          }
                          {(admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
                            <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                              router.push(`/events/team/${events?._id}`)
                              onClose()
                            }} key="3">         <div className='w-full flex flex-col gap-1 relative'>
                                <div>
                                  צוות
                                </div>
                                <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '74px' }}>
                                  <div>נהלו את צוותכם ביעילות עם כלים נוחים לתקשורת, שיתוף פעולה וניהול ספקים</div>
                                  <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                    <AvatarGroup max={2}>
                                      <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    </AvatarGroup>
                                  </div>
                                </div>
                              </div>
                              <div className='borderSlot'></div></div>
                          }
                          {(admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
                            <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                              router.push(`/events/customers/${events?._id}`)
                              onClose()
                            }} key="2">     <div className='w-full flex flex-col gap-1 relative'>
                                <div>
                                  לקוחות
                                </div>
                                <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '85px' }}>
                                  <div>נהלו את לקוחותיכם בצורה חכמה עם כלים לניהול קשרי לקוחות ותובנות AI </div>
                                  <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                    <AvatarGroup max={2}>
                                      <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    </AvatarGroup>
                                  </div>
                                </div>
                              </div>
                              <div className='borderSlot'></div></div>
                          }
                          <div style={{ width: '30px' }}></div>
                          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'עובד כללי' || admin === 'יוצר') &&
                            <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                              router.push(`/events/adds/${events?._id}`)
                              onClose()
                            }} key="2">        <div className='w-full flex flex-col gap-1 relative'>
                                <div>
                                  פרסום
                                </div>
                                <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '84px' }}>
                                  <div>נהלו קמפיינים פרסומיים בקלות עם כלים מתקדמים ותובנות לשיפור הביצועים</div>
                                  <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                    <AvatarGroup max={2}>
                                      <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    </AvatarGroup>
                                  </div>
                                </div>
                              </div>
                              <div className='borderSlot'></div></div>
                          }
                          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'יוצר') &&
                            <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} onClick={() => {
                              router.push(`/events/cuppons/${events?._id}`)
                              onClose()
                            }} key="2">
                              <div className='w-full flex flex-col gap-1 relative'>
                                <div>
                                  קופונים
                                </div>
                                <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '74px' }}>
                                  <div>צרו וניהלו קופונים בקלות עם כלים גמישים להתאמה אישית</div>
                                  <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                    <AvatarGroup max={2}>
                                      <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    </AvatarGroup>
                                  </div>
                                </div>
                              </div>
                              <div className='borderSlot'></div></div>
                          }
                          {(admin === 'יחצן' || admin === 'מפיק' || admin === 'בעלים' || admin === 'עובד כללי' || admin === 'יוצר') &&
                            <div className='flex flex-row h-24 slot-menue-drawer' style={{ width: '230px', height: '130px' }} key="delete" onClick={() => {
                              router.push(`/events/scanner/${events?._id}`)

                              onClose()
                            }} >
                              <div className='w-full flex flex-col gap-1 relative'>
                                <div>
                                  סורק
                                </div>
                                <div className='flex flex-col' style={{ opacity: '50%', fontSize: '13px', paddingLeft: '84px' }}>
                                  <div>סרקו כרטיסים בקלות ובמהירות עם כלי סריקה מתקדמים ונוחים לשימוש</div>
                                  <div className='absolute' style={{ bottom: '0', left: '5px', direction: 'ltr' }}>
                                    <AvatarGroup max={2}>
                                      <Avatar className="w-6 h-6 text-tiny" size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                      <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                    </AvatarGroup>
                                  </div>
                                </div>
                              </div>
                              <div className='borderSlot'></div>
                            </div>
                          }
                        </div>
                      </DrawerBody>

                    </>
                  )}
                </DrawerContent>
              </Drawer>

              <Tooltip showArrow color='primary' content={<div>היומן של {events?.name}</div>}>
                <Button variant='ffe' onPress={() => { router.push(`/events/calendar/${events?._id}`) }} isIconOnly>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9 3.57H17C19.7614 3.57 22 5.80858 22 8.57V17.57C22 20.3314 19.7614 22.57 17 22.57H7C5.67392 22.57 4.40215 22.0432 3.46447 21.1055C2.52678 20.1679 2 18.8961 2 17.57V8.57C2 5.80858 4.23858 3.57 7 3.57H7.1V1.75C7.1 1.33579 7.43579 1 7.85 1C8.26421 1 8.6 1.33579 8.6 1.75V3.57H15.4V1.75C15.4 1.33579 15.7358 1 16.15 1C16.5642 1 16.9 1.33579 16.9 1.75V3.57ZM7.5 9.66H16.5C16.9142 9.66 17.25 9.32421 17.25 8.91C17.25 8.49579 16.9142 8.16 16.5 8.16H7.5C7.08579 8.16 6.75 8.49579 6.75 8.91C6.75 9.32421 7.08579 9.66 7.5 9.66Z" fill="#252323" />
                  </svg>

                </Button>
              </Tooltip>
              <Tooltip showArrow color='primary' content={'משימות'}>
                <Button variant='ffe' onPress={() => { router.push(`/events/missions/${events?._id}`) }} isIconOnly><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.62012 14.75C1.62012 13.5074 2.62748 12.5 3.87012 12.5H7.37012C8.61276 12.5 9.62012 13.5074 9.62012 14.75V18.25C9.62012 19.4926 8.61276 20.5 7.37012 20.5H3.87012C2.62748 20.5 1.62012 19.4926 1.62012 18.25V14.75Z" fill="#252323" />
                  <path d="M13.6201 13.75C13.2059 13.75 12.8701 14.0858 12.8701 14.5C12.8701 14.9142 13.2059 15.25 13.6201 15.25H18.6201C19.0343 15.25 19.3701 14.9142 19.3701 14.5C19.3701 14.0858 19.0343 13.75 18.6201 13.75H13.6201Z" fill="#34a853" />
                  <path d="M21.6201 17.75H13.6201C13.2059 17.75 12.8701 18.0858 12.8701 18.5C12.8701 18.9142 13.2059 19.25 13.6201 19.25H21.6201C22.0343 19.25 22.3701 18.9142 22.3701 18.5C22.3701 18.0858 22.0343 17.75 21.6201 17.75Z" fill="#fbbc05" />
                  <path d="M1.62012 5.5C1.62012 4.39543 2.51555 3.5 3.62012 3.5H19.6201C20.7247 3.5 21.6201 4.39543 21.6201 5.5V8.5C21.6201 9.60457 20.7247 10.5 19.6201 10.5H3.62012C2.51555 10.5 1.62012 9.60457 1.62012 8.5V5.5Z" fill="#252323" />
                </svg></Button>
              </Tooltip>
            </div>

        </>
    )
}

export default NavbarEvent