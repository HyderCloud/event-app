import React, { useRef, useEffect, useState } from 'react';
import { TimeInput, Card, CardHeader, CardBody, User, Link, Textarea,Spacer, CardFooter, Image, Divider, DatePicker, Input, Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import Draggable from 'react-draggable';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
const Missions = ({ admin }) => {

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const status_u = [{text: "בתהליך", color: '#fbbc05'},{text: "בהמתנה", color: '#71717A'},{text: "סיום", color: '#34a853'},{text: "מבוטל", color: '#ae4335'}]
  const [cookie, setCookie, removeCookie] = useCookies('')
  const {decodedToken, isExpired} = useJwt(cookie.store)
  const [match, setMatch] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const path = usePathname()
  const [section1, setSection1] = useState(false)
  const [team, setTeam] = useState([])
  const [events, setEvents] = useState([])
  const [waiting, setWaiting] = useState([])
  const [waitWorkers, setWaitWorkers] = useState([])
  const [role, setRole] = useState([])
  const [searchTem, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [items, setItems] = useState([
    
  ]);
  const [isPanning, setIsPanning] = useState(false);
  const [isMode, setIsMode] = useState(false);
  
  const getCurrentDateTime = () => {
    const now = new Date();
    const month = now.getMonth() + 1; // Months are zero-based, so we add 1
    const day = now.getDate();
    const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Pad minutes to ensure two digits
    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}`;
    return (formattedDateTime);
  };

  const addMissionDoc = {
    title: title,
    key: getStringAfterSecondSlash(path),
    content: description,
    startDate: startDate,
    endDate: endDate,
    endTime: endTime,
    participent: waitWorkers,
    when: getCurrentDateTime(),
    from: decodedToken?.name,
    x: 50, 
    y: 50,
     width: 400, 
     height: 200,
     status: status_u[1],
     connections: []
  }

  const handleEndTime = (time)=>{
      const formattedTime = `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
      setEndTime(formattedTime)
  }
  
  const handleTitle = (e)=>{
    setTitle(e.target.value)

  }

  const handleDescription = (e)=>{
    setDescription(e.target.value)
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

  const handleKeyDown = (event) => {
    if (event.key === 'h' || event.key === 'H') {
      setIsMode(true);
    }
  };

  const handleKeyDown2 = (event) => {
    if (event.key === 'v' || event.key === 'V') {
      setIsMode(false);
    }
  };

  useEffect(() => {
    // Attach the keydown event listener
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleKeyDown2);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleKeyDown2);
    };
  }, []);

  function isIdUnique(id) {
    const exists = waitWorkers?.some(item => item._id === id);
    return !exists; // Returns true if id is unique, false if it exists
  }
 const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
    setEvents(getAllEvents.data.events)
    setTeam(getAllEvents.data?.team)
    console.log(getAllEvents.data?.team)
    setRole(getAllEvents.data.events.roles)

  }
  const gethandleMission = async () => {
    const getAllMissions = await axios.get(`http://localhost:9020/missions/${getStringAfterSecondSlash(path)}`)
    setItems(getAllMissions?.data?.missions)
    console.log(getAllMissions?.data?.missions)
  }
  const handleUpdatemission = async () => {
      await axios.post(`http://localhost:8000/notify/event/${getStringAfterSecondSlash(path)}`, {
        message: 'Hello, Event!'
      })

  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = team.filter(item =>
      item.name.toLowerCase().startsWith(term.toLowerCase())
    );
    setMatch(filtered);
  };
    function getStringAfterSecondSlash(path) {
      const parts = path.split('/');
      return parts[2] || null;
    }
  useEffect(() => {
    getEvents()
    gethandleMission()

      const ws = new WebSocket(`ws://localhost:8000/ws/notification/${getStringAfterSecondSlash(path)}`);

      ws.onopen = () => {
        console.log(`Connected to WebSocket server as ${getStringAfterSecondSlash(path)}`);
        setSocket(ws);
      };
  
      ws.onmessage = (event) => {
        // Handle incoming messages from the server
        const message = JSON.parse(event.data);
        console.log(message)
        getEvents()
        gethandleMission()
        setMessages((prevMessages) => [...prevMessages, message]);
      };
  
      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setSocket(null);
      };
  
      // Cleanup function to close the WebSocket connection when the component unmounts
      return () => {
        if (ws) ws.close();
      };

      // Set up the WebSocket event listeners
    }, [])
    // Filter data by names that start with the search term
    function removeElementAtIndex(arr, index) {
      // Check if the index is within bounds
      if (index < 0 || index >= arr.length) {
        return arr; // Return the original array if index is invalid
      }
      const newArray = [...arr];
      newArray.splice(index, 1);
  
      return newArray;}

  const handleStatusChange = ()=>{

  }

  const handleUpdateStatus = async (status)=>{
    const result = await axios.patch(`http://localhost:9020/updatestatus/${getStringAfterSecondSlash(path)}`, {status: status})
    if(result?.data?.acknowledge){
      await gethandleMission()
     }
  }

  const handleDrag = (e, data, item) => {
    const { x, y } = data;
    setItems((prevItems) =>
      prevItems.map((i) => (i._id === item._id ? { ...i, x: x / scale, y: y / scale } : i))
    );
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.ctrlKey) {
      const zoomFactor = 0.1;
      setScale((prevScale) => (e.deltaY > 0 ? Math.max(prevScale - zoomFactor, 0.1) : prevScale + zoomFactor));
    }
  };
  const handleAddNotification = (data) => {
    data.map(async (item) => {
      await axios.post(`http://localhost:8000/notify/${item?.key}`, { message: item })
    })
  }
  const handleAddMisiion = async (data)=>{

   const result = await axios.post(`http://localhost:9020/addmission/${getStringAfterSecondSlash(path)}`, { data: data, request: waiting })
    if(result?.data?.acknowledge){
     await gethandleMission()
    }
  }
 
  const handleUpdatePlace = async ( id,x,y)=>{
    const result = await axios.patch(`http://localhost:9020/updatemissions/${getStringAfterSecondSlash(path)}`, {  id: id, x: x, y:y })
    if(result?.data?.acknowledge){
     await gethandleMission()
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scale]);

  return (
    <div style={{ height: '900px' }}>
      <div className='flex justify-center items-center' style={{ position: 'relative', width: '100%', height: '80vh' }}>
        {/* Container for items */}
        <div
          ref={containerRef}
          className="w-full h-full"
          style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#18181B',
            borderRadius: '15px',
            border: '1px solid white',
          }}
        >
      <Modal size='5xl' style={{ width: '80%' }} className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>

<ModalContent>
  {(onClose) => (
    <>
      <ModalHeader className="flex flex-col gap-1">הוסף משימה</ModalHeader>
  {section1?
      <div className='flex flex-row' style={{ paddingLeft: '20px' }}>

        <div className='searchResult flex flex-col'>

          {match.length > 0 ? match.map((item, index) => {

            return (
              <Tooltip placement='right' showArrow key={item._id} content={'הוספה לצוות'}
                color="primary">
                <Button key={item._id} className='w-full user-match glass-background '
                  onPress={() => {
                    const isUnique = isIdUnique(item._id)
                    if (isUnique) {
                      setWaitWorkers([...waitWorkers, item])
                      setWaiting([...waiting, {
                        key: item.key, name: item.name
                        , fromName: decodedToken.name,  date: getCurrentDateTime(), isRead: false            ,message: "ברכות קיבלת משימה חדשה",
                         title:title,
                         link: `/${path}?section=mission`,
                         btn: 'לפרטים'
                      }])
                    }
                    if (waitWorkers.length === 0) {
                      console.log(waitWorkers.length)
                      setWaitWorkers([...waitWorkers, item])
                      setWaiting([...waiting, {
                        key: item.key, name: item.name
                        , fromName: decodedToken.name,  date: getCurrentDateTime(), isRead: false            ,message: "ברכות קיבלת משימה חדשה",
                         title:title,
                         link: `/${decodedToken.name}/${getStringAfterSecondSlash(path)}?section=mission`,
                         btn: 'לפרטים'
                      }])
                    }
                  }}
                  style={{ height: '70px' }}>
                  <User className='w-full flex  justify-start items-center'
                    name={<div className="w-full text-white flex flex-row justify-between" style={{ gap: '100%' }}>
                      <div className="flex"> {item.name}</div>
                      <div className="flex text-white opacity-70">{item.profession}</div>
                    </div>}
                    description={(
                      <div className='w-full flex flex-col'>
                        <Link href={`/${item.name}`} size="sm" color='primary' isExternal>
                          {item.email}
                        </Link>
                      </div>
                    )}
                    avatarProps={{
                      src: item.profile_img
                    }}
                  />

                </Button>
              </Tooltip>
            )
          }) : team.map((item, index) => {

            return (
              <Tooltip placement='right' showArrow key={item._id} content={'הוספה לצוות'}
                color="primary">
                <Button key={item._id} className='w-full user-match glass-background '
                  onPress={() => {
                    const isUnique = isIdUnique(item._id)
                    if (isUnique) {
                      setWaitWorkers([...waitWorkers, item])
                      setWaiting([...waiting, {
                        key: item.key, name: item.name
                        , fromName: decodedToken.name,  date: getCurrentDateTime(), isRead: false            ,message: "ברכות קיבלת משימה חדשה",
                         title:title,
                         link: `/${decodedToken.name}/${getStringAfterSecondSlash(path)}?section=mission`,
                         btn: 'לפרטים'
                      }])
                    }
                    if (waitWorkers.length === 0) {
                      console.log(waitWorkers.length)
                      setWaitWorkers([...waitWorkers, item])
                      setWaiting([...waiting, {
                        key: item.key, name: item.name
                        , fromName: decodedToken.name,  date: getCurrentDateTime(), isRead: false            ,message: "ברכות קיבלת משימה חדשה",
                         title:title,
                         link: `/${decodedToken.name}/${getStringAfterSecondSlash(path)}?section=mission`,
                         btn: 'לפרטים'
                      }])
                    }
                  }}
                  style={{ height: '70px' }}>
                  <User className='w-full flex  justify-start items-center'
                    name={<div className="w-full text-white flex flex-row justify-between" style={{ gap: '100%' }}>
                      <div className="flex"> {item.name}</div>
                      <div className="flex text-white opacity-70">{item.profession}</div>
                    </div>}
                    description={(
                      <div className='w-full flex flex-col'>
                        <Link href={`/${item.name}`} size="sm" color='primary' isExternal>
                          {item.email}
                        </Link>
                      </div>
                    )}
                    avatarProps={{
                      src: item.profile_img
                    }}
                  />

                </Button>
              </Tooltip>
            )
          })}
        </div>
        <ModalBody style={{ gap: '10px' }}>
          <div className='flex flex-col w-full h-full add-partner-cont'>
            <div className='style-displaying-role flex w-full justify-end flex-row'>
              {role?.map((item, index) => {
                return (
                  <Tooltip showArrow className=' text-white' color='primary' content="סנן לפי">
                    <div onClick={() => {
                      setFilterBy(item)
                    }} className='role-style glass-background cursor-pointer' style={{ background: filterBy === item && '#006FEE' }}>
                      {item}
                    </div>
                  </Tooltip>
                )
              })}
            </div>
            <div className='class-result-output flex flex-row justify-end overflow-x-auto'>

              {waitWorkers?.map((item, index) => {
                return (
                  <div className='flex items-center justify-center flex-col' style={{ width: '70px' }}>
                    <Tooltip className='cursor-pointer text-white' color='danger' onClick={() => {
                      const removedArr = removeElementAtIndex(waitWorkers, index)
                      setWaitWorkers(removedArr)
                    }} content="מחק">
                      <div className='img-user-added'>
                        <Image className='cursor-pointer'  style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} isBlurred radius='full'
                          borderRadius="full" width={40} height={40}
                          alt="NextUI hero Image"
                          src={item.profile_img?.length === 0 ? `https://app.requestly.io/delay/5000/https` : `${item.profile_img}`} />
                      </div>
                    </Tooltip>
                    <div>
                      {item.name}
                    </div>

                    <div className='w-full justify-center flex glass-background2'>
                      {waiting[index]?.role}
                    </div>
                    <div className='w-full'>

                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ paddingLeft: '20%' }}>
              <Input label='Search for' onChange={handleSearch} placeholder='חפש חבר צוות' />

            </div>

          </div>

        </ModalBody>
      </div>: 
      <div className='flex flex-col justify-center items-end w-full'
       style={{paddingLeft: '30%', height: '400px', paddingRight: '30%', color: 'white', gap: '15px'}}>
        <div className='flex flex-col w-full items-end'>
        <div className='opacity-70'>כותרת המשימה</div>
        <Input onChange={handleTitle} label='Mission title'/>
        </div>
        <div className='flex flex-col w-full items-end'>
        <div className='opacity-70'>תיאור המשימה</div>
        <Textarea
        onChange={handleDescription}
      label="Description"
      placeholder="...פרט על המשימה"
      style={{textAlign: 'right'}}
    />
        </div>
        <div className='flex flex-col w-full items-end'>
        <div className='opacity-70'>תאריך התחלה וסיום</div>
        <DateRangePicker   label='Event date' onChange={handleDate}/>
        </div>
        <div className='flex flex-col w-full items-end'>
        <div className='opacity-70'>שעת סיום</div>
        <TimeInput  hourCycle={24} label='End time' onChange={handleEndTime}/>
        </div>
      </div>
  }
      <ModalFooter>
        <Button color="danger" variant="light" onPress={() => {
          setSection1(false)
          onClose()
          setSearchTerm('')
        }}>
          סגור
        </Button>
        <Button color="primary" onPress={() => {
          if(section1){
            onClose()
            setSearchTerm('')
            setSection1(false)
          }else{
            setSection1(true)
          }
          if (waiting.length > 0) {
            handleAddNotification(waiting)
            setItems([...items,addMissionDoc])
            handleAddMisiion(addMissionDoc)
            handleUpdatemission()
          }
        }}>
          {section1? 
         " הוסף לצוות":
          'לשלב הבא'
          }
        </Button>
      </ModalFooter>
    </>
  )}
</ModalContent>
</Modal>
          {items.map((item,index) => (
            <Draggable
            onStop={()=>{handleUpdatePlace(item._id,item.x * scale + offset.x,item.y * scale + offset.y)
              handleUpdatemission()
            }}
              key={item._id}
              position={{ x: item.x * scale + offset.x, y: item.y * scale + offset.y }}
              onDrag={(e, data) => handleDrag(e, data, item)}
              disabled={!isMode} 
              
            >
              <div className='box-shadow-mission' style={{backgroundColor: 'black', width: `${item.width * scale}px`,
                  height: `${item.height * scale}px`,borderRadius: '8px', }}>
                     <Tooltip color='primary' placement='right' showArrow content={<div>
                      <div>{item.from}</div>
                      <div>
                      {item.content}
                      </div>
                      </div>}>

              <div
              className='glass-background w-full h-full flex flex-col'
                style={{
                  borderRadius: '8px',
                  cursor: isMode ? 'grab' : 'default',
                  position: 'absolute',

                }}
              >
                <div 
                className='w-full glass-background flex flex-row justify-between items-center' 
                style={{height: '40px',  borderTopLeftRadius: '8px', color: 'white', borderTopRightRadius: '8px', padding: '5px', borderBottom: '1px solid white'}}>
                  <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.79 8.04C11.4065 8.08421 11.117 8.40894 11.117 8.795C11.117 9.18106 11.4065 9.50579 11.79 9.55C11.9915 9.5528 12.1854 9.47329 12.327 9.32985C12.4685 9.18641 12.5455 8.99145 12.54 8.79C12.5346 8.37804 12.202 8.04539 11.79 8.04Z" fill="white"/>
<path d="M11.79 10.92C11.5903 10.9173 11.3979 10.9954 11.2567 11.1367C11.1154 11.2779 11.0373 11.4703 11.04 11.67V14.79C11.04 15.2042 11.3758 15.54 11.79 15.54C12.2042 15.54 12.54 15.2042 12.54 14.79V11.69C12.5454 11.4876 12.4688 11.2917 12.3275 11.1467C12.1863 11.0017 11.9924 10.9199 11.79 10.92Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.79 2C6.38542 2.00551 2.00551 6.38542 2 11.79C2 17.1969 6.38313 21.58 11.79 21.58C17.1969 21.58 21.58 17.1969 21.58 11.79C21.5745 6.38542 17.1946 2.00551 11.79 2ZM11.79 20.08C7.21156 20.08 3.5 16.3684 3.5 11.79C3.5 7.21156 7.21156 3.5 11.79 3.5C16.3684 3.5 20.08 7.21156 20.08 11.79C20.0745 16.3662 16.3662 20.0745 11.79 20.08Z" fill="white"/>
                </svg>
                  </div>
                  <div className=''>
                    {item.title}
                  </div>
                </div>
                {item?.participent.map((item2, index2)=>{
                  return(
                    <div className='w-full h-full flex flex-row justify-end items-center'
                     style={{borderBottom: '1px solid white', height: '50px', paddingRight: '5px',  }}>
                {(item2._id === decodedToken?.store_id )?
                <div className='w-full flex items-center text-center justify-center h-full' style={{backgroundColor: item.status.color, color: 'white', height: '100%',borderRight: '1px solid white'}}>

                 <Select 
                  onChange={async (e)=>{
                    
                    if(e.target.value === status_u[0].text){
                      items[index].status.text = e.target.value
                      items[index].status.color = status_u[0].color
                    }else if(e.target.value === status_u[1].text){
                      items[index].status.text = e.target.value
                      items[index].status.color = status_u[1].color
                    }else if(e.target.value === status_u[2].text){
                      items[index].status.text = e.target.value
                      items[index].status.color = status_u[2].color
                    }else if(e.target.value === status_u[3].text){
                      items[index].status.text = e.target.value
                      items[index].status.color = status_u[3].color
                    }
                  await  handleUpdatemission()
                  }}
                 value={item.status.text}
                 radius='none'
                 className='w-full flex items-center text-center justify-center h-full'
                 style={{backgroundColor: item.status.color, height: '100%'}}
                 classNames={{
                  value: "text-blue-500"
                }}
               >
                 {status_u.map((status) => (
                   <SelectItem  key={status.text}  className='text-center' style={{color: 'white', backgroundColor: status.color}}>
                     {status.text}
                   </SelectItem>
                 ))}
               </Select>
                </div>:
                <div className='w-full flex items-center text-center justify-center h-full' 
                style={{backgroundColor: item.status?.color, color: 'white', borderRight: '1px solid white'}}>
                  {item?.status?.text} </div>
                }
                <div className='w-full flex items-center  text-center justify-center h-full' style={{color: 'white', borderRight: '1px solid white' }}>{item2.role}</div>
                <div className='w-full flex items-center text-center justify-center h-full' 
                     >
                                          <div style={{color: 'white' }}>{item2.name}</div>
                                        </div>
                    <div className=' flex items-center justify-end' style={{width: '40px'}}
                     >
                      <div style={{ backgroundImage: `url(${item2.profile_img})`, borderRadius: '100px', height: '35px', width: '35px', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    </div>
                </div>
                  )
                })}
              </div>
                     </Tooltip>
              </div>
            </Draggable>
          ))}
        </div>

        <div
          className="absolute w-full flex justify-end items-center px-4"
          style={{
            height: '70px',
            top: '0',
            left: '0',
            color: 'white',
            zIndex: 1,
          }}
        >
          {(admin === 'מפיק'||admin === 'בעלים'||admin === 'יוצר')&&
          <Button color='primary' onPress={onOpen} style={{ color: 'white' }}>
            הוסף משימה
          </Button>
          }
        </div>

        <div className="absolute justify-center flex items-center"
          style={{
            width: '30%',
            height: '40px',
            bottom: '40px',
            color: 'white',
            zIndex: 1, // Ensure it's above the canvas
          }}
        >
          <div className='w-full flex flex-row shadow-examp' style={{ borderRadius: '25px', height: '45px', backgroundColor: 'black' }}>
            <Button
              className='h-full glass-background'
              color='none'
              radius='none'
              isIconOnly
              onPress={() => { setIsMode(!isMode) }}
              style={{ width: '70px', borderBottomLeftRadius: '25px', borderTopLeftRadius: '25px', borderRight: '1px solid white' }}
            >
                 {isMode ?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55463 20.3261L3.01942 12.9463C3.02823 12.9903 3.03999 13.0337 3.05463 13.0761L5.55463 20.3261ZM2 7.64419L2.04018 8.05008C2.01346 7.91645 2 7.78049 2 7.64419Z" fill="#4285F4"/>
              <path d="M19.0026 20.6586C19.0491 20.6055 19.0898 20.5475 19.1242 20.4858L21.0078 17.0952C21.5465 16.1255 21.6099 14.9263 21.0723 13.8999C20.814 13.4067 20.4866 12.8171 20.1556 12.3218C19.991 12.0756 19.8102 11.8294 19.6228 11.6239C19.4646 11.4505 19.1882 11.1754 18.8163 11.0515C18.5979 10.9787 18.4031 10.7916 18.2381 10.495C18.1039 10.2535 18.031 10.0116 18 9.88995V3.5796C18 2.94334 17.7472 2.33317 17.2974 1.88329C16.601 1.18697 15.4925 1.12556 14.7235 1.74072L14.6203 1.82329C14.0929 2.24521 13.7587 2.86261 13.6936 3.53464L13.5644 4.8695L13.3294 3.41207C13.2306 2.79946 12.9075 2.24547 12.423 1.8579L12.2527 1.72171C11.4973 1.11737 10.4082 1.1777 9.72416 1.86174C9.24676 2.33921 8.99786 2.99922 9.04132 3.67314L9.14048 5.21005L8.82364 4.29471C8.67453 3.86394 8.39998 3.48765 8.03541 3.21419L7.96886 3.16427C7.1853 2.57661 6.07358 2.73533 5.48589 3.51893C5.14494 3.97362 4.99677 4.54449 5.07376 5.1077L5.34893 7.11985L5.24748 6.90003C5.20587 6.80991 5.15761 6.72269 5.1031 6.63935C4.18411 5.23427 2 5.88467 2 7.56374V7.64419L2.04018 8.05008L3.01942 12.9463L5.55463 20.3261C5.56893 20.3676 5.58596 20.4081 5.60559 20.4474C5.91718 21.0705 6.652 21.7001 7.72628 22.1672C8.83437 22.649 10.3916 23.0001 12.5 23.0001C14.6744 23.0001 16.2726 22.4548 17.3456 21.8825C17.8795 21.5977 18.2787 21.3089 18.5516 21.083L18.8678 20.7994L19.0026 20.6586Z" fill="#4285F4"/>
              </svg>  
              :
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75 4.42C8.16196 4.41461 8.49461 4.08196 8.5 3.67V0.75C8.5 0.335786 8.16421 0 7.75 0C7.33579 0 7 0.335786 7 0.75V3.67C7 4.08421 7.33579 4.42 7.75 4.42Z" fill="#4285F4"/>
<path d="M2.46838 2.42838C2.75399 2.14277 3.21449 2.13464 3.51 2.41L5.61 4.47C5.75295 4.60929 5.83357 4.80041 5.83357 5C5.83357 5.19959 5.75295 5.39071 5.61 5.53C5.47077 5.67261 5.27929 5.75209 5.08 5.75C4.86718 5.76219 4.65945 5.68201 4.51 5.53L2.45 3.47C2.17464 3.17449 2.18277 2.71399 2.46838 2.42838Z" fill="#4285F4"/>
<path d="M9.33 7.16L18.48 10.06C19.1282 10.2547 19.6019 10.8115 19.6904 11.4825C19.7788 12.1534 19.4656 12.8139 18.89 13.17L15.69 15.17C15.4834 15.3066 15.3066 15.4834 15.17 15.69L13.17 18.89C12.8039 19.4518 12.1447 19.7496 11.4811 19.6529C10.8176 19.5563 10.2707 19.0829 10.08 18.44L7.21 9.28C7.01252 8.67809 7.17041 8.01628 7.61834 7.56835C8.06628 7.12041 8.72809 6.96252 9.33 7.16Z" fill="#4285F4"/>
<path d="M11.08 4.16C10.9346 4.29951 10.7415 4.37821 10.54 4.38C10.3358 4.36719 10.1451 4.27364 10.01 4.12C9.86705 3.98071 9.78643 3.78959 9.78643 3.59C9.78643 3.39041 9.86705 3.19929 10.01 3.06L12.08 1.06C12.2107 0.911927 12.3953 0.822275 12.5925 0.811006C12.7897 0.799737 12.9832 0.867785 13.13 1C13.4225 1.29282 13.4225 1.76718 13.13 2.06L11.08 4.16Z" fill="#4285F4"/>
<path d="M3.14 9.97L1.08 12.06C0.820702 12.3429 0.820702 12.7771 1.08 13.06C1.22052 13.2007 1.41115 13.2798 1.61 13.28C1.808 13.2757 1.99715 13.1972 2.14 13.06L4.2 11.06C4.49245 10.7672 4.49245 10.2928 4.2 10C4.0648 9.85304 3.87594 9.76695 3.67633 9.7613C3.47672 9.75565 3.28329 9.83092 3.14 9.97Z" fill="#4285F4"/>
<path d="M0.75 7H3.67C4.08421 7 4.42 7.33579 4.42 7.75C4.42 8.16421 4.08421 8.5 3.67 8.5H0.75C0.335786 8.5 0 8.16421 0 7.75C0 7.33579 0.335786 7 0.75 7Z" fill="#4285F4"/>
                </svg>
              }
            </Button>
            <Button className='h-full glass-background' color='none' radius='none' isIconOnly style={{ width: '70px', borderRight: '1px solid white' }}>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
