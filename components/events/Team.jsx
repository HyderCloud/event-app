"use client"
import React, { useState, useEffect } from 'react'
import { TimeInput, Card, CardHeader, CardBody, User, Link,Image, Spacer, CardFooter, Divider, DatePicker, Input, Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from '@nextui-org/react'
import { useJwt } from 'react-jwt';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import axios from 'axios'



export const Team = ({admin}) => {
  
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [columnDefs, setColumnDefs] = useState([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
  const { isOpen: isOpen4, onOpen: onOpen4, onOpenChange: onOpenChange4 } = useDisclosure();
  const { isOpen: isOpen5, onOpen: onOpen5, onOpenChange: onOpenChange5 } = useDisclosure();
  const { isOpen: isOpen6, onOpen: onOpen6, onOpenChange: onOpenChange6 } = useDisclosure();
  const { isOpen: isOpen7, onOpen: onOpen7, onOpenChange: onOpenChange7 } = useDisclosure();
  const router = useRouter()
  const [newWorker, setNewWorker] = useState([])
  const searchParams = useSearchParams()
  const [team, setTeam] = useState([])
  const [column, setColumn] = useState('')
  const [role, setRole] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [search, setSearch] = useState([])
  const [match, setMatch] = useState([])
  const [request1, setRequest1] = useState(true)
  const [request2, setRequest2] = useState(false)
  const [request3, setRequest3] = useState(false)
  const [searchTem, setSearchTerm] = useState('')
  const [roleChnage, setRoleChange] = useState('')
  const [waiting, setWaiting] = useState([])
  const [waitWorkers, setWaitWorkers] = useState([])
  const [waiters, setWaiters] = useState([])
  const icon = <div >
    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="18" height="4" rx="2" fill="#FBB03B" />
    </svg> </div>
  const path = usePathname()
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
    setEvents(getAllEvents.data.events)
    const eventU = getAllEvents.data.events
    setTeam(getAllEvents.data?.team)
    setRole(eventU.roles)
    setWaiters(eventU.waiting)
    setNewWorker(getAllEvents.data.workers)
    setColumnDefs(getAllEvents.data.events.grid)
  }

  const handleUpdatemission = async () => {
    await axios.post(`http://localhost:8000/notify/event/${getStringAfterSecondSlash(path)}`, {
      message: 'Hello, Event!'
    })

}

  function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[2] || null;
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
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter data by names that start with the search term
    const filtered = search.filter(item =>
      item.name.toLowerCase().startsWith(term.toLowerCase())
    );
    setMatch(filtered);
  };
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
  function updateRoleById(id, newRoll, index, name, email, key) {

    const waitArr = [...waiting]
    waitWorkers.map(item => {
      if (item._id === id) {
        waitArr[index] = {
          key: key, name: name, role: newRoll, admin: 'none',
          from: events._id, email: email, fromName: events.name, owner: events.owner, date: getCurrentDateTime(), isRead: false
            ,message: `ברכות! שמחים להודיעך שהוזמנת לעבוד באירוע ${events.name}, בתפקיד ${newRoll}, 
            אנו נרגשים להוסיף אותך לצוות שלנו ומשוכנעים כי כישוריך יתרמו רבות להצלחת האירוע
            לאישור השתתפותך אשר את ההצעה`,
             title:'הצעת עבודה'
        }
        setWaiting(waitArr)
      }
    });
  }
  const handleAddNotification = (data) => {
    data.map(async (item) => {
      await axios.post(`http://localhost:8000/notify/${item?.key}`, { message: item })
    })
  }

  const handleGetSearch = async () => {
    const result = await axios.get(`http://localhost:9020/getteam`)
    const theRole = result.data.team
    setSearch(theRole)
  }
  const handleUpdateRole = async (data) => {
    const result = await axios.patch(`http://localhost:9020/roles/${events._id}`, { roles: data })
    const theRole = result.data.role
    setRole(theRole)
  }
  const handleUpdateworker = async (data) => {
    const result = await axios.patch(`http://localhost:9020/updateworker/${events._id}`, { team: data })
    const theRole = result.data.workers
    setNewWorker(theRole)
  }

  const handleUpdateGrid = async (data) => {
    const result = await axios.patch(`http://localhost:9020/updategrid/${events._id}`, { grid: data })
    const theRole = result.data.grid
    setColumnDefs(theRole)
  }

  const handleUpdateWaiting = async (data) => {
    const result = await axios.patch(`http://localhost:9020/waiting/${events._id}`, { waiting: data })
    const theWaiter = result.data.waiting
    setWaiters(theWaiter)
  }
  function isIdUnique(id) {
    const exists = waitWorkers.some(item => item._id === id);
    return !exists; // Returns true if id is unique, false if it exists
  }
  const onCellValueChanged = async (params) => {

    const value = params.colDef.field
    const arr  = [...newWorker]
    arr[params.rowIndex][value] = params.newValue
    setTeam([...team]); 
    await handleUpdateworker(arr)
  };

  const addColumn = async () => {
    const newColumn = { field: column, editable: true };

    setColumnDefs([...columnDefs, newColumn]);
    await handleUpdateGrid([...columnDefs, newColumn])
    const updatedRowData = team.map((row) => ({
      ...row,
      [column]: '', // Default empty value
    }));
    const updatedRowData2 = newWorker.map((row) => ({
      ...row,
      [column]: '', // Default empty value
    }));
    setTeam(updatedRowData);
    setNewWorker(updatedRowData2)
    await handleUpdateworker(updatedRowData2)
  };

  useEffect(() => {
    getEvents()
    handleGetSearch()
    const ws = new WebSocket(`ws://localhost:8000/ws/notification/${getStringAfterSecondSlash(path)}`);

    ws.onopen = () => {
      console.log(`Connected to WebSocket server as ${getStringAfterSecondSlash(path)}`);
      setSocket(ws);
    }

    ws.onmessage = (event) => {
      // Handle incoming messages from the server
      const message = JSON.parse(event.data);
      console.log(message)
      getEvents()
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    };

    return () => {
      if (ws) ws.close();
    };
  }, [])

  return (
    
    <div className=' flex justify-center w-full h-full items-center flex-col' style={{  gap: '20px' }}>
      <div className='flex flex-row justify-between w-full'style={{gap: '20px', paddingRight: '5%', paddingLeft: '5%'}}>
      <div className='flex flex-row  w-full'style={{gap: '20px'}}>
        <Button color='primary' isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onClick={() => { onOpen() }}>הוספת חברי צוות</Button>
        <Button color='primary' isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onClick={() => { onOpen2() }}>הוספת תפקיד </Button>
        
        </div>
    
    <Button isIconOnly variant='kff'>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7691 10.6179C14.6701 10.5963 15.4749 10.0491 15.8263 9.21925C15.9013 9.25087 15.9815 9.2683 16.0629 9.27067H20.1771C20.6032 9.27067 20.9486 8.92534 20.9486 8.49935C20.9486 8.07336 20.6032 7.72802 20.1771 7.72802H16.1143C16.0699 7.72221 16.025 7.72221 15.9806 7.72802C15.686 6.57063 14.5523 5.83303 13.3746 6.0325C12.1969 6.23197 11.3695 7.30174 11.4726 8.49158C11.5756 9.68142 12.5747 10.593 13.7691 10.5871V10.6179ZM13.7691 7.58404C14.1838 7.58404 14.52 7.92017 14.52 8.3348C14.52 8.74943 14.1838 9.08556 13.7691 9.08556C13.3545 9.08556 13.0183 8.74943 13.0183 8.3348C13.0183 7.92017 13.3545 7.58404 13.7691 7.58404Z" fill="white"/>
<path d="M3.77143 7.72802H9.94286C10.3689 7.72802 10.7143 8.07336 10.7143 8.49935C10.7143 8.92534 10.3689 9.27067 9.94286 9.27067H3.77143C3.34538 9.27067 3 8.92534 3 8.49935C3 8.07336 3.34538 7.72802 3.77143 7.72802Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.736 15.9555C6.05818 15.0444 6.91918 14.4347 7.88571 14.4334V14.4128C9.04884 14.4114 10.029 15.2806 10.1663 16.4354C10.3037 17.5902 9.55477 18.6651 8.42374 18.9364C7.29271 19.2077 6.13762 18.5896 5.736 17.4981H3.77143C3.34538 17.4981 3 17.1528 3 16.7268C3 16.3008 3.34538 15.9555 3.77143 15.9555H5.736ZM7.1361 16.7809C7.14317 17.19 7.47652 17.5181 7.88571 17.5187V17.4776C8.3004 17.4776 8.63657 17.1414 8.63657 16.7268C8.61415 16.3183 8.26871 16.0029 7.85978 16.0177C7.45086 16.0324 7.12903 16.3718 7.1361 16.7809Z" fill="white"/>
<path d="M12 15.9555H20.2286C20.6546 15.9555 21 16.3008 21 16.7268C21 17.1528 20.6546 17.4981 20.2286 17.4981H12C11.574 17.4981 11.2286 17.1528 11.2286 16.7268C11.2286 16.3008 11.574 15.9555 12 15.9555Z" fill="white"/>
</svg>

    </Button>
    <Tooltip showArrow color='primary' content={'הצעת מחיר'}>
    <Button variant='ffe' onPress={()=>{onOpen6()}} isIconOnly>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.57 9.41988C4.18323 9.69388 4.68677 10.1657 5 10.7599L7.64 15.5699C7.83762 15.9277 7.93763 16.3312 7.93 16.7399L7.88 18.7399C7.87836 19.1527 7.65749 19.5335 7.3 19.7399C7.13675 19.8263 6.95468 19.8709 6.77 19.8699C6.54744 19.869 6.32945 19.8067 6.14 19.6899L4.46 18.6899C4.11098 18.4744 3.82475 18.1709 3.63 17.8099L0.999997 12.9999C0.668643 12.3855 0.555813 11.6768 0.679997 10.9899C0.75635 10.3414 1.1246 9.76325 1.68 9.41988C2.27514 9.12352 2.97485 9.12352 3.57 9.41988ZM5.23 17.3599L6.39 18.0599L6.38 16.6799C6.37661 16.5332 6.33894 16.3894 6.27 16.2599L3.64 11.4499C3.48697 11.1471 3.23704 10.9042 2.93 10.7599C2.82744 10.7087 2.71462 10.6813 2.6 10.6799C2.51638 10.6807 2.43414 10.7012 2.36 10.7399C2.19422 10.851 2.08762 11.0311 2.07 11.2299C2.0243 11.5762 2.09463 11.9278 2.27 12.2299L4.9 16.9999C4.97088 17.1506 5.08599 17.2762 5.23 17.3599Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2199 0.349883L17.2199 7.34988C17.3682 7.49766 17.4479 7.70069 17.4399 7.90988V14.9099C17.4399 16.1697 16.9395 17.3778 16.0487 18.2686C15.1579 19.1594 13.9497 19.6599 12.6899 19.6599H9.8199C9.40569 19.6599 9.0699 19.3241 9.0699 18.9099C9.0699 18.4957 9.40569 18.1599 9.8199 18.1599H12.6899C14.4826 18.1544 15.9344 16.7025 15.9399 14.9099V8.65988H11.6899C10.1734 8.6544 8.94539 7.42639 8.9399 5.90988V1.65988H6.6899C4.89498 1.65988 3.4399 3.11496 3.4399 4.90988V7.55988C3.4399 7.9741 3.10412 8.30988 2.6899 8.30988C2.27569 8.30988 1.9399 7.9741 1.9399 7.55988V4.90988C1.93192 3.64491 2.42883 2.42901 3.3205 1.53172C4.21216 0.634419 5.42491 0.129858 6.6899 0.129883H9.6899C9.88875 0.130058 10.0794 0.20919 10.2199 0.349883ZM10.4399 2.68988V5.90988C10.4399 6.60024 10.9995 7.15988 11.6899 7.15988H14.9099L10.4399 2.68988Z" fill="white"/>
</svg>

    </Button>
    </Tooltip>
    <Tooltip showArrow color='primary' content={'משימות'}>
    <Button variant='ffe' onPress={()=>{router.push(`${path}?section=mission`)}} isIconOnly><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.62012 14.75C1.62012 13.5074 2.62748 12.5 3.87012 12.5H7.37012C8.61276 12.5 9.62012 13.5074 9.62012 14.75V18.25C9.62012 19.4926 8.61276 20.5 7.37012 20.5H3.87012C2.62748 20.5 1.62012 19.4926 1.62012 18.25V14.75Z" fill="white"/>
<path d="M13.6201 13.75C13.2059 13.75 12.8701 14.0858 12.8701 14.5C12.8701 14.9142 13.2059 15.25 13.6201 15.25H18.6201C19.0343 15.25 19.3701 14.9142 19.3701 14.5C19.3701 14.0858 19.0343 13.75 18.6201 13.75H13.6201Z" fill="#34a853"/>
<path d="M21.6201 17.75H13.6201C13.2059 17.75 12.8701 18.0858 12.8701 18.5C12.8701 18.9142 13.2059 19.25 13.6201 19.25H21.6201C22.0343 19.25 22.3701 18.9142 22.3701 18.5C22.3701 18.0858 22.0343 17.75 21.6201 17.75Z" fill="#fbbc05"/>
<path d="M1.62012 5.5C1.62012 4.39543 2.51555 3.5 3.62012 3.5H19.6201C20.7247 3.5 21.6201 4.39543 21.6201 5.5V8.5C21.6201 9.60457 20.7247 10.5 19.6201 10.5H3.62012C2.51555 10.5 1.62012 9.60457 1.62012 8.5V5.5Z" fill="white"/>
</svg></Button>
    </Tooltip>

      </div>
      <div className=' text-white flex flex-col w-full h-full' style={{ borderRadius: '15px', color: 'black', gap: '20px' }}>
        <div className='flex flex-col ag-theme-quartz-dark' 
         style={{gap: '0', overflow: 'auto', whiteSpace: 'nowrap', width: '100%',}}>
          <div className='w-full'>
        <div style={{width: '50px'}}>
        <Button onPress={onOpen4} color='primary'>הוסף עמודה</Button>
        </div>
          </div>
        <AgGridReact rowData={team} columnDefs={columnDefs} onCellValueChanged={onCellValueChanged}  domLayout="autoHeight"></AgGridReact>
        </div>
     
      </div>
      <Modal size='5xl' style={{ width: '80%' }} className='event-modal-container glass-background' isOpen={isOpen6} onOpenChange={onOpenChange6}>
        <ModalContent>
        {(onClose) => (
            <>
      <ModalHeader className="flex flex-col gap-1">הצעת מחיר לחבר צוות</ModalHeader>
       
      <div className='flex flex-row' style={{ paddingLeft: '20px' }}>
      <ModalBody style={{ gap: '10px' }}>
          <div className='flex flex-col w-full h-full add-partner-cont'>
            <div className='style-displaying-role flex w-full  flex-row'>
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
            <div className='class-result-output flex flex-row  overflow-x-auto'>

              {waitWorkers?.map((item, index2) => {
                return (
                  <div className='flex items-center justify-center flex-col' style={{ width: '70px' }}>
                      <Modal className='glass-background' size='5xl' isOpen={isOpen7} onOpenChange={onOpenChange7}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white"> כתיבת הצעת מחיר - שלב א</ModalHeader>
              <ModalBody style={{padding:'5%',}}>
                {request1 &&
              <div className='flex flex-col items-center justify-center'
               style={{height: '330px', gap: '20px', overflow: 'auto', padding: '2%'}}>
                <div>
              <Textarea label='תיאור העבודה בקצרה' placeholder=''/>
                </div>
                <div>
              <Textarea label='פירוט כל הסעיפים בהצעת המחיר' placeholder=''/>
                </div>
 
              </div>
                }
                {request2 &&
                  <div className='flex flex-col' style={{height: '330px', gap: '20px', overflow: 'auto', padding: '2%'}}>
                                   <div>
              <Textarea label='הערות ותוספות להצעת המחיר' placeholder=''/>
                </div>
                  </div>
                }
              </ModalBody >
              <ModalFooter>
                <Button color="danger" variant="light" onPress={()=>{
                    onClose()
                 }}>
                  Close
                </Button>
                <Button color="primary" onPress={ async ()=>{
                  if(request1){
                    setRequest1(false)
                    setRequest2(true)
                  }else if(request2){
                    setRequest2(false)
                    setRequest3(true)
                  }else{

                    onClose()
                  }
             
                }}>
                    שינוי תקציב
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
                    <Tooltip className='cursor-pointer text-white' color='danger' onClick={() => {
                      const removedArr = removeElementAtIndex(waitWorkers, index2)
                      setWaitWorkers(removedArr)
                    }} content="מחק">
                      <div className='img-user-added' >
                        <Image className='cursor-pointer' onClick={()=>{
                   
                            onOpen7()
                        }} style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} isBlurred radius='full'
                          borderRadius="full" width={40} height={40}
                          alt="NextUI hero Image"
                          src={item.profile_img?.length === 0 ? `https://app.requestly.io/delay/5000/https` : `${item.profile_img}`} />
                      </div>
                    </Tooltip>
                    <div>
                      {item.name}
                    </div>

                    <div className='w-full justify-center flex glass-background2'>
                      {waiting[index2]?.role}
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
        <div className='searchResult flex flex-col'>

          {match.length > 0 ? match.map((item, index) => {

            return (
              <Tooltip placement='right' showArrow key={item._id} content={'הוספה לצוות'}
                color="primary">
                <Button key={item._id} className='w-full user-match glass-background '
                  onPress={() => {
                    const isUnique = isIdUnique(item._id)
                    if (isUnique) {
                      let arr = item
                      
                      setWaitWorkers([...waitWorkers, arr])
                     
                    }
                    if (waitWorkers.length === 0) {
                      let arr = item
                      
                      setWaitWorkers([...waitWorkers, arr])
     
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
                      let arr = item
                      setWaitWorkers([...waitWorkers, arr])
                    
                    }
                    if (waitWorkers.length === 0) {
                      let arr = item
                      setWaitWorkers([...waitWorkers, arr])
                 
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

   
      </div>
            

      <ModalFooter>
        <Button color="danger" variant="light" onPress={() => {
          onClose()
          setSearchTerm('')
          setWaitWorkers([])
        }}>
          סגור
        </Button>
        <Button color="primary" onPress={() => {
            onClose()
            setSearchTerm('')
            handleUpdatemission()
               setWaitWorkers([])
        }}>
            הוספת עובד
        </Button>
      </ModalFooter>
    </>
  )}
</ModalContent>
      </Modal>
      <Modal size='5xl' style={{ width: '80%' }} className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>

        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הוסף חבר צוות</ModalHeader>
              <div className='flex flex-row' style={{ paddingLeft: '20px' }}>
              <ModalBody style={{ gap: '10px' }}>
                  <div className='flex flex-col w-full h-full add-partner-cont'>
                    <div className='style-displaying-role flex w-full  flex-row'>
                      {professionList.map((item, index) => {
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
                    <div className='class-result-output flex flex-row  overflow-x-auto'>

                      {waitWorkers.map((item, index) => {
                        return (
                          <div className='flex items-center justify-center flex-col' style={{ width: '70px' }}>
                            <Tooltip className='cursor-pointer text-white' color='danger' onClick={() => {
                              const removedArr = removeElementAtIndex(waitWorkers, index)
                              const removeWait = removeElementAtIndex(waiting, index)
                              setWaiting(removeWait)
                              setWaitWorkers(removedArr)
                            }} content="מחק">
                              <div className='img-user-added'>
                                <Image className='cursor-pointer' onClick={() => {
                                  onOpen3()
                                }} style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} isBlurred radius='full'
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
                              <Modal size='md' style={{ background: '#27272A' }} isOpen={isOpen3} onOpenChange={onOpenChange3}>
                                <ModalContent>
                                  {(onClose) => (
                                    <>
                                      <ModalHeader className="flex flex-col gap-1 text-white">{item.name} - הוספת תפקיד ל</ModalHeader>
                                      <ModalBody >
                                        <div className='flex flex-col justify-center items-center' style={{ height: '170px', gap: '20px' }}>
                                          <Select className='w-full' style={{ color: 'black' }} label='תפקיד'
                                            onChange={(e) => {
                                              updateRoleById(item._id, role[e.target.value], index, item.name, item.email, item.key)

                                            }}

                                          >
                                            {role?.map((item, index) => (
                                              <SelectItem key={index}>
                                                {item}
                                              </SelectItem>
                                            ))}
                                          </Select>
                                          <div style={{height: '30px', width: '50px'}}>
                                          <Button onPress={onOpen2} color='primary'>הוסף תפקיד</Button>
                                          </div>
                                        </div>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                          סגור
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                          שמור
                                        </Button>
                                      </ModalFooter>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>
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
                                key: item.key, name: item.name, role: null, admin: 'none', email: item.email
                                , fromName: events.name, owner: events.owner, date: getCurrentDateTime(), isRead: false            ,message: `בתפקיד ${null} ברכות! שמחים להודיעך שהוזמנת לעבוד באירוע ${events.name},
                                אנו נרגשים להוסיף אותך לצוות שלנו ומשוכנעים כי כישוריך יתרמו רבות להצלחת האירוע
                                לאישור השתתפותך אשר את ההצעה`,
                                 title:'הצעת עבודה'
                              }])
                            }
                            if (waitWorkers.length === 0) {
                              console.log(waitWorkers.length)
                              setWaitWorkers([...waitWorkers, item])
                              setWaiting([...waiting, {
                                key: item.key, name: item.name, role: null, admin: 'none', email: item.email
                                , fromName: events.name, owner: events.owner, date: getCurrentDateTime(), isRead: false            ,message: `בתפקיד ${null} ברכות! שמחים להודיעך שהוזמנת לעבוד באירוע ${events.name},
                                אנו נרגשים להוסיף אותך לצוות שלנו ומשוכנעים כי כישוריך יתרמו רבות להצלחת האירוע
                                לאישור השתתפותך אשר את ההצעה`,
                                 title:'הצעת עבודה'
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
                  }) : search.map((item, index) => {

                    return (
                      <Tooltip placement='right' showArrow key={item._id} content={'הוספה לצוות'}
                        color="primary">
                        <Button key={item._id} className='w-full user-match glass-background '
                          onPress={() => {
                            const isUnique = isIdUnique(item._id)
                            if (isUnique) {
                              setWaitWorkers([...waitWorkers, item])
                              setWaiting([...waiting, {
                                key: item.key, name: item.name, role: null, admin: 'none', email: item.email
                                , fromName: events.name, owner: events.owner, date: getCurrentDateTime(), isRead: false            ,message: `בתפקיד ${null} ברכות! שמחים להודיעך שהוזמנת לעבוד באירוע ${events.name}, 
                                אנו נרגשים להוסיף אותך לצוות שלנו ומשוכנעים כי כישוריך יתרמו רבות להצלחת האירוע
                                לאישור השתתפותך אשר את ההצעה`,
                                 title:'הצעת עבודה'
                              }])
                            }
                            if (waitWorkers.length === 0) {
                              console.log(waitWorkers.length)
                              setWaitWorkers([...waitWorkers, item])
                              setWaiting([...waiting, {
                                key: item.key, name: item.name, role: null, admin: 'none', email: item.email
                                , fromName: events.name, owner: events.owner, date: getCurrentDateTime(), isRead: false            ,message: `בתפקיד ${null} ברכות! שמחים להודיעך שהוזמנת לעבוד באירוע ${events.name}, 
                                אנו נרגשים להוסיף אותך לצוות שלנו ומשוכנעים כי כישוריך יתרמו רבות להצלחת האירוע
                                לאישור השתתפותך אשר את ההצעה`,
                                 title:'הצעת עבודה'
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

              </div>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                  setSearchTerm('')
                  setWaiting([])
                  setWaitWorkers([])
                }}>
                  סגור
                </Button>
                <Button color="primary" onPress={() => {
                  if (waiting.length > 0) {
                    console.log(waiting)
                    handleUpdateWaiting(waiting)
                    handleAddNotification(waiting)
                  }
                  onClose()
                  setSearchTerm('')
                  setWaitWorkers([])
                  setWaiting([])
                }}>
                  הוסף לצוות
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size='4xl' className='event-modal-container' isOpen={isOpen2} onOpenChange={onOpenChange2} style={{ background: 'black' }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex  flex-col gap-1">הוסף תפקיד בצוות</ModalHeader>
              <ModalBody style={{ gap: '10px' }} >
                <div className='flex flex-col w-full h-full add-role-cont'>
                  <div className='style-displaying-role flex w-full cursor-default  flex-row'>
                    {role?.map((item, index) => {
                      return (
                        <Tooltip className='cursor-pointer text-white' color='danger' onClick={() => {
                          const removedArr = removeElementAtIndex(role, index)
                          setRole(removedArr)
                          handleUpdateRole(removedArr)
                        }} content="מחק">
                          <div className='role-style glass-background'>
                            {item}
                          </div>
                        </Tooltip>
                      )
                    })}
                  </div>
                  <div>
                    <Input value={roleChnage} label='Add role' onChange={(e) => {
                      setRoleChange(e.target.value)
                    }} placeholder='הוסף תפקיד' />
                  </div>
                  <div className='w-full flex flex-row '>

                    <Button color='primary' onPress={() => {
                      if (roleChnage.length > 0) {
                        setRole([...role, roleChnage])
                        setRoleChange('')
                      }
                    }}>הוספת תפקיד</Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>

                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                }}>
                  סגור
                </Button>
                <Button color="primary" onPress={() => {
                  onClose()
                  handleUpdateRole(role)
                }}>
                  עדכן תפקידים
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal className='glass-background' isOpen={isOpen4} onOpenChange={onOpenChange4}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <Input onChange={(e)=>{setColumn(e.target.value)}}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={async ()=>{
                  onClose()
                  await addColumn()
                 
                  setColumn('')
                }}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>

  )
}

const professionList = [
  'צילום', 'ציוד ותפאורה', 'דוכני שירות', 'אמנות', 'אבטחה', 'יחצן', 'הפקה'
]
