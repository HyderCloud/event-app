"use client"
import React, {useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import {Button, Divider, Input} from "@nextui-org/react";
import PersonalDetails from './PersonalDetails';
const StoreForm = () => {
    const router = useRouter()
    const search = useSearchParams()
    const [isLoad, setIsLoad] = useState(false)
    const [store, setStore] = useState('')
    
  return (
    <div>
        <PersonalDetails/>
    </div>
  )
}

export default StoreForm