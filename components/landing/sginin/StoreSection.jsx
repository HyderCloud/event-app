"use client"
import React, { useState, useEffect } from 'react'

import { Button, Input, Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { useCookies } from 'react-cookie';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import axios from 'axios';
import proType from "@/db/proType.json"

const StoreSection = ({ username, id, profession, email }) => {
  const [cardIndex, setCardIndex] = useState(null)
  const [mainSections, setMainSections] = useState(false) 
  const [subSection, setSubSection] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['store']);
  const [attractions, setAttractions] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const router = useRouter()
  const [isLoad, setIsLoad] = useState(false)
  const [store, setStore] = useState({
    storeName: '',
    email: '',
    phone: '05',

  })
  const handleClick = (section) => {
    setActiveSection(activeSection === section ? null : section); // Toggle the section visibility
  };
  const [storeErr, setStoreErr] = useState({
    storeName: '',
    email: '',
    phone: '05',

  })
  useEffect(() => {

    setAttractions(proType);

    console.log("🚀 ~ useEffect ~ proType.event_attractions:", proType.event_attractions)
  }, []);
  const handleChange = (key) => (e) => {
    if (key === 'phone') {
      let inputValue = e.target.value;
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = `05${inputValue.replace(/^05/, '').slice(0, 8)}`;
      let formattedValue = inputValue.slice(0, 3) + (inputValue.length > 3 ? '-' : '') + inputValue.slice(3, 6) + (inputValue.length > 6 ? '-' : '') + inputValue.slice(6, 10);
      setStore({
        ...store,
        [key]: formattedValue,
      });
    } else {
      setStore({
        ...store,
        [key]: e.target.value,
      });
    }
  };

  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSubmit = async () => {
    setIsLoad(true)
    if (step === 0) {
      if (store.storeName.length <= 2) {
        setStoreErr({ ...store, storeName: true })
      } else {
        handleNext()
        setIsLoad(false)
      }



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
            {step === 0 &&
              <div className="form-container">
                <h1 className="title">בואו נגדיר את העסק</h1>
                <form className="form flex flex-col" style={{ gap: '30px' }}>
                  <div className="">

                    <Input type="text" label='שם העסק' value={store?.storeName} isRequired color='primary' onChange={handleChange("storeName")}
                      variant='underlined' name="username" required />
                  </div>
                  <div className="">
                    <Input type="text" value={store?.email} label=' כתובת אימייל של העסק' color='primary' onChange={handleChange("email")}
                      variant='underlined' labelPlacement='outside' placeholder='אופציונלי' />
                  </div>
                  <div className="" >
                    <Input type="text" value={store?.phone} label=' מספר טלפון של העסק' color='primary' onChange={handleChange("phone")}
                      variant='faded' labelPlacement='outside' placeholder='אופציונלי' style={{
                        textAlign: 'left', direction: 'ltr',

                      }} />
                  </div>
                  <div>
                  </div>
                  <Button type="button" color='primary' onPress={handleSubmit} className="sign-in w-full">
                    הבא
                  </Button>
                </form>
              </div>
            }
            {step === 1 &&
              <div className='flex flex-col w-full h-full'>
                <h1>Event Attractions</h1>
                <div className='flex flex-row flex-wrap w-full justify-center items-center' style={{ gap: '20px', height: '600px', overflowY: 'auto',
                  paddingTop: '20px', paddingBottom: '10px'
                 }}>

                  {Object.keys(attractions).map((sectionKey, index) => {
                    const section = attractions[sectionKey];
                    return (
                      <div  onClick={() => {
                        const section2 = section
                        delete section2.value
                        setMainSections(false)
                        setSubSection(true)
                        setAttractions(section2)
                      }}>
                      <Card key={sectionKey} color={'primary'} shadow='sm'  onMouseEnter={()=>{
                        setCardIndex(sectionKey)
                      }}
                      onMouseLeave={()=>{ setCardIndex(null)}}
                        style={{
                          width: '280px', height: '120px', borderRadius: '20px',
                          backgroundColor: sectionKey === cardIndex? "#006FEE": '#fff',
                          color: sectionKey === cardIndex? "#fff": '#252323',
                          cursor: 'pointer',
                          transition: "background-color 0.7s ease",
                        }}>
                
                        <CardBody>
                          <div className='flex flex-col' style={{ textAlign: 'right', gap: '5px'}}>
                          <div style={{fontWeight: 'bold'}}> {section.value}</div>
                          <div style={{fontSize: '13px', opacity: '70%'}}>{section.description}</div>
                          </div>
                        
                        </CardBody>
                      </Card>
                      </div>
                    );
      
                       
                  })}


                </div>
                  <div>

                  </div>
              </div>
            }
          </div>
          <div className='flex w-full flex-col items-center h-full bg-white' style={{ paddingTop: '30px' }} >
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

                  </fieldset>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <fieldset>

                  </fieldset>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <fieldset>

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
