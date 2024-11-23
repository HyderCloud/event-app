"use client"
import React, {useState} from 'react'
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
        <main className='glass-background w-screen h-screen'>
      <div className=' body2 flex flex-row'>
        <div className='form-container2' style={{gap: '5px'}}>
          

        <form onSubmit={handleSubmit} className='sginin-form-container  flex flex-col' style={{paddingLeft: "1%", paddingRight: '1%'}}>
        <h1 className="title">התמחות</h1>
      
        <div className={`flex flex-row items-center flex-wrap justify-center`}>
          {professionList.map((index)=>{
            return(
              <Button  onPress={()=>{setData(index)}}
               className= {`flex flex-col profession-cube glass-background items-center justify-center`} style={{backgroundColor: data === index && '#2cf4ff2d'}}>
        <p className=" uppercase font-bold">
      
             {index}
          
              </p>
          </Button>
)})}
</div>
        <div style={{width: '300px'}}>

        <Button color='primary' onPress={handleSubmit} className="sign-in">לשלב הבא</Button>
        </div>

    


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