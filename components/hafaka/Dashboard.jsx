"use client"
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Frame from '@/image/Frame.png'
import { usePathname } from 'next/navigation'
import DragAndDrop from '../DragImage'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
const Dashboard = ({onMode}) => {

const storeName = usePathname()
const [data, setData] = useState('')
const [linksArr, setLinksArr] = useState([])
const getStore = async ()=>{
  const store = await axios.get(`http://localhost:9020/${storeName.slice(1)}`)

  setData(store.data.store)
  setLinksArr(store.data.store.links)
}
const handleLinks = (link)=>{
  
  if(link.startsWith('https://www.instagram.com')){
  return(
    <Link  href={link} style={{width: '70px', height: '70px', 
      display: 'flex', justifyContent:'center',alignItems:'center',borderRadius: '10px'
   }}>
     <Image src={require('@/image/Frame.png')}  style={{ objectFit: 'contain'}}
     onClick={()=>{
         
     }} 
      alt='llll'
      />
   </Link>
  )
  }else if(link.startsWith('https://www.facebook.com')){
    return(
      <Link  href={link} style={{width: '70px', height: '70px', 
        display: 'flex', justifyContent:'center',alignItems:'center',borderRadius: '10px'
     }}>
       <Image src={require('@/image/Facebook.png')}  style={{ objectFit: 'contain'}}
       onClick={()=>{
           
       }} 
        alt='llll'
        />
     </Link>
    )
  }else if(link.startsWith('https://www.discord.com')|link.startsWith('https://discord.gg')){
    return(
      <Link  href={link} style={{width: '70px', height: '70px', 
        display: 'flex', justifyContent:'center',alignItems:'center',borderRadius: '10px'
     }}>
       <Image src={require('@/image/Discord.png')}  style={{ objectFit: 'contain'}}
       onClick={()=>{
           
       }} 
        alt='llll'
        />
     </Link>
    )
  }else if(link.startsWith('https://www.twitter.com')){
    return(
      <Link  href={link} style={{width: '70px', height: '70px', 
        display: 'flex', justifyContent:'center',alignItems:'center',borderRadius: '10px'
     }}>
       <Image src={require('@/image/X.png')}  style={{ objectFit: 'contain'}}
       onClick={()=>{
           
       }} 
        alt='llll'
        />
     </Link>
    )
  }else if(link.startsWith('https://www.telegram.org')|link.startsWith('https://t.me')){
    return(
      <Link href={link}  style={{width: '70px', height: '70px', 
        display: 'flex', justifyContent:'center',alignItems:'center',borderRadius: '10px'
     }}>
       <Image src={require('@/image/Telegram.png')}  style={{ objectFit: 'contain'}}
       onClick={()=>{
           
       }} 
        alt='llll'
        />
     </Link>
    )
  }else if(link.startsWith('https://www.whatsapp.com')){
    return(
      <Link  href={link} style={{width: '70px', height: '70px', 
        display: 'flex', justifyContent:'center',alignItems:'center',borderRadius: '10px'
     }}>
       <Image src={require('@/image/Elemento.png')}  style={{ objectFit: 'contain'}}
       onClick={()=>{
           
       }} 
        alt='llll'
        />
     </Link>
    )
  }else if(link.startsWith('https://www.youtube.com')){
    return(
      <Link  href={link} style={{width: '70px', height: '70px', 
        display: 'flex', justifyContent:'center',alignItems:'center',borderRadius: '10px'
     }}>
       <Image src={require('@/image/Youtube.png')}  style={{ objectFit: 'contain'}}
       onClick={()=>{
           
       }} 
        alt='llll'
        />
     </Link>
    )
  }
}

useEffect(()=>{

  getStore()
},[])

const handleEdit = ()=>{
  onMode(true)
}

  return (
    <div className='dashboard-container flex flex-col'>
      <div className='main-container flex flex-col'>
        <div className='sec-bunner-cont'>
        <div className='bunner-dash' style={{backgroundImage:  `url(${data.bunner})` ,       height: '250px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'}}>
          
        </div>
          
        </div>
        <div style={{height:'40px'}}></div>
        <div className='footer-dash flex flex-row'>
        <div className='edit-button-area flex flex-row' style={{paddingLeft: '10%'}} >
            <Button className='edit-button' radius='full' onPress={handleEdit} isIconOnly>
            <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7188 0L11.4324 3L16.0053 9L18.2918 6L13.7188 0ZM9.14589 6L0 18V24H4.57294L13.7188 12L9.14589 6Z" fill="white"/>
</svg>
            </Button>
            </div>
            <div></div>
            <div></div>
            <div className='folowers-dash flex flex-col items-center justify-center'>
              <div className='folowers-digits'>עוקבים</div>
              <div className='folowers-digits opacity-70'>{data?.folowers?.length}</div>
            </div>
            <div className='folowers-dash flex flex-col items-center justify-center'>
              <div className='folowers-digits'>אירועים</div>
              <div className='folowers-digits opacity-70'>{data?.folowers?.length}</div>
            </div>
            <div></div>
          <div className='flex flex-col '>
          <div className='store-name items-end'>{data.name}</div>
          <div className='folowers-digits opacity-70 mb-6'>{data.slogen}</div>
          </div>
          <div className='profile-image-edit' style={{backgroundImage:  `url(${data.profile_img})` , 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'}}></div>

 
      
        </div>
      </div>
      <div className='sec-main-container flex flex-row'>
        <div className='third-main-dash flex flex-col'>
        </div>
        <div className='main-dashboard flex flex-col items-end' style={{paddingRight: '20%'}}>
          <div className='folowers-digits ' style={{paddingTop: '5%'}}>אירועים</div>
          <div><svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="4" rx="2" fill="#FBB03B"/>
          </svg></div>
        </div>
        <div className='sec-main-dash flex flex-col'>

          <div className='links-dash-container'>
            {linksArr &&
          <div className='flex flex-row'>
            { linksArr.map((element)=>{
              return(
                handleLinks(element)
              )
            })}
          </div>
            }
          </div>
          <div className='description-dash-container pr-10'>
            <div className='flex flex-row  gap-4'>
              
              <div className='about-slots-edit-sub '>{data?.email}</div>
              {!data?.email? '':<Image  src={require('@/image/email.png')} width={20} height={20} alt='ll'/>}
            </div>
            <div className='h-5'></div>
            <div className='flex flex-row gap-4'>
              <div className='about-slots-edit-sub'>{data?.phone}</div>
              {!data?.phone? '':<Image src={require('@/image/phone.png')} width={15} height={10} alt='ll'/>}
            </div>
              <div className='h-5'></div>
            <div className='flex flex-row'>
              <div className='about-slots-edit-sub'>{data?.address}</div>
            </div>
          </div>
          {/* <div className='past-events-container'>  </div> */}
          <div className='about-container flex flex-col'>
          <h1 className='about-header-dash'>תיאור
          </h1>
          <div style={{paddingRight: '4%'}}>
          <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="18" height="4" rx="2" fill="#FBB03B"/>
          </svg>
          </div>
          <div className='description-text'>
            {data?.description}
          </div>
          <div className='h-10'></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard