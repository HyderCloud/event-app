"use client"
import React, {useState} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useJwt } from 'react-jwt'
import { Button } from '@nextui-org/react'


const StoreSlide = () => {
    const [cookie, setCookie, removeCookie] = useCookies('')
    const { decodedToken, isExpired } = useJwt(cookie.store)
    const router = useRouter()
    const pathName = usePathname()
    const [isHover, setIsHover] = useState('')
    const handleHomeClick = ()=>{
        router.push('/')
    }
    const handleEventsClick = ()=>{
        router.push(`/events/${decodedToken?.name}`)
    }
    const handleProfileClick = ()=>{

        router.push(`/${decodedToken?.name}`)
    }
    const handleOutClick = ()=>{

        router.push(`/api/auth/signout`)
    }
    if(pathName.split('/')[1] === 'dashbord'){
        return(<div>
            
        </div>)
    }else{

        return (
            
          <div className='nav-slide-bar flex flex-col'>
              <div className='nav-header'><p></p></div>
              <div className={` ${isHover === 'home'| pathName=== '/' ? 'nav-slot-bar-hover': "nav-slot-bar"}`} 
              onMouseEnter={()=>{setIsHover('home')}} onMouseLeave={()=>{setIsHover('')}} onClick={handleHomeClick}
              ><p className='slot-text-nav'>בית</p></div>
              <div className={` ${isHover === 'profile'| pathName.slice(1)===  decodedToken?.name? 'nav-slot-bar-hover': "nav-slot-bar"}`} 
              onMouseEnter={()=>{setIsHover('profile')}} onMouseLeave={()=>{setIsHover('')}} onClick={handleProfileClick}
              ><p className='slot-text-nav'>פרופיל</p></div>
              <div className={` ${isHover === 'events'| pathName=== `/events/${decodedToken?.name}` ? 'nav-slot-bar-hover': "nav-slot-bar"}`} 
              onMouseEnter={()=>{setIsHover('events')}} onMouseLeave={()=>{setIsHover('')}} onClick={handleEventsClick}
              ><p className='slot-text-nav'>אירועים</p></div>
              <div className={` ${isHover === 'wallet'| pathName=== '/wallet' ? 'nav-slot-bar-hover': "nav-slot-bar"}`} 
              onMouseEnter={()=>{setIsHover("wallet")}} onMouseLeave={()=>{setIsHover('')}} onClick={handleHomeClick}
              ><p className='slot-text-nav'>ארנק</p></div>
              <div className={` ${isHover === 'settings'| pathName=== '/settings' ? 'nav-slot-bar-hover': "nav-slot-bar"}`}
              onMouseEnter={()=>{setIsHover('settings')}} onMouseLeave={()=>{setIsHover('')}} onClick={handleHomeClick}
              ><p className='slot-text-nav'>הגדרות</p></div>
              <div style={{height:'90%'}}></div>
              <Button color='danger' className={`logout-button`} variant='bordered' onPress={handleOutClick}>
                  <div>התנתקות</div>
              </Button>
              <div style={{height:'10%'}}></div>
          </div>
        )
    }
}

export default StoreSlide