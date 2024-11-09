"use client"
import React, { useState, useEffect } from 'react'
import { TimeInput, Card, CardHeader, CardBody, User, Link, Spacer, CardFooter, Image, Divider, DatePicker, Input, Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useJwt } from 'react-jwt';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios'

export const Team = ({admin}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
  const router = useRouter()
  const searchParams = useSearchParams()
  const [team, setTeam] = useState([])
  const [role, setRole] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [search, setSearch] = useState([])
  const [match, setMatch] = useState([])
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
  }
  function searchArray(searchTerm) {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return search.filter(item =>
      item.name.toLowerCase().includes(lowercasedSearchTerm)
    )
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
  const handleUpdateWaiting = async (data) => {
    const result = await axios.patch(`http://localhost:9020/waiting/${events._id}`, { waiting: data })
    const theWaiter = result.data.waiting
    setWaiters(theWaiter)
  }
  function isIdUnique(id) {
    const exists = waitWorkers.some(item => item._id === id);
    return !exists; // Returns true if id is unique, false if it exists
  }
  useEffect(() => {
    getEvents()
    handleGetSearch()

  }, [])

  return (
    
    <div className=' flex justify-center w-full h-full items-center flex-col' style={{ paddingLeft: '15%', gap: '20px' }}>
      <div className='flex flex-row justify-between w-full'style={{gap: '20px', paddingRight: '5%', paddingLeft: '5%'}}>
        <Button isIconOnly variant='kff'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49994 2.22024C10.1802 2.07399 10.8741 2.00025 11.5699 2.00024C14.3518 1.98663 17.0031 3.1792 18.8385 5.26971C20.6739 7.36021 21.5134 10.1435 21.1399 12.9002C20.5399 17.5002 15.9999 21.2202 11.3599 21.2202H4.69994C4.13381 21.2205 3.60916 20.9233 3.31819 20.4377C3.02722 19.9521 3.0127 19.3493 3.27994 18.8502L3.54994 18.3302C3.81866 17.8294 3.79959 17.2232 3.49994 16.7402C1.82164 14.1018 1.53349 10.8114 2.72768 7.92145C3.92187 5.03152 6.44873 2.90429 9.49994 2.22024ZM11.2799 19.7102C15.3566 19.6459 18.8235 16.7185 19.5699 12.7102C19.909 10.3873 19.2106 8.03269 17.6599 6.27024C16.1239 4.51251 13.9042 3.50291 11.5699 3.50024C10.9787 3.50137 10.3891 3.56167 9.80993 3.68024C7.23508 4.25314 5.09972 6.04251 4.08517 8.47742C3.07063 10.9123 3.30366 13.6885 4.70993 15.9202C5.30823 16.8601 5.35032 18.0504 4.81993 19.0302L4.54993 19.5402C4.52795 19.5736 4.52795 19.6169 4.54993 19.6502C4.58993 19.7102 4.64993 19.7102 4.64993 19.7102H11.2799Z" fill="white"/>
</svg></Button>
    <Button isIconOnly variant='kff'>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7691 10.6179C14.6701 10.5963 15.4749 10.0491 15.8263 9.21925C15.9013 9.25087 15.9815 9.2683 16.0629 9.27067H20.1771C20.6032 9.27067 20.9486 8.92534 20.9486 8.49935C20.9486 8.07336 20.6032 7.72802 20.1771 7.72802H16.1143C16.0699 7.72221 16.025 7.72221 15.9806 7.72802C15.686 6.57063 14.5523 5.83303 13.3746 6.0325C12.1969 6.23197 11.3695 7.30174 11.4726 8.49158C11.5756 9.68142 12.5747 10.593 13.7691 10.5871V10.6179ZM13.7691 7.58404C14.1838 7.58404 14.52 7.92017 14.52 8.3348C14.52 8.74943 14.1838 9.08556 13.7691 9.08556C13.3545 9.08556 13.0183 8.74943 13.0183 8.3348C13.0183 7.92017 13.3545 7.58404 13.7691 7.58404Z" fill="white"/>
<path d="M3.77143 7.72802H9.94286C10.3689 7.72802 10.7143 8.07336 10.7143 8.49935C10.7143 8.92534 10.3689 9.27067 9.94286 9.27067H3.77143C3.34538 9.27067 3 8.92534 3 8.49935C3 8.07336 3.34538 7.72802 3.77143 7.72802Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.736 15.9555C6.05818 15.0444 6.91918 14.4347 7.88571 14.4334V14.4128C9.04884 14.4114 10.029 15.2806 10.1663 16.4354C10.3037 17.5902 9.55477 18.6651 8.42374 18.9364C7.29271 19.2077 6.13762 18.5896 5.736 17.4981H3.77143C3.34538 17.4981 3 17.1528 3 16.7268C3 16.3008 3.34538 15.9555 3.77143 15.9555H5.736ZM7.1361 16.7809C7.14317 17.19 7.47652 17.5181 7.88571 17.5187V17.4776C8.3004 17.4776 8.63657 17.1414 8.63657 16.7268C8.61415 16.3183 8.26871 16.0029 7.85978 16.0177C7.45086 16.0324 7.12903 16.3718 7.1361 16.7809Z" fill="white"/>
<path d="M12 15.9555H20.2286C20.6546 15.9555 21 16.3008 21 16.7268C21 17.1528 20.6546 17.4981 20.2286 17.4981H12C11.574 17.4981 11.2286 17.1528 11.2286 16.7268C11.2286 16.3008 11.574 15.9555 12 15.9555Z" fill="white"/>
</svg>

    </Button>
    <Tooltip showArrow color='primary' content={'משימות'}>
    <Button variant='ffe' onPress={()=>{router.push(`${path}?section=mission`)}} isIconOnly><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.62012 14.75C1.62012 13.5074 2.62748 12.5 3.87012 12.5H7.37012C8.61276 12.5 9.62012 13.5074 9.62012 14.75V18.25C9.62012 19.4926 8.61276 20.5 7.37012 20.5H3.87012C2.62748 20.5 1.62012 19.4926 1.62012 18.25V14.75Z" fill="white"/>
<path d="M13.6201 13.75C13.2059 13.75 12.8701 14.0858 12.8701 14.5C12.8701 14.9142 13.2059 15.25 13.6201 15.25H18.6201C19.0343 15.25 19.3701 14.9142 19.3701 14.5C19.3701 14.0858 19.0343 13.75 18.6201 13.75H13.6201Z" fill="white"/>
<path d="M21.6201 17.75H13.6201C13.2059 17.75 12.8701 18.0858 12.8701 18.5C12.8701 18.9142 13.2059 19.25 13.6201 19.25H21.6201C22.0343 19.25 22.3701 18.9142 22.3701 18.5C22.3701 18.0858 22.0343 17.75 21.6201 17.75Z" fill="white"/>
<path d="M1.62012 5.5C1.62012 4.39543 2.51555 3.5 3.62012 3.5H19.6201C20.7247 3.5 21.6201 4.39543 21.6201 5.5V8.5C21.6201 9.60457 20.7247 10.5 19.6201 10.5H3.62012C2.51555 10.5 1.62012 9.60457 1.62012 8.5V5.5Z" fill="white"/>
</svg></Button>
    </Tooltip>
        <div className='flex flex-row justify-end w-full'style={{gap: '20px'}}>
        <Button color='primary' isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onClick={() => { onOpen() }}>הוספת חברי צוות</Button>
        <Button color='primary' isDisabled={(admin === 'מפיק'||admin ==='בעלים'||admin === "יוצר")?false:true} onClick={() => { onOpen2() }}>הוספת תפקיד </Button>
        </div>
      </div>
      <div className='glass-background text-white flex flex-col w-full h-full' style={{ borderRadius: '15px', color: 'white' }}>
        <div className=' w-full flex flex-col' style={{ padding: '2%', gap: '20px' }}>
         {team?.map((item, index)=>{
          return(
            <div className='w-full h-full flex glass-background flex-col justify-center'style={{borderTop: "1px solid white", textAlign: 'right',
              padding: '15px', gap: '15px', height: '85px', borderRadius: '15px'}}>
              <div className=' w-full flex flex-row items-center justify-end' style={{gap: '15px',textAlign: 'right'}}  key={index}>
              <div className='w-full h-full items-start flex justify-center'> 
                {(admin === 'יחצן'||admin ==='עובד כללי'||admin === "none")|| (admin === item.admin)|| (item.admin === 'יוצר') ||
                (admin === 'בעלים' && item.admin === 'בעלים')             
                ?<div></div>:
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.75 5H16.08L14.87 3.68C14.4271 3.24459 13.8311 3.00041 13.21 3H10.29C9.65816 3.00529 9.05413 3.26056 8.61 3.71L7.42 5H4.75C4.33579 5 4 5.33579 4 5.75C4 6.16421 4.33579 6.5 4.75 6.5H18.75C19.1642 6.5 19.5 6.16421 19.5 5.75C19.5 5.33579 19.1642 5 18.75 5ZM9.69 4.74C9.8496 4.58138 10.065 4.49163 10.29 4.49H13.21C13.4257 4.48936 13.6334 4.57171 13.79 4.72L14.04 4.99H9.46L9.69 4.74Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.23 9.52V17C4.23 19.4632 6.22681 21.46 8.69 21.46H14.81C17.2732 21.46 19.27 19.4632 19.27 17V9.52C19.27 8.41543 18.3746 7.52 17.27 7.52H6.27C5.73267 7.50925 5.21363 7.71521 4.82986 8.09145C4.44609 8.4677 4.22989 8.98256 4.23 9.52ZM9.5 13.05C9.5 13.4642 9.16421 13.8 8.75 13.8C8.33579 13.8 8 13.4642 8 13.05V10.68C8 10.2658 8.33579 9.93 8.75 9.93C9.16421 9.93 9.5 10.2658 9.5 10.68V13.05ZM11.75 17.75C12.1642 17.75 12.5 17.4142 12.5 17V10.68C12.5 10.2658 12.1642 9.93 11.75 9.93C11.3358 9.93 11 10.2658 11 10.68V17C11 17.4142 11.3358 17.75 11.75 17.75ZM15.5 13.05C15.5 13.4642 15.1642 13.8 14.75 13.8C14.3358 13.8 14 13.4642 14 13.05V10.68C14 10.2658 14.3358 9.93 14.75 9.93C15.1642 9.93 15.5 10.2658 15.5 10.68V13.05Z" fill="white"/>
                </svg>
                }
              </div>
              <div className='w-full'></div>
              <div className='w-full'>הרשאה</div>
              <div className='w-full'>תפקיד</div>
              <div className='w-full'>התמחות</div>
  
              <div className='w-full'>שם</div>
              <div className='w-full' style={{textAlign: 'right'}}>
                פרופיל
              </div>
              <div style={{width: '270px'}}>ID</div>
            </div>

            <div className=' w-full flex flex-row items-center justify-end' style={{gap: '15px', textAlign: 'right'}}  key={index}>
            <div className='w-full h-full items-start flex justify-center'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.79 8.04C11.4065 8.08421 11.117 8.40894 11.117 8.795C11.117 9.18106 11.4065 9.50579 11.79 9.55C11.9915 9.5528 12.1854 9.47329 12.327 9.32985C12.4685 9.18641 12.5455 8.99145 12.54 8.79C12.5346 8.37804 12.202 8.04539 11.79 8.04Z" fill="white"/>
<path d="M11.79 10.92C11.5903 10.9173 11.3979 10.9954 11.2567 11.1367C11.1154 11.2779 11.0373 11.4703 11.04 11.67V14.79C11.04 15.2042 11.3758 15.54 11.79 15.54C12.2042 15.54 12.54 15.2042 12.54 14.79V11.69C12.5454 11.4876 12.4688 11.2917 12.3275 11.1467C12.1863 11.0017 11.9924 10.9199 11.79 10.92Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.79 2C6.38542 2.00551 2.00551 6.38542 2 11.79C2 17.1969 6.38313 21.58 11.79 21.58C17.1969 21.58 21.58 17.1969 21.58 11.79C21.5745 6.38542 17.1946 2.00551 11.79 2ZM11.79 20.08C7.21156 20.08 3.5 16.3684 3.5 11.79C3.5 7.21156 7.21156 3.5 11.79 3.5C16.3684 3.5 20.08 7.21156 20.08 11.79C20.0745 16.3662 16.3662 20.0745 11.79 20.08Z" fill="white"/>
</svg></div>
            <div className='w-full'></div>
            <div className='w-full '>
              <div className='team-slot-hover'>
              {item.admin}
              </div>
              </div>
              <div className='w-full '>
              <div className='team-slot-hover'>
              {item.role}
              </div>
              </div>
              <div className='w-full '>
              <div className='team-slot-hover'>
              {item.profession}
              </div>
              </div>
              <div className='w-full '>
              <div className='team-slot-hover'>
              {item.name}
              </div>
              </div>
              <div className='w-full flex justify-end '>
              <div className='bg-black ' style={{borderRadius: '100px', height:'40px', width: '40px', backgroundImage: `url(${item.profile_img})`,backgroundSize: 'cover',
                      backgroundPosition: 'center'}}></div>
              </div>
              <div style={{width: '270px'}}>
                {index+1}
              </div>
            </div>
            </div>
          )
         })}

        </div>
      </div>
      <Modal size='5xl' style={{ width: '80%' }} className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>

        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הוסף חבר צוות</ModalHeader>
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
                <ModalBody style={{ gap: '10px' }}>
                  <div className='flex flex-col w-full h-full add-partner-cont'>
                    <div className='style-displaying-role flex w-full justify-end flex-row'>
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
                    <div className='class-result-output flex flex-row justify-end overflow-x-auto'>

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
              </div>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                  setSearchTerm('')
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
                  <div className='style-displaying-role flex w-full cursor-default justify-end flex-row'>
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
                  <div className='w-full flex flex-row justify-end'>

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
    </div>

  )
}

const professionList = [
  'צילום', 'ציוד ותפאורה', 'דוכני שירות', 'אמנות', 'אבטחה', 'יחצן', 'הפקה'
]
