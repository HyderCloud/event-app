"use client"
import React, { useState } from 'react'

import { Button, Divider, Input } from "@nextui-org/react";
import { useCookies } from 'react-cookie';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import axios from 'axios';


const StoreSection = ({ username, id, profession, email }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['store']);
  const router = useRouter()
  const [isLoad, setIsLoad] = useState(false)
  const [store, setStore] = useState('')
  const handleChange = (e) => {
    setStore(e.target.value)
  }



  // Function to get styles for each step based on its state
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSubmit = async () => {
    setIsLoad(true)
    const addStore = await axios.patch(`http://localhost:9020/insertstore/${id}`, { store: store, username: username, profession: profession, email: email })
    if (addStore?.data?.acknowledge) {
      setCookie('store', addStore?.data?.token, {
        path: '/'
      })
      console.log(addStore?.data?.token)
      router.push(`/${addStore?.data?.username}`)
    }
  }
  if (isLoad) {
    return (
      <div>loading
      </div>
    )
  } else {
    return (
      <div className='glass-background w-screen h-screen'>
        <div className=' body2 flex flex-row' >
          <div className='flex  justify-center' style={{ width: '60%' }}>
            <div className="form-container">
              <h1 className="title">בואו נגדיר את העסק</h1>
              <form className="form flex flex-col" style={{ gap: '30px' }}>
                <div className="">

                  <Input type="text" label='שם העסק' isRequired color='secondary' variant='underlined' name="username" required />
                </div>
                <div className="">
                  <Input type="text" label=' כתובת אימייל של העסק' color='secondary'
                    variant='underlined' labelPlacement='outside' placeholder='אופציונלי' />
                </div>
                <div className="" >
                  <Input type="text" label=' מספר טלפון של העסק' color='secondary'
                    variant='faded' labelPlacement='outside' placeholder='אופציונלי' style={{
                      textAlign: 'left', direction: 'ltr',

                    }} />
                </div>
                <div>
                </div>
                <Button type="button" color='secondary' onPress={handleSubmit} className="sign-in w-full">
                  הבא
                </Button>
              </form>
            </div>
          </div>
          <div className='flex w-full flex-col items-center h-full bg-white' style={{paddingTop: '30px'}} >
          <section className="multi_step_form w-full">
      <form id="msform">
        <ul id="progressbar">
        <li className={step >= 4 ? 'active' : ''}>סיום</li>
          <li className={step >= 3 ? 'active' : ''}>הגדרות מתקדמות</li>
          <li className={step >= 2 ? 'active' : ''}>סוג העסק</li>
          <li className={step >= 1 ? 'active' : ''}>פרטי העסק</li>
        </ul>

   
        {step === 1 && (
          <fieldset>
            <h3>Step 1: Verify Phone</h3>
            {/* Your form fields for step 1 */}
            <button
              type="button"
              className="action-button next"
              onClick={handleNext}
            >
              Continue
            </button>
          </fieldset>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <fieldset>
            <h3>Step 2: Upload Documents</h3>
            {/* Your form fields for step 2 */}
            <button
              type="button"
              className="action-button previous previous_button"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="action-button next"
              onClick={handleNext}
            >
              Continue
            </button>
          </fieldset>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <fieldset>
            <h3>Step 3: Security Questions</h3>
            {/* Your form fields for step 3 */}
            <button
              type="button"
              className="action-button previous previous_button"
              onClick={handleBack}
            >
              Back
            </button>
            <a href="#" className="action-button">
              Finish
            </a>
          </fieldset>
        )}
      </form>
    </section>
          </div>
        </div>
      </div>
    )
  }
}

export default StoreSection
