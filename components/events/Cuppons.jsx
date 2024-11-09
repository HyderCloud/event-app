"use client"
import { TimeInput, Divider,DatePicker, Input, Switch,Calendar,CheckboxGroup ,Tooltip,Checkbox,Select, SelectItem,RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import React, { useState, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie';

import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'
const Cuppons = ({admin}) => {
    const path = usePathname()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const icon =           <div >
    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="4" rx="2" fill="#FBB03B"/>
    </svg> </div>
    const [index2, setIndex2] = useState('')
    const [events, setEvents] = useState([])
    const [cuppons, SetCuppons] = useState([])
    const [isUse, setIsUse] = useState(false)
    const [isDate, setIsDate] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [useCount, setUseCount] = useState('')
    const [cupponName, setName] = useState('')
    const [discount, setDiscount] = useState('')
    const cupponDoc = {
        cupponName: cupponName,
        discount: discount,
        count: useCount,
        endDate: endDate,
        startDate: startDate
    }
    const getEvents = async ()=>{
            const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
            setEvents(getAllEvents.data.events)
            console.log(getAllEvents.data.events.cuppons)
            SetCuppons(getAllEvents.data.events.cuppons)

        }
    const handleAddCuppon = async (data)=>{
        const result = await axios.patch(`http://localhost:9020/cuppons/${events._id}`, {cuppons: data})
        SetCuppons(result.data.cuppons)
    }
    const handleDate = (newRange)=>{
        const data = { 
            start: new Date(newRange.start), 
            end: new Date(newRange.end) 
          };
          const formattedDateStart = data.start.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          const formattedDateEnd = data.end.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          setEndDate(formattedDateEnd)
          setStartDate(formattedDateStart)
        
    }
    function removeElementAtIndex(arr, index) {
        if (index < 0 || index >= arr.length) {
            console.error("Index out of bounds");
            return arr; // Return the original array if index is invalid
        }
        const newArray = [...arr];
        newArray.splice(index, 1);
        
        return newArray;
    }
    function getStringAfterSecondSlash(path) {
            const parts = path.split('/');
            return parts[2] || null; // Returns the third part, or null if it doesn't exist
          }
    const handleDiscount = (e) => {
            const inputValue = e.target.value;
            const percentageValue = inputValue.toString() + "%";
            setDiscount(percentageValue);
        };

    useEffect(()=>{
        getEvents()
    },[])
  return (
    <div className='w-full h-full flex flex-col'>
    <div className=' flex justify-center items-center flex-col'>
    <Modal size='4xl' className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">הוסף קופון</ModalHeader>
                                        <ModalBody>
                                            <div className='flex flex-col w-full items-center gap-6'>

                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שם הקופון</div>
                                                    <Input  label='Cuppon name' onChange={(e)=>{setName(e.target.value)}} />
                                                    <div className='opacity-70'>אחוז הנחה</div>
                                                    <Input type='number'  label='discount' onChange={handleDiscount} />
                                                    <div className='opacity-70'> הגבל כמות שימושים</div>
                                                    <div className='w-full flex flex-col items-center' style={{gap: '15px'}}>
                                                    <Switch isSelected={isUse} onChange={()=>{setIsUse(!isUse)}} aria-label="Automatic updates"/>
                                                    {isUse && 
                                                    <Input type='number' placeholder='כמות שימושים' onChange={(e)=>{setUseCount(e.target.value)}}  label='discount'  />}
                                                        </div>
                                                    <div className='opacity-70'>תאריך שימוש</div>
                                                    <div className='w-full flex flex-col items-center' style={{gap: '15px'}}>
                                                    <Switch isSelected={isDate} onChange={()=>{setIsDate(!isDate)}} aria-label="Automatic updates"/>
                                                    {isDate && 
                                                    <DateRangePicker  type='number' placeholder=' בחר תאריך שימוש' onChange={handleDate}  label='discount'  />
                                                    }
                                                    </div>
                                                </div>
                                              
                                                   
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                סגור
                                            </Button>
                                            <Button color="primary" onPress={()=>{
                                                if(cuppons.length > 0){
                                                    const newCuppon = [...cuppons,cupponDoc]
                                                    SetCuppons(newCuppon)
                                                    handleAddCuppon(newCuppon)
                                                } else{
                                                    const newCuppon = [cupponDoc]
                                                    SetCuppons(newCuppon)
                                                    handleAddCuppon(newCuppon)
                                                }
                                                onClose()
                                            }}>
                                                הוסף קופון
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
    <Button className='text-white' isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true } onClick={onOpen} color='primary'>הוסף קופון</Button>
    <div className='h-10'></div>
    <Divider className='bg-white' />
    <div className='w-full flex flex-col items-center' style={{paddingLeft: '25%', paddingRight: '25%', paddingTop: '5%', gap: '20px'}}>
    {cuppons?.map((item, index)=>{
        return(
        <div className='glass-background tickets-container w-full flex flex-row' onMouseEnter={()=>{setIndex2(index)}} onMouseLeave={()=>{setIndex2('')}}>
                <Modal size='4xl' className='event-modal-container glass-background' isOpen={isOpen2} onOpenChange={onOpenChange2}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">הוסף קופון</ModalHeader>
                                        <ModalBody>
                                            <div className='flex flex-col w-full items-center gap-6'>

                                                <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שם הקופון</div>
                                                    <Input  label='Cuppon name'placeholder={item.cupponName} onChange={(e)=>{setName(e.target.value)}} />
                                                    <div className='opacity-70'>אחוז הנחה</div>
                                                    <Input type='number' placeholder={item.discount}  label='discount' onChange={handleDiscount} />
                                                    <div className='opacity-70'> הגבל כמות שימושים</div>
                                                    <div className='w-full flex flex-col items-center' style={{gap: '15px'}}>
                                                    <Switch isSelected={isUse} onChange={()=>{setIsUse(!isUse)}} aria-label="Automatic updates"/>
                                                    {isUse && 
                                                    <Input type='number' placeholder={item?.count} onChange={(e)=>{setUseCount(e.target.value)}}  label='discount'  />}
                                                        </div>
                                                    <div className='opacity-70'>תאריך שימוש</div>
                                                    <div className='w-full flex flex-col items-center' style={{gap: '15px'}}>
                                                    <Switch isSelected={isDate} onChange={()=>{setIsDate(!isDate)}} aria-label="Automatic updates"/>
                                                    {isDate && 
                                                    <DateRangePicker  type='number' placeholder=' בחר תאריך שימוש' onChange={handleDate}  label='discount'  />
                                                    }
                                                    </div>
                                                </div>
                                              
                                                   
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                סגור
                                            </Button>
                                            <Button color="primary" onPress={()=>{
                                                if(cuppons.length > 0){
                                                    const newCuppon = [...cuppons]
                                                    newCuppon[index] = cupponDoc
                                                    console.log(newCuppon)
                                                    SetCuppons(newCuppon)
                                                    handleAddCuppon(newCuppon)
                                                }
                                                onClose()
                                            }}>
                                                שנה קופון
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
            {index === index2 && (admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר") &&
            <div className='flex flex-row absolute ' style={{gap: '5px', left: '10px'}}>
                <Button className='buttonfade' onPress={()=>{
                    handleAddCuppon(removeElementAtIndex(cuppons,index))
                }} isIconOnly color='danger'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.75 5H16.08L14.87 3.68C14.4271 3.24459 13.8311 3.00041 13.21 3H10.29C9.65816 3.00529 9.05413 3.26056 8.61 3.71L7.42 5H4.75C4.33579 5 4 5.33579 4 5.75C4 6.16421 4.33579 6.5 4.75 6.5H18.75C19.1642 6.5 19.5 6.16421 19.5 5.75C19.5 5.33579 19.1642 5 18.75 5ZM9.69 4.74C9.8496 4.58138 10.065 4.49163 10.29 4.49H13.21C13.4257 4.48936 13.6334 4.57171 13.79 4.72L14.04 4.99H9.46L9.69 4.74Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.23 9.52V17C4.23 19.4632 6.22681 21.46 8.69 21.46H14.81C17.2732 21.46 19.27 19.4632 19.27 17V9.52C19.27 8.41543 18.3746 7.52 17.27 7.52H6.27C5.73267 7.50925 5.21363 7.71521 4.82986 8.09145C4.44609 8.4677 4.22989 8.98256 4.23 9.52ZM9.5 13.05C9.5 13.4642 9.16421 13.8 8.75 13.8C8.33579 13.8 8 13.4642 8 13.05V10.68C8 10.2658 8.33579 9.93 8.75 9.93C9.16421 9.93 9.5 10.2658 9.5 10.68V13.05ZM11.75 17.75C12.1642 17.75 12.5 17.4142 12.5 17V10.68C12.5 10.2658 12.1642 9.93 11.75 9.93C11.3358 9.93 11 10.2658 11 10.68V17C11 17.4142 11.3358 17.75 11.75 17.75ZM15.5 13.05C15.5 13.4642 15.1642 13.8 14.75 13.8C14.3358 13.8 14 13.4642 14 13.05V10.68C14 10.2658 14.3358 9.93 14.75 9.93C15.1642 9.93 15.5 10.2658 15.5 10.68V13.05Z" fill="white"/>
</svg></Button>
<Button className='buttonfade'
            onPress={()=>{
                onOpen2()
            }} color='primary'>ערוך קופון</Button>
            </div>
            }
        <div className='w-full h-full flex flex-row justify-end'style={{gap: '20px'}}> 
            <div style={{textAlign: 'right', gap: '4px', fontSize: '20px', fontWeight: 'bolder', width: "100%", paddingRight: '2%', paddingLeft: '5px'}}>
                {item?.endDate} - {item?.startDate}
            </div>
            <div className='h-full flex flex-col items-end' style={{textAlign: 'right', gap: '4px', fontSize: '20px', fontWeight: 'bold', width: "100%", paddingRight: '2%', paddingLeft: '5px'}} >
                <div> 
                {item.cupponName} - {index+1} קופון
                </div>
                {icon}
                <div className='flex flex-row h-full justify-end items-center' style={{textAlign: 'right', gap: '24px', fontSize: '14px', fontWeight: 'lighter', width: "100%", paddingRight: '2%', paddingLeft: '5px'}}>
                    <div>{item?.count} :כמות שימושים</div>
                    <div>{item.discount} :אחוז הנחה</div>
                </div>
                </div>
        </div>
        </div>
        )
    })}
    </div>
    </div>
    </div>
  )
}

export default Cuppons