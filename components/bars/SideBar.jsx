"use client"
import React, { useState, useContext, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useJwt } from 'react-jwt'
import { Tooltip, Button, Tab, Tabs } from "@nextui-org/react";
import Link from 'next/link'
import axios from 'axios'
const StoreSlide = ({ auth, office }) => {
    const [cookie, setCookie, removeCookie] = useCookies('')
    const [storeType, setStoreType] = useState('')
    const { decodedToken, isExpired } = useJwt(cookie.store)
    const router = useRouter()
    const [isOffice, setIsOffice] = useState(false)
    const pathName = usePathname()
    const [isHover, setIsHover] = useState('')
    const handleGetStore = async () => {
        const result = await axios.get(`http://localhost:9020/getstorebyid/${decodedToken?.store_id}`)
        setStoreType(result.data.store.type)
    }

    function checkString2(str) {
        // Define the regular expression pattern
        const regex = /^\/myoffice\/[^\/]+\/[^\/]+$/;
    
        // Test the string against the pattern
        return regex.test(str);
      }
      function checkString3(str) {
        // Define the updated regular expression pattern
        const regex = /^\/myoffice\/main\/[^\/]+$/;
      
        // Test the string against the updated pattern
        return regex.test(str);
      }
      function checkString4(str) {
        // Define the updated regular expression pattern
        const regex = /^\/myoffice\/craftingTable\/[^\/]+$/;
      
        // Test the string against the updated pattern
        return regex.test(str);
      }
      function checkString5(str) {
        // Define the updated regular expression pattern
        const regex = /^\/myoffice\/team\/[^\/]+$/;
      
        // Test the string against the updated pattern
        return regex.test(str);
      }
      function checkString6(str) {
        // Define the updated regular expression pattern
        const regex = /^\/myoffice\/subconstractors\/[^\/]+$/;
      
        // Test the string against the updated pattern
        return regex.test(str);
      }
      function checkString7(str) {
        // Define the updated regular expression pattern
        const regex = /^\/myoffice\/customers\/[^\/]+$/;
      
        // Test the string against the updated pattern
        return regex.test(str);
      }
      function checkString8(str) {
        // Define the updated regular expression pattern
        const regex = /^\/myoffice\/marketing\/[^\/]+$/;
      
        // Test the string against the updated pattern
        return regex.test(str);
      }

      function checkString9(str) {
        // Define the updated regular expression pattern
        const regex = /^\/myoffice\/design\/[^\/]+$/;
      
        // Test the string against the updated pattern
        return regex.test(str);
      }
      function checkString10(str) {
        // Define the updated regular expression pattern
        const regex = /^\/myoffice\/analitycs\/[^\/]+$/;
      
        // Test the string against the updated pattern
        return regex.test(str);
      }
    useEffect(() => {
        if (decodedToken) {
            handleGetStore()
        }
    }, [decodedToken])

    if (pathName.split('/')[1] === 'dashbord' || pathName === '/buisness') {
        return (<div>

        </div>)
    } else {

        return (
            <div className='flex flex-col gap-4 fixed h-screen items-center '
                style={{ width: '180px', backgroundColor: '#FFF', overflowY: 'hidden', padding: "10px" }}>
                <div className="flex w-full flex-col items-center justify-center" style={{ height: "90px" }}>
                    LOGO
                </div>
                <div className='flex flex-col justify-between h-full w-full' >
                    <div className='flex flex-col gap-1 '>
                        <Link href={'/'}
                         className={`flex flex-row gap-2 items-center ${pathName === '/'?  "buttonSideBar2":"buttonSideBar"}`}
                          onMouseEnter={() => setIsHover("overview")}
                            onMouseLeave={() => setIsHover("")}>
                            <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.2998 10.14L14.9998 3.71997L25.6998 10.14L14.9998 16.56L4.2998 10.14Z" stroke={(isHover === "overview"||pathName === '/') ? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                <path d="M25.6998 15.5L14.9998 21.92L4.2998 15.5" stroke={(isHover === "overview"||pathName === '/')? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                <path d="M25.6998 20.86L14.9998 27.28L4.2998 20.86" stroke={(isHover === "overview"||pathName === '/')? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                            </svg></div>
                            <div style={{ fontSize: "18px", fontWeight: "bold", }} >
                                סקירה כללית
                            </div>
                        </Link>
                        <div  className='flex flex-col'>
                            <Link href={`/myoffice/main/${decodedToken?.store_id}`}
                             className={`flex flex-row gap-2 items-center ${checkString2(pathName)?  "buttonSideBar2":"buttonSideBar"}`} 
                                onMouseEnter={() => setIsHover("myoffice")}
                                onMouseLeave={() => setIsHover("")}>
                                <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.4201 9.07V3.72L8.58008 3.72L8.58008 12.28" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M12.8599 27.29H17.1399" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M12.8551 15.505L3.2251 15.505L3.2251 27.275H12.8551L12.8551 15.505Z" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M26.775 12.3L17.145 12.3L17.145 27.28H26.775L26.775 12.3Z" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M21.4253 16.57H22.4953" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M21.4253 19.79H22.4953" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M21.4253 23H22.4953" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M7.50488 23H8.57488" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M7.50488 19.79H8.57488" stroke={(isHover === "myoffice"||checkString2(pathName) )? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                </svg></div>
                                <div style={{ fontSize: "18px", fontWeight: "bold", }}>
                                    המשרד שלי
                                </div>
                            </Link>
                            {( checkString2(pathName)) && <div className='flex flex-col gap-1 w-full' style={{ paddingLeft: "20px", paddingTop: "4px" }}>
                                <Link href={`/myoffice/main/${decodedToken?.store_id}`} className={`${checkString3(pathName)?"buttonSidebar-sub2":"buttonSidebar-sub"} flex flex-row gap-2 items-center`}>
                                    <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 7.5C11 9.433 9.433 11 7.5 11C5.567 11 4 9.433 4 7.5C4 5.567 5.567 4 7.5 4C9.433 4 11 5.567 11 7.5Z" fill="#9095A1" />
                                        <path d="M21 7.5C21 9.433 19.433 11 17.5 11C15.567 11 14 9.433 14 7.5C14 5.567 15.567 4 17.5 4C19.433 4 21 5.567 21 7.5Z" fill="#9095A1" />
                                        <path d="M11 17.5C11 19.433 9.433 21 7.5 21C5.567 21 4 19.433 4 17.5C4 15.567 5.567 14 7.5 14C9.433 14 11 15.567 11 17.5Z" fill="#9095A1" />
                                        <path d="M21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5C14 15.567 15.567 14 17.5 14C19.433 14 21 15.567 21 17.5Z" fill="#9095A1" />
                                    </svg></div>
                                    <div style={{ fontSize: "15px", fontWeight: "bold", }} >ראשי</div>
                                </Link>
                                <Link  href={`/myoffice/craftingTable/${decodedToken?.store_id}`} className={`${checkString4(pathName)?"buttonSidebar-sub2":"buttonSidebar-sub"} flex flex-row gap-2 items-center`}>
                                    <div></div>
                                    <div style={{ fontSize: "15px", fontWeight: "bold", }} >שולחן היצירה</div>
                                </Link>
                                <Link href={`/myoffice/team/${decodedToken?.store_id}`} className={`${checkString5(pathName)?"buttonSidebar-sub2":"buttonSidebar-sub"} flex flex-row gap-2 items-center`}>
                                    <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.43004 10.14C5.24769 10.14 4.29004 9.18237 4.29004 8.00002C4.29004 6.81767 5.24769 5.86002 6.43004 5.86002C7.61239 5.86002 8.57004 6.81767 8.57004 8.00002C8.57004 9.18237 7.61239 10.14 6.43004 10.14Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M8.56484 25.135H5.35484L5.35484 20.855H3.21484L3.21484 15.505C3.21484 14.3227 4.17249 13.365 5.35484 13.365H6.42484" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M23.5697 10.14C24.752 10.14 25.7097 9.18237 25.7097 8.00002C25.7097 6.81767 24.752 5.86002 23.5697 5.86002C22.3873 5.86002 21.4297 6.81767 21.4297 8.00002C21.4297 9.18237 22.3873 10.14 23.5697 10.14Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M21.4351 25.135H24.6451L24.6451 20.855H26.7851V15.505C26.7851 14.3227 25.8274 13.365 24.6451 13.365H23.5751" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M15 10.14C13.227 10.14 11.79 8.70299 11.79 6.93C11.79 5.15701 13.227 3.72 15 3.72C16.773 3.72 18.21 5.15701 18.21 6.93C18.21 8.70299 16.773 10.14 15 10.14Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M18.2099 27.275H11.7899L11.7899 20.855H9.6499L9.6499 15.505C9.6499 14.3227 10.6076 13.365 11.7899 13.365L18.2099 13.365C19.3923 13.365 20.3499 14.3227 20.3499 15.505V21.925H18.2099L18.2099 27.275Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                    </svg>
                                    </div>
                                    <div style={{ fontSize: "15px", fontWeight: "bold", }} >צוות </div>
                                </Link>
                                <Link href={`/myoffice/subconstractors/${decodedToken?.store_id}`} className={`${checkString6(pathName)?"buttonSidebar-sub2":"buttonSidebar-sub"} flex flex-row gap-2 items-center`}>
                                    <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24.6301 15.505C24.6301 23.071 19.2041 27.275 15.0001 27.275C10.7961 27.275 5.37012 23.071 5.37012 15.505" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M3.22998 15.5L26.77 15.5" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                        <path d="M14.9999 15.5C16.1818 15.5 17.1399 14.5419 17.1399 13.36C17.1399 12.1781 16.1818 11.22 14.9999 11.22C13.818 11.22 12.8599 12.1781 12.8599 13.36C12.8599 14.5419 13.818 15.5 14.9999 15.5Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                        <path d="M4.2998 15.495V14.425C4.2998 8.51554 9.09036 3.72499 14.9998 3.72499C20.9093 3.72499 25.6998 8.51554 25.6998 14.425V15.495" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M15 4.785V3.715V6.925" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    </svg>
                                    </div>
                                    <div style={{ fontSize: "15px", fontWeight: "bold", }} >קבלני משנה </div>
                                </Link>
                                <Link href={`/myoffice/customers/${decodedToken?.store_id}`} className={`${checkString7(pathName)?"buttonSidebar-sub2":"buttonSidebar-sub"} flex flex-row gap-2 items-center`}>
                                    <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.7799 3.72L13.9399 3.72L13.9399 14.42L19.2899 10.14L26.7799 10.14V3.72Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                        <path d="M12.855 26.0345C12.855 25.3882 12.5714 24.773 12.0653 24.3717C11.2917 23.7576 9.94993 23 8.03998 23C6.13003 23 4.78825 23.7576 4.01464 24.3717C3.50853 24.773 3.22498 25.3882 3.22498 26.0345V27.28L12.855 27.28L12.855 26.0345Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M8.03999 19.785C9.51735 19.785 10.715 18.5874 10.715 17.11C10.715 15.6326 9.51735 14.435 8.03999 14.435C6.56263 14.435 5.36499 15.6326 5.36499 17.11C5.36499 18.5874 6.56263 19.785 8.03999 19.785Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                        <path d="M26.775 26.0345C26.775 25.3882 26.4915 24.773 25.9854 24.3717C25.2117 23.7576 23.87 23 21.96 23C20.0501 23 18.7083 23.7576 17.9347 24.3717C17.4286 24.773 17.145 25.3882 17.145 26.0345V27.28L26.775 27.28V26.0345Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M21.96 19.785C23.4374 19.785 24.635 18.5874 24.635 17.11C24.635 15.6326 23.4374 14.435 21.96 14.435C20.4827 14.435 19.285 15.6326 19.285 17.11C19.285 18.5874 20.4827 19.785 21.96 19.785Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                    </svg>
                                    </div>
                                    <div style={{ fontSize: "15px", fontWeight: "bold", }} >לקוחות</div>
                                </Link>
                                <Link href={`/myoffice/marketing/${decodedToken?.store_id}`} className={`${checkString8(pathName)?"buttonSidebar-sub2":"buttonSidebar-sub"} flex flex-row gap-2 items-center`}>
                                    <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.995 12.8825C26.995 11.9825 26.62 6.5075 26.62 6.5075C26.62 5.6075 26.32 5.0825 25.87 4.6325C25.495 4.2575 24.895 3.8825 23.995 3.8825C23.995 3.8825 18.52 3.5075 17.62 3.5075C16.27 3.5075 15.445 3.4325 13.795 5.1575C12.97 5.9825 4.04499 14.9075 3.66999 15.2825C3.29499 15.6575 2.01999 17.1575 4.19499 19.3325L11.245 26.3825C13.42 28.5575 14.92 27.2825 15.295 26.9075C15.67 26.5325 24.595 17.6075 25.42 16.7825C27.07 15.0575 26.995 14.1575 26.995 12.8825ZM17.47 15.8075L20.545 17.2325L19.42 19.2575L16.57 17.3825C16.495 17.3075 16.42 17.3075 16.345 17.3075C16.27 17.3075 16.195 17.3075 16.12 17.3825C15.97 17.4575 15.895 17.6075 15.895 17.7575L16.12 21.1325H13.87L14.02 17.7575C14.02 17.6075 13.945 17.4575 13.795 17.3825C13.645 17.3075 13.495 17.3075 13.42 17.3825L10.795 19.2575L9.59499 17.3075L12.67 15.8075C12.82 15.7325 12.895 15.5825 12.895 15.4325C12.895 15.2825 12.82 15.1325 12.67 15.0575L9.59499 13.6325L10.72 11.6075L13.57 13.4825C13.72 13.5575 13.87 13.5575 13.945 13.4825C14.095 13.4075 14.17 13.2575 14.17 13.1075L13.945 9.7325H16.195L16.045 13.1075C16.045 13.2575 16.12 13.4075 16.27 13.4825C16.42 13.5575 16.57 13.5575 16.645 13.4825L19.42 11.6075L20.62 13.5575L17.545 15.0575C17.395 15.1325 17.32 15.2825 17.32 15.4325C17.245 15.5825 17.32 15.7325 17.47 15.8075ZM22.72 9.3575C21.895 9.3575 21.295 8.6825 21.295 7.9325C21.295 7.1075 21.97 6.5075 22.72 6.5075C23.545 6.5075 24.145 7.1825 24.145 7.9325C24.145 8.7575 23.47 9.3575 22.72 9.3575Z" fill="#9095A1" />
                                    </svg>
                                    </div>
                                    <div style={{ fontSize: "15px", fontWeight: "bold", }} >שיווק</div>
                                </Link>
                                <Link href={`/myoffice/design/${decodedToken?.store_id}`} className={`${checkString9(pathName)?"buttonSidebar-sub2":"buttonSidebar-sub"} flex flex-row gap-2 items-center`}>
                                    <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.5752 10.14H26.7852" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" />
                                        <path d="M3.22119 10.14L15.4192 10.14" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" />
                                        <path d="M23.881 5.87H26.77L26.77 27.27L3.22998 27.27L3.22998 5.87L19.708 5.87" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" />
                                        <path d="M8.57031 5.85999L8.57031 10.14" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="square" />
                                        <path d="M15.6449 14.2044L13.5049 12.0644L21.4229 4.14639C22.0649 3.50439 22.9209 3.50439 23.5629 4.14639C24.2049 4.78839 24.2049 5.64439 23.5629 6.28639L15.6449 14.2044Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                        <path d="M9.42564 15.2885C10.2816 14.4325 11.5656 14.4325 12.4216 15.2885C13.2776 16.1445 13.2776 17.4285 12.4216 18.2845C11.5656 19.1405 8.67664 19.0335 8.67664 19.0335C8.67664 19.0335 8.56964 16.0375 9.42564 15.2885Z" stroke="#9095A1" stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                    </svg>
                                    </div>
                                    <div style={{ fontSize: "15px", fontWeight: "bold", }} >עיצוב</div>
                                </Link>
                                <Link href={`/myoffice/analitycs/${decodedToken?.store_id}`} className={`${checkString10(pathName)?"buttonSidebar-sub2":"buttonSidebar-sub"} flex flex-row gap-2 items-center`}>
                                    <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.80952 2H18.1905C20.2944 2 22 3.70558 22 5.80952V18.1905C22 20.2944 20.2944 22 18.1905 22H5.80952C3.70558 22 2 20.2944 2 18.1905V5.80952C2 3.70558 3.70558 2 5.80952 2ZM17.2381 13.1905C17.6326 13.1905 17.9524 12.8707 17.9524 12.4762V9.58095C17.9473 9.18861 17.6304 8.8718 17.2381 8.86667H14.381C13.9865 8.86667 13.6667 9.18646 13.6667 9.58095C13.6667 9.97544 13.9865 10.2952 14.381 10.2952H15.2286L11.8381 13.6857L9.93333 11.781C9.42788 11.2772 8.61022 11.2772 8.10476 11.781L5.65714 14.2286C5.37862 14.5074 5.37862 14.9592 5.65714 15.2381C5.79037 15.373 5.97232 15.4485 6.1619 15.4476C6.35171 15.4496 6.53407 15.3739 6.66667 15.2381L9.05714 12.9524L10.9619 14.8571C11.4674 15.3609 12.285 15.3609 12.7905 14.8571L16.5238 11.0952V12.4762C16.5238 12.8707 16.8436 13.1905 17.2381 13.1905Z" fill="#9095A1" />
                                    </svg>
                                    </div>
                                    <div style={{ fontSize: "15px", fontWeight: "bold", }} >אנליטיקה</div>
                                </Link>
                            </div>}
                        </div>
                        <Link href={"/wallet"} className={`flex flex-row gap-2 items-center ${pathName === '/wallet'?  "buttonSideBar2":"buttonSideBar"}`} onMouseEnter={() => setIsHover("wallet")}
                            onMouseLeave={() => setIsHover("")} >
                            <div><svg width="24" height="24" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.63 15.5L24.63 8.00999L5.36998 8.00999C4.18763 8.00999 3.22998 7.05235 3.22998 5.87L3.22998 24.06C3.22998 25.833 4.66699 27.27 6.43998 27.27L24.63 27.27V19.78" stroke={(isHover === "wallet"||pathName === '/wallet') ? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                <path d="M20.35 4.79V3.72L5.36998 3.72C4.18763 3.72 3.22998 4.67765 3.22998 5.86C3.22998 7.04235 4.18763 8 5.36998 8" stroke={(isHover === "wallet"||pathName === '/wallet') ? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                                <path d="M26.7849 19.78H21.4349C20.2526 19.78 19.2949 18.8224 19.2949 17.64C19.2949 16.4577 20.2526 15.5 21.4349 15.5L26.7849 15.5V19.78Z" stroke={(isHover === "wallet"||pathName === '/wallet') ? `white` : '#9095A1'} stroke-width="2.568" stroke-miterlimit="10" stroke-linecap="round" />
                            </svg></div>
                            <div style={{ fontSize: "18px", fontWeight: "bold", }}>
                                ארנק
                            </div>
                        </Link >
                    </div>

                    <div>
                        LogOut
                    </div>
                </div>
            </div>

        )
    }
}

export default StoreSlide