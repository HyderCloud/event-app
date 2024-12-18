"use client"
import React, { useState } from 'react'
import { Button, Divider, Input, user, Checkbox } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import Image from 'next/image'
import axios from 'axios';

const UsernameSection = ({ email }) => {
  const path = usePathname()
  const [checked, setChecked] = useState(false);
  const [isContentCheck, setIsContetntCheck] = useState(false)

  const router = useRouter()
  const [isLoad, setIsLoad] = useState(false)
  const [error, setError] = useState({
    username: false,
    terms: false,
  })
  const [username, setUsername] = useState('')
  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleChangeTerms = () => {
    setChecked(!checked)
  };
  const handleChangeContent = () => {
    setIsContetntCheck(!isContentCheck)
  };
  const handleSubmit = async (e) => {
    setIsLoad(true)
    if (username.length > 2 && error.terms) {
      const result = await axios.post('http://localhost:9020/updateusername',
        { username: username, email: email, terms: checked, sellContent: isContentCheck })
      if (result.data.acknowledge) {
        router.push(`/?isbuissness=true`)
      }

    } else if (error.terms === false && username.length <= 2) {
      setError((prevError) => ({
        ...prevError,
        username: true
      }));
      setError((prevError) => ({
        ...prevError,
        terms: true
      }));
      setIsLoad(false)

    }
    else if (username.length <= 2) {
      setError((prevError) => ({
        ...prevError,
        username: true
      }));
      setIsLoad(false)
    } else if (error.terms === false) {
      setError((prevError) => ({
        ...prevError,
        terms: true
      }));
      setIsLoad(false)
    }

  }

  return (
    <div className='glass-background w-screen h-screen'>
      <div className=' body2 flex flex-row' >
        {console.log(email)}
        <div className='flex  justify-center' style={{ width: '60%' }}>
          <div className="form-container " >
            <h1 className="title">Username</h1>
            <form className="form flex flex-col" style={{ gap: '30px' }}>
              <div className="input-group">
                <Input isRequired variant='underlined' isInvalid={error.username} errorMessage={'יש להכניס שם משתמש תקין'}
                  label="שם משתמש" color='primary' type="text" name="username" required onChange={handleChange} />
              </div>
              <div className='flex flex-col' style={{ gap: '10px' }}>
                <Checkbox radius='large' value={isContentCheck} onChange={handleChangeContent}>
                  קבלת תוכן שיווקי
                </Checkbox>
                <div>
                  <Checkbox radius='large' isInvalid={error.terms} isRequired
                    errorMessage={'יש לאשר את תנאי השימוש'} value={checked} onChange={handleChangeTerms}>
                    תנאי שימוש
                  </Checkbox>
                  {error.terms && <div style={{ fontSize: '12px', color: '#F31260' }} >יש לאשר את תנאי השימוש</div>}
                </div>
              </div>
              <div style={{ paddingTop: '20px' }}>
                <Button isLoading={isLoad} type="button" color='primary' onPress={handleSubmit} className="sign-in w-full">
                  לשלב הבא
                </Button>
              </div>



            </form>
          </div>
        </div>
        <div className='w-full bg-white h-full flex justify-center items-center'>


        </div>
      </div>
    </div>
  )

}

export default UsernameSection