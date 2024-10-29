"use client"
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Main from './Main'
import Tickets from './Tickets'
const EventComp = ({}) => {
  const icon =           <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="4" rx="2" fill="#FBB03B"/>
  </svg> </div>
  const router = useRouter()
  const [events, setEvents] = useState([])
  const path = usePathname()
  const searchParams = useSearchParams();
  const section = searchParams.get('section'); 
  const getEvents = async ()=>{
      const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)

      setEvents(getAllEvents.data.events)
  }
  function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[2] || null; // Returns the third part, or null if it doesn't exist
  }
  useEffect(()=>{
    getEvents()
  },[])
  return (
    <div className='dashboard-container flex flex-col'>
        <div className='w-full navbar-event flex flex-row items-center justify-end '>
        <div className='navbar-event-slot flex flex-col items-end' onClick={()=>{router.push(`${path}?section=scanner`)}}>
        <div className='navbar-event-slot-1' style={{opacity: section=== 'scanner' && '100%'}}>סורק</div>
        {section=== 'scanner' && icon}
        </div>
          <div className='navbar-event-slot flex flex-col items-end' onClick={()=>{router.push(`${path}?section=admin`)}}>
          <div className='navbar-event-slot-1' style={{opacity: section=== 'admin'&& '100%'}}>הרשאות</div>
          {section=== 'admin' && icon}
          </div>
          <div className='navbar-event-slot flex flex-col items-end' onClick={()=>{router.push(`${path}?section=add`)}}>
          <div className='navbar-event-slot-1' style={{opacity: section=== 'add'&& '100%'}}>פרסום</div>
          {section=== 'add' && icon}
          </div>
          <div className='navbar-event-slot flex flex-col items-end' onClick={()=>{router.push(`${path}?section=cuppons`)}}>
          <div className='navbar-event-slot-1' style={{opacity: section=== 'cuppons'&& '100%'}}>קופונים</div>
          {section=== 'cuppons' && icon}
          </div>
          <div className='navbar-event-slot flex flex-col items-end' onClick={()=>{router.push(`${path}?section=statistics`)}}>
          <div className='navbar-event-slot-1' style={{opacity: section=== 'statistics'&& '100%'}}>סטטיסטיקה</div>
          {section=== 'statistics' && icon}
          </div>
          <div className='navbar-event-slot flex flex-col items-end' onClick={()=>{router.push(`${path}?section=team`)}}>            
            <div className='navbar-event-slot-1' style={{opacity: section=== 'team'&& '100%'}}>צוות</div>
          {section=== 'team' && icon}</div>
          <div className='navbar-event-slot flex flex-col items-end' onClick={()=>{router.push(`${path}?section=tickets`)}}>
          <div className='navbar-event-slot-1' style={{opacity: section=== 'tickets'&& '100%'}}>כרטיסים</div>
          {section=== 'tickets' && icon}
          </div>
          <div className='navbar-event-slot flex flex-col items-end' onClick={()=>{router.push(`${path}`)}}>
            <div className='navbar-event-slot-1' style={{opacity: !section && '100%'}}>ראשי</div>
            {!section && icon}
            </div>
        </div>
        <div className='w-full h-full'>
        {!section && <Main data={events}/>}
        {section === 'tickets'&& <Tickets/>}
        </div>
    </div>
  )
}

export default EventComp