"use client"
import {
    Button, Input, Tooltip, Avatar, AvatarGroup, Chip, Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure, Accordion, AccordionItem, Select, SelectItem
} from '@nextui-org/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { useAdmin } from '../contexts/admin/AdminEventsProvider'
const Design = () => {
    const [isLoadingSelect, setIsLoadingSelect] = useState(false)
      const { admin, setAdmin } = useAdmin();
    const router = useRouter()
    const status_u = [{ text: "בתהליך", color: '#fbbc05' }, { text: "בהמתנה", color: '#71717A' }, { text: "סיום", color: '#34a853' }, { text: "ביטול", color: '#ae4335' }]
    const [cookie, setCookie, removeCookie] = useCookies('')
    const { decodedToken, isExpired } = useJwt(cookie.store)
    const path = usePathname()
    const [isUserToll, setIsUserToll] = useState(false)
    const [isUserToll2, setIsUserToll2] = useState(false)
    const [isUserToll3, setIsUserToll3] = useState(false)
    const [isMissionToll, setIsMissionToll] = useState(false)
    const [isMissionToll2, setIsMissionToll2] = useState(false)
    const [isMissionToll3, setIsMissionToll3] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [mission, setMission] = useState([])
    const [events, setEvents] = useState([])
    const [newWorker, setNewWorker] = useState([])
    const [team, setTeam] = useState([])
    const [currentMission, setCurrentMission] = useState()
    const [match, setMatch] = useState([])
    const [match2, setMatch2] = useState([])
    const [editableSale, setEditableSale] = useState([])
    const [editableSale2, setEditableSale2] = useState([])
    const [editableSale3, setEditableSale3] = useState([])
    const [missionConnection, setMissionConnection] = useState([])
    const [missionConnection2, setMissionConnection2] = useState([])
    const [missionConnection3, setMissionConnection3] = useState([])
    const [searchTem, setSearchTerm] = useState('')
    const [searchTem2, setSearchTerm2] = useState('')
    
    const handleUpdateStatus = async (status, id) => {
        const result = await axios.patch(`http://localhost:9020/updatestatus/${getStringAfterSecondSlash(path)}`, { status: status, id: id })
        if (result?.data?.acknowledge) {

            setIsLoadingSelect(false)
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
    const gethandleMission = async () => {
        const getAllMissions = await axios.get(`http://localhost:9020/missions/${getStringAfterSecondSlash(path)}`)
        setMission(getAllMissions?.data?.missions)

    }
    const gethandleMissionbyId = async (id) => {
        const getAllMissions = await axios.get(`http://localhost:9020/missionbyid/${id}`)
        setCurrentMission(getAllMissions?.data?.mission)

    }
    const handleUpdateSellPage = async (data) => {
        const result = await axios.patch(`http://localhost:9020/sellPage/${getStringAfterSecondSlash(path)}`, { sellPage: data })
        setEditableSale2(result.data.sellPage.workers)
        setMissionConnection(result.data.sellPage.mission)
    }

    const handleUpdatePromoPage = async (data) => {
        const result = await axios.patch(`http://localhost:9020/promoPage/${getStringAfterSecondSlash(path)}`, { promoPage: data })
        setEditableSale(result.data.promoPage.workers)
        setMissionConnection(result.data.endPage.mission)
    }

    const handleUpdateEndPage = async (data) => {
        const result = await axios.patch(`http://localhost:9020/endPage/${getStringAfterSecondSlash(path)}`, { endPage: data })
        setEditableSale3(result.data.endPage.workers)
        setMissionConnection3(result.data.endPage.mission)
    }

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = team.filter(item =>
            item.name.toLowerCase().startsWith(term.toLowerCase())
        );
        setMatch(filtered);
    };
    const handleSearch2 = (e) => {
        const term = e.target.value;
        setSearchTerm2(term);
        const filtered = mission.filter(item =>
            item.title.toLowerCase().startsWith(term.toLowerCase())
        );
        setMatch2(filtered);
    };
    const getEvents = async () => {
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        setEditableSale(getAllEvents.data.events.promoPage.workers)
        setEditableSale2(getAllEvents.data.events.sellPage.workers)
        setEditableSale3(getAllEvents.data.events.endPage.workers)
        setMissionConnection(getAllEvents.data.events.promoPage.mission)
        setMissionConnection3(getAllEvents.data.events.endPage.mission)
        setMissionConnection2(getAllEvents.data.events.sellPage.mission)
        setNewWorker(getAllEvents.data.workers)
        setTeam(getAllEvents.data?.team)
    }
    function getStringAfterSecondSlash(path) {
        const parts = path.split('/');
        return parts[3] || null; // Returns the third part, or null if it doesn't exist
    }
    useEffect(() => {
        getEvents()
        gethandleMission()
    }, [])
    return (
        <div className='w-full' style={{paddingTop: '20px' }}>
            <div className='flex  w-full flex-col bg-white'
                style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px", padding: "30px" }}>
                <div className='flex flex-row'
                    style={{ padding: "10px" }}>

                </div>
                <div className='flex flex-row flex-wrap ' style={{ padding: "20px", gap: "40px" }}>
                    <div className='flex flex-row'
                        style={{
                            width: "40%", backgroundColor: "#f2f2f2",
                            padding: "20px", height: "500px", borderRadius: "18px", gap: "15px"
                        }}>

                        <div className='flex flex-col  gap-4' style={{ width: "50%", padding: "10px", gap: "15px" }}>
                            <div className='w-full' style={{ borderBottom: "", fontWeight: "bold" }}>
                                דף מכירה
                            </div>


                            <Tooltip isOpen={isUserToll2}
                                content={<div className='flex flex-col gap-4'
                                    style={{ width: "250px", height: "250px", padding: "10px" }}>
                                    <div style={{ width: "30px", height: "30px" }}>
                                        <Button variant='dfws' isIconOnly onPress={() => setIsUserToll2(false)}>X</Button>
                                    </div>
                                    <div className='flex flex-col w-full h-full' style={{ overflowY: "auto", gap: "5px" }}>
                                        {match?.map((items, index) => {
                                      
                                            return (
                                                <div className='w-full gap-4 flex flex-row items-center isuserEdit-css'
                                                    onClick={async () => {
                                                        const arr = events.sellPage

                                                        arr.workers.push({ key: items.key, image: items.profile_img, name: items.name })
                                                        await handleUpdateSellPage(arr)
                                                        setIsUserToll2(false)
                                                    }}
                                                    style={{ padding: "5px", height: "40px" }}>
                                                    <div className='flex' style={{
                                                        backgroundImage: `url(${items.profile_img})`,
                                                        borderRadius: '100px',
                                                        backgroundSize: 'cover',
                                                        minHeight: '30px',
                                                        maxHeight: '30px',
                                                        width: '30px',
                                                        backgroundPosition: 'center'
                                                    }}></div>
                                                    <div>
                                                        {items?.name}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='w-full h-full'>

                                    </div>
                                </div>} placement='bottom'>
                                <Input label='הוסף חבר צוות' color='primary' onChange={(e) => {
                                    handleSearch(e)
                                    setIsUserToll2(true)
                                    setIsMissionToll2(false)
                                }} onClick={() => {
                                    setIsUserToll2(true)
                                    setIsMissionToll2(false)
                                }
                                } />
                            </Tooltip>
                            <div className='w-full flex flex-col justify-center' style={{ height: "50px" }}>
                                <AvatarGroup isBordered>
                                    {editableSale2?.map((items, index) => {
                                        return (
                                            <Tooltip content={<div>{items.name}</div>}>
                                                <Avatar color='primary' src={items.image} />
                                            </Tooltip>
                                        )
                                    })}
                                </AvatarGroup>
                            </div>
                            <Tooltip isOpen={isMissionToll2}
                                content={<div className='flex flex-col gap-4'
                                    style={{ width: "250px", height: "250px", padding: "10px" }}>
                                    <div style={{ width: "30px", height: "30px" }}>
                                        <Button variant='dfws' isIconOnly onPress={() => setIsMissionToll2(false)}>X</Button>
                                    </div>
                                    <div className='flex flex-col w-full h-full' style={{ overflowY: "auto", gap: "5px" }}>
                                        {match2?.map((items, index) => {
                                      
                                            return (
                                                <div className='w-full gap-4 flex flex-row items-center isuserEdit-css'
                                                    onClick={async () => {
                                                        const arr = events.sellPage
                                                        arr.mission.push({ key: items._id, title: items.title, users: items.participent })
                                                        await handleUpdateSellPage(arr)


                                                        setIsMissionToll2(false)

                                                    }}
                                                    style={{ padding: "5px", height: "40px" }}>

                                                    <div>
                                                        {items?.title}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='w-full h-full'>

                                    </div>
                                </div>} placement='bottom'>
                                <Input label=' שייך למשימה ' color='primary' variant='faded' onChange={(e) => {
                                    handleSearch2(e)
                                    setIsMissionToll2(true)
                                    setIsUserToll2(false)
                                }} onClick={() => {
                                    setIsMissionToll2(true)
                                    setIsUserToll2(false)
                                }
                                } />
                                {/*  */}
                            </Tooltip>
                            <div className='w-full flex flex-col justify-center gap-3'
                                style={{ height: "150px", overflowY: "auto", padding: "5px", paddingTop: "90px" }}>

                                {missionConnection2?.map((items, index) => {
                                    return (
                                        <div className='flex flex-col w-full gap-2 cursor-pointer' onClick={async () => {
                                            await gethandleMissionbyId(items?.key)
                                            onOpen()
                                        }}
                                            style={{ backgroundColor: " rgb(186 230 253)", borderRadius: "15px", padding: "8px" }}>

                                            <Chip size='lg' color='primary' variant='dot' className='cursor-pointer' >
                                                <div className='flex flex-col'>
                                                    <div>{items?.title}</div>

                                                </div>
                                            </Chip>

                                            <div>
                                                <AvatarGroup isBordered style={{ paddingRight: "8px" }}>
                                                    {items?.users?.map((user, index) => {
                                                        return (
                                                            <Tooltip content={<div>{items.title}</div>}>
                                                                <Avatar color='primary' src={user.profile_img} />
                                                            </Tooltip>

                                                        )
                                                    })}

                                                </AvatarGroup>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div>
                                <Button variant='flat' onPress={()=>{router.push(`${path}?section=sellpage`)}} color='primary'>לדף המכירה</Button>
                            </div>
                        </div>
                        <div className='bg-white cursor-pointer' onClick={()=>{router.push(`${path}?section=sellpage`)}} style={{
                            width: "350px", height: "450px",
                            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                            borderRadius: "15px"
                        }}>

                        </div>

                    </div>
                    <div className='flex flex-row'
                        style={{
                            width: "40%", backgroundColor: "#f2f2f2",
                            padding: "20px", height: "500px", borderRadius: "18px", gap: "15px"
                        }}>

                        <div className='flex flex-col  gap-4' style={{ width: "50%", padding: "10px", gap: "15px" }}>
                            <div className='w-full' style={{ borderBottom: "", fontWeight: "bold" }}>
                                דף פרומו
                            </div>


                            <Tooltip isOpen={isUserToll}
                                content={<div className='flex flex-col gap-4'
                                    style={{ width: "250px", height: "250px", padding: "10px" }}>
                                    <div style={{ width: "30px", height: "30px" }}>
                                        <Button variant='dfws' isIconOnly onPress={() => setIsUserToll(false)}>X</Button>
                                    </div>
                                    <div className='flex flex-col w-full h-full' style={{ overflowY: "auto", gap: "5px" }}>
                                        {match?.map((items, index) => {
                                      
                                            return (
                                                <div className='w-full gap-4 flex flex-row items-center isuserEdit-css'
                                                    onClick={async () => {
                                                        const arr = events.promoPage

                                                        arr.workers.push({ key: items.key, image: items.profile_img, name: items.name })
                                                        await handleUpdatePromoPage(arr)

                                                        setIsUserToll(false)
                                                    }}
                                                    style={{ padding: "5px", height: "40px" }}>
                                                    <div className='flex' style={{
                                                        backgroundImage: `url(${items.profile_img})`,
                                                        borderRadius: '100px',
                                                        backgroundSize: 'cover',
                                                        minHeight: '30px',
                                                        maxHeight: '30px',
                                                        width: '30px',
                                                        backgroundPosition: 'center'
                                                    }}></div>
                                                    <div>
                                                        {items?.name}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='w-full h-full'>

                                    </div>
                                </div>} placement='bottom'>
                                <Input label='הוסף חבר צוות' color='secondary' onChange={(e) => {
                                    handleSearch(e)
                                    setIsUserToll(true)
                                    setIsMissionToll(false)
                                }} onClick={() => {
                                    setIsUserToll(true)
                                    setIsMissionToll(false)
                                }
                                } />
                            </Tooltip>
                            <div className='w-full flex flex-col justify-center' style={{ height: "60px" }}>
                                <AvatarGroup isBordered>
                                    {editableSale?.map((items, index) => {
                                        return (
                                            <Tooltip content={<div>{items.name}</div>}>
                                                <Avatar color='secondary' src={items.image} />
                                            </Tooltip>
                                        )
                                    })}
                                </AvatarGroup>
                            </div>
                            <Tooltip isOpen={isMissionToll}
                                content={<div className='flex flex-col gap-4'
                                    style={{ width: "250px", height: "250px", padding: "10px" }}>
                                    <div style={{ width: "30px", height: "30px" }}>
                                        <Button variant='dfws' isIconOnly onPress={() => setIsMissionToll(false)}>X</Button>
                                    </div>
                                    <div className='flex flex-col w-full h-full' style={{ overflowY: "auto", gap: "5px" }}>
                                        {match2?.map((items, index) => {
                                            
                                            return (
                                                <div className='w-full gap-4 flex flex-row items-center isuserEdit-css'
                                                    onClick={async () => {
                                                        const arr = events.promoPage
                                                        arr.mission.push({ key: items._id, title: items.title, users: items.participent })
                                                        await handleUpdatePromoPage(arr)


                                                        setIsMissionToll(false)

                                                    }}
                                                    style={{ padding: "5px", height: "40px" }}>

                                                    <div>
                                                        {items?.title}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='w-full h-full'>

                                    </div>
                                </div>} placement='bottom'>
                                <Input label=' שייך למשימה ' color='secondary' variant='faded' onChange={(e) => {
                                    handleSearch2(e)
                                    setIsMissionToll(true)
                                    setIsUserToll(false)
                                }} onClick={() => {
                                    setIsMissionToll(true)
                                    setIsUserToll(false)
                                }
                                } />
                            </Tooltip>
                            <div className='w-full flex flex-col justify-center gap-3'
                                style={{ height: "150px", overflowY: "auto", padding: "5px", paddingTop: "90px" }}>

                                {missionConnection?.map((items, index) => {
                                    return (
                                        <div className='flex flex-col w-full gap-2 cursor-pointer' onClick={async () => {
                                            await gethandleMissionbyId(items?.key)
                                            onOpen()
                                        }}
                                            style={{ backgroundColor: " rgb(245 208 254)", borderRadius: "15px", padding: "8px" }}>
                                            <Tooltip showArrow content={<div>עבור אל המשימה</div>}>
                                                <Chip size='lg' color='secondary' variant='dot' className='cursor-pointer' >
                                                    <div className='flex flex-col'>
                                                        <div>{items?.title}</div>

                                                    </div>
                                                </Chip>
                                            </Tooltip>
                                            <div>
                                                <AvatarGroup isBordered style={{ paddingRight: "8px" }}>
                                                    {items?.users?.map((user, index) => {
                                                        return (
                                                            <Tooltip content={<div>{items.title}</div>}>
                                                                <Avatar color='secondary' src={user.profile_img} />
                                                            </Tooltip>
                                                        )
                                                    })}

                                                </AvatarGroup>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div>
                                <Button onPress={()=>{router.push(`${path}?section=promo`)}} variant='flat' color='secondary'>לדף הפרומו</Button>
                            </div>
                        </div>
                        <div onClick={()=>{router.push(`${path}?section=promo`)}} className='bg-white cursor-pointer' style={{
                            width: "350px", height: "450px",
                            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                            borderRadius: "15px"
                        }}>

                        </div>
                    </div>
                    <div className='flex flex-row'
                        style={{
                            width: "40%", backgroundColor: "#f2f2f2",
                            padding: "20px", height: "500px", borderRadius: "18px", gap: "15px"
                        }}>

                        <div className='flex flex-col  gap-4' style={{ width: "50%", padding: "10px", gap: "15px" }}>
                            <div className='w-full' style={{ borderBottom: "", fontWeight: "bold" }}>
                                דף סיום
                            </div>


                            <Tooltip isOpen={isUserToll3}
                                content={<div className='flex flex-col gap-4'
                                    style={{ width: "250px", height: "250px", padding: "10px" }}>
                                    <div style={{ width: "30px", height: "30px" }}>
                                        <Button variant='dfws' isIconOnly onPress={() => setIsUserToll3(false)}>X</Button>
                                    </div>
                                    <div className='flex flex-col w-full h-full' style={{ overflowY: "auto", gap: "5px" }}>
                                        {match?.map((items, index) => {

                                            return (
                                                <div className='w-full gap-4 flex flex-row items-center isuserEdit-css'
                                                    onClick={async () => {
                                                        const arr = events.endPage

                                                        arr.workers.push({ key: items.key, image: items.profile_img, name: items.name })
                                                        await handleUpdateEndPage(arr)
                                                        setIsUserToll3(false)
                                                    }}
                                                    style={{ padding: "5px", height: "40px" }}>
                                                    <div className='flex' style={{
                                                        backgroundImage: `url(${items.profile_img})`,
                                                        borderRadius: '100px',
                                                        backgroundSize: 'cover',
                                                        minHeight: '30px',
                                                        maxHeight: '30px',
                                                        width: '30px',
                                                        backgroundPosition: 'center'
                                                    }}></div>
                                                    <div>
                                                        {items?.name}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='w-full h-full'>

                                    </div>
                                </div>} placement='bottom'>
                                <Input label='הוסף חבר צוות' color='danger' onChange={(e) => {
                                    handleSearch(e)
                                    setIsUserToll3(true)
                                    setIsMissionToll3(false)
                                }} onClick={() => {
                                    setIsUserToll3(true)
                                    setIsMissionToll3(false)
                                }
                                } />
                            </Tooltip>
                            <div className='w-full flex flex-col justify-center' style={{ height: "50px" }}>
                                <AvatarGroup isBordered>
                                    {editableSale3?.map((items, index) => {
                                        return (
                                            <Tooltip content={<div>{items.name}</div>}>
                                                <Avatar color='danger' src={items.image} />
                                            </Tooltip>
                                        )
                                    })}
                                </AvatarGroup>
                            </div>
                            <Tooltip isOpen={isMissionToll3}
                                content={<div className='flex flex-col gap-4'
                                    style={{ width: "250px", height: "250px", padding: "10px" }}>
                                    <div style={{ width: "30px", height: "30px" }}>
                                        <Button variant='dfws' isIconOnly onPress={() => setIsMissionToll3(false)}>X</Button>
                                    </div>
                                    <div className='flex flex-col w-full h-full' style={{ overflowY: "auto", gap: "5px" }}>
                                        {match2?.map((items, index) => {
                                            console.log(items)
                                            return (
                                                <div className='w-full gap-4 flex flex-row items-center isuserEdit-css'
                                                    onClick={async () => {
                                                        const arr = events.endPage
                                                        arr.mission.push({ key: items._id, title: items.title, users: items.participent })
                                                        await handleUpdateEndPage(arr)

                                                        setIsMissionToll3(false)

                                                    }}
                                                    style={{ padding: "5px", height: "40px" }}>

                                                    <div>
                                                        {items?.title}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='w-full h-full'>

                                    </div>
                                </div>} placement='bottom'>
                                <Input label=' שייך למשימה ' color='danger' variant='faded' onChange={(e) => {
                                    handleSearch2(e)
                                    setIsMissionToll3(true)
                                    setIsUserToll3(false)
                                }} onClick={() => {
                                    setIsMissionToll3(true)
                                    setIsUserToll3(false)
                                }
                                } />
                            </Tooltip>
                            <div className='w-full flex flex-col flex-wrap justify-center gap-3'
                                style={{ height: "150px", overflowY: "auto", padding: "5px", paddingTop: "90px" }}>

                                {missionConnection3?.map((items, index) => {
                                    return (
                                        <div className='flex flex-col w-full gap-2 cursor-pointer' onClick={async () => {
                                            await gethandleMissionbyId(items?.key)
                                            onOpen()
                                        }}
                                            style={{ backgroundColor: "rgb(253 164 175)", borderRadius: "15px", padding: "8px" }}>
                                            <Tooltip showArrow content={<div>עבור אל המשימה</div>}>
                                                <Chip size='lg' color='danger' variant='dot' className='cursor-pointer' >
                                                    <div className='flex flex-col'>
                                                        <div>{items?.title}</div>

                                                    </div>
                                                </Chip>
                                            </Tooltip>
                                            <div>
                                                <AvatarGroup isBordered style={{ paddingRight: "8px" }}>
                                                    {items?.users?.map((user, index) => {
                                                        return (
                                                            <Tooltip content={<div>{items.title}</div>}>
                                                                <Avatar color='danger' src={user.profile_img} />
                                                            </Tooltip>
                                                        )
                                                    })}

                                                </AvatarGroup>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div>
                                <Button onPress={()=>{router.push(`${path}?section=endpage`)}} variant='flat' color='danger'>לדף הסיום</Button>
                            </div>
                        </div>
                        {/*  */}
                        <div onClick={()=>{router.push(`${path}?section=endpage`)}} className='bg-white cursor-pointer' style={{
                            width: "350px", height: "450px",
                            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                            borderRadius: "15px"
                        }}>

                        </div>
                        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                            <DrawerContent>
                                {(onClose) => (
                                    <>
                                        <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                                        <DrawerBody>
                                            <div className=' flex flex-col'
                                                style={{
                                                    height: '550px', width: '350px', borderRadius: '15px', padding: '10px', gap: '10px', backgroundColor: 'white',
                                                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                                                }}>
                                                <div className='w-full flex flex-row items-center justify-between' style={{ height: '50px', borderBottom: '1px solid white', paddingLeft: '45%' }}>

                                                    <div style={{ fontSize: '20px', fontWeight: 'bolder' }}>{currentMission.title}</div>
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
                                                            {currentMission.startDate}-{currentMission.endDate}
                                                        </div>
                                                    </div>
                                                    <div className='w-full flex flex-row items-center justify-between' style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                                        <div>שעת סיום:</div>
                                                        <div style={{ opacity: '70%', direction: 'ltr' }}>{currentMission.endTime}</div>
                                                    </div>
                                                    <div >
                                                        <Accordion style={{ paddingTop: '20px', color: '#252323' }}>
                                                            <AccordionItem key="1" aria-label="Accordion 1" title={<div style={{}}>תיאור המשימה</div>}
                                                                className='w-full glass-background' style={{ borderRadius: '15px', padding: "10px", maxHeight: '200px', overflow: 'auto' }} >
                                                                <div style={{ color: '#252323' }}>
                                                                    {currentMission.content}
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
                                                            {currentMission.participent.map((item2, index2) => {
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

                                                                                        currentMission.participent[index2].status.text = e.target.value
                                                                                        currentMission.participent[index2].status.color = status_u[0].color
                                                                                    } else if (e.target.value === status_u[1].text) {
                                                                                        currentMission.participent[index2].status.text = e.target.value
                                                                                        currentMission.participent[index2].status.color = status_u[1].color
                                                                                        console.log(e.target.value)
                                                                                    } else if (e.target.value === status_u[2].text) {
                                                                                        currentMission.participent[index2].status.text = e.target.value
                                                                                        currentMission.participent[index2].status.color = status_u[2].color
                                                                                        console.log(e.target.value)
                                                                                    } else if (e.target.value === status_u[3].text) {
                                                                                        currentMission.participent[index2].status.text = e.target.value
                                                                                        currentMission.participent[index2].status.color = status_u[3].color
                                                                                        console.log(e.target.value)
                                                                                    }
                                                                                    setIsLoadingSelect(true)
                                                                                    await handleUpdateStatus(currentMission.participent, currentMission._id)
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
                                        </DrawerBody>
                                        <DrawerFooter>

                                        </DrawerFooter>
                                    </>
                                )}
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Design