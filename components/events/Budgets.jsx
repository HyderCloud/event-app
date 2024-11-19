"use client"
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { TimeInput, Divider,DatePicker,Slider, Input,Image, Switch,Calendar,CheckboxGroup,User ,Tooltip,Checkbox,Select, SelectItem,RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import PieChart3D from '@/components/events/Cake.jsx'
import Link from 'next/link'
const Budgets = ({admin}) => {
    const icon =           <div >
    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="4" rx="2" fill="#4285F4"/>
    </svg> </div>
    const [section1, setSection1] = useState(false)
    const [section2, setSection2] = useState(false)
    const [messages, setMessages] = useState([]);
    const [fieldUsers, setFieldUsers] = useState([])
    const [socket, setSocket] = useState(null);
    const [team, setTeam] = useState([])
    const [events, setEvents] = useState([])
    const [role, setRole] = useState([])
    const [amount, setAmount] = useState('')
    const [field, setField] = useState([])
    const [grapghHover, setGraphHover] = useState(false)
    const [subGrapghHover, setSubGraphHover] = useState(false)
    const router = useRouter()
    const [section, setSection] = useState('')
    const path = usePathname()
    const [eventBudget, setEventBudget] = useState('')
    const [newBudget, setNewBudget] = useState(0)
    const [budget, setBudget] = useState([])
    const [changedField, setChangeField] = useState('')
    const [index, setIndex] = useState(false)
    const [teamBudget, setTeamBudget] = useState([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const {isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const {isOpen: isOpen4, onOpen: onOpen4, onOpenChange: onOpenChange4 } = useDisclosure();
    const {isOpen: isOpen5, onOpen: onOpen5, onOpenChange: onOpenChange5 } = useDisclosure();
    const {isOpen: isOpen6, onOpen: onOpen6, onOpenChange: onOpenChange6 } = useDisclosure();
    const {isOpen: isOpen7, onOpen: onOpen7, onOpenChange: onOpenChange7 } = useDisclosure();
    const [match, setMatch] = useState([])
    const [filterBy, setFilterBy] = useState('')
    const [waiting, setWaiting] = useState([])
    const [waitWorkers, setWaitWorkers] = useState([])
    const [searchTem, setSearchTerm] = useState('')
    function removeByName(array, name) {
        return array.filter(item => item.name !== name);
      }
    const handleSearch = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      const filtered = team.filter(item =>
        item.name.toLowerCase().startsWith(term.toLowerCase())
      );
      setMatch(filtered);
    };

    function roundUp(number) {
        return Math.ceil(number);
      }

    function getStringAfterSecondSlash(path) {
      const parts = path.split('/');
      return parts[2] || null; // Returns the third part, or null if it doesn't exist
    }

    const updateBudget = async (data)=>{
        const result = await axios.patch(`http://localhost:9020/budget/${getStringAfterSecondSlash(path)}`, {budget: data})
        if(result.data.acknowledge){
          await  handleUpdatemission()
        }
    }
    const handleUpdatemission = async () => {
        await axios.post(`http://localhost:8000/notify/event/${getStringAfterSecondSlash(path)}`, {
          message: 'Hello, Event!'
        })
  
    }
    function isIdUnique(id) {
        const exists = waitWorkers?.some(item => item._id === id);
        return !exists; // Returns true if id is unique, false if it exists
      }
    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        setTeam(getAllEvents.data?.team)
        setBudget(getAllEvents.data.events.budget)
        console.log(getAllEvents.data.events.budget)
        setAmount(getSumOfNums(getAllEvents.data.events.budget))
        setField(extractNames(getAllEvents.data.events.budget))
        setRole(getAllEvents.data.events.roles)
    }
    function removeElementAtIndex(arr, index) {
        // Check if the index is within bounds
        if (index < 0 || index >= arr.length) {
          return arr; // Return the original array if index is invalid
        }
        const newArray = [...arr];
        newArray.splice(index, 1);
    
        return newArray;}
    function getSumOfNums(array) {
        return array.reduce((sum, current) => sum + current.y, 0);
      }
      function extractNames(array) {
        const names = array.map(item => item.name); // Extract names
        names.shift(); // Remove the first item (index 0)
        return names; // Return the modified array
      }
    useEffect(()=>{
        getEvents()
        const ws = new WebSocket(`ws://localhost:8000/ws/notification/${getStringAfterSecondSlash(path)}`);

      ws.onopen = () => {
        console.log(`Connected to WebSocket server as ${getStringAfterSecondSlash(path)}`);
        setSocket(ws);
      }
      
      ws.onmessage = (event) => {
        getEvents()

      };
      
      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setSocket(null);
      };
  
      // Cleanup function to close the WebSocket connection when the component unmounts
      return () => {
        if (ws) ws.close();
      };

    },[])
  return (
    <div className=' flex  items-center flex-col w-full  ' style={{ gap: '20px'}}>
        {/* modals */}
        <Modal className='glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">קבע את תקציב האירוע</ModalHeader>
              <ModalBody style={{padding:'5%'}}>
              <Input label='evnet budget' onChange={(e)=>{setEventBudget(Number(e.target.value))}} type='number'/>
              </ModalBody >
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={ async ()=>{
                    const arr = [...events?.budget]
                    arr[0] =   { name: 'תקציב', y: eventBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                  await  updateBudget(arr)
                  onClose()
                }}>
                    צור תקציב
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal className='glass-background' isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose) => (
            <>
            {console.log(budget[0].y)}
              <ModalHeader className="flex flex-col gap-1 text-white">קבע את תקציב התחום</ModalHeader>
              <ModalBody style={{padding:'5%'}}>
              <Input label='lable field ' onChange={(e)=>{setSection(e.target.value)}} />
              <Slider 
                label="budget" 
                step={0.01} 
                style={{direction: 'ltr'}}
                maxValue={events.budget[0]?.y} 
                minValue={1} 
                value={newBudget}
                defaultValue={budget[0]?.y / 2}
                onChange={(value) => setNewBudget(roundUp(value))}
                className={'text-white'}
                />
                <Input label='budget' maxValue={events.budget[0]?.y} onChange={(e)=>{setNewBudget(Number(e.target.value))}} type='number'/>
              </ModalBody >
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={ async ()=>{
                    const arr = [...events?.budget]
                    arr[0] = { name: "תקציב", y: events.budget[0].y - newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                    arr.push({ name: section, y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } }, users: [{name: section, y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } }}] })
                  await  updateBudget(arr)
                  onClose()
                }}>
                    צור תקציב
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal className='glass-background' isOpen={isOpen3} onOpenChange={onOpenChange3}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">שנה תחום</ModalHeader>
              <ModalBody className='flex flex-col' style={{padding:'5%', gap: '10px'}}>
                <Select
                items={field}
                onChange={(e)=>{
                    setChangeField(e.target.value)
                    setSection(e.target.value)
                }}
                label="Select field"
                placeholder="בחר תחום"
                >
                  {field.map((item, index) => (
        <SelectItem onClick={()=>{
            setIndex(index)
        }} key={item}>
          {item}
        </SelectItem>
      ))}
                </Select>
                {index !== false &&
                <div className='h-full flex flex-col' style={{gap: '10px'}}>

                    <Slider 
                      label="budget" 
                      step={0.01} 
                       style={{direction: 'ltr'}}
                      maxValue={events.budget[0]?.y + events.budget[index+1]?.y} 
                      minValue={ 1} 
                      
                      value={newBudget}
                      defaultValue={budget[0]?.y / 2}
                      onChange={(value) => setNewBudget(roundUp(value))}
                      className={'text-white'}
                      />
                    <div className='w-full flex justify-center items-center'>
                    <Input   minValue={ 1} 
                    label='budget' maxValue={ events.budget[0]?.y + events.budget[index+1]?.y}
                     onChange={(e)=>{setNewBudget(Number(e.target.value))}} type='number'/>
                              </div>
                     <div className='w-full flex justify-center items-center'>
                     <Button color='danger' onPress={()=>{
                        setIndex(false)
                        onClose()
                     }}>הסר תחום מהתקציב</Button>
                     </div>
                </div>
                }
              </ModalBody >
              <ModalFooter>
                <Button color="danger" variant="light" onPress={()=>{
                    setIndex(false)
                    onClose()
                }}>
                  Close
                </Button>
                <Button color="primary" onPress={ async ()=>{
                    const arr = [...events?.budget]
                    arr[0] = { name: "תקציב", y: events.budget[0].y + (arr[index+1].y - newBudget), dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                    if(index+1 > 0){
                        arr[index+1] = { name: section, y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } },users: arr[index+1].users }
                    }
                  await  updateBudget(arr)
                  setField([])
                  onClose()
                }}>
                    שינוי תקציב
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size='5xl' style={{ width: '80%' }} className='event-modal-container glass-background' isOpen={isOpen4} onOpenChange={onOpenChange4}>
        <ModalContent>
        {(onClose) => (
            <>
      <ModalHeader className="flex flex-col gap-1">הוסף תקציב לעובדים</ModalHeader>
       
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
                      <Modal className='glass-background' isOpen={isOpen5} onOpenChange={onOpenChange5}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white"> בחר תחום ותקציב</ModalHeader>
              <ModalBody style={{padding:'5%'}}>
                <Select
                items={field}
                onChange={(e)=>{
                    setChangeField(e.target.value)
                    setSection(e.target.value)
                }}
                label="Select field"
                placeholder="בחר תחום"
                >
                        {field.map((item, index) => (
                <SelectItem onClick={()=>{
                    setIndex(index)
                }} key={item}>
                {item}
                </SelectItem>
                ))}
                </Select>
                {index !== false &&
                <div>

                    <Slider 
                      label="budget" 
                      step={0.01} 
                      maxValue={events.budget[index+1].users[0].y} 
                      minValue={ 1} 
                       style={{direction: 'ltr'}}
                      value={newBudget}
                      defaultValue={budget[index+1].users[0]?.y / 2}
                      onChange={(value) => setNewBudget(roundUp(value))}
                      className={'text-white'}
                      />
                    <Input   minValue={ 1} 
                    label='budget' maxValue={ events.budget[index+1].users[0].y}
                     onChange={(e)=>{setNewBudget(Number(e.target.value))}} type='number'/>
                </div>
                }
              </ModalBody >
              <ModalFooter>
                <Button color="danger" variant="light" onPress={()=>{
                    onClose()
                    setIndex(false)}}>
                  Close
                </Button>
                <Button color="primary" onPress={ async ()=>{
                    const arr = [...events?.budget]
                    if(index+1 > 0){
                        const user = arr[index+1].users
                        user[0] = { name: section, y: arr[index+1].y - newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                        user.push({name: teamBudget.name,
                            y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px' }}, profile: item.profile_img })
                    }
                  await  updateBudget(arr)
                  setIndex(false)
                  onClose()
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
                      <div className='img-user-added'>
                        <Image className='cursor-pointer' onClick={()=>{
                            setTeamBudget({name: item.name, profile: item.profile_img})
                            onOpen5()
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
      <Modal size='3xl' style={{ width: '80%' }} className='event-modal-container glass-background' isOpen={isOpen6} onOpenChange={onOpenChange6}>
<ModalContent>
  {(onClose) => (
    <>
      <ModalHeader className="flex flex-col gap-1"> שנה תקציב לעובד</ModalHeader>
  {section2?
      <div className='flex flex-row' >


        <ModalBody style={{ gap: '10px' }}>
          <div className='flex flex-col w-full h-full '>
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

              {waitWorkers.slice(1)?.map((item, index3) => {
                return (
                  <div className='flex items-center justify-center flex-col' style={{ width: '70px' }}>
                       <Modal className='glass-background' isOpen={isOpen7} onOpenChange={onOpenChange7}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white"> בחר תחום ותקציב</ModalHeader>
              <ModalBody style={{padding:'5%'}}>

                {index !== false &&
                <div>

                    <Slider 
                      label="budget" 
                      step={0.01} 
                      maxValue={events.budget[index+1].users[0].y + events.budget[index+1].users[index3+1].y} 
                      minValue={ 1} 
                       style={{direction: 'ltr'}}
                      value={newBudget}
                      defaultValue={(budget[index+1].users[0]?.y+ events.budget[index+1].users[index3+1].y) / 2}
                      onChange={(value) => setNewBudget(roundUp(value))}
                      className={'text-white'}
                      />
                    <Input   minValue={ 1} 
                    label='budget' maxValue={events.budget[index+1].users[0].y + events.budget[index+1].users[index3+1].y}
                     onChange={(e)=>{setNewBudget(Number(e.target.value))}} type='number'/>
                </div>
                }
              </ModalBody >
              <ModalFooter>
                <Button color="danger" variant="light" onPress={()=>{
                    onClose()
                    setIndex(false)}}>
                  Close
                </Button>
                <Button color="primary" onPress={ async ()=>{
                    const arr = [...events?.budget]
                    if(index+1 > 0){
                        const user = arr[index+1].users
                        arr[index+1].users[0] = { name: section, y: user[0].y + (user[index3+1].y - newBudget), dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }
                        arr[index+1].users[index3+1] = {name: item.name, y: newBudget, dataLabels: { style: { color: '#ffff', fontSize: '16px'} }, profile: item.profile }
                        console.log(item.profile)
                    }
                  await updateBudget(arr)
                  setIndex(false)
                  onClose()
                }}>
                    שינוי תקציב
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
                    <Tooltip className='cursor-pointer text-white' color='danger' onClick={ async () => {
                      const removedArr = removeElementAtIndex(waitWorkers, index3)
                      setWaitWorkers(removedArr)
                      const arr = [...budget]
                      const user = arr[index+1].users
                      arr[index+1].users[0].y = arr[index+1].users[0].y + item.y
                      const removerUser = removeByName(user, item.name)
                      arr[index+1].users = removerUser
                      await updateBudget(arr)
            
                    }} content="הסר">
                      <div className='img-user-added'>
                        <Image className='cursor-pointer' onClick={()=>{onOpen7()}}
                         style={{ backgroundSize: 'cover', backgroundPosition: 'center' }} isBlurred radius='full'
                          borderRadius="full" width={40} height={40}
                          alt="NextUI hero Image"
                          src={item.profile?.length === 0 ? `https://app.requestly.io/delay/5000/https` : `${item.profile}`} />
                      </div>
                    </Tooltip>
                    <div>
                      {item.name}
                    </div>

                    <div className='w-full justify-center flex glass-background2'>
                      {waiting[index3]?.role}
                    </div>
                    <div className='w-full'>

                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ paddingLeft: '20%' }}>
            </div>

          </div>

        </ModalBody>
      </div>: 
      <div className='flex flex-col justify-center items-end w-full'
       style={{paddingLeft: '15%', height: '400px', paddingRight: '15%', color: 'white', gap: '15px'}}>
        <Select
                items={field}
                onChange={(e)=>{
                    setChangeField(e.target.value)
                    setSection(e.target.value)
                }}
                label="Select field"
                placeholder="בחר תחום"
                >
                  {field.map((item, index) => (
        <SelectItem onClick={()=>{
            setIndex(index)
        }} key={item}>
          {item}
        </SelectItem>
      ))}
                </Select>
       
      </div>
  }
      <ModalFooter>
        <Button color="danger" variant="light" onPress={() => {
          setSection2(false)
          onClose()
          setSearchTerm('')
          setWaitWorkers([])
        }}>
          סגור
        </Button>
        <Button color="primary" onPress={() => {
          if(section2){
            onClose()
            setSearchTerm('')
            setWaitWorkers([])
            setSection2(false)
          }else{
            setWaitWorkers(budget[index+1].users)
            setSection2(true)
          }
          if (waitWorkers.length > 0) {

          }
        }}>
          {section2? 
         "  שנה":
          'לשלב הבא'
          }
        </Button>
      </ModalFooter>
    </>
  )}
</ModalContent>
      </Modal>
        <div className='flex justify-between flex-row w-full'>
        <div className='budget-text-promo  flex-col'>
        <div className='w-full'>מנהל התקציבים של-</div>
        <div className='w-full'>{events?.name}</div>
        {icon}
        </div>
        <div className='eventrise-finance-promo glass-background'></div>
        </div>
        <div className='w-full glass-background flex flex-col' style={{borderRadius: '20px', padding: '5%',gap: '25px'}}>
        <div className='w-full flex flex-row' style={{ gap: '20px'}}>
        <div>
        <Button onPress={onOpen} isDisabled={budget?.length > 1} color='primary'>הגדר את תקציב האירוע</Button>
        </div>
        <div>
        <Button onPress={onOpen2} isDisabled={budget[0]?.y <= 0} color='primary'>הוסף תקציב לפי תחום</Button>
        </div>
        </div>
        <div>
            <div className='w-full flex  justify-center'>
        <div className='flex items-center flex-col text-center' style={{width: '80%'}}>
        <div className='style-lable-amount '>סכום התקציב הכולל</div>
        {icon}
        <div className='style-lable-amount-display '>{amount}</div>
        <div style={{height: '30px'}}></div>
        <Divider className='bg-white'/>
        </div>
            </div>
        <div style={{height:'20px'}}></div>
        <div className='w-full' style={{paddingLeft: '12%', paddingRight: '12%'}} 
        onMouseEnter={()=>{setGraphHover(true)}} onMouseLeave={()=>{setGraphHover(false)}}>
            {(grapghHover && budget[0]?.y > 0 || budget.length > 1)  &&
            <div className='flex flex-col absolute' style={{right: '10%', gap: '10px'}}>
                <Button isDisabled={budget.length <= 1} className={`${budget.length <= 1 ? 'buttonfade2': 'buttonfade'} `} onPress={onOpen3}  color='primary'>שינוי תקציבים</Button>
                
                <Button className='buttonfade' color='danger' onPress={ async ()=>{
                    const arr = [{ name: "תקציב", y: 0 , dataLabels: { style: { color: '#ffff', fontSize: '16px' } } }]
                    await updateBudget(arr)
                }}>אפס תקציב</Button>
                
            </div>
            }
        <PieChart3D title={'תקציב לפי תחומים'} data={budget}/>
        </div>
        </div>
        <div className='w-full flex flex-row flex-wrap items-center justify-center' style={{ gap: '10px'}}
        onMouseEnter={()=>{setSubGraphHover(true)}} onMouseLeave={()=>{setSubGraphHover(false)}}>
            {budget.slice(1)?.map((item,index)=>{
                return(
           
                            <div className='flex flex-row ' style={{width: '350px', gap: '20px'}}   >
                                    {subGrapghHover &&
                                <div className='absolute flex flex-col' style={{right: '5px', gap: '10px'}}>
                                <Button onPress={onOpen4} className='buttonfade' color='primary'>הוסף עובד לתקציב</Button>
                                <Button onPress={onOpen6} className='buttonfade' color='primary'>שנה תקציב לעובד </Button>
                                </div>
                                    }
                            <PieChart3D title={item?.name} data={item.users} />
                            </div>
                    
                )
            })}
        </div>
        </div>
        <div style={{height: '200px'}}>
        
        </div>
    </div>
  )
}

export default Budgets