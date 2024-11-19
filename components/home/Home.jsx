"use client"
import { Divider } from "@nextui-org/react"
import { useState, useEffect } from "react"
import EventSlider from "../events/EventSlider"
import axios from 'axios'

const Home = () => {
  const [searchHolder, setSearchHolder] = useState('')
  const [events, setEvents] = useState('')
  return (
    <div className='w-full min-full dashboard-container flex flex-col' style={{paddingTop: '5%', gap: '25px'}}>
      <div className='events-promo glass-background w-full '>
      </div>
        <div className='w-full flex flex-col items-center justify-center' style={{paddingLeft: '35%', paddingRight: '35%', height: '250px',gap:"15px" }}>
          <div className="text-white text-search-home items-center justify-center flex flex-col">
          <div>גלה קהילות, <span onMouseEnter={()=>{setSearchHolder('events')}} onMouseLeave={()=>{setSearchHolder('')}} className="text-search-home-events">אירועים</span></div>
          <div style={{fontSize: '30px'}}><span className="text-search-home-kenes">כנסים</span>, <span className="text-search-home-party">מסיבות</span> ועוד</div>
          <div></div>
          </div>
          <div className='glass-background w-full'  style={{ height: '50px', borderRadius:'25px'}}>
         <input className='w-full h-full sr-input glass-background' style={{borderRadius: '25px'}} placeholder={"....חיפוש"}/>
        </div>
          </div>
          <div className="w-full h-full  flex flex-col  " style={{gap: '10px'}}>
          <div className="w-full flex text-end items-end   flex-row" style={{color: 'white', gap: '15px'}}>
          <div className="promos-text-slider flex" style={{  height: "30px"}}>הלוהטים ביותר</div>
          <div className="promo-patches" style={{background: 'linear-gradient(to right, #EA4335, #CD7A7C)'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0513 2L10.6813 4.8C9.70235 6.80035 8.39031 8.61962 6.8013 10.18L6.6213 10.35C5.60076 11.3408 5.01766 12.6977 5.0013 14.12V14.3C4.97427 17.0851 6.63391 19.6101 9.2013 20.69L9.4613 20.8C11.1452 21.5152 13.0474 21.5152 14.7313 20.8H14.7913C17.3779 19.6762 19.0375 17.1099 19.0013 14.29V9.95C18.1393 11.9185 16.5739 13.4946 14.6113 14.37C14.6113 14.37 14.6113 14.37 14.5513 14.37C14.4913 14.37 13.7913 14.66 13.4913 14.37C13.2234 14.0989 13.1977 13.6712 13.4313 13.37L13.5013 13.32H13.5513C15.8471 11.575 16.3823 8.34172 14.7713 5.95C13.4713 3.97 12.0513 2 12.0513 2Z" fill="white"/>
</svg>
          </div>
       
          </div>
          <div style={{height: '400px'}}>
         <EventSlider/>
          </div>
         <div className="w-full flex text-end items-end   flex-row" style={{color: 'white', gap: '15px'}}>
         <div className="promos-text-slider flex" style={{  height: "30px"}}>  לספונטניים בלבד</div>
          <div className="promo-patches" style={{background: 'linear-gradient(to right, #FBBC05, #CD7A7C)'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.48 4.24057L10.95 13.9206C10.8436 14.1047 10.8427 14.3314 10.9476 14.5165C11.0524 14.7015 11.2474 14.8172 11.46 14.8206H14.61C15.2672 14.8206 15.8 15.3534 15.8 16.0106V20.0106C15.8007 20.2749 15.9744 20.5077 16.2276 20.5836C16.4808 20.6596 16.7539 20.5609 16.9 20.3406L22.34 12.1706C22.4621 11.9896 22.4743 11.7559 22.3717 11.5632C22.269 11.3705 22.0683 11.2502 21.85 11.2506H18.74C18.0773 11.2506 17.54 10.7133 17.54 10.0506V4.51057C17.5076 4.27237 17.334 4.07762 17.101 4.01829C16.868 3.95895 16.6224 4.04688 16.48 4.24057Z" fill="white"/>
          <path d="M8.75 8.11057H3.95C3.53579 8.11057 3.2 7.77479 3.2 7.36057C3.2 6.94636 3.53579 6.61057 3.95 6.61057H8.75C9.16421 6.61057 9.5 6.94636 9.5 7.36057C9.5 7.77479 9.16421 8.11057 8.75 8.11057Z" fill="white"/>
          <path d="M7.55 12.8406H2.75C2.48205 12.8406 2.23446 12.6976 2.10048 12.4656C1.96651 12.2335 1.96651 11.9476 2.10048 11.7156C2.23446 11.4835 2.48205 11.3406 2.75 11.3406H7.55C7.96421 11.3406 8.3 11.6764 8.3 12.0906C8.3 12.5048 7.96421 12.8406 7.55 12.8406Z" fill="white"/>
          <path d="M8.75 18.6106H3.95C3.53579 18.6106 3.2 18.2748 3.2 17.8606C3.2 17.4464 3.53579 17.1106 3.95 17.1106H8.75C9.16421 17.1106 9.5 17.4464 9.5 17.8606C9.5 18.2748 9.16421 18.6106 8.75 18.6106Z" fill="white"/>
          </svg>
          </div>

          </div>
          <div style={{height: '400px'}}>
         <EventSlider/>
          </div>
          </div>
    </div>
  )
}

export default Home
