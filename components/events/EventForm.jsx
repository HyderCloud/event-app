"use client"
import { Input } from '@nextui-org/react'
import React from 'react'

const EventForm = () => {
  return (
    <div className='flex flex-col w-full items-center'>
        <div className='flex flex-col items-end text-right' style={{width: '50%'}}>
        <div>שם האירוע</div>
        <Input label='Event name'/>
        </div>
    </div>
  )
}

export default EventForm