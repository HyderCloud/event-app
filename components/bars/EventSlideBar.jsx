"use client"
import React, { useState, useEffect } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure, Popover, PopoverTrigger, PopoverContent,
    Divider
} from "@nextui-org/react";
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
const EventSlideBar = ({craftingLink}) => {
    const pathName = usePathname()
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isHover, setIsHover] = useState('')
    const [events, setEvents] = useState([])
    const [otherEvents, setOtherEvents] = useState([])
    const [cookie, setCookie, removeCookie] = useCookies()
    const { decodedToken, isExpired } = useJwt(cookie.store)
    const { decodedToken: decodedTokens, isExpireds } = useJwt(cookie.user)
    const getEvents = async () => {
        const getAllEvents = await axios.get(`http://localhost:9020/getevents/${decodedToken?.store_id}`)
        setOtherEvents(moveObjectToFront(getAllEvents.data.events, getStringAfterSecondSlash(pathName)))
        const idEvent = findObjectById(getAllEvents.data.events, getStringAfterSecondSlash(pathName))
        setEvents(idEvent)
    }
    function moveObjectToFront(array, id) {
        const index = array.findIndex(item => item.id === id); // Find the index of the object with the matching id
        if (index === -1) return array; // If no matching id is found, return the original array

        const [matchedObject] = array.splice(index, 1); // Remove the matched object from the array
        array.unshift(matchedObject); // Add the matched object to the start of the array

        return array;
    }
    function findObjectById(array, id) {
        return array.find(item => item._id === id);
    }
    function getStringAfterSecondSlash(path) {
        const parts = pathName.split('/');
        return parts[4] || null; // Returns the third part, or null if it doesn't exist
    }
    function checkString2(str) {
        const regex = /^\/myoffice\/projects?\/main(\/.+)?$/
        return regex.test(str);
    }
    function checkString3(str) {
        const regex = /^\/myoffice\/projects?\/team(\/.+)?$/
        return regex.test(str);
    }
    function checkString4(str) {
        const regex = /^\/myoffice\/projects?\/design(\/.+)?$/
        return regex.test(str);
    }
    function checkString5(str) {
        const regex = /^\/myoffice\/projects?\/customers(\/.+)?$/
        return regex.test(str);
    }
    function checkString6(str) {
        const regex = /^\/myoffice\/projects?\/budgets(\/.+)?$/
        return regex.test(str);
    }
    function checkString7(str) {
        const regex = /^\/myoffice\/projects?\/analitycs(\/.+)?$/
        return regex.test(str);
    }
    function checkString8(str) {
        const regex = /^\/myoffice\/projects?\/tickets(\/.+)?$/
        return regex.test(str);
    }
    function checkString11(str) {
        // Define the updated regular expression pattern
        const regex = /\/myoffice\/project/;
        return regex.test(str);
    }
    useEffect(() => {
        if (decodedToken) {
            getEvents()

        }
    }, [decodedToken])
    return (
        <>
            <Divider />
            <div style={{
                paddingTop: "3px", paddingRight: "5px", fontWeight: "bold", fontSize: "11px",
                color: "#9095A1"
            }}>הפרויקט שלי</div>
            <div
                className={`flex flex-row gap-2 items-center justify-between ${checkString11(pathName) ? "buttonSidebar-sub4" : "buttonSidebar-sub"}`}
                onMouseEnter={() => setIsHover("overview")}
                onMouseLeave={() => setIsHover("")}>
                <div className='flex flex-row gap-2 justify-between items-center '>
                    <div className='flex flex-row gap-2'>
                        <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                            <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                            <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                        </svg></div>
                        <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                            {events?.name}
                        </div>
                    </div>
                </div>
                <div>
                    <Popover placement="left">
                        <PopoverTrigger>
                            <Button isIconOnly variant='ddd'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.8413 13.01L17.2013 8.36C16.8989 8.08169 16.4337 8.08169 16.1313 8.36L11.5213 13.01C11.3332 13.3001 11.3678 13.6812 11.6051 13.9327C11.8423 14.1842 12.2207 14.2409 12.5213 14.07L15.7413 10.85V19.75C15.7413 20.1642 16.0771 20.5 16.4913 20.5C16.9055 20.5 17.2413 20.1642 17.2413 19.75V10.56L20.7513 14.07C21.0441 14.3625 21.5185 14.3625 21.8113 14.07C22.1122 13.7855 22.1256 13.311 21.8413 13.01Z" fill="#2196F3" />
                                    <path d="M11.5213 9.22C11.2285 8.92755 10.7541 8.92755 10.4613 9.22L7.27129 12.44V3.75C7.27129 3.33579 6.93551 3 6.52129 3C6.10708 3 5.77129 3.33579 5.77129 3.75V12.75L2.26129 9.22C1.96578 8.94464 1.50528 8.95277 1.21967 9.23838C0.934059 9.52399 0.925934 9.98449 1.20129 10.28L5.84129 14.93C6.13753 15.2236 6.61505 15.2236 6.91129 14.93L11.5213 10.28C11.8137 9.98718 11.8137 9.51282 11.5213 9.22Z" fill="#2196F3" />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent >
                            <div className='flex flex-col gap-1  ' style={{ width: "160px" }}>
                                {otherEvents?.map((items, index) => (
                                    <>

                                        <Link href={`/myoffice/projects/main/${items?._id}`}
                                            className={`flex flex-row gap-2  justify-between items-center ${getStringAfterSecondSlash(pathName) === items?._id
                                                ? "buttonSidebar-sub423" : "buttonSidebar-sub42"}`} style={{ paddingRight: "10px" }}
                                            onMouseEnter={() => setIsHover(items?._id)}
                                            onMouseLeave={() => setIsHover("")}>
                                            <div className='flex-row gap-1'>
                                                <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                                                    {items?.name}
                                                </div>
                                            </div>

                                            <div>
                                                {index === 0 &&
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.20948 17.5602C9.04155 17.5676 8.87603 17.5183 8.73948 17.4202L4.24948 13.7102C3.9602 13.4541 3.91665 13.0186 4.14948 12.7102C4.40515 12.4223 4.83734 12.3748 5.14948 12.6002L9.14948 15.8602L19.6495 6.15024C19.96 5.91711 20.3971 5.95953 20.657 6.24802C20.9169 6.5365 20.9136 6.97565 20.6495 7.26024L9.71948 17.3602C9.58026 17.488 9.39843 17.5593 9.20948 17.5602Z" fill="#2196F3" />
                                                </svg>
                                                }

                                            </div>
                                        </Link>
                                        {index === 0 &&
                                            <div>
                                                <Divider />
                                                <div style={{ fontSize: "11px", fontWeight: "bold", color: "#9095A1", paddingRight: "3px" }}>
                                                    פרוייקטים נוספים</div>
                                            </div>
                                        }
                                        {otherEvents.length === 1 &&
                                        <div  className='w-full flex flex-col justify-center items-center gap-2' style={{height: "90px"}}>
                                            <div style={{ fontWeight: "bolder", color: "#9095A1",}}>   אין עוד פרוייקטים נוספים</div>
                                            <div><Button color='primary' onPress={()=>{router.push(craftingLink)}} style={{height: "30px"}}>להוספה</Button></div>
                                        </div>
                                        }
                                    </>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>
            </div>
            <Link href={`/myoffice/projects/main/${getStringAfterSecondSlash()}`}
                className={`flex flex-row gap-2 items-center ${checkString2(pathName) ? "buttonSidebar-sub3" : "buttonSidebar-sub3-side"}`}
                onMouseEnter={() => setIsHover("overview")}
                onMouseLeave={() => setIsHover("")}>
                <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                </svg></div>
                <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                    ראשי
                </div>
            </Link>
            <Link href={`/myoffice/projects/design/${getStringAfterSecondSlash()}`}
                className={`flex flex-row gap-2 items-center ${checkString4(pathName) ? "buttonSidebar-sub3" : "buttonSidebar-sub3-side"}`}
                onMouseEnter={() => setIsHover("design")}
                onMouseLeave={() => setIsHover("")}>
                <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                </svg></div>
                <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                    עיצוב
                </div>
            </Link>
            <Link href={`/myoffice/projects/team/${getStringAfterSecondSlash()}`}
                className={`flex flex-row gap-2 items-center ${checkString3(pathName) ? "buttonSidebar-sub3" : "buttonSidebar-sub3-side"}`}
                onMouseEnter={() => setIsHover("team")}
                onMouseLeave={() => setIsHover("")}>
                <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                </svg></div>
                <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                    צוות
                </div>
            </Link>
            <Link href={`/myoffice/projects/customers/${getStringAfterSecondSlash()}`}
                className={`flex flex-row gap-2 items-center ${checkString5(pathName) ? "buttonSidebar-sub3" : "buttonSidebar-sub3-side"}`}
                onMouseEnter={() => setIsHover("customers")}
                onMouseLeave={() => setIsHover("")}>
                <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                </svg></div>
                <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                    לקוחות
                </div>
            </Link>
            <Link href={`/myoffice/projects/budgets/${getStringAfterSecondSlash()}`}
                className={`flex flex-row gap-2 items-center ${checkString6(pathName) ? "buttonSidebar-sub3" : "buttonSidebar-sub3-side"}`}
                onMouseEnter={() => setIsHover("budgets")}
                onMouseLeave={() => setIsHover("")}>
                <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                </svg></div>
                <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                    תקציבים
                </div>
            </Link>
            <Link href={`/myoffice/projects/analitycs/${getStringAfterSecondSlash()}`}
                className={`flex flex-row gap-2 items-center ${checkString7(pathName) ? "buttonSidebar-sub3" : "buttonSidebar-sub3-side"}`}
                onMouseEnter={() => setIsHover("analitycs")}
                onMouseLeave={() => setIsHover("")}>
                <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                </svg></div>
                <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                    אנליטיקה
                </div>
            </Link>
            <Link href={`/myoffice/projects/tickets/${getStringAfterSecondSlash()}`}
                className={`flex flex-row gap-2 items-center ${checkString8(pathName) ? "buttonSidebar-sub3" : "buttonSidebar-sub3-side"}`}
                onMouseEnter={() => setIsHover("tickets")}
                onMouseLeave={() => setIsHover("")}>
                <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={'#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                </svg></div>
                <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                    כרטיסים
                </div>
            </Link>
        </>
    )
}

export default EventSlideBar