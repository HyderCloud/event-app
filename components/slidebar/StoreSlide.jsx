"use client"
import React, {useState,useContext, useEffect} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useJwt } from 'react-jwt'
import {Tooltip, Button,Tab, Tabs} from "@nextui-org/react";
import Link from 'next/link'

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

        router.push(`/signout`)
    }

    if(pathName.split('/')[1] === 'dashbord'){
        return(<div>
            
        </div>)
    }else{

        return (
          <div className='flex flex-col flex-wrap gap-4 w-full  items-center justify-center '
          style={{width: '80px', backgroundColor: '#fefbf9', gap: '20px', overflowY: 'hidden'}}>
            <div  className="flex h-full items-center justify-center flex-wrap gap-10">
<Tabs isVertical variant='light'  isS size='lg' 
selectedKey={pathName === `/${decodedToken?.name}` ? 'profile':
pathName === `/events/${decodedToken?.name}` ? "events":
'home'}
 style={{gap: '20px'}} classNames={{
  tab: "w-fit h-fit p-0 pl-0 pr-0  bg-red-700"
 }}
 >
  <Tab key='home' href='/'  title={<div className='w-full h-full flex justify-center items-center'
   style={{background: (pathName === '/'|| isHover === 'home') && '#e07b6f' ,height: '40px', width: '40px', borderRadius: '15px'}}  
              onMouseEnter={()=>{setIsHover('home')}} onMouseLeave={()=>{setIsHover('home')}} onClick={handleHomeClick}
              ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4537 3.8032L19.4558 7.49793C20.4198 8.1956 20.9934 9.31112 21 10.5011V17.1895C20.938 19.3342 19.1566 21.0268 17.0116 20.979H6.99789C4.8492 21.032 3.06195 19.338 3 17.1895V10.5011C3.00659 9.31112 3.58019 8.1956 4.54421 7.49793L9.54632 3.8032C11.0068 2.73227 12.9932 2.73227 14.4537 3.8032ZM7.73684 16.9716H16.2632C16.6556 16.9716 16.9737 16.6535 16.9737 16.2611C16.9737 15.8687 16.6556 15.5506 16.2632 15.5506H7.73684C7.34443 15.5506 7.02632 15.8687 7.02632 16.2611C7.02632 16.6535 7.34443 16.9716 7.73684 16.9716Z" fill={pathName === '/' ? '#fefbf9' :`#252323`}/>
              </svg></div>}/>
  <Tab key='profile' href={`/${decodedToken?.name}`} 
      
  title={ <div  className='w-full h-full flex justify-center items-center'
     style={{background:( pathName === `/${decodedToken?.name}`|| isHover === 'profile') && '#f6db83' ,height: '40px', width: '40px', borderRadius: '15px'}}  
              onMouseEnter={()=>{setIsHover('profile')}} onMouseLeave={()=>{setIsHover('')}} onClick={handleProfileClick}
              ><svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6401 22H7.36009C6.34927 21.9633 5.40766 21.477 4.79244 20.6742C4.17722 19.8713 3.95266 18.8356 4.18009 17.85L4.42009 16.71C4.69613 15.1668 6.02272 14.0327 7.59009 14H16.4101C17.9775 14.0327 19.3041 15.1668 19.5801 16.71L19.8201 17.85C20.0475 18.8356 19.823 19.8713 19.2077 20.6742C18.5925 21.477 17.6509 21.9633 16.6401 22Z" fill={pathName === `/${decodedToken?.name}` ? '#fefbf9' :`#252323`}/>
              <path d="M12.5001 12H11.5001C9.29096 12 7.50009 10.2092 7.50009 8.00001V5.36001C7.49743 4.46807 7.85057 3.61189 8.48127 2.98119C9.11197 2.35049 9.96815 1.99735 10.8601 2.00001H13.1401C14.032 1.99735 14.8882 2.35049 15.5189 2.98119C16.1496 3.61189 16.5028 4.46807 16.5001 5.36001V8.00001C16.5001 9.06088 16.0787 10.0783 15.3285 10.8284C14.5784 11.5786 13.561 12 12.5001 12Z" fill={pathName === `/${decodedToken?.name}` ? '#fefbf9' :`#252323`}/>
              </svg></div>}/>
              <Tab key='events' href={`/events/${decodedToken?.name}`} title={  <div  className='w-full h-full flex justify-center items-center'
     style={{background:( pathName === `/events/${decodedToken?.name}`|| isHover === 'events') && '#aad28e' 
     ,height: '40px', width: '40px', borderRadius: '15px'}}
              onMouseEnter={()=>{setIsHover('events')}} onMouseLeave={()=>{setIsHover('')}} onClick={handleEventsClick}
              ><svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.35009 9.55009L10.2701 13.5501C11.0778 13.9293 12.0124 13.9293 12.8201 13.5501L21.6101 9.55009C21.9284 9.37397 22.126 9.03888 22.126 8.67509C22.126 8.3113 21.9284 7.97621 21.6101 7.80009L12.8201 3.80009C12.437 3.62626 12.0208 3.53755 11.6001 3.54009C11.1388 3.5398 10.6837 3.64588 10.2701 3.85009L2.35009 7.85009C2.05587 8.03243 1.87687 8.35395 1.87687 8.70009C1.87687 9.04623 2.05587 9.36775 2.35009 9.55009Z" fill={pathName === `/events/${decodedToken?.name}` ? '#fefbf9' :`#252323`}/>
              <path d="M21.2901 12.0001L12.4401 15.6901C11.8988 15.9461 11.2714 15.9461 10.7301 15.6901L2.89009 12.0001C2.51164 11.8297 2.06647 11.9944 1.89009 12.3701C1.80545 12.5516 1.79693 12.7595 1.86643 12.9473C1.93593 13.1351 2.07768 13.2874 2.26009 13.3701L10.0801 17.0001C10.566 17.237 11.0995 17.3601 11.6401 17.3601C12.1228 17.3609 12.6001 17.2586 13.0401 17.0601L21.8601 13.3901C22.2439 13.2327 22.4275 12.7939 22.2701 12.4101C22.1127 12.0263 21.6739 11.8427 21.2901 12.0001Z" fill={pathName === `/events/${decodedToken?.name}` ? '#fefbf9' :`#252323`}/>
              <path d="M21.2901 15.0801L12.4401 18.7701C11.8988 19.0261 11.2714 19.0261 10.7301 18.7701L2.89009 15.0901C2.64536 14.9776 2.35918 15.0041 2.13936 15.1598C1.91953 15.3155 1.79946 15.5766 1.82436 15.8448C1.84926 16.113 2.01536 16.3476 2.26009 16.4601L10.0801 20.0801C10.5653 20.3201 11.0988 20.4466 11.6401 20.4501C12.1235 20.4475 12.6008 20.3418 13.0401 20.1401L21.8601 16.4701C22.0497 16.395 22.2005 16.246 22.2778 16.0573C22.3552 15.8687 22.3524 15.6566 22.2701 15.4701C22.1054 15.0936 21.6684 14.9196 21.2901 15.0801Z" fill={pathName === `/events/${decodedToken?.name}` ? '#fefbf9' :`#252323`}/>
              </svg></div>}/>
              <Tab key='wallet'  href={`/`}  title={   <div className='w-full h-full flex justify-center items-center'
     style={{background:( pathName === `/wallet`|| isHover === 'wallet') && '#9fbdf9' ,height: '40px', width: '40px', borderRadius: '15px'}} 
              onMouseEnter={()=>{setIsHover("wallet")}} onMouseLeave={()=>{setIsHover('')}} onClick={handleHomeClick}
              ><svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22 15.8182C22 18.3286 19.9649 20.3636 17.4545 20.3636H6.54545C4.03507 20.3636 2 18.3286 2 15.8182V8.54545C2 6.03507 4.03507 4 6.54545 4H17.4545C19.9649 4 22 6.03507 22 8.54545V15.8182ZM22 13.2818V11.0818H17.4545C16.847 11.0818 16.3545 11.5743 16.3545 12.1818C16.3545 12.7893 16.847 13.2818 17.4545 13.2818H22Z" fill={`#252323`}/>
              </svg>
              </div>}/>
              <Tab  href={`/`} key='settings' title={    <div className='w-full h-full flex justify-center items-center'
     style={{background:( pathName === `/settings`|| isHover === 'settings') && '#8a8282' ,height: '40px', width: '40px', borderRadius: '15px'}} 
              onMouseEnter={()=>{setIsHover('settings')}} onMouseLeave={()=>{setIsHover('')}} onClick={handleHomeClick}
              ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.213 7.76657C22.5811 8.65329 22.3516 9.67573 21.6398 10.32C21.165 10.7488 20.8933 11.3581 20.8914 11.9978C20.8895 12.6375 21.1576 13.2484 21.6298 13.68C22.3398 14.3231 22.5697 15.3428 22.2043 16.2284C21.8388 17.114 20.9567 17.6748 19.9998 17.63C19.3628 17.6013 18.7432 17.8417 18.2923 18.2926C17.8415 18.7434 17.601 19.3631 17.6298 20C17.6506 20.9338 17.0974 21.785 16.2357 22.1452C15.374 22.5053 14.3796 22.3009 13.7298 21.63C13.2995 21.1566 12.6895 20.8866 12.0498 20.8866C11.41 20.8866 10.8 21.1566 10.3698 21.63C9.73563 22.3829 8.68851 22.6413 7.77694 22.2698C6.86536 21.8983 6.29707 20.9817 6.36977 20C6.3985 19.3631 6.15805 18.7434 5.7072 18.2926C5.25636 17.8417 4.6367 17.6013 3.99977 17.63C3.06602 17.6509 2.21479 17.0977 1.85462 16.2359C1.49446 15.3742 1.69888 14.3798 2.36977 13.73C2.84323 13.2998 3.11317 12.6897 3.11317 12.05C3.11317 11.4103 2.84323 10.8002 2.36977 10.37C1.61688 9.73587 1.3585 8.68876 1.72997 7.77718C2.10144 6.86561 3.01809 6.29732 3.99977 6.37001C4.6367 6.39875 5.25636 6.15829 5.7072 5.70745C6.15805 5.25661 6.3985 4.63695 6.36977 4.00001C6.32497 3.04304 6.88579 2.16096 7.77138 1.79552C8.65696 1.43007 9.67664 1.65994 10.3198 2.37001C10.75 2.84347 11.36 3.11342 11.9998 3.11342C12.6395 3.11342 13.2495 2.84347 13.6798 2.37001C14.3229 1.65994 15.3426 1.43007 16.2282 1.79552C17.1137 2.16096 17.6746 3.04304 17.6298 4.00001C17.601 4.63695 17.8415 5.25661 18.2923 5.70745C18.7432 6.15829 19.3628 6.39875 19.9998 6.37001C20.9586 6.32065 21.8448 6.87986 22.213 7.76657ZM10.1598 9.75001C10.1598 9.3358 9.82398 9.00001 9.40977 9.00001C8.9978 9.0054 8.66515 9.33805 8.65977 9.75001C8.65977 10.1642 8.99555 10.5 9.40977 10.5C9.82398 10.5 10.1598 10.1642 10.1598 9.75001ZM14.6798 15C14.2656 15 13.9298 14.6642 13.9298 14.25C13.9298 13.8358 14.2656 13.5 14.6798 13.5C15.094 13.5 15.4298 13.8358 15.4298 14.25C15.4244 14.662 15.0917 14.9946 14.6798 15ZM9.64977 15.41L15.4098 9.64001V9.65001C15.6851 9.3545 15.677 8.894 15.3914 8.60839C15.1058 8.32278 14.6453 8.31465 14.3498 8.59001L8.58977 14.35C8.44682 14.4893 8.3662 14.6804 8.3662 14.88C8.3662 15.0796 8.44682 15.2707 8.58977 15.41C8.72761 15.5547 8.92001 15.6345 9.11977 15.63C9.31883 15.631 9.50988 15.5516 9.64977 15.41Z" fill={`#252323`}/>
              </svg>
              </div>}/>
</Tabs>
            </div>
         </div>

        )
    }
}

export default StoreSlide