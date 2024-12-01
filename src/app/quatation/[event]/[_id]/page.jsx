"use client"
import React,{useState, useEffect, useRef} from 'react'
import { TimeInput, Card, CardHeader, CardBody, User, Accordion, AccordionItem, Link, Image, Spacer, CardFooter, Divider, DatePicker, Input, Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from '@nextui-org/react'
import { useJwt } from 'react-jwt';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import Quotation from '@/components/events/Quotation';
const page = () => {
  const path = usePathname()
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [events, setEvents] = useState([])
  const [signature, setSignature] = useState('')
  const [newWorker, setNewWorker] = useState([])
  const [index, setIndex] = useState('')
  const sigCanvas = useRef(null);
  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  const saveSignature = () => {
    const base64String = sigCanvas.current.toDataURL('image/png'); // Save as Base64
    setSignature(base64String)
  };
  function extractIdsFromUrl(url) {
    // Split the URL by the "/" character and get the two IDs
    const parts = url.split('/');
    
    // Return the last two elements of the array (the IDs)
    return [parts[2], parts[3]];
  }
  const handleAddNotification = async (data) => {
    await axios.post(`http://localhost:8000/notify/${events._id}`, { message: data })

}
const handleUpdateworker = async (data) => {
  const path2 = extractIdsFromUrl(path)
  const result = await axios.patch(`http://localhost:9020/updateworker/${path2[0]}`, { team: data })
  const theRole = result.data.workers
  if(theRole){
    router.push(`/${events.name}/${path2[0]}`)
  }
}
  const getEvents = async () => {
    const path2 = extractIdsFromUrl(path)
    console.log(path2)
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${path2[0]}`)
    setEvents(getAllEvents.data.events)
    setNewWorker(getAllEvents.data.workers)
    setIndex(findIndexByKey(getAllEvents.data.workers,path2[1]))
    console.log(findIndexByKey(getAllEvents.data.workers,path2[1]))
  }

  function findIndexByKey(array, keyValue) {
    // Use findIndex to search for the object with the matching key
    const index = array.findIndex(item => item.key === keyValue);
    
    return index;  // Return the index or -1 if not found
  }

  useEffect(()=>{
    getEvents()
  },[])
if(newWorker){

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Button onPress={()=>{onOpen()}}>עיון בהצעת מחיר</Button>
      <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Quotation data={newWorker[index].quotations}/>
            </>
          )}
        </ModalContent>
      </Modal>
      <div style={{border: '1px solid white'}}>
 <SignatureCanvas
                                                ref={sigCanvas}
                                                penColor="blue"
                                                canvasProps={{
                                                  width: 400,
                                                  height: 150,
                                                  className: 'sigCanvas',
                                                }}
                                              />
                                            </div>
                                            <div className='flex flex-row'>
                                              <Button color='danger' onPress={clearSignature} style={{ margin: '10px' }}>
                                                Clear
                                              </Button>
                                              <Button color='primary' onPress={saveSignature} style={{ margin: '10px' }}>
                                                Save
                                              </Button>
                                              </div>
    <Button color='primary' onPress={ async ()=>{
      const arr = [...newWorker]
      arr[index].quotations.signatureClient = signature
      arr[index].status = 'חבר צוות'
      await handleUpdateworker(arr)
      await handleAddNotification()
    }}>שליחה</Button>
    </div>
  )
}
}

export default page