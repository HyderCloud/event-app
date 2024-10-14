"use client"
import React from 'react'
import Image from 'next/image'
import gradient from '@/image/Gradient.png'
import gradient2 from '@/image/Eclipse.png'
import gradient3 from '@/image/Vector7.png'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export const HeaderLanding = () => {
    const router = useRouter()
    const handleClickJoin = ()=>{
        router.push('/signin')
    }

  return (
    <div className='w-full flex flex-row' style={{backgroundColor: '#000000',height:'529px'}}>
        <div className='header-image items-center justify-center'>
        <Image src={gradient2} width={400} heigh={500} 
        style={{marginTop: '190px', marginLeft: '-20px', position: 'absolute',transform: 'rotate(95deg)'}}/>
         <Image src={gradient2} width={400} heigh={500} 
        style={{marginTop: '130px', marginLeft: '190px', position: 'absolute', transform: 'rotate(-95deg)'}}/>
            <Image src={gradient} width={500} heigh={500} 
        style={{paddingTop: '60px', }}/>
        <Image src={gradient2} width={500} heigh={500} 
        style={{marginTop: '-140px', marginLeft: '120px'}}/>
        </div>
        <div className='header-main'>
            <div className='header-main-text'>קבלו יותר עם אפליקציית האירועים שלנו </div>
            <div className='header-sub-text'>תוכנה לניהול אירועים המאפשרת לצוותים שלך לשתף פעולה, לתכנן, לנתח ולנהל את האירוע המושלם עבורך</div>
            
            <div className='header-button'><Button color='primary' radius='full' onClick={handleClickJoin} style={{width: '350px', fontSize:'18px', height: '45px'}}>הצטרפו עכשיו</Button></div>
        </div>
    </div>
  )
}
