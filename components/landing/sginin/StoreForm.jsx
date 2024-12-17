"use client"
import React, {useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import {Button, Divider, Input} from "@nextui-org/react";
import PersonalDetails from './PersonalDetails';
import StoreSection from './StoreSection';
const StoreForm = () => {
    const router = useRouter()
    const search = useSearchParams()
    const [isLoad, setIsLoad] = useState(false)
    const [store, setStore] = useState('')


  return (
    <div>
        {search.get("sec") ==="varification" ?
        <StoreSection/>
        :
        <PersonalDetails/>
        }
    </div>
  )
}

export default StoreForm