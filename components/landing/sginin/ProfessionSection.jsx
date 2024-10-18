"use client"
import React, {useState} from 'react'
import gradient2 from '@/image/landing/vec1.svg'
import {Button, Card, Divider, Input, CardHeader} from "@nextui-org/react";
import Image from 'next/image'
import axios from 'axios';
import { useRouter,usePathname  } from 'next/navigation';

const ProfessionSection = ({ onProfession}) => {
  const path = usePathname()
  const [data, setData] = useState('')
  const [isLoad, setIsLoad] = useState(false)

  const handleChange = (e)=>{
      setUsername(e.target.value)
  }

  const router = useRouter()
  const handleSubmit = async ()=>{
      setIsLoad(true)
      onProfession(data)
      router.push(`${path}?professional=access`)

  }
  
  if (isLoad){
    return(
      <div>loading
        
      </div>

    )
  }else{
      return (
        <main className='sginin-container min-h-screen'>
        <div className='flex flex-row sginin-container min-h-screen'>
        <div className='sginin1sec-container'>
            <div className='flex items-center justify-center' style={{height: "90%"}}>
            <Image src={gradient2} className='sginin1sec-container-image'
            height={500}
            width={500}
            />
            </div>
        </div>
        <div className='sginin2sec-container flex flex-col space-y-12'>
          
            <form onSubmit={handleSubmit} className='sginin-form-container flex flex-col' style={{paddingLeft: "15%", paddingRight: '15%'}}>
        <div>בחר התמחות</div>
        <div style={{height: '60px'}}></div>
        <div className={`flex flex-row items-center flex-wrap justify-center`}>
          {professionList.map((index)=>{
            return(
              <Button onPress={()=>{setData(index)}}
               className= {`flex flex-col profession-cube items-center justify-center`} style={{backgroundColor: data === index && '#2cf4ff2d'}}>
        <p className="text-tiny uppercase font-bold">
          <p>
             {index}
          </p>
              </p>
          </Button>
)})}
</div>
        <div style={{height: '40px'}}></div>
        <Button color='primary' onPress={handleSubmit} className='signin-button'>לשלב הבא</Button>
        <div style={{height: '20px'}}></div>
        <div style={{height: '20px'}}></div>
        <Divider/>
        <div style={{height: '20px'}}></div>
        <div style={{height: '20px'}}></div>
            </form>
        </div>
        </div>
    </main>
      )
  }
}

export default ProfessionSection

const professionList = [
'צילום','ציוד ותפאורה','דוכני שירות','אמנות','אבטחה','יחצנות','הפקה'
]