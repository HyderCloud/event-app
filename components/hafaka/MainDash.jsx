"use client"
import React, {useState} from 'react'
import Dashboard from './Dashboard'
import EditMode from './EditMode'

const MainDash = () => {
    const [isEdit, setIsedit] = useState(false)
    const handleMode = (data)=>{
        console.log(data)
        setIsedit(data)
    }
  if (isEdit){
    return (    
    <EditMode onMode={handleMode}/>
    )
}else{
    return(
        <Dashboard onMode={handleMode}/>
    )
  }
}

export default MainDash