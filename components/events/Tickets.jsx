"use client"
import { TimeInput, Divider,DatePicker, Input, Switch,Calendar,CheckboxGroup ,Tooltip,Checkbox,Select, SelectItem,RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, link } from '@nextui-org/react'
import React, { useState, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'
import DragAndDrop from '../DragImage';
import {CalendarDate} from '@internationalized/date';
const Tickets = ({admin}) => {
    const isFetch = useRef(false)
    const icon =           <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="4" rx="2" fill="#FBB03B"/>
  </svg> </div>
    const [groupSelected, setGroupSelected] = useState(["credit"]);
    const [ticketsAmout, setTicketsAmount] = useState('ללא הגבלה')
    const [section1, setSection1] = useState(true)
    const [section2, setSection2] = useState(false)
    const [section3, setSection3] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const {isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const {isOpen: isOpen4, onOpen: onOpen4, onOpenChange: onOpenChange4 } = useDisclosure();
    const {isOpen: isOpen5, onOpen: onOpen5, onOpenChange: onOpenChange5 } = useDisclosure();
    const [index1, setIndex1] = useState(null)
    const [index2, setIndex2] = useState(null)
    const [name, setName] = useState('')
    const path = usePathname()
    const [events, setEvents] = useState([])
    const [endTime, setEndTime] = useState('')
    const [startTime, setStartTime] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [rounds, setRounds] = useState([])
    const [price, setPrice] = useState('')
    const [amount, setAmount] = useState('')
    const [link, setLink] = useState('http//:localhost:3000/')
    // settings states
    const [ticketSet,SetTicketSet] = useState({})
    const [cash, setCash] = useState(false)
    const [payment, setPayment] = useState(false)
    const [ID, setID] = useState(false)
    const [isdate, setIsdate] = useState(false)
    const [gender, setGender] = useState(false)
    const [isInstegram, setisInstegram] = useState(false)
    const [instegramLink, setInstegramLink] = useState(false)
    const [facebookLink, setFacebookLink] = useState(false)
    const ticketSettings =
            {cash: cash,
            payment: payment,
            ID: ID,
            date: isdate,
            gender: gender,
            isInstegram: isInstegram,
            instegramLink: instegramLink,
            facebookLink: facebookLink}
    const newRound = {
        name: name,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        price: price,
        amount: amount
    }
    const round = {
        name: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        price: '',
        amount: ''
    }
    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        setTicketsAmount(getAllEvents.data.events.tickets)
        setRounds(getAllEvents.data.events.rounds)
        const theSettings = getAllEvents.data.events.ticket_settings
        setCash(theSettings.cash)
        setPayment(theSettings.payment)
        setID(theSettings.ID)
        setIsdate(theSettings.date)
        setGender(theSettings.gender)
        setisInstegram(theSettings.isInstegram)
        setInstegramLink(theSettings.instegramLink)
        setFacebookLink(theSettings.facebookLink)
    }
    const handleAddRound = ()=>{
        setRounds([...rounds,round])
        handleroundUpdate([...rounds,round])
    }
    const handleEndTime = (time)=>{
        const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        setStartTime(formattedTime)
    }
    const handleStartTime = (time)=>{
          const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
          setEndTime(formattedTime)
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

    function getStringAfterSecondSlash(path) {
        const parts = path.split('/');
        return parts[2] || null; // Returns the third part, or null if it doesn't exist
      }
      function removeElementAtIndex(arr, index) {
        // Check if the index is within bounds
        if (index < 0 || index >= arr.length) {
            console.error("Index out of bounds");
            return arr; // Return the original array if index is invalid
        }
    
        // Create a copy of the array and remove the element at the specified index
        const newArray = [...arr];
        newArray.splice(index, 1);
        
        return newArray;
    }
    const handleSetSettings = async (data)=>{
        const result =  await axios.patch(`http://localhost:9020/ticketset/${events._id}`, {settings: data})
        const theSettings = result.data.settings
        setCash(theSettings.cash)
        setPayment(theSettings.payment)
        setID(theSettings.ID)
        setIsdate(theSettings.date)
        setGender(theSettings.gender)
        setisInstegram(theSettings.isInstegram)
        setInstegramLink(theSettings.instegramLink)
        setFacebookLink(theSettings.facebookLink)
    }
    useEffect(() => {
            getEvents()
    }, [])
    useEffect(()=>{
        if(events?._id?.length > 0 && isFetch.current===true){
                console.log("hello")
            handleSetSettings(ticketSettings)
        }else{
        console.log("hi")
        isFetch.current = true
        }

    },[cash,
        payment,
        ID,
        isdate,
        gender,
        isInstegram,
        instegramLink,
        facebookLink,])
    
        const handleTicketsAmountUpdate = async (arr)=>{
            const result =  await axios.patch(`http://localhost:9020/tamount/${events._id}`, {tamount: arr})
            setTicketsAmount(result.data.rounds)
        }    
    
    const handleName = (e)=>{
        setName(e.target.value)
    }
    const handleroundUpdate = async (arr)=>{
        const result =  await axios.patch(`http://localhost:9020/rounds/${events._id}`, {rounds: arr})
        setRounds(result.data.rounds)
    }
  return (
    <div className='w-full h-full'>
         <Modal className='glass-background' style={{color: 'white'}} isOpen={isOpen3} onOpenChange={onOpenChange3}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הגדרת לינק לרכישה</ModalHeader>
              <ModalBody style={{direction: 'ltr'}}>
                <Input defaultValue={''} label={link} value={''}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal className='glass-background' style={{color: 'white'}} isOpen={isOpen5} onOpenChange={onOpenChange5}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הגבלת כמות הכרטיסים לרכישה</ModalHeader>
              <ModalBody >
                <Input onChange={(e)=>{setTicketsAmount(e.target.value)}}
                 type='number' label={'כמות הכרטיסים'} value={ticketsAmout}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={async ()=>{
                    if(ticketsAmout > 0){
                        await handleTicketsAmountUpdate(ticketsAmout)
                        onClose()
                        setPayment(!payment)
                    }
                }}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    <div className=' flex justify-center items-center flex-col'>
        <div className='w-full flex flex-row justify-between'style={{paddingLeft: '50%'}}>
        <div className='flex flex-row' style={{gap: '15px'}}>
        <Tooltip  className='glass-background text-white' showArrow  content="צפייה מוקדמת בתהליך הרכישה של הלקוח">
        <Button className='text-white'color='primary' onClick={()=>{onOpen2()}} > צפייה מוקדמת</Button>
        </Tooltip>
        <Tooltip  className='glass-background text-white' placement='bottom' showArrow  content=" לינק ייחודי לרכישה">
        <Button className='text-white'color='primary' onClick={()=>{onOpen3()}} >  הגדרת לינק לרכישה</Button>
        </Tooltip>
        <Tooltip  className='glass-background text-white' placement='left' showArrow  content=" ה- AI שלנו יעשה זאת בשבילך">
        <Button className='text-white'color='primary' onClick={()=>{onOpen4()}} >   עשה זאת עם AI </Button>
        </Tooltip>
        </div>
        <div><Button isDisabled={admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר"?false:true}
         className='text-white' onClick={handleAddRound} color='primary'>הוספת סבב מכירה</Button></div>
   
        </div>
        <div className='h-10'></div>
        <Divider className='bg-white' />
        <div className='flex flex-col items-center justify-center w-full' style={{gap: '20px'}}>
        <div className='h-10 '></div>
        <div className='flex flex-row w-full h-full justify-center' style={{gap: '20px'}}>
        <div className='flex flex-col items-center glass-background' style={{width: '20%', height: '100%', borderRadius: '10px', paddingTop: '1%',paddingRight: '1%', paddingLeft: '1%'}}>
            <div className='text-white flex flex-col ' style={{width: '100%', height: '450px', fontSize: '20px', gap: '10px'}}>
            <div className='flex flex-col '>
            <div> הגדרות כרטיסים</div>
            {icon}
            </div>
            <div className='flex flex-row w-full justify-between setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
         
           <div>מזומן:</div>
            <Switch style={{direction: 'ltr'}} isSelected={cash} isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onChange={()=>{setCash(!cash)}} aria-label="Automatic updates"/>
     
        
                </div>
                <Tooltip color='primary' placement='right' 
                content={<div>כמות הרכישות שניתן לבצע: {ticketsAmout}</div>}>        
            <div className='flex flex-row w-full justify-between  setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
            <div>
            
           <div>הגבלת רכישה:</div></div>
            <Switch onClick={()=>{
                if(payment==false){
                    onOpen5()
                }
                }} style={{direction: 'ltr'}} isSelected={payment} isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} 
                onChange={ async ()=>{
                   if(payment){
                       await handleTicketsAmountUpdate('ללא הגבלה')
                       setPayment(!payment)
                       setTicketsAmount('ללא הגבלה')
                   }
                    }}  aria-label="Automatic updates"/>
            
           </div>
                    </Tooltip>
            <div className='flex flex-row w-full justify-between  setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
            <div>
           <div>מילוי ת"ז:</div></div>
            <Switch style={{direction: 'ltr'}} isSelected={ID} isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onChange={()=>{setID(!ID)}} aria-label="Automatic updates"/>
           </div>
            <div className='flex flex-row w-full justify-between  setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                            <div>
           <div>תאריך לידה:</div></div>  
            <Switch style={{direction: 'ltr'}} isSelected={isdate} isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onChange={()=>{setIsdate(!isdate)}} aria-label="Automatic updates"/>
           </div>
            <div className='flex flex-row w-full justify-between  setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                
            <div>
           <div>מגדר:</div></div>
            <Switch style={{direction: 'ltr'}} isSelected={gender} isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onChange={()=>{setGender(!gender)}} aria-label="Automatic updates"/>
           </div>
           <div className='flex flex-row w-full justify-between  setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                
                <div>
               <div>אינסטגרם או פייסבוק:</div></div>  
                <Switch style={{direction: 'ltr'}} isSelected={isInstegram} isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onChange={()=>{setisInstegram(!isInstegram)}} aria-label="Automatic updates"/>
               </div>
            <div className='flex flex-row w-full justify-between  setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                
                      
            <div>
            <div>קישור לפייסבוק:</div></div>
            <Switch style={{direction: 'ltr'}} isSelected={facebookLink} isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onChange={()=>{setFacebookLink(!facebookLink)}} aria-label="Automatic updates"/>
           </div>
         
            <div className='flex flex-row w-full justify-between  setting-tickets' style={{gap: '15px', fontSize: '16px', fontWeight: 'bolder'}} >
                
            <div>
           <div>משתמש לאינסטגרם:</div></div>  
            <Switch style={{direction: 'ltr'}} isSelected={instegramLink} isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onChange={()=>{setInstegramLink(!instegramLink)}} aria-label="Automatic updates"/>
           </div>
            </div>
        </div>
        <div className='flex flex-col items-center' style={{width: '50%', height: '100%', gap: '20px'}}>
        {rounds?.map((item,index)=>{

        return(
        <div className='glass-background tickets-container w-full flex flex-row'  onMouseEnter={()=>{setIndex2(index)}} onMouseLeave={()=>{setIndex2(null)}}>
                    <Modal size='4xl' className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Add an event</ModalHeader>
                                        <ModalBody>
                                            <div className='flex flex-col w-full items-center gap-6'>

                                                <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>שם הסבב</div>
                                                    <Input placeholder={item.name} label='Event name' onChange={handleName} />
                                                </div>
                                                <div className='flex flex-col  text-right' style={{ width: '50%',direction: 'ltr'  }}>
                                                    <div className='opacity-70'>תאריך התחלה וסיום</div>
                                                    <DateRangePicker   label='Event date' onChange={handleDate}/>
                                                </div>
                                                <div className='flex flex-col  text-right' style={{ width: '50%',direction: 'ltr' }}>
                                                    <div className='opacity-70'>שעת התחלה</div>
                                                    <TimeInput placeholder={item.startTime} hourCycle={24} label='Start time' onChange={handleStartTime}/>
                                                </div>
                                                <div className='flex flex-col  text-right' style={{ width: '50%',direction: 'ltr'  }}>
                                                    <div className='opacity-70'>שעת סיום</div>
                                                    <TimeInput placeholder={item.endTime} hourCycle={24} label='End time' onChange={handleEndTime}/>
                                                </div>
                                                <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'>כמות כרטיסים</div>
                                                    <Input type='number' placeholder={item.amount}  label='Tickets amount' onChange={(e)=>{setAmount(e.target.value)}}/>
                                                </div>
                                                <div className='flex flex-col  text-right' style={{ width: '50%' }}>
                                                    <div className='opacity-70'> מחיר עבור כרטיס</div>
                                                    <Input type='number' placeholder={item.price}  label='Price' onChange={(e)=>{setPrice(e.target.value)}}/>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button color="primary" onPress={()=>{
                                                const newArr = [...rounds]
                                                newArr[index1] = newRound
                                                console.log(index1)
                                                setRounds(newArr)
                                                handleroundUpdate(newArr)
                                                onClose()
                                            }}>
                                                Action
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
        {index === index2 && (admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר") &&
        <div className='flex flex-row absolute ' style={{gap: '5px', left: '10px'}}>
                     <Button className='buttonfade'
            onPress={()=>{
                setStartDate(item.startDate)
                setEndDate(item.endDate)
                setName(item.name)
                setPrice(item.price)
                setAmount(item.amount)
                setEndTime(item.endTime)
                setStartTime(item.startTime)
                onOpen()
                setIndex1(index)
            }} color='primary'>ערוך סיבוב</Button>
            <Button  color='danger' isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר" ) &&rounds.length > 1 ? false : true}  
             className={`${rounds.length > 1 ?"buttonfade":"buttonfade2"}`} onPress={()=>{
            const removedArr = removeElementAtIndex(rounds,index)
            setRounds(removedArr)
            handleroundUpdate(removedArr)
            }}>מחק</Button>

   

        </div>
        }
        <div style={{gap: '4px', fontSize: '20px', fontWeight: 'bold', width: "100%", paddingRight: '2%', paddingLeft: '5px'}} className='flex h-full  flex-row '>
            <div className='flex flex-col  w-full'>
                
            <div className='flex flex-row' style={{ gap: '10px'}}>
            <div>
               סבב {index+1} -
                </div>
            <div>
                {item?.name === ''? <div style={{fontSize: '20px', fontWeight: 'lighter',}}> יש לערוך סבב </div>
                :<div className='flex flex-row w-full justify-between' style={{gap: '140px'}}> 
                <div className='element-ticket'>
                {item.name} 
                </div>
                <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                {item.startDate}  
                    </div>
                    <div> -</div>
                    <div className='element-ticket'>
                    {item.endDate} 
                    </div>
                </div>
                
                </div>}
                </div>

                </div>
            {icon}

            <div className='flex    flex-row'style={{paddingTop: '5%', fontWeight: 'lighter', fontSize: '16px',gap: '20px' }}>
            <div className='flex  flex-row ' style={{gap: '10px'}}>
      
                    <div>
                מחיר: 
                    </div>
                    <div className='element-ticket'>
                {item.price}
                    </div>
                </div>

            <div className='flex flex-row ' style={{gap: '10px'}}>
  
                    <div>
              כמות כרטיסים
                    </div>
                    <div className='element-ticket'>
                {item.amount}
                    </div>
                </div>
                <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                    {item.startTime} 
          
                    </div>
                    <div> -</div>
                    <div className='element-ticket'> 
                    {item.endTime} 
                    </div>
                </div>

            </div>
            </div>
         </div>
        
    </div>
)
})}
        </div>

        </div>


        </div>
        <div>
        <Modal size='4xl' className='event-modal-container' isOpen={isOpen2} onOpenChange={onOpenChange2} style={{background: 'black'}}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex  flex-col gap-1">תצוגה מוקדמת</ModalHeader>
                                        <ModalBody  style={{gap: '10px'}} >
                                            {section1 &&
                                            <div className='flex flex-col w-full items-center' style={{gap: '10px'}}>
                                            {rounds.map((item, index4)=>{
                                                return(
                                            <div style={{gap: '10px'}} className='glass-background tickets-container w-full flex flex-row' onClick={()=>{
                                                setSection1(false)
                                                setSection2(true)
                                            }}  onMouseEnter={()=>{setIndex2(index4)}} onMouseLeave={()=>{setIndex2(null)}}>
                                            <div style={{gap: '4px', fontSize: '20px', fontWeight: 'bold', width: "100%", paddingRight: '2%', paddingLeft: '5px'}} className='flex h-full  flex-row '>
                                             <div className='flex flex-col  w-full'>
                
            <div className='flex flex-row' style={{ gap: '10px'}}>
            <div>
               סבב {index4+1} -
                </div>
            <div>
                {item?.name === ''? <div style={{fontSize: '20px', fontWeight: 'lighter',}}> יש לערוך סבב </div>
                :<div className='flex flex-row w-full justify-between' style={{gap: '140px'}}> 
                <div className='element-ticket'>
                {item.name} 
                </div>
                <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                {item.startDate}  
                    </div>
                    <div> -</div>
                    <div className='element-ticket'>
                    {item.endDate} 
                    </div>
                </div>
                
                </div>}
                </div>

                </div>
            {icon}

            <div className='flex    flex-row'style={{paddingTop: '5%', fontWeight: 'lighter', fontSize: '16px',gap: '20px' }}>
            <div className='flex  flex-row ' style={{gap: '10px'}}>
      
                    <div>
                מחיר: 
                    </div>
                    <div className='element-ticket'>
                {item.price}
                    </div>
                </div>

            <div className='flex flex-row ' style={{gap: '10px'}}>
  
                    <div>
              כמות כרטיסים
                    </div>
                    <div className='element-ticket'>
                {item.amount}
                    </div>
                </div>
                <div className='flex  flex-row ' style={{gap: '10px'}}>
                    <div className='element-ticket'>
                    {item.startTime} 
          
                    </div>
                    <div> -</div>
                    <div className='element-ticket'> 
                    {item.endTime} 
                    </div>
                </div>

            </div>
                                             </div>
                                            </div>
                                            </div>
                                                )
                                            })}
                                            </div>
                                            }
                                            {section2&&
                                            <div className='flex flex-col w-full items-center' style={{gap: '10px', paddingRight: '25%',paddingLeft: '25%'}}>
                                                <Input label="Full name"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                <Input label="Email"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                <Input label="Phone"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                {ID&&
                                                <Input label="ID"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                }
                                                {isdate&&
                                                <DatePicker label="Birthday"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                }
                                                {gender&&
                                                        <RadioGroup
                                                        label="Select your gender"
                                                        orientation="horizontal"
                                                      >
                                                        <Radio  value="hgfdh"><div className='text-white'>גבר</div></Radio>
                                                        <Radio  value="buenos-aires"><div className='text-white'>אישה</div></Radio>
                                                        <Radio  value="sydney"><div className='text-white'>אחר</div></Radio>
                                                      </RadioGroup>
                                                }
                                                {instegramLink&&
                                                <Input label="Instegram link"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>}
                                                {facebookLink&&
                                                <Input label="Facebook link"  variant='bordered' className='input-glass-background' style={{borderRadius: '10px'}}/>
                                                }
                                            </div>
                                            }
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={()=>{
                                                onClose()
                                                setSection1(true)
                                                setSection2(false)
                                                setSection3(false)
                                            }}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
        </div>
    </div>
    <div style={{height: '200px'}}></div>
    </div>
  )
}

export default Tickets