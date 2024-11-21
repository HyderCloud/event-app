"use client"
import { Input, Button, RadioGroup, Radio } from '@nextui-org/react'
import { color } from 'highcharts'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from "react";

import PaymentForm from './PaymentForm';
const CreditCard = () => {
    const router = useRouter();
    const path = usePathname()
    const handleGoBack = () => {
        router.back();
      };


  return (
<div className='dashboard-container2 h-full' style={{overflow:'hidden'}}>
  <div className='w-full h-screnn glass-payment flex flex-col'
   style={{paddingLeft:"15%", color: 'white', gap: '10px' ,paddingRight:"15%",paddingTop: '5%'}}>
        <div className=' flex flex-row' onClick={handleGoBack} style={{ gap: '5px', width: '170px', cursor: 'pointer'}}>
    <div className='' style={{padding: '5px'}}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.24993 19C4.66189 18.9946 4.99454 18.662 4.99993 18.25V16.25C4.98914 15.1196 5.43343 14.0323 6.23282 13.2329C7.0322 12.4335 8.11948 11.9892 9.24993 12L18.4399 12L13.7199 16.75C13.549 17.0506 13.6058 17.429 13.8572 17.6662C14.1087 17.9035 14.4898 17.9381 14.7799 17.75L20.7799 11.75C20.8477 11.6806 20.902 11.5993 20.9399 11.51C21.02 11.325 21.02 11.115 20.9399 10.93C20.902 10.8407 20.8477 10.7594 20.7799 10.69L14.7799 4.69C14.4871 4.39755 14.0127 4.39755 13.7199 4.69C13.4275 4.98282 13.4275 5.45718 13.7199 5.75L18.4399 10.5L9.24993 10.5C7.72002 10.4838 6.24804 11.0844 5.16617 12.1662C4.0843 13.2481 3.48371 14.7201 3.49993 16.25V18.25C3.50531 18.662 3.83797 18.9946 4.24993 19Z" fill="white"/>
</svg>
    </div>
    <div style={{fontSize: '24px', fontWeight: 'bolder'}}>
        לעמוד הקודם
    </div>
    </div>
    <div className='bodycard' style={{direction: 'ltr'}}>
    <PaymentForm/>
   
    </div>
    </div>
    </div>
  )
}

export default CreditCard