"use client"
import { TimeInput, Divider, Input, Switch,Calendar,Select, SelectItem, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'
import DragAndDrop from '../DragImage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Main = ({admin}) => {
    const icon =           <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="4" rx="2" fill="#FBB03B"/>
  </svg> </div>
    const path = usePathname()
    const [content, setContent] = useState('');

    const handleChange = (value) => {
        console.log(value)
        setContent(value); 
    };
    const [prompt, setPrompt] = useState('')
    const [images, setImages] = useState([])
    const [isImage, setIsImage] = useState('')
    const [isGenerate, setIsgenerate] = useState(false)
    const [isUsed, setIsUsed] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies()
    const [age, setAge] = useState('')
    const {decodedToken, isExpired} = useJwt(cookie.store)
    const [type, setType] = useState('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const {isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [isPrivate, setIsPrivate] = useState('')
    const [events, setEvents] = useState([])
    const [endTime, setEndTime] = useState('')
    const [place, setPlace] = useState('')
    const [startTime, setStartTime] = useState('')
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [tubnail, setTubnail] = useState('')
    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        setIsPrivate(getAllEvents.data.events.mode)
        setName(getAllEvents.data.events.name)
        setEndDate(getAllEvents.data.events.end_date)
        setStartDate(getAllEvents.data.events.start_date)
        setStartTime(getAllEvents.data.events.start_time)
        setEndTime(getAllEvents.data.events.end_time)
        setPlace(getAllEvents.data.events.place)
        setType(getAllEvents.data.events.type)
        setTubnail(getAllEvents.data.events.tubnail)
        setAge(getAllEvents.data.events.age)
        setContent(getAllEvents.data.events.description)
    }
    useEffect(() => {
            getEvents()
    }, [])
    const handlePlace = (e)=>{
        setPlace(e.target.value)
    }
    const handleIstype = async (data)=>{
        const result =  await axios.patch(`http://localhost:9020/chnagetype/${events._id}`,{type: data})
        setType(result.data.type)
    }
    const handleIsPrivate = async (data)=>{
        const result =  await axios.patch(`http://localhost:9020/chnagemode/${events._id}`,{mode: data})
        setIsPrivate(result.mode)
    }
    const handleEndTime = (time)=>{
        const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        setStartTime(formattedTime)
    }
    const handleStartTime = (time)=>{
          const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
          setEndTime(formattedTime)
    }
    function getStringAfterSecondSlash(path) {
        const parts = path.split('/');
        return parts[2] || null; // Returns the third part, or null if it doesn't exist
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
    const handleSaveDescription = async ()=>{
        const result =  await axios.patch(`http://localhost:9020/description/${events._id}`,{description: content})
        setContent(result.data.description)
    }
    const handleClose = ()=>{

        setIsImage(false)
    }
    const handleChangeTubnail = async ()=>{
        const result =  await axios.patch(`http://localhost:9020/chnagetubnail/${events._id}`, {image: tubnail})
        setTubnail(result.data.image)
    }
    const handleChangeTubnailAi = async (data)=>{
        const result =  await axios.patch(`http://localhost:9020/chnagetubnail/${events._id}`, {image: data})
        setTubnail(result.data.image)
    }
    const handleChangeDetails = async ()=>{
        const result =  await axios.patch(`http://localhost:9020/chnagdetails/${events._id}`,
            {startDate: startDate, endDate: endDate,startTime: startTime, endTime: endTime, place: place})
        setStartDate(result.data.start_d)
        setEndDate(result.data.end_d)
        setEndTime(result.data.end_t)
        setStartTime(result.data.start_t)
        setPlace(result.data.place)
    }
    const handleFileUpload = (files) => {
        setTubnail(files)
    }

    const handleAge = (e)=>{
        setAge(e.target.value)
    }
    const handleSentImages = async ()=>{
        try {
            const response = await axios.post("/api/generateimage", 
                { prompt: prompt, type: type, endDate: endDate,startDate: startDate,
                startTime: startTime, endTime: endTime });
            setImages(response.data.images); // Store generated images
          } catch (err) {
            console.error("Error:", err.response?.data || err.message);
          }}

    const handleChangeAge = async ()=>{
        const result =  await axios.patch(`http://localhost:9020/chnageage/${events._id}`, {age: age})
        setAge(result.data.age)
    }
        return (

                <div className=' flex justify-center items-center flex-col w-full ' style={{ gap: '10px', paddingBottom: '5%'}}>
                    <div className='h-4'></div>
                <div className='flex flex-row  w-full' style={{ gap: '10px' }}>
                    <div >
                        <Button color='primary'>צפייה מוקדמת</Button>
                    </div>
                    <div className=''>
                        <Button isDisabled={(admin === 'בעלים'|| admin === "יוצר")?false:true} color='primary'>פרסם אירוע</Button>
                    </div>
                </div>


                <div className='flex flex-col w-full h-full glass-background' style={{gap:"20px",padding: '5%', borderRadius: '15px'
                }}>
                    <div className='flex flex-row justify-between' >
                        {/* date */}

                {/* name */}
                <div className='event-lable font-bold flex flex-col items-start' style={{gap: '0px', paddingRight: '5%'}}>{name}
                    <div className='flex' style={{paddingRight: '15px'}}>
                {icon}
                </div>
                <div className='flex  font-bold type-string text-white' style={{paddingRight: '2%'}}>
                {type}
                    </div>
                </div>
                <div className='text-white flex flex-col justify-center glass-background' style={{borderRadius: '15px', width: '300px', padding: '1%'}}>
                <div>
                    {startDate} - {endDate}
                </div>
                <div>
                {startTime} - {endTime}
                </div>
                <div>
                {place}
                </div>
                </div>
                    </div>
                    {/* description */}
                <div className='flex flex-row justify-between' style={{gap: '10px'}}>

                <div className=' text-white '   style={{
                     minHeight: '200px',
    textAlign: 'right',
    width: '50%',
    wordBreak: 'break-word', // Ensures long words wrap to the next line
    whiteSpace: 'normal'     // Allows wrapping to the next line when content overflows
  }} dangerouslySetInnerHTML={{ __html: content }}>
                </div>
                <div   style={{backgroundImage:  `url(${tubnail})`,
                        borderRadius: '15px',
                        backgroundSize: 'cover',
                        minHeight: '400px',
                        maxHeight: '400px',
                        width: '350px',
                        backgroundPosition: 'center'}}></div>
                </div>
                {(admin === 'מפיק'|| admin ==='בעלים'||admin === "יוצר")&&
                <div className='flex flex-row w-full ' style={{gap: '25px', height: '540px'}}>
                {/* edit */}
                <div className='flex flex-col ' style={{gap: '20px',width: '60%'}}>
                <div className='flex flex-col  items-start ' style={{ borderRadius: '10px',padding: '2%'}}>
                <Button color='primary' onPress={()=>{onOpen()
                            setIsImage("details")
                        }}>עריכת האירוע</Button>
                </div>
                    <div className='flex flex-col glass-background w-full age-container 'style={{padding: '5%'}}>
                        <div className='w-full flex flex-col  text-white font-semibold items-start' >
                           <div> פרטיות</div>
                           {icon}
                        </div>
                <div className=' justify-center flex-row items-center flex h-full' style={{gap: '30px'}}>
                            <Button color='primary' onClick={()=>{
                                setIsImage("ll")
                                onOpen()
                            }}>יצירת הגבלת גיל</Button>
                                                <div className='flex flex-col justify-center items-center'>
                    <div className='text-white' >{isPrivate ? "אירוע פרטי": "אירוע ציבורי"}</div>
                <Switch isSelected={isPrivate} onChange={()=>{
                            handleIsPrivate(!isPrivate)
                            setIsPrivate(!isPrivate)}}/>
                    </div>
                            </div>
                    </div>
                    <div className='flex flex-col glass-background w-full age-container 'style={{padding: '5%'}}>
                        <div className='w-full flex flex-col  text-white font-semibold ' >
                           <div>  סוג האירוע</div>
                           {icon}
                        </div>
                <div className=' justify-center items-center flex h-full'>
                <Select
                        onChange={(e)=>{
                            handleIstype(eventTypes[e.target.value])
                        }}
                        items={eventTypes}
                        label="Evet type"
                        placeholder={type}
                        className="max-w-xs"
                        >
                        {eventTypes.map((item, index) => (
                        <SelectItem key={index}>
                            {item}
                        </SelectItem>
                        ))}
                        </Select>
                            </div>
                    </div>
                </div>

                {/* description */}
                <div className='w-full flex flex-col glass-background' style={{padding: '15px', borderRadius: '15px', gap: '15px'}}>
               <div className='flex flex-row w-full' style={{gap: '10px'}}>
                <div className='w-full flex flex-col  text-white font-semibold items-start' >
                           <div> תיאור האירוע</div>
                           {icon}
                        </div>
                        <div><Button onPress={""} color='primary'>עשה/י זאת עם AI</Button></div>
                        <div><Button onPress={handleSaveDescription} color='primary'>שמור</Button></div>
               </div>
                        <div className='w-full h-full flex justify-center items-center'>
                        <ReactQuill
                        value={content}
                        className='bg-white quil'
                        style={{position: 'static' ,height: '100%', paddingBottom: '35%', paddingLeft: '3%',width: '350px', paddingRight: '3%', paddingTop: '3%', borderRadius: '15px'}}       
                onChange={handleChange}    
                theme="snow"                
                placeholder="Type here..."
                modules={{
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        [{ 'align': [] }],
                        ['link', 'image'],
                        ['clean']                                         // remove formatting button
                    ]
                }}
            />
                        </div>
                </div>
                {/* image */}
                <div className=' flex flex-col glass-background image-cont-main ' >
                        <div className='image-event-cont cursor-pointer' 
                        style={{backgroundImage:  `url(${tubnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'}}
                        onClick={()=>{
                            setIsImage("image")
                            onOpen()
                        }}></div>
                        <div className='w-full h-full flex justify-center items-center'>
                            <Button color='primary' onPress={onOpen3}> עשה זאת עם AI</Button>
                        </div>
                        </div>
                        <Modal className='glass-background' style={{color: 'white'}} size='5xl' isOpen={isOpen3} onOpenChange={onOpenChange3}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader style={{direction: 'ltr'}} className="flex flex-col gap-1">riseAI</ModalHeader>
              <ModalBody >
            <div className='w-full flex flex-col items-center' style={{height: '500px', gap: '15px', paddingBottom: '2%'}}>
                <div className='w-full flex justify-center h-full' style={{borderRadius: '5px'}}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                
        {images.map((img, index) => (
            <div
  className="h-full relative"
  onMouseEnter={() => {
    setIsUsed(true);
  }}
  onMouseLeave={() => {
    setIsUsed(false);
  }}
>
  <button
    className="absolute"
    style={{ top: "3px", right: "3px", color: 'white', backgroundColor: '#4285f4', borderRadius: '8px' }}
    onClick={async () => {
       await handleChangeTubnailAi(img);
        onClose()
    }}
  >
    השתמש/י
  </button>
  <img
    key={index}
    src={img}
    alt={`Generated ${index}`}
    style={{ width: "250px", margin: "10px", height: "100%" }}
  />
</div>
       
         
        ))}
      </div>
                </div>
                <div className='w-full' style={{paddingRight: "15%",paddingLeft: "15%"}}>
            <Textarea onChange={(e)=>{setPrompt(e.target.value)}} style={{}} label={'איזו תמונה תרצה היום...'}/>
                </div>
                <div>
                    <Button onPress={()=>{
                        handleSentImages()
                    }} isDisabled={prompt.length === 0} color='primary'>צור תמונת נושא</Button>
                </div>
            </div>
              </ModalBody>
              <ModalFooter>

                <Button color="primary" onPress={onClose}>
                  סיום
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
                    <Modal className='change-details' isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className=" flex flex-col gap-1">
                                        {isImage === 'image'? "העלאת תמונת נושא":isImage === "details"? "שנה את פרטי האירוע": "הגבל גיל"}
                                    </ModalHeader>
                                    <ModalBody>
                                        {isImage==="image"? <DragAndDrop label={"תמונת נושא"} onFileUpload={handleFileUpload}/>: isImage === "details"?
                                        <div className='flex flex-col w-full items-center gap-6'>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>תאריך התחלה וסיום</div>
                                                <DateRangePicker label='Event date' onChange={handleDate} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>שעת התחלה</div>
                                                <TimeInput hourCycle={24} label='Start time' onChange={handleStartTime} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>שעת סיום</div>
                                                <TimeInput hourCycle={24} label='End time' onChange={handleEndTime} />
                                            </div>
                                            <div className='flex flex-col items-end text-right' style={{ width: '50%' }}>
                                                <div className='opacity-70'>מיקום האירוע</div>
                                                <Input label='Event place' onChange={handlePlace} />
                                            </div>
                                        </div>:
                                        <div className='flex flex-col items-center'>
                                            <Input type='number' label="age" onChange={handleAge} value={age}/>
                                        </div>
                                        }
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={
                                            ()=>{onClose()
                                                handleClose()
                                            }
                                            
                                        }>
                                            סגור
                                        </Button>
                                        <Button color="primary" onPress={() => {
                                            if(isImage === "image"){
                                                handleChangeTubnail()
                                                handleClose()
                                                onClose()
                                            }
                                            else if(isImage === "details"){
                                                handleChangeDetails()
                                                handleClose()
                                                onClose()
                                            }else{
                                                handleChangeAge()
                                                onClose()
                                            }
                                        }}>
                                            החל
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
                }
                </div>
               
                </div>
        )
    }


export default Main

const eventTypes = [
    "חתונה",
    "בר מצווה",
    "בת מצווה",
    "ברית",
    "בריתה",
    "מסיבת רווקות",
    "מסיבת רווקים",
    "מסיבת יום הולדת",
    "חינה",
    "אירוע עסקי",
    "כנס מקצועי",
    "ערב חברה",
    "מסיבת השקה",
    "מסיבת גיוס",
    "מסיבת שחרור",
    "מסיבת תחפושות",
    "מסיבת פורים",
    "מסיבת טבע",
    "הרמת כוסית",
    "חתונת כסף",
    "חתונת זהב",
    "יום נישואין",
    "אירוע התרמה",
    "פסטיבל",
    "מופע מוסיקה",
    "סדנה",
    "מסיבת חנוכה",
    "מסיבת סילבסטר",
    "מסיבת סיום",
];