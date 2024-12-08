"use client"
import React, { useState, useEffect, useRef } from 'react'
import { TimeInput, Card, CardHeader, CardBody, User, Accordion, AccordionItem, Link, Image, Spacer, CardFooter, Divider, DatePicker, Input, Switch, Calendar, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea, Tabs, Tab } from '@nextui-org/react'
import { useJwt } from 'react-jwt';
import { useCookies } from 'react-cookie';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import axios from 'axios'
import SignatureCanvas from 'react-signature-canvas';
import Quotation from './Quotation';
import DragPerson from '../DragPerson';
import { saveAs } from 'file-saver';

export const Team = ({ admin2 }) => {

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [columnDefs, setColumnDefs] = useState([])
  const [payment, setPayment] = useState([])
  const [isFilesCont, setIsFileCont] = useState(false)
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
  // הצעת מחיר
  const [reqUser, setReqUser] = useState([])
  const [previewreq, setPreviewReq] = useState('')
  const [textarea1, setTextarea1] = useState('');
  const [textarea2, setTextarea2] = useState('');
  const [textarea3, setTextarea3] = useState('');
  const [paymentData, setPaymentData] = useState([]);
  const [paymentDate, setPaymentDate] = useState([]);
  const [paymentDataEnd, setPaymentDataEnd] = useState([]);
  const [paymentDateStart, setPaymentDateStart] = useState('');
  const [paymentDateEnd, setPaymentDateEnd] = useState('');
  const [paymentDataStart, setPaymentDataStart] = useState([]);
  const [paymentDataAmount, setPaymentDataAmount] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("כרטיס אשראי")
  const [signature, setSignature] = useState('')
  const [formData, setFormData] = useState({
    cancellationDate: null,
    offerExpiryDate: null,
  });
  const sigCanvas = useRef(null);
  // index
  const doc = {
    user: reqUser,
    description: textarea1,
    details: textarea2,
    notes: textarea3,
    price: paymentDataAmount,
    startDate: paymentDateStart,
    endDate: paymentDateEnd,
    paymentDataStart: paymentDataStart,
    paymentData: paymentData,
    paymentDate: paymentDate,
    paymentMethods: selectedPaymentMethod,
    paymentDataEnd: paymentDataEnd,
    cancellationDate: formData.cancellationDate,
    offerExpiryDate: formData.offerExpiryDate,
    signature: signature,
    signatureClient: '',
  }

  const handleCancellationDateChange = (newDate) => {
    const date = new Date(newDate)
    setFormData((prevData) => ({
      ...prevData,
      cancellationDate: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    }));
  };

  const handleStartDateChange = (newDate) => {
    const date = new Date(newDate)
    setPaymentDateStart((prevData) => ([
      ...prevData,
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    ]));
  };
  const handleEndDateChange = (newDate) => {
    const date = new Date(newDate)
    setPaymentDateEnd((prevData) => ([
      ...prevData,
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    ]));
  };

  const handlePayDateChange = (index, newDate) => {
    const date = new Date(newDate)
    const parse = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    setPaymentDate((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = parse; // Update the value at the specific index
      return updatedData;
    });

  };

  const handleOfferExpiryDateChange = (newDate) => {
    const date = new Date(newDate)
    setFormData((prevData) => ({
      ...prevData,
      offerExpiryDate: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    }));
  };


  const changeGrisdByIndex = (arr) => {
    const arr1 = [...arr]
    arr1[9] = {
      headerName: "Admin",
      width: 190,
      resizable: false,
      cellRenderer: adminColumn,

    }
    arr1[8] = {
      headerName: "Status",
      width: 90,
      resizable: false,
      cellRenderer: statusColumn,
    }
    arr1[7] = {
      headerName: "Quotations",
      width: 120,
      resizable: false,
      cellRenderer: quatationColumn,
    }
    arr1[6] = {
      headerName: `Your ai`,
      width: 120,
      resizable: false,
      cellRenderer: aiColumn,
    }
    arr1[5] = {
      headerName: "Files",
      resizable: false,
      width: 120,
      cellRenderer: fileColumn,
    }
    arr1[2] = {
      headerName: "Email",
      cellRenderer: emailColumn,
    }
    arr1[1] = {
      headerName: "Profile",
      cellRenderer: nameColumn,
    }
    return arr1
  }
  const quatationColumn = ({ data }) => {
    if (data.quotations) {
      return (
        <div className='flex'><Button onPress={() => {
          setPreviewReq(data.quotations)
          onOpen2()
        }} variant='fdszfd' isIconOnly><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57 9.41988C4.18323 9.69388 4.68677 10.1657 5 10.7599L7.64 15.5699C7.83762 15.9277 7.93763 16.3312 7.93 16.7399L7.88 18.7399C7.87836 19.1527 7.65749 19.5335 7.3 19.7399C7.13675 19.8263 6.95468 19.8709 6.77 19.8699C6.54744 19.869 6.32945 19.8067 6.14 19.6899L4.46 18.6899C4.11098 18.4744 3.82475 18.1709 3.63 17.8099L0.999997 12.9999C0.668643 12.3855 0.555813 11.6768 0.679997 10.9899C0.75635 10.3414 1.1246 9.76325 1.68 9.41988C2.27514 9.12352 2.97485 9.12352 3.57 9.41988ZM5.23 17.3599L6.39 18.0599L6.38 16.6799C6.37661 16.5332 6.33894 16.3894 6.27 16.2599L3.64 11.4499C3.48697 11.1471 3.23704 10.9042 2.93 10.7599C2.82744 10.7087 2.71462 10.6813 2.6 10.6799C2.51638 10.6807 2.43414 10.7012 2.36 10.7399C2.19422 10.851 2.08762 11.0311 2.07 11.2299C2.0243 11.5762 2.09463 11.9278 2.27 12.2299L4.9 16.9999C4.97088 17.1506 5.08599 17.2762 5.23 17.3599Z" fill="#252323" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2199 0.349883L17.2199 7.34988C17.3682 7.49766 17.4479 7.70069 17.4399 7.90988V14.9099C17.4399 16.1697 16.9395 17.3778 16.0487 18.2686C15.1579 19.1594 13.9497 19.6599 12.6899 19.6599H9.8199C9.40569 19.6599 9.0699 19.3241 9.0699 18.9099C9.0699 18.4957 9.40569 18.1599 9.8199 18.1599H12.6899C14.4826 18.1544 15.9344 16.7025 15.9399 14.9099V8.65988H11.6899C10.1734 8.6544 8.94539 7.42639 8.9399 5.90988V1.65988H6.6899C4.89498 1.65988 3.4399 3.11496 3.4399 4.90988V7.55988C3.4399 7.9741 3.10412 8.30988 2.6899 8.30988C2.27569 8.30988 1.9399 7.9741 1.9399 7.55988V4.90988C1.93192 3.64491 2.42883 2.42901 3.3205 1.53172C4.21216 0.634419 5.42491 0.129858 6.6899 0.129883H9.6899C9.88875 0.130058 10.0794 0.20919 10.2199 0.349883ZM10.4399 2.68988V5.90988C10.4399 6.60024 10.9995 7.15988 11.6899 7.15988H14.9099L10.4399 2.68988Z" fill="#252323" />
          </svg></Button>

        </div>
      )
    }
  }
  const fileColumn = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isTab, setIsTab] = useState(false)
    const [newFiles, setNewFiles] = useState([]);
    const [newWorker, setNewWorker] = useState([])
    const [cookie, setCookie, removeCookie] = useCookies('')
    const { decodedToken, isExpired } = useJwt(cookie.user)
    const handleUpdateworker = async (data) => {
      const result = await axios.patch(`http://localhost:9020/updateworker/${getStringAfterSecondSlash(path)}`, { team: data })
      const theRole = result.data.workers
      setNewWorker(theRole)
    }

    const indexArr = findIndexById(decodedToken?.user_id, newWorker)
    const getEvents = async () => {
      const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
      setNewWorker(getAllEvents.data.workers)
    }
    useEffect(() => {
      getEvents()
    }, [])
    const handleFileUpload = (files) => {
      console.log(files)
      setNewFiles(files)
    }

    const handleDownload = (fileData) => {
      // Check if the fileData object contains the base64, fileName, and fileType properties
      if (!fileData || !fileData.base64 || !fileData.fileName || !fileData.fileType) {
        console.error("Invalid file data");
        return;
      }

      // Convert the base64 string into a Blob (binary data)
      const base64Data = fileData.base64.split(',')[1]; // Strip out the data URI part
      const byteCharacters = atob(base64Data); // Decode base64 string into bytes

      // Create a byte array from the decoded data
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      // Create a Blob with the appropriate file type
      const blob = new Blob(byteArrays, { type: fileData.fileType });

      // Use FileSaver to trigger the download
      saveAs(blob, fileData.fileName);
    };

    return (
      <div className='flex items-center justify-center w-full h-full' style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <Tooltip showArrow isOpen={isOpen} content={<div className='flex flex-col'
          style={{ height: '300px', width: '450px', backgroundColor: '#' }}>
          <div className='flex flex-row justify-between' >
            <div className='flex'>
              <Button className='' variant='fgdfg' isIconOnly onPress={() => {
                setIsTab(false)
                setIsOpen(false)
              }}>   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="#252323" />
                </svg></Button>
            </div>
            <div className='flex' style={{ paddingLeft: '30%' }}>
              <Tabs className='w-full' variant='light' color='primary'>
                <Tab key="photos" className='p-0' title={<div className='w-full h-full p-2' onClick={() => { setIsTab(false) }}>העלאת קבצים</div>} />
                <Tab key="files" className='p-0' title={<div className='w-full h-full p-2' onClick={() => { setIsTab(true) }}>הקבצים שלי</div>} />
              </Tabs>
            </div>
          </div>
          {isTab ?
            <div className='flex flex-col justify-center' style={{ gap: '10px', gap: '10px' }}>
              <div className='flex flex-col ' style={{ overflow: 'auto', padding: '10px', width: '100%', gap: '5px', height: '200px' }}>
                {newWorker[indexArr]?.files?.map((items, index) => {
                  return (
                    <Tooltip placement='left' content={
                      <div className='flex flex-row'>
                        <Button onPress={async () => {
                          const arr = [...newWorker]
                          const delFile = removeElementAtIndex(newWorker[indexArr]?.files, index)
                          arr[indexArr].files = delFile
                          setNewWorker(arr)
                          await handleUpdateworker(arr)
                        }}>
                          מחק
                        </Button>
                        <Button onPress={() => {
                          handleDownload(items)
                        }} >הורד</Button>
                      </div>
                    }>
                      <div className='flex items-center' style={{ textWrap: 'nowrap', height: '20px', padding: '5px', borderRadius: '15px', width: '60%', border: '1px solid gray' }}>
                        {items.fileName}
                      </div>
                    </Tooltip>

                  )
                })}
              </div>
            </div>
            : <>
              <div className='flex flex-row w-full' style={{ height: '150px', padding: '10px' }}>

                <div className='flex flex-col h-full' style={{ overflow: 'auto', padding: '10px', width: '100%', gap: '5px' }}>
                  {newFiles?.map((item, index) => {
                    return (
                      <Tooltip className='cursor-pointer p-0' color='danger' variant='dfsfg' placement='left' content={
                        <Button variant='fdsg' style={{ height: '20px', width: '20px' }} onPress={() => {
                          const arr = removeElementAtIndex(newFiles, index)
                          setNewFiles(arr)
                        }} isIconOnly>
                          <svg
                            width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="#252323" />
                          </svg>
                        </Button>
                      }>
                        <div className='flex items-center' style={{ textWrap: 'nowrap', height: '20px', padding: '5px', borderRadius: '15px', width: '60%', border: '1px solid gray' }}
                          key={index}><div>{item.fileName}</div></div>
                      </Tooltip>
                    )
                  })}
                </div>
                <div className='flex items-center justify-center h-full' style={{ width: '60px' }}>
                  {newFiles.length > 0 &&
                    <Button onPress={async () => {
                      const arr = [...newWorker]
                      const index = findIndexById(data?.key, newWorker)
                      newFiles?.map((item) => {
                        arr[index].files.push(item)
                      })
                      // await handleUpdatemission()
                      await handleUpdateworker(arr)
                      setNewFiles([])
                    }} color='primary'> שליחה</Button>
                  }
                </div>
              </div>
              <div style={{ height: '60px' }} >
                <DragPerson onFileUpload={handleFileUpload} className='w-full h-full' label={`הקבצים של ${data.name}`} />
              </div>
            </>
          }


        </div>}>
          <Button onPress={() => {

            setIsOpen(true)
          }}
            className='w-full' style={{ height: '25px', border: '1px solid gray' }} variant='fdszfd' isIconOnly>
            קבצים
          </Button>
        </Tooltip>

      </div>
    )

  }
  const aiColumn = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className='flex items-center justify-center w-full h-full' onClick={() => {
        setIsOpen(true)
      }} style={{ gap: '10px' }}>
        <Tooltip showArrow isOpen={isOpen} content={<div className='flex flex-col'
          style={{ height: '300px', width: '450px', backgroundColor: '#' }}>
          <div>
            <Button className='' variant='fgdfg' isIconOnly onPress={() => {
              setIsOpen(false)
            }}>   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="#252323" />
              </svg></Button>
          </div>
          <div className='flex flex-row w-full items-center' style={{ gap: '15px', height: '50px' }}>
            היי שמי רייזי ואני העוזר האישי של {data.name}, במה אוכל לעזור?



          </div>
          <div className='w-full h-full' style={{ overflow: 'auto' }}>

          </div>

          <Textarea label='הודעה חדשה' />
        </div>}>


          AI

        </Tooltip>

      </div>
    )
  }
  const emailColumn = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className='flex items-center justify-center w-full h-full' onClick={() => {
        setIsOpen(true)
      }} style={{ gap: '10px' }}>
        <Tooltip showArrow isOpen={isOpen} content={<div className='flex flex-col'
          style={{ height: '300px', width: '450px', backgroundColor: '#' }}>
          <div>
            <Button className='' variant='fgdfg' isIconOnly onPress={() => {
              setIsOpen(false)
            }}>   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="#252323" />
              </svg></Button>
          </div>
          <div className='flex flex-row w-full items-center' style={{ gap: '15px', height: '50px' }}>
            <div>
              שלח מייל ל-
            </div>
            <Link href={`/${data.name}`}>{data.name}</Link>
            <div className='flex' style={{
              backgroundImage: `url(${data.profile_img})`,
              borderRadius: '100px',
              backgroundSize: 'cover',
              minHeight: '30px',
              maxHeight: '30px',
              width: '30px',
              backgroundPosition: 'center'
            }}></div>


          </div>

          <Input label='כותרת' />
          <Textarea label='הודעה חדשה' />
        </div>}>


          {data.email}

        </Tooltip>

      </div>
    )

  }

  const nameColumn = ({ data }) => {
    return (
      <div className='flex flex-row items-center h-full w-full' style={{ gap: '5px' }}>
        <div className='flex' style={{
          backgroundImage: `url(${data.profile_img})`,
          borderRadius: '100px',
          backgroundSize: 'cover',
          minHeight: '30px',
          maxHeight: '30px',
          width: '30px',
          backgroundPosition: 'center'
        }}></div>
        <Link href={`/${data.name}`}>{data.name}</Link>
      </div>
    )
  }

  const adminColumn = ({ data }) => {
    const [cookie, setCookie, removeCookie] = useCookies()
    const { decodedToken, isExpired } = useJwt(cookie.user)
    const [isLoad, setIsLoad] = useState(true)
    const [user, setUser] = useState([])
    const [admin3, setAdmin3] = useState([])
    const admin = ['בעלים', 'מפיק', 'יחצן', "עובד כללי", "none"]
    const adminM = ['יחצן', "עובד כללי", "none"]
    const [team, setTeam] = useState([])
    const [events, setEvents] = useState([])
    const getEvents = async () => {
      const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
      setEvents(getAllEvents.data.events)
      const eventU = getAllEvents.data.events
      setTeam(getAllEvents.data?.workers)
      setIsLoad(false)

    }
    const indexArr = findIndexById(data.key, team)
    const getUser = async () => {
      const getUser1 = await axios.get(`http://localhost:9020/getuser/${decodedToken?.email}`)
      setUser(getUser1?.data)
    }
    const handleCheckAdmin = () => {
      let isAdminFound = false;

      for (let index = 0; index < team?.length; index++) {
        const item = team[index];
        if (item?.key === decodedToken?.user_id) {
          setAdmin3(item.admin);
          isAdminFound = true;
          break; // Exit the loop if condition is true
        }
      }
      if (!isAdminFound) {
        setAdmin3("visitor");
      }
    }
    const handleUpdateworker = async (data) => {
      const result = await axios.patch(`http://localhost:9020/updateworker/${getStringAfterSecondSlash(path)}`, { team: data })
      const theRole = result.data.workers
      setTeam(theRole)
      setIsLoad(false)
    }
    useEffect(() => {
      getEvents()
    }, [])
    useEffect(() => {
      if (decodedToken) {
        getUser()
        handleCheckAdmin()
      }
    }, [decodedToken, admin3, team])
    return (

      <div className='w-full py-1'>
        {data.admin === "יוצר" || (admin3 === 'בעלים' && data.admin === 'בעלים') ||
          (admin3 === 'יחצן' || admin3 === 'עובד כללי' || admin3 === 'none') || (admin3 === data.admin) ?
          <div>{data.admin}</div> : admin3 === 'מפיק' ?
            <Select
              isLoading={isLoad}
              startContent={team[indexArr]?.admin}
              onChange={(e) => {
                const arr = team
                arr[indexArr].admin = admin[e.target.value]
                setIsLoad(true)
                handleUpdateworker(arr)
              }}
              aria-label="Select your admin"

              style={{ position: 'absolute', textAlign: 'center' }}
              placeholder='בחר הרשאה'
              className="max-w-xs"
            >
              {adminM?.map((item, index) => (
                <SelectItem key={index} style={{ textAlign: 'center' }} >
                  {item}
                </SelectItem>
              ))}
            </Select> :
            <Select
              isLoading={isLoad}
              onChange={(e) => {
                const arr = team
                arr[indexArr].admin = admin[e.target.value]
                setIsLoad(true)
                handleUpdateworker(arr)
              }}
              aria-label="Select your admin"
              value={''}

              style={{ position: 'absolute', textAlign: 'center' }}
              className="max-w-xs"
              startContent={team[indexArr]?.admin}
            >
              {admin?.map((item, index) => (
                <SelectItem key={index} style={{ textAlign: 'center' }} >
                  {item}
                </SelectItem>
              ))}
            </Select>
        }

      </div>
    )
  }

  const statusColumn = ({ data }) => {

    return (
      <div className='w-full h-full flex items-center' style={{ textAlign: 'center' }}>
        {data.status === 'בהמתנה' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8014 5.55C19.802 6.39361 19.5004 7.20953 18.9514 7.85L17.1214 9.93C16.012 11.2476 16.012 13.1724 17.1214 14.49L18.9114 16.62C19.7883 17.6671 19.9803 19.127 19.404 20.3652C18.8277 21.6035 17.5872 22.3966 16.2214 22.4H8.52138C7.15377 22.4005 5.90965 21.6089 5.33084 20.3698C4.75203 19.1307 4.94331 17.6685 5.82138 16.62L7.63138 14.46C8.73057 13.1538 8.73057 11.2462 7.63138 9.94L5.82138 7.78C4.94331 6.7315 4.75203 5.26932 5.33084 4.03024C5.90965 2.79115 7.15377 1.99948 8.52138 2H16.2814C17.2202 1.99997 18.1201 2.37494 18.7811 3.04157C19.4421 3.7082 19.8094 4.61125 19.8014 5.55ZM9.62138 18.46H15.1814C15.4496 18.4922 15.7124 18.3673 15.8567 18.1389C16.001 17.9105 16.001 17.6195 15.8567 17.3911C15.7124 17.1627 15.4496 17.0378 15.1814 17.07H9.62138C9.35317 17.0378 9.09036 17.1627 8.94607 17.3911C8.80179 17.6195 8.80179 17.9105 8.94607 18.1389C9.09036 18.3673 9.35317 18.4922 9.62138 18.46Z" fill="#fbbc05" />
        </svg> : data.status === 'v' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.94631 18.2346C8.59988 18.2344 8.26421 18.1142 7.99631 17.8946L3.51631 14.2246C2.90372 13.6924 2.8254 12.7696 3.33954 12.1418C3.85368 11.514 4.77384 11.4089 5.41631 11.9046L8.88631 14.7446L18.8863 5.53459C19.2622 5.08766 19.8633 4.8995 20.4269 5.05234C20.9905 5.20518 21.4142 5.67123 21.5128 6.24682C21.6114 6.82241 21.3669 7.40289 20.8863 7.73459L9.96631 17.8346C9.69 18.0935 9.32496 18.2367 8.94631 18.2346Z" fill="#34a853" />
        </svg> : data.status === 'close' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.7188 18.3906L13.325 12.0004L19.7188 5.65714C20.0392 5.28603 20.0219 4.72911 19.679 4.37894C19.3361 4.02878 18.7832 4.00341 18.4101 4.32073L11.9976 10.6169L5.69734 4.27367C5.33275 3.90878 4.74392 3.90878 4.37933 4.27367C4.20236 4.45039 4.10282 4.69094 4.10282 4.94188C4.10282 5.19282 4.20236 5.43337 4.37933 5.61008L10.6703 11.9439L4.2765 18.2777C4.09954 18.4544 4 18.695 4 18.9459C4 19.1969 4.09954 19.4374 4.2765 19.6141C4.45291 19.7903 4.69172 19.8885 4.94018 19.887C5.18409 19.8885 5.41891 19.794 5.59452 19.6235L11.9976 13.2709L18.4101 19.7271C18.5865 19.9032 18.8253 20.0014 19.0738 20C19.319 19.9989 19.554 19.9009 19.7281 19.7271C19.9039 19.5491 20.0017 19.3078 20 19.0569C19.9982 18.8059 19.897 18.5661 19.7188 18.3906Z" fill="#ea4335" />
        </svg> : <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6401 22H7.36009C6.34927 21.9633 5.40766 21.477 4.79244 20.6742C4.17722 19.8713 3.95266 18.8356 4.18009 17.85L4.42009 16.71C4.69613 15.1668 6.02272 14.0327 7.59009 14H16.4101C17.9775 14.0327 19.3041 15.1668 19.5801 16.71L19.8201 17.85C20.0475 18.8356 19.823 19.8713 19.2077 20.6742C18.5925 21.477 17.6509 21.9633 16.6401 22Z" fill={`#4285F4`} />
          <path d="M12.5001 12H11.5001C9.29096 12 7.50009 10.2092 7.50009 8.00001V5.36001C7.49743 4.46807 7.85057 3.61189 8.48127 2.98119C9.11197 2.35049 9.96815 1.99735 10.8601 2.00001H13.1401C14.032 1.99735 14.8882 2.35049 15.5189 2.98119C16.1496 3.61189 16.5028 4.46807 16.5001 5.36001V8.00001C16.5001 9.06088 16.0787 10.0783 15.3285 10.8284C14.5784 11.5786 13.561 12 12.5001 12Z" fill={`#4285F4`} />
        </svg>
        }
      </div>
    )
  }

  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  const saveSignature = () => {
    const base64String = sigCanvas.current.toDataURL('image/png'); // Save as Base64
    setSignature(base64String)
  };
  // Handle change function for the radio group
  const handleChangePay = (event) => {
    setSelectedPaymentMethod(event.target.value); // Update the state with the selected value
  };
  // Handle change for textarea 1
  const handleTextarea1Change = (e) => {
    setTextarea1(e.target.value);
  };

  // Handle change for textarea 2
  const handleTextarea2Change = (e) => {
    setTextarea2(e.target.value);
  };

  // Handle change for textarea 3
  const handleTextarea3Change = (e) => {
    setTextarea3(e.target.value);
  };
  const handleOnChangePayment = (index, value) => {
    setPaymentData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = value; // Update the value at the specific index
      return updatedData;
    });
  };
  const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
    setEvents(getAllEvents.data.events)
    const eventU = getAllEvents.data.events
    setTeam(getAllEvents.data?.team)
    setRole(eventU.roles)
    setWaiters(eventU.waiting)
    setNewWorker(getAllEvents.data.workers)
    setColumnDefs(changeGrisdByIndex(getAllEvents.data.events.grid))
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

  const handleAddNotification = async (data) => {
    await axios.post(`http://localhost:8000/notify/${events._id}`, { message: data })

  }

  const handleGetSearch = async () => {
    const result = await axios.get(`http://localhost:9020/getteam`)
    const theRole = result.data.team
    setSearch(theRole)
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
    if (theWaiter) {
      console.log('done')
    }
  }
  function isIdUnique(id) {
    const exists = waitWorkers.some(item => item._id === id);
    return !exists; // Returns true if id is unique, false if it exists
  }
  const onCellValueChanged = async (params) => {

    const value = params.colDef.field
    const arr = [...newWorker]
    arr[params.rowIndex][value] = params.newValue
    setTeam([...team]);
    await handleUpdateworker(arr)
  };

  const findIndexById = (id, array) => {
    return array.findIndex(item => item.key === id);
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

    <div className=' flex justify-center w-full h-full items-center flex-col'
      style={{ gap: '20px', paddingRight: '5px', paddingLeft: '5px', paddingBottom: '3%' }}>
      <Modal size='5xl' isOpen={isOpen2} onOpenChange={onOpenChange2}>
        <ModalContent>
          {(onClose) => (
            <>
              <Quotation data={previewreq} />
            </>
          )}
        </ModalContent>
      </Modal>
      <div className='flex flex-row justify-between w-full' style={{ gap: '20px', paddingRight: '5%', paddingLeft: '5%' }}>
        <div className='flex flex-row  w-full' style={{ gap: '20px' }}>
        </div>



      </div>
      <div className=' text-white flex flex-col w-full h-full bg-white'
        style={{
          borderRadiusR: '15px', color: 'black', gap: '20px', borderRadius: "15px"
        }}>
        <div className='flex flex-col ag-theme-quartz'
          style={{ gap: '0', overflow: 'auto', whiteSpace: 'nowrap', width: '100%', }}>

          <div className='w-full h-full relative flex flex-row ' style={{ padding: '5px' }} >
            <Button onPress={onOpen4} color='primary'>הוסף עמודה</Button>
            <div style={{ width: '50px' }}>
              <Button isIconOnly variant='kff'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7691 10.6179C14.6701 10.5963 15.4749 10.0491 15.8263 9.21925C15.9013 9.25087 15.9815 9.2683 16.0629 9.27067H20.1771C20.6032 9.27067 20.9486 8.92534 20.9486 8.49935C20.9486 8.07336 20.6032 7.72802 20.1771 7.72802H16.1143C16.0699 7.72221 16.025 7.72221 15.9806 7.72802C15.686 6.57063 14.5523 5.83303 13.3746 6.0325C12.1969 6.23197 11.3695 7.30174 11.4726 8.49158C11.5756 9.68142 12.5747 10.593 13.7691 10.5871V10.6179ZM13.7691 7.58404C14.1838 7.58404 14.52 7.92017 14.52 8.3348C14.52 8.74943 14.1838 9.08556 13.7691 9.08556C13.3545 9.08556 13.0183 8.74943 13.0183 8.3348C13.0183 7.92017 13.3545 7.58404 13.7691 7.58404Z" fill="#252323" />
                  <path d="M3.77143 7.72802H9.94286C10.3689 7.72802 10.7143 8.07336 10.7143 8.49935C10.7143 8.92534 10.3689 9.27067 9.94286 9.27067H3.77143C3.34538 9.27067 3 8.92534 3 8.49935C3 8.07336 3.34538 7.72802 3.77143 7.72802Z" fill="#252323" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.736 15.9555C6.05818 15.0444 6.91918 14.4347 7.88571 14.4334V14.4128C9.04884 14.4114 10.029 15.2806 10.1663 16.4354C10.3037 17.5902 9.55477 18.6651 8.42374 18.9364C7.29271 19.2077 6.13762 18.5896 5.736 17.4981H3.77143C3.34538 17.4981 3 17.1528 3 16.7268C3 16.3008 3.34538 15.9555 3.77143 15.9555H5.736ZM7.1361 16.7809C7.14317 17.19 7.47652 17.5181 7.88571 17.5187V17.4776C8.3004 17.4776 8.63657 17.1414 8.63657 16.7268C8.61415 16.3183 8.26871 16.0029 7.85978 16.0177C7.45086 16.0324 7.12903 16.3718 7.1361 16.7809Z" fill="#252323" />
                  <path d="M12 15.9555H20.2286C20.6546 15.9555 21 16.3008 21 16.7268C21 17.1528 20.6546 17.4981 20.2286 17.4981H12C11.574 17.4981 11.2286 17.1528 11.2286 16.7268C11.2286 16.3008 11.574 15.9555 12 15.9555Z" fill="#252323" />
                </svg>
              </Button>

              <Tooltip showArrow color='primary' content={<div>הוספת יחצנים {events?.name}</div>}>
                <Button variant='ffe' onPress={() => { onOpen5() }} isIconOnly>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.65 22H5.35999C4.34955 21.9639 3.40833 21.4774 2.79458 20.6739C2.18083 19.8704 1.95901 18.8344 2.18999 17.85L2.41999 16.71C2.69603 15.1668 4.02261 14.0327 5.58999 14H14.41C15.9797 14.0319 17.3096 15.1652 17.59 16.71L17.82 17.85C18.0472 18.834 17.8239 19.8679 17.2109 20.6704C16.5979 21.4729 15.659 21.9604 14.65 22Z" fill="#252323" />
                    <path d="M10.5 12H9.49999C7.29085 12 5.49999 10.2092 5.49999 8.00001V5.36001C5.49999 3.50434 7.00431 2.00001 8.85999 2.00001H11.14C12.0319 1.99735 12.8881 2.35049 13.5188 2.98119C14.1495 3.61189 14.5027 4.46807 14.5 5.36001V8.00001C14.5 10.2092 12.7091 12 10.5 12Z" fill="#252323" />
                    <path d="M21 6.25002H19.63V4.88002C19.63 4.4658 19.2942 4.13002 18.88 4.13002C18.4658 4.13002 18.13 4.4658 18.13 4.88002V6.25002H16.77C16.3558 6.25002 16.02 6.5858 16.02 7.00002C16.02 7.41423 16.3558 7.75002 16.77 7.75002H18.13V9.12002C18.13 9.53423 18.4658 9.87002 18.88 9.87002C19.2942 9.87002 19.63 9.53423 19.63 9.12002V7.75002H21C21.4142 7.75002 21.75 7.41423 21.75 7.00002C21.75 6.5858 21.4142 6.25002 21 6.25002Z" fill="#252323" />
                  </svg>
                </Button>
              </Tooltip>
              <Tooltip showArrow color='primary' content={'הצעת מחיר לספקים'}>
                <Button variant='ffe' onPress={() => { onOpen6() }} isIconOnly>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57 9.41988C4.18323 9.69388 4.68677 10.1657 5 10.7599L7.64 15.5699C7.83762 15.9277 7.93763 16.3312 7.93 16.7399L7.88 18.7399C7.87836 19.1527 7.65749 19.5335 7.3 19.7399C7.13675 19.8263 6.95468 19.8709 6.77 19.8699C6.54744 19.869 6.32945 19.8067 6.14 19.6899L4.46 18.6899C4.11098 18.4744 3.82475 18.1709 3.63 17.8099L0.999997 12.9999C0.668643 12.3855 0.555813 11.6768 0.679997 10.9899C0.75635 10.3414 1.1246 9.76325 1.68 9.41988C2.27514 9.12352 2.97485 9.12352 3.57 9.41988ZM5.23 17.3599L6.39 18.0599L6.38 16.6799C6.37661 16.5332 6.33894 16.3894 6.27 16.2599L3.64 11.4499C3.48697 11.1471 3.23704 10.9042 2.93 10.7599C2.82744 10.7087 2.71462 10.6813 2.6 10.6799C2.51638 10.6807 2.43414 10.7012 2.36 10.7399C2.19422 10.851 2.08762 11.0311 2.07 11.2299C2.0243 11.5762 2.09463 11.9278 2.27 12.2299L4.9 16.9999C4.97088 17.1506 5.08599 17.2762 5.23 17.3599Z" fill="#252323" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2199 0.349883L17.2199 7.34988C17.3682 7.49766 17.4479 7.70069 17.4399 7.90988V14.9099C17.4399 16.1697 16.9395 17.3778 16.0487 18.2686C15.1579 19.1594 13.9497 19.6599 12.6899 19.6599H9.8199C9.40569 19.6599 9.0699 19.3241 9.0699 18.9099C9.0699 18.4957 9.40569 18.1599 9.8199 18.1599H12.6899C14.4826 18.1544 15.9344 16.7025 15.9399 14.9099V8.65988H11.6899C10.1734 8.6544 8.94539 7.42639 8.9399 5.90988V1.65988H6.6899C4.89498 1.65988 3.4399 3.11496 3.4399 4.90988V7.55988C3.4399 7.9741 3.10412 8.30988 2.6899 8.30988C2.27569 8.30988 1.9399 7.9741 1.9399 7.55988V4.90988C1.93192 3.64491 2.42883 2.42901 3.3205 1.53172C4.21216 0.634419 5.42491 0.129858 6.6899 0.129883H9.6899C9.88875 0.130058 10.0794 0.20919 10.2199 0.349883ZM10.4399 2.68988V5.90988C10.4399 6.60024 10.9995 7.15988 11.6899 7.15988H14.9099L10.4399 2.68988Z" fill="#252323" />
                  </svg>

                </Button>
              </Tooltip>

            </div>
          </div>
          <AgGridReact rowData={team} columnDefs={columnDefs} onCellValueChanged={onCellValueChanged} domLayout="autoHeight">

          </AgGridReact>
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

                      {waitWorkers?.map((item, index2) => {
                        return (
                          <div className='flex items-center justify-center flex-col' style={{ width: '70px' }}>
                            <Modal className='glass-background' style={{ minHeight: '560px' }} size='5xl' isOpen={isOpen7} onOpenChange={onOpenChange7}>
                              <ModalContent>
                                {(onClose) => (
                                  <>
                                    <ModalHeader className="flex flex-col gap-1 text-white">כתיבת הצעת מחיר </ModalHeader>
                                    <ModalBody style={{ padding: '5%', color: 'white' }}>
                                      {request1 &&
                                        <Accordion>
                                          <AccordionItem key="1" aria-label="Accordion 1" title="פרטי ההזמנה">

                                            <div className='flex flex-col items-center justify-center'
                                              style={{ height: '330px', gap: '20px', overflow: 'auto' }}>
                                              <div style={{ width: '550px' }}>
                                                <Textarea label='תיאור העבודה בקצרה'
                                                  value={textarea1}
                                                  onChange={handleTextarea1Change}
                                                  placeholder='' />
                                              </div>
                                              <div style={{ width: '550px' }}>
                                                <Textarea label='פירוט כל הסעיפים בהצעת המחיר'
                                                  value={textarea2}
                                                  onChange={handleTextarea2Change}
                                                  placeholder='' />
                                              </div>
                                              <div style={{ width: '550px' }}>
                                                <Textarea
                                                  value={textarea3}
                                                  onChange={handleTextarea3Change}
                                                  label='הערות ותוספות להצעת המחיר' placeholder='' />
                                              </div>
                                            </div>
                                          </AccordionItem>
                                          <AccordionItem key="2" aria-label="Accordion 1" title="תנאי תשלום">
                                            <div
                                              className="flex flex-col items-center justify-center "
                                              style={{ maxHeight: '430px', gap: '20px', overflow: 'auto' }}
                                            >
                                              <div className='flex flex-row' style={{ width: '550px', gap: '2px' }}>
                                                <Input type="num" label="סה&quot;כ תשלום העבודה" onChange={(e) => { setPaymentDataAmount(e.target.value) }} />

                                              </div>
                                              <div className='flex flex-row' style={{ width: '550px', gap: '2px' }}>
                                                <Input label="מקדמה" type="num" onChange={(e) => { setPaymentDataStart(e.target.value) }} />
                                                <DatePicker
                                                  label="  מועד התשלום"
                                                  onChange={handleStartDateChange}
                                                />
                                              </div>
                                              <Button
                                                style={{
                                                  height: '50px',
                                                  lineHeight: '50px', // Ensures consistent vertical alignment
                                                  padding: '0 20px', // Prevents button shrinking
                                                  minHeight: '50px', // Ensures the height doesn't go below 50px
                                                }}
                                                onClick={() => {
                                                  setPayment([...payment, 'p']);
                                                }}
                                                color="primary"
                                              >
                                                הוסף תשלום
                                              </Button>
                                              <div className='flex flex-col'
                                                style={{ maxHeight: '250px', overflow: 'auto', gap: '10px', paddingTop: '10px', paddingBottom: '10px' }}>
                                                {payment.map((item, index) => {
                                                  return (
                                                    <div className='flex flex-row' key={index} style={{ width: '550px', gap: '2px' }}>
                                                      <Input value={paymentData[index] || ''}

                                                        onChange={(e) => handleOnChangePayment(index, e.target.value)} label={`תשלום - ${index + 1}`}
                                                        type="num" />
                                                      <DatePicker
                                                        label="  מועד התשלום"
                                                        onChange={(e) => {

                                                          handlePayDateChange(index, e)

                                                        }}
                                                      />
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                              <div className='flex flex-row' style={{ width: '550px', gap: '2px' }}>
                                                <Input label="תשלום סופי" type="num" onChange={(e) => { setPaymentDataEnd(e.target.value) }} />
                                                <DatePicker
                                                  label="  מועד התשלום"
                                                  onChange={handleEndDateChange}
                                                />
                                              </div>
                                            </div>

                                          </AccordionItem>
                                          <AccordionItem key="3" aria-label="Accordion 1" title="אפשרויות תשלום">

                                            <div className='flex flex-col items-center justify-center'
                                              style={{ height: '330px', gap: '20px', overflow: 'auto' }}>
                                              <RadioGroup

                                                color="primary"
                                                value={selectedPaymentMethod} // Bind the selected value to the state
                                                onChange={handleChangePay}
                                              >
                                                <Radio value="bit">bit</Radio>
                                                <Radio value="paybox">paybox</Radio>
                                                <Radio value="כרטיס אשראי">כרטיס אשראי</Radio>
                                                <Radio value="העברה בנקאית">העברה בנקאית</Radio>
                                                <Radio value="apple pay">apple pay</Radio>
                                              </RadioGroup>
                                            </div>
                                          </AccordionItem>
                                          <AccordionItem key="4" aria-label="Accordion 1" title="סיכום וחתימות">

                                            <div className='flex flex-col items-center justify-center'
                                              style={{ height: '330px', gap: '20px', overflow: 'auto' }}>
                                              <div className='flex flex-row w-full'>
                                                <div className='flex'>
                                                  <DatePicker

                                                    label="תאריך ביטול אפשרי"
                                                    onChange={handleCancellationDateChange}
                                                  />
                                                </div>
                                                <div className='flex'>
                                                  <DatePicker
                                                    label="תוקף ההצעה"
                                                    onChange={handleOfferExpiryDateChange}
                                                  />
                                                </div>
                                              </div>

                                              <div
                                                style={{
                                                  border: '1px solid #ccc',
                                                  width: '400px',
                                                  height: '150px',
                                                  margin: '0 auto',
                                                }}
                                              >
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
                                            </div>
                                          </AccordionItem>
                                        </Accordion>
                                      }
                                      {request2 &&
                                        <Quotation data={doc} />
                                      }

                                    </ModalBody >
                                    <ModalFooter>
                                      <Button color="danger" variant="light" onPress={() => {
                                        onClose()
                                      }}>
                                        Close
                                      </Button>
                                      <Button color="primary" onPress={async () => {
                                        if (request1) {
                                          setRequest1(false)

                                          setRequest2(true)
                                        } else if (request2) {
                                          const req = {
                                            title: 'הצעת עבודה', message: 'ברכות קיבלת הצעת עבודה חדשה',
                                            origin: events._id, fullName: reqUser.username | reqUser.name, email: reqUser.email,
                                            isRead: false, origin: events.name, link: `/quatation/${events._id}/${reqUser.key}`, time: getCurrentDateTime()
                                          }
                                          await handleUpdateworker([...newWorker, {
                                            key: reqUser.key,
                                            admin: 'none', quotations: doc, status: 'בהמתנה'
                                          }])
                                          await handleAddNotification(req)
                                          await handleUpdateWaiting(req)
                                          await handleUpdatemission()

                                          await handleAddNotification()
                                          onClose()
                                        }


                                      }}>
                                        {request1 && 'הבא'}
                                        {request2 && 'שליחה'}
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
                                <Image className='cursor-pointer' onClick={() => {
                                  setReqUser(item)

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
                  }) : search.map((item, index) => {

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
      <Modal size='5xl' style={{ width: '80%' }} className='event-modal-container glass-background' isOpen={isOpen5} onOpenChange={onOpenChange5}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הצעת מחיר ליחצן</ModalHeader>

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

                      {waitWorkers?.map((item, index2) => {
                        return (
                          <div className='flex items-center justify-center flex-col' style={{ width: '70px' }}>
                            <Modal className='glass-background' style={{ minHeight: '560px' }} size='5xl' isOpen={isOpen3} onOpenChange={onOpenChange3}>
                              <ModalContent>
                                {(onClose) => (
                                  <>
                                    <ModalHeader className="flex flex-col gap-1 text-white">כתיבת הצעת מחיר ליחצן </ModalHeader>
                                    <ModalBody style={{ padding: '5%', color: 'white' }}>
                                      {request1 &&
                                        <Accordion>
                                          <AccordionItem key="1" aria-label="Accordion 1" title="פרטי ההזמנה">

                                            <div className='flex flex-col items-center justify-center'
                                              style={{ height: '330px', gap: '20px', overflow: 'auto' }}>
                                              <div style={{ width: '550px' }}>
                                                <Textarea label='תיאור העבודה בקצרה'
                                                  value={textarea1}
                                                  onChange={handleTextarea1Change}
                                                  placeholder='' />
                                              </div>
                                              <div style={{ width: '550px' }}>
                                                <Textarea label='פירוט כל הסעיפים בהצעת המחיר'
                                                  value={textarea2}
                                                  onChange={handleTextarea2Change}
                                                  placeholder='' />
                                              </div>
                                              <div style={{ width: '550px' }}>
                                                <Textarea
                                                  value={textarea3}
                                                  onChange={handleTextarea3Change}
                                                  label='הערות ותוספות להצעת המחיר' placeholder='' />
                                              </div>
                                            </div>
                                          </AccordionItem>
                                          <AccordionItem key="2" aria-label="Accordion 1" title="תנאי תשלום">
                                            <div
                                              className="flex flex-col items-center justify-center "
                                              style={{ maxHeight: '430px', gap: '20px', overflow: 'auto' }}
                                            >
                                              <div className='flex flex-row' style={{ width: '550px', gap: '2px' }}>
                                                <Input type="num" label="סה&quot;כ תשלום העבודה" onChange={(e) => { setPaymentDataAmount(e.target.value) }} />

                                              </div>
                                              <div className='flex flex-row' style={{ width: '550px', gap: '2px' }}>
                                                <Input label="מקדמה" type="num" onChange={(e) => { setPaymentDataStart(e.target.value) }} />
                                                <DatePicker
                                                  label="  מועד התשלום"
                                                  onChange={handleStartDateChange}
                                                />
                                              </div>
                                              <Button
                                                style={{
                                                  height: '50px',
                                                  lineHeight: '50px', // Ensures consistent vertical alignment
                                                  padding: '0 20px', // Prevents button shrinking
                                                  minHeight: '50px', // Ensures the height doesn't go below 50px
                                                }}
                                                onClick={() => {
                                                  setPayment([...payment, 'p']);
                                                }}
                                                color="primary"
                                              >
                                                הוסף תשלום
                                              </Button>
                                              <div className='flex flex-col'
                                                style={{ maxHeight: '250px', overflow: 'auto', gap: '10px', paddingTop: '10px', paddingBottom: '10px' }}>
                                                {payment.map((item, index) => {
                                                  return (
                                                    <div className='flex flex-row' key={index} style={{ width: '550px', gap: '2px' }}>
                                                      <Input value={paymentData[index] || ''}

                                                        onChange={(e) => handleOnChangePayment(index, e.target.value)} label={`תשלום - ${index + 1}`}
                                                        type="num" />
                                                      <DatePicker
                                                        label="  מועד התשלום"
                                                        onChange={(e) => {

                                                          handlePayDateChange(index, e)

                                                        }}
                                                      />
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                              <div className='flex flex-row' style={{ width: '550px', gap: '2px' }}>
                                                <Input label="תשלום סופי" type="num" onChange={(e) => { setPaymentDataEnd(e.target.value) }} />
                                                <DatePicker
                                                  label="  מועד התשלום"
                                                  onChange={handleEndDateChange}
                                                />
                                              </div>
                                            </div>

                                          </AccordionItem>
                                          <AccordionItem key="3" aria-label="Accordion 1" title="אפשרויות תשלום">

                                            <div className='flex flex-col items-center justify-center'
                                              style={{ height: '330px', gap: '20px', overflow: 'auto' }}>
                                              <RadioGroup

                                                color="primary"
                                                value={selectedPaymentMethod} // Bind the selected value to the state
                                                onChange={handleChangePay}
                                              >
                                                <Radio value="bit">bit</Radio>
                                                <Radio value="paybox">paybox</Radio>
                                                <Radio value="כרטיס אשראי">כרטיס אשראי</Radio>
                                                <Radio value="העברה בנקאית">העברה בנקאית</Radio>
                                                <Radio value="apple pay">apple pay</Radio>
                                              </RadioGroup>
                                            </div>
                                          </AccordionItem>
                                          <AccordionItem key="4" aria-label="Accordion 1" title="סיכום וחתימות">

                                            <div className='flex flex-col items-center justify-center'
                                              style={{ height: '330px', gap: '20px', overflow: 'auto' }}>
                                              <div className='flex flex-row w-full'>
                                                <div className='flex'>
                                                  <DatePicker

                                                    label="תאריך ביטול אפשרי"
                                                    onChange={handleCancellationDateChange}
                                                  />
                                                </div>
                                                <div className='flex'>
                                                  <DatePicker
                                                    label="תוקף ההצעה"
                                                    onChange={handleOfferExpiryDateChange}
                                                  />
                                                </div>
                                              </div>

                                              <div
                                                style={{
                                                  border: '1px solid #ccc',
                                                  width: '400px',
                                                  height: '150px',
                                                  margin: '0 auto',
                                                }}
                                              >
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
                                            </div>
                                          </AccordionItem>
                                        </Accordion>
                                      }
                                      {request2 &&
                                        <Quotation data={doc} />
                                      }

                                    </ModalBody >
                                    <ModalFooter>
                                      <Button color="danger" variant="light" onPress={() => {
                                        onClose()
                                      }}>
                                        Close
                                      </Button>
                                      <Button color="primary" onPress={async () => {
                                        if (request1) {
                                          setRequest1(false)

                                          setRequest2(true)
                                        } else if (request2) {
                                          const req = {
                                            title: 'הצעת עבודה', message: 'ברכות קיבלת הצעת עבודה חדשה',
                                            origin: events._id, fullName: reqUser.username | reqUser.name, email: reqUser.email,
                                            isRead: false, origin: events.name, link: `/quatation/${events._id}/${reqUser.key}`, time: getCurrentDateTime()
                                          }
                                          await handleUpdateworker([...newWorker, {
                                            key: reqUser.key,
                                            admin: 'none', quotations: doc, status: 'בהמתנה'
                                          }])
                                          await handleAddNotification(req)
                                          await handleUpdateWaiting(req)
                                          await handleUpdatemission()

                                          await handleAddNotification()
                                          onClose()
                                        }


                                      }}>
                                        {request1 && 'הבא'}
                                        {request2 && 'שליחה'}
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
                                <Image className='cursor-pointer' onClick={() => {
                                  setReqUser(item)

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
                  }) : search.map((item, index) => {

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


      <Modal className='glass-background' isOpen={isOpen4} onOpenChange={onOpenChange4}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <Input onChange={(e) => { setColumn(e.target.value) }} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={async () => {
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
