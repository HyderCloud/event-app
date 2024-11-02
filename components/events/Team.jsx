"use client"
import React, {useState, useEffect} from 'react'
import { TimeInput,Card, CardHeader, CardBody, User, Link,Spacer ,CardFooter, Image, Divider,DatePicker, Input, Switch,Calendar,CheckboxGroup ,Tooltip,Checkbox,Select, SelectItem,RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { useJwt } from 'react-jwt';
import { usePathname } from 'next/navigation';
import axios from 'axios'

export const Team = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
  const {isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
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
    const icon =           <div >
  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="4" rx="2" fill="#FBB03B"/>
  </svg> </div>
    const path = usePathname()
    const [events, setEvents] = useState([])

    const getEvents = async ()=>{
        const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
        setEvents(getAllEvents.data.events)
        const eventU = getAllEvents.data.events
        setTeam(eventU.workers)
        setRole(eventU.roles)
        setWaiters(eventU.waiting)
    }
    function searchArray( searchTerm) {
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
function updateRoleById( id, newRoll, index, name, email) {

  const waitArr = [...waiting]
console.log(email)
   waitWorkers.map(item => {
      if (item._id === id) {
        waitArr[index] = {key: id,name: name, role: newRoll, admin: 'none', from: events._id, email: email, fromName: events.name, owner: events.owner}
        setWaiting(waitArr)
      }
  });
}
   const handleGetSearch = async ()=>{
      const result =  await axios.get(`http://localhost:9020/getteam`)
      const theRole = result.data.team
      setSearch(theRole)
    }
    const handleUpdateRole = async (data)=>{
      const result =  await axios.patch(`http://localhost:9020/roles/${events._id}`, {roles: data})
      const theRole = result.data.role
      setRole(theRole)
    }
    const handleUpdateWaiting = async (data)=>{
      const result =  await axios.patch(`http://localhost:9020/waiting/${events._id}`, {waiting: data})
      const theWaiter = result.data.waiting
      setWaiters(theWaiter)
    }
    function isIdUnique(id) {
      const exists = waitWorkers.some(item => item._id === id);
      return !exists; // Returns true if id is unique, false if it exists
  }
    useEffect(()=>{
        getEvents()
        handleGetSearch()
      },[])
  return (
    
        <div className=' flex justify-center w-full h-full items-center flex-col' style={{paddingLeft: '15%', gap: '20px'}}>
          <div>                    
          <Button color='primary' onClick={()=>{onOpen()}}>הוספת חברי צוות</Button>
          <Button color='primary' onClick={()=>{onOpen2()}}>הוספת תפקיד </Button>
          </div>
            <div className='glass-background text-white flex flex-row w-full h-full' style={{borderRadius: '15px'}}>
                <div className='h-full w-full flex flex-col' style={{padding: '2%'}}>
                    <div className='header-team flex flex-row'>

                    <div></div>
                    </div>
                    <Divider style={{background: '#fff'}}/>
                </div>
                <div className='h-full flex flex-col ' style={{width:'30%', padding: '2%'}}>
                    <div className=''></div>
                </div>
            </div>
            <Modal size='5xl' style={{width: '80%'}} className='event-modal-container glass-background' isOpen={isOpen} onOpenChange={onOpenChange}>
              
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">הוסף חבר צוות</ModalHeader>
                                        <div className='flex flex-row' style={{paddingLeft: '20px'}}>

                                        <div className='searchResult flex flex-col'>
                                        
                                            {match.length > 0 ? match.map((item, index)=>{
                                              
                                              return(
                                                <Tooltip placement='right' showArrow   key={item._id}    content={'הוספה לצוות'}
                                                color="primary">
                                                <Button key={item._id} className='w-full user-match glass-background '
                                                onPress={()=>{
                                                  const isUnique = isIdUnique(item._id)
                                                  if(isUnique){
                                                    setWaitWorkers([...waitWorkers,item])
                                                    setWaiting([...waiting,{key: item._id,name: item.name, role: null, admin: 'none', email: item.email
                                                      , fromName: events.name, owner: events.owner
                                                    }])
                                                  }
                                                  if(waitWorkers.length === 0){
                                                    console.log(waitWorkers.length)
                                                    setWaitWorkers([...waitWorkers,item])
                                                    setWaiting([...waiting,{key: item._id,name: item.name, role: null, admin: 'none',
                                                       email: item.email, fromName: events.name, owner: events.owner}])
                                                  }
                                                }}
                                                 style={{height: '70px'}}>
                                                   <User   className='w-full flex  justify-start items-center'
                                                name={<div className="w-full text-white flex flex-row justify-between" style={{gap: '100%'}}>
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
                                            }): search.map((item, index)=>{
                                              
                                              return(
                                                <Tooltip placement='right' showArrow   key={item._id}    content={'הוספה לצוות'}
                                                color="primary">
                                                <Button key={item._id} className='w-full user-match glass-background '
                                                onPress={()=>{
                                                  const isUnique = isIdUnique(item._id)
                                                  if(isUnique){
                                                    setWaitWorkers([...waitWorkers,item])
                                                    setWaiting([...waiting,{key: item._id,name: item.name, role: null, admin: 'none', email: item.email
                                                      , fromName: events.name, owner: events.owner
                                                    }])
                                                  }
                                                  if(waitWorkers.length === 0){
                                                    console.log(waitWorkers.length)
                                                    setWaitWorkers([...waitWorkers,item])
                                                    setWaiting([...waiting,{key: item._id,name: item.name, role: null, admin: 'none', email: item.email
                                                      , fromName: events.name, owner: events.owner
                                                    }])
                                                  }
                                                }}
                                                 style={{height: '70px'}}>
                                                   <User   className='w-full flex  justify-start items-center'
                                                name={<div className="w-full text-white flex flex-row justify-between" style={{gap: '100%'}}>
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
                                        <ModalBody style={{gap: '10px'}}>
                                        <div className='flex flex-col w-full h-full add-partner-cont'>
                                          <div className='style-displaying-role flex w-full justify-end flex-row'>
                                          {professionList.map((item, index)=>{
                                            return(
                                              <Tooltip showArrow className=' text-white' color='primary'  content="סנן לפי">
                                              <div  onClick={()=>{
                                                setFilterBy(item)
                                              }} className='role-style glass-background cursor-pointer' style={{background: filterBy=== item&& '#006FEE'}}>
                                                {item}
                                              </div>
                                              </Tooltip>
                                            )
                                          })}
                                          </div>
                                          <div className='class-result-output flex flex-row justify-end overflow-x-auto'>
                      
                                          {waitWorkers.map((item, index)=>{
                                            return(
                                              <div className='flex items-center justify-center flex-col' style={{width: '70px'}}>
                                              <Tooltip className='cursor-pointer text-white' color='danger' onClick={()=>{
                                                const removedArr = removeElementAtIndex(waitWorkers,index)
                                                const removeWait = removeElementAtIndex(waiting,index)
                                                setWaiting(removeWait)
                                                setWaitWorkers(removedArr)
                                              }} content="מחק">
                                              <div className='img-user-added'>
                                              <Image className='cursor-pointer' onClick={()=>{
                                                onOpen3()
                                              }} style={{ backgroundSize: 'cover',backgroundPosition: 'center'}} isBlurred radius='full'
                                               borderRadius="full" width={40} height={40}
                                            alt="NextUI hero Image"
                                            src={item.profile_img?.length === 0 ? `https://app.requestly.io/delay/5000/https`:`${ item.profile_img}`}/>
                                              </div>
                                              </Tooltip>
                                              <div>
                                                {item.name}
                                              </div>
                                              
                                              <div className='w-full justify-center flex glass-background2'>
                                                {waiting[index]?.role}
                                              </div>
                                              <div className='w-full'>
                                              <Modal size='md' style={{background: '#27272A'}} isOpen={isOpen3} onOpenChange={onOpenChange3}>
                                  <ModalContent>
                                    {(onClose) => (
                                      <>
                                        <ModalHeader className="flex flex-col gap-1 text-white">{item.name} - הוספת תפקיד ל</ModalHeader>
                                        <ModalBody >
                                          <div style={{height: '170px'}}>
                                        <Select className='w-full'  style={{color:'black'}} label='תפקיד'
                                                      onChange={(e)=>{
                                                        console.log(item)
                                                     updateRoleById(item._id,role[e.target.value],index, item.name,item.email)
                                                      
                                                      }}
                                               
                                                  >
                                                    {role.map((item, index) => (
                                                      <SelectItem key={index}>
                                                        {item}
                                                      </SelectItem>
                                                    ))}
                                                  </Select>
                                          </div>
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
                                              </div>
                                             </div>
                                            )
                                          })}
                                          </div>
                                          <div style={{paddingLeft: '20%'}}>
                                          <Input label='Search for'  onChange={handleSearch} placeholder='חפש חבר צוות'/>

                                          </div>
                                         
                                         </div>
                                        
                                        </ModalBody>
                                        </div>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={()=>{
                                              onClose()
                                              setSearchTerm('')
                                            }}>
                                                סגור
                                            </Button>
                                            <Button color="primary" onPress={()=>{
                                              handleUpdateWaiting(waiting)
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
                        <Modal size='4xl' className='event-modal-container' isOpen={isOpen2} onOpenChange={onOpenChange2} style={{background: 'black'}}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex  flex-col gap-1">הוסף תפקיד בצוות</ModalHeader>
                                        <ModalBody  style={{gap: '10px'}} >
                                         <div className='flex flex-col w-full h-full add-role-cont'>
                                          <div className='style-displaying-role flex w-full cursor-default justify-end flex-row'>
                                          {role.map((item, index)=>{
                                            return(
                                              <Tooltip className='cursor-pointer text-white' color='danger' onClick={()=>{
                                                const removedArr = removeElementAtIndex(role,index)
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
                                          <Input value={roleChnage} label='Add role' onChange={(e)=>{
                                            setRoleChange(e.target.value)
                                          }} placeholder='הוסף תפקיד'/>
                                          </div>
                                          <div className='w-full flex flex-row justify-end'>
                                            
                                            <Button color='primary' onPress={()=>{
                                              if(roleChnage.length > 0){
                                                setRole([...role,roleChnage])
                                                setRoleChange('')
                                              }
                                            }}>הוספת תפקיד</Button>
                                          </div>
                                         </div>
                                        </ModalBody>
                                        <ModalFooter>

                                            <Button color="danger" variant="light" onPress={()=>{
                                                onClose()
                                            }}>
                                                סגור
                                            </Button>
                                            <Button color="primary" onPress={()=>{
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
  'צילום','ציוד ותפאורה','דוכני שירות','אמנות','אבטחה','יחצן','הפקה'
  ]