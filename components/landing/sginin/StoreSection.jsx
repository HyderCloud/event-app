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
  const [activeReturn, setActiveReturn] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');
  const router = useRouter()
  const [isLoad, setIsLoad] = useState(false)
  const [store, setStore] = useState({
    storeName: '',
    email: '',
    phone: '05',
    profession: '',
  })

  const [storeErr, setStoreErr] = useState({
    storeName: '',
    email: '',
    phone: '05',

  })
  useEffect(() => {
    setAttractions(proType);

  }, []);
    
  const handlePlaceChanged = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      setSelectedLocation(place.geometry.location);
      setAddress(place.formatted_address);
    }
  };
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
                  <div>
                  </div>
                  <Button type="button" color='primary' onPress={handleSubmit} className="sign-in w-full">
                    הבא
                  </Button>
                </form>
              </div>
            }
            {step === 1 &&
              <div className='flex flex-col w-full h-full' style={{ gap: '20px'}}>
                <div className=' felx flex w-full row justify-between' style={{paddingRight: '80px', paddingLeft: '80px'}}>
                <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>{subSection ? "בחר את הקטגוריה המתאימה עבורך": "בחר את סוג העסק שלך"}</h1>
            
                  <Button  color={activeReturn ? 'primary' : 'default'} radius='full' onMouseEnter={()=>setActiveReturn(true)}
                      onMouseLeave={()=>setActiveReturn(null)}
                      isIconOnly onPress={()=>{
                        if(subSection){
                          setAttractions(proType)
                          setActiveReturn(null)
                           setSubSection(false)
                        }else{handleBack()
                          setActiveReturn(null)
                        }
                      }}><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.94981 15.5201C8.0931 15.6553 8.28278 15.7304 8.47981 15.7301C8.6761 15.7318 8.86434 15.6521 8.99981 15.5101C9.14276 15.3708 9.22338 15.1797 9.22338 14.9801C9.22338 14.7805 9.14276 14.5894 8.99981 14.4501L3.29975 8.75H16.52C16.9342 8.75 17.27 8.41421 17.27 8C17.27 7.58579 16.9342 7.25 16.52 7.25H3.29756L9.00981 1.52006C9.15276 1.38077 9.23338 1.18965 9.23338 0.990063C9.23338 0.790475 9.15276 0.59935 9.00981 0.460063C8.71699 0.167609 8.24263 0.167609 7.94981 0.460063L0.949809 7.46006C0.657355 7.75288 0.657355 8.22724 0.949809 8.52006L7.94981 15.5201Z" fill={activeReturn ?'white': `#252323`}/>
                      </svg>
                      </Button>
                    
             
                </div>
                <div style={{height: '500px', overflowY: 'auto'}}>
                <div className='flex flex-row flex-wrap w-full justify-center items-center' style={{ gap: '20px', overflowY: 'auto',
                  paddingTop: '20px', paddingBottom: '20px'
                 }}>

                  {Object.keys(attractions).map((sectionKey, index) => {
                    const section = attractions[sectionKey];
                      return (
                        <>
                        {(subSection && index === 0)? <div className='absolute'>
                          </div>:
                        <div style={{width: '280px', height: '120px',}} onClick={() => {
                          if(subSection){
                            handleNext()
                            setStore({
                              ...store,
                              profession: attractions[sectionKey].value,
                            })
                          }else{
                            const section2 = section
                            setMainSections(false)
                            setSubSection(true)
                            setAttractions(section2)
                          }
                        }}
                      >
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
                        }}
                   >
                  
                          <CardBody>
                            <div className='flex flex-col' style={{ textAlign: 'right', gap: '5px'}}>
                            <div style={{fontWeight: 'bold'}}> {section.value}</div>
                            <div style={{fontSize: '13px', opacity: '70%'}}>{section.description}</div>
                            </div>
                          
                          </CardBody>
                        </Card>
                        </div>
                        }
                        </>
                      );
                    
      
                       
                  })}

                </div>
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
