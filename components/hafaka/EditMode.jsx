"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Whats from '@/image/Elemento.png'
import { usePathname } from 'next/navigation'
import DragAndDrop from '../DragImage'
import {
    Button, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, useDisclosure,
    Input,
    Divider,
    Textarea
} from '@nextui-org/react'

import Image from 'next/image'


const EditMode = ({ onMode }) => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [slogen, setSlogen] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const storeName = usePathname()
    const [descrpition, setDescription] = useState('')
    const [whichInstegram, setWhichIcon] = useState('')
    const [whichSection, setWhichSction] = useState('')
    const [isLinkClick, setIsLinkClikc] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [links, setLinks] = useState([])
    const [link, setLink] = useState('')
    const [data, setData] = useState('')
    
    const handleFileUpload = (files) => {
        console.log(files)
        if(whichInstegram === ' פרופיל ההפקה'){
        setProfileImage(files)
        }else{

            setBackgroundImage(files); 
        }

    };
    const update_bunner = async ( label) => {
        if(label === 'profile'){
            const image = await axios.patch(`http://localhost:9020/profile/${storeName.slice(1)}`,{image: profileImage});
            setProfileImage(image.data.image)
        }else{
            console.log(backgroundImage)
            const image = await axios.patch(`http://localhost:9020/bunner/${storeName.slice(1)}`,{image: backgroundImage});
            setBackgroundImage(image.data.image)
        }
    }
    const update_links = async (arr) => {
        const links_arr = await axios.patch(`http://localhost:9020/update_links/${storeName.slice(1)}`, { "links": arr })
        setLinks(links_arr.data.links)
    }
    const handleEditDescription = () => {
        setWhichSction('description')
        setWhichIcon('description')
    }
    const handleEditEmail = () => {
        setWhichSction('email')
        setWhichIcon('email')
    }
    const handleEditPhone = () => {
        setWhichSction('phone')
        setWhichIcon('phone')
    }
    const handleEditSlogen = () => {
        setWhichSction('slogen')
        setWhichIcon('slogen')
    }
    const update_slogen = async (slogen1) => {
        const slogen_arr = await axios.patch(`http://localhost:9020/update_slogen/${storeName.slice(1)}`, { "slogen": slogen1 })
        setSlogen(slogen_arr.data.slogen)
    }
    const update_phone = async (phone1) => {
        const phone_arr = await axios.patch(`http://localhost:9020/update_phone/${storeName.slice(1)}`, { "phone": phone1 })
        setPhone(phone_arr.data.phone)
    }
    const update_email = async (email1) => {
        const email_arr = await axios.patch(`http://localhost:9020/update_email/${storeName.slice(1)}`, { "email": email1 })
        setEmail(email_arr.data.email)
    }
    const updateDescrption = async (description) => {
        const description_arr = await axios.patch(`http://localhost:9020/update_description/${storeName.slice(1)}`, { "description": description })
        setDescription(description_arr.data.description)
    }
    const getStore = async () => {
        const store = await axios.get(`http://localhost:9020/${storeName.slice(1)}`)
        setData(store.data.store)
        setDescription(store.data.store.description)
        setLinks(store.data.store.links)
        setEmail(store.data.store.email)
        setPhone(store.data.store.phone)
        setSlogen(store.data.store.slogen)
        setBackgroundImage(store.data.store.bunner)
        setProfileImage(store.data.store.profile_img)
    }
    function checkAndReplaceLink(link2) {
        const newLinks = [...links]
        if (newLinks.length > 0) {
            newLinks.map((element, index) => {
                if (link2.startsWith('https://www.instagram.com') && element.startsWith('https://www.instagram.com')) {
                    newLinks[index] = link2
                } else if (link2.startsWith('https://www.facebook.com') && element.startsWith('https://www.facebook.com')) {
                    newLinks[index] = link2
                } else if (link2.startsWith('https://www.discord.com') && element.startsWith('https://www.discord.com') | link2.startsWith('https://discord.gg') && element.startsWith('https://discord.gg')) {
                    newLinks[index] = link2
                } else if (link2.startsWith('https://www.whatsapp.com') && element.startsWith('https://www.whatsapp.com')) {
                    newLinks[index] = link2
                } else if (link2.startsWith('https://www.twitter.com') && element.startsWith('https://www.twitter.com')) {
                    newLinks[index] = link2
                } else if (link2.startsWith('https://www.youtube.com/') && element.startsWith('https://www.youtube.com/')) {
                    newLinks[index] = link2
                }
                else if (link2.startsWith('https://www.telegram.org') && element.startsWith('https://www.telegram.org') | link2.startsWith('https://t.me') && element.startsWith('https://t.me')) {
                    newLinks[index] = link2
                } else {
                    if (newLinks.length < 4) {
                        newLinks.push(link2)
                    } else {
                        'set error'
                    }
                }
            })
        } else { newLinks.push(link2) }
        return (newLinks)
    }

    useEffect(() => {

        getStore()
    }, [])
    const handleLinkList = () => {
        if (link.startsWith('https://www.instagram.com')) {
            const array = checkAndReplaceLink(link)
            console.log(array)
            update_links(array)
        } else if (link.startsWith('https://www.facebook.com')) {
            const array = checkAndReplaceLink(link)
            console.log(array)
            update_links(array)
        } else if (link.startsWith('https://www.discord.com') | link.startsWith('https://discord.gg')) {
            const array = checkAndReplaceLink(link)
            console.log(array)
            update_links(array)
        } else if (link.startsWith('https://www.whatsapp.com')) {
            const array = checkAndReplaceLink(link)
            console.log(array)
            update_links(array)
        }
        else if (link.startsWith('https://www.twitter.com')) {
            const array = checkAndReplaceLink(link)
            update_links(array)
        }
        else if (link.startsWith('https://www.telegram.org') | link.startsWith('https://t.me')) {
            const array = checkAndReplaceLink(link)
            update_links(array)
        }
        else if (link.startsWith('https://www.youtube.com/')) {
            const array = checkAndReplaceLink(link)
            update_links(array)
        }

    }
    const handleEmail = () => {
        update_email(email)
    }
    const handleSlogen = () => {
        update_slogen(slogen)
    }
    const handleDescription = () => {
        updateDescrption(descrpition)
    }
    const handlePhone = () => {
        update_phone(phone)
    }
    const handleSaveChange = () => {
        onMode(false)
    }
    const handleLinkClick = () => {
        setIsLinkClikc(true)
        setWhichSction('links')
        setLink('')
    }
    return (
        <div className='dashboard-container flex flex-col'>
            <div className='main-container flex flex-col'>
                <div className='sec-bunner-cont'>
                    <div onClick={() => {
                        setWhichIcon(' באנר ההפקה')
                        onOpen()
                    }} className='bunner-dash cursor-pointer' style={{backgroundImage:  `url(${backgroundImage})` ,       height: '250px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'}}>

                    </div>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 modal-bunner-edit text-white text-right items-end ">
                                        <div className='flex flex-row'>
                                            <div className=' flex flex-col items-end'>
                                                {whichInstegram}
                                                <div>
                                                    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="18" height="4" rx="2" fill="#FBB03B" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className='w-12'></div>
                                        </div>

                                    </ModalHeader>
                                    <ModalBody className='modal-bunner-edit--content'>
                                                {whichInstegram === ' פרופיל ההפקה' ?
                                        <DragAndDrop onFileUpload={handleFileUpload} label={"תמונת פרופיל"}/>:
                                        <DragAndDrop onFileUpload={handleFileUpload} label={"באנר"}/>    }
                                    </ModalBody>
                                    <ModalFooter className='modal-bunner-edit--bottom'>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            סגור
                                        </Button>
                                        <Button color="primary" onPress={()=>{
                                            if(whichInstegram === ' פרופיל ההפקה'){
                                                update_bunner('profile')
                                            }else{
                                                update_bunner('bunner')
                                            }
                                            onClose()
                                        }}>
                                            החל
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                </div>
                <div style={{ height: '40px' }}></div>
                <div className='footer-dash flex flex-row'>
                    <div className='edit-button-area flex flex-row' style={{ paddingLeft: '10%' }} >
                        <Button className='edit-button' radius='full' onPress={handleSaveChange} >
                            שמור שינויים
                        </Button>
                    </div>

                    <div style={{ width: '30%' }}></div>
                    <div className='flex flex-col'>
                        <div className='store-name items-end'>{data.name}</div>
                        <div className='folowers-digits opacity-70 mb-6 text-right items-end cursor-pointer' onClick={handleEditSlogen}>
                            {slogen === '' ? " הוסף סלוגן" : slogen
                            }</div>
                    </div>
                    <div onClick={()=>{
                                              setWhichIcon(' פרופיל ההפקה')
                                              onOpen()
                    }} 
                    className='flex profile-image-edit' style={{backgroundImage: profileImage&&`url(${profileImage})` , 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'}}></div>
                </div>
            </div>
            <div className='sec-main-container flex flex-row'>
                {whichSection === 'links' ?
                    <div className='edit-links' style={{ width: '50%' }}>
                        <div className='flex flex-col h-full'>
                            <div className='edit-links-header flex flex-col items-end'>
                                <div className='font-bold' style={{ paddingRight: '4%', paddingTop: '5%' }}>הוסף קישור</div>
                                <div style={{ paddingRight: '4%' }}>
                                    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="18" height="4" rx="2" fill="#FBB03B" />
                                    </svg>
                                </div>
                            </div>
                            <div className='edit-links-input flex justify-center items-center'>
                                <Input label={whichInstegram} value={link} onChange={(e) => { setLink(e.target.value) }} /></div>
                            <div className='edit-links-footer flex flex-row gap-4'>
                                <Button color="danger" variant="light" onPress={() => {
                                    setWhichSction('')
                                    setWhichIcon('')
                                }}>
                                    סגור
                                </Button>
                                <Button className='' color='primary' onClick={() => {
                                    handleLinkList()
                                    setWhichSction('')
                                }}>החל</Button>
                            </div>
                        </div>
                    </div>
                    : whichSection === 'description' ?
                        <div className='edit-links' style={{ width: '50%', height: '300px' }}>
                            <div className='flex flex-col h-full'>
                                <div className='edit-links-header flex flex-col items-end'>
                                    <div className='font-bold' style={{ paddingRight: '4%', paddingTop: '5%' }}>הוסף תיאור</div>
                                    <div style={{ paddingRight: '4%' }}>
                                        <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="18" height="4" rx="2" fill="#FBB03B" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='edit-links-input flex justify-center items-center text-right'>
                                    <Textarea type='text' className='text-right' label={whichInstegram} value={descrpition} onChange={(e) => { setDescription(e.target.value) }} /></div>
                                <div className='edit-links-footer flex flex-row gap-4'>
                                    <Button color="danger" variant="light" onPress={() => {
                                        setWhichSction('')
                                        setWhichIcon('')
                                    }}>
                                        סגור
                                    </Button>
                                    <Button className='' color='primary' onClick={() => {
                                        handleDescription()
                                        setWhichSction('')
                                    }}>החל</Button></div>
                            </div>
                        </div>
                        : whichSection === 'email' ?
                            <div className='edit-links' style={{ width: '50%', height: '300px' }}>
                                <div className='flex flex-col h-full'>
                                    <div className='edit-links-header flex flex-col items-end'>
                                        <div className=' font-bold' style={{ paddingRight: '4%', paddingTop: '5%' }}>הוסף אימייל</div>
                                        <div style={{ paddingRight: '4%' }}>
                                            <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="18" height="4" rx="2" fill="#FBB03B" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='edit-links-input flex justify-center items-center text-right'>
                                        <Input type='email' className='text-right' label={whichInstegram} value={email} onChange={(e) => { setEmail(e.target.value) }} /></div>
                                    <div className='edit-links-footer flex flex-row gap-4'>
                                        <Button color="danger" variant="light" onPress={() => {
                                            setWhichSction('')
                                            setWhichIcon('')
                                        }}>
                                            סגור
                                        </Button>
                                        <Button className='' color='primary' onClick={() => {
                                            handleEmail()
                                            setWhichSction('')
                                        }}>החל</Button></div>
                                </div>
                            </div> : whichSection === 'phone' ?
                                <div className='edit-links' style={{ width: '50%', height: '300px' }}>
                                    <div className='flex flex-col h-full'>
                                        <div className='edit-links-header flex flex-col items-end'>
                                            <div className='font-bold' style={{ paddingRight: '4%', paddingTop: '5%' }}>הוסף טלפון</div>
                                            <div style={{ paddingRight: '4%' }}>
                                                <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="18" height="4" rx="2" fill="#FBB03B" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className='edit-links-input flex justify-center items-center text-right'>
                                            <Input type='email' className='text-right' label={whichInstegram} value={phone} onChange={(e) => { setPhone(e.target.value) }} /></div>
                                        <div className='edit-links-footer flex flex-row gap-4'>
                                            <Button color="danger" variant="light" onPress={() => {
                                                setWhichSction('')
                                                setWhichIcon('')
                                            }}>
                                                סגור
                                            </Button>
                                            <Button className='' color='primary' onClick={() => {
                                                handlePhone()
                                                setWhichSction('')
                                            }}>החל</Button></div>
                                    </div>
                                </div> :
                                whichSection === 'slogen' ?
                                    <div className='edit-links' style={{ width: '50%', height: '300px' }}>
                                        <div className='flex flex-col h-full'>
                                            <div className='edit-links-header flex flex-col items-end'>
                                                <div className='font-bold' style={{ paddingRight: '4%', paddingTop: '5%' }}>הוסף סלוגן</div>
                                                <div style={{ paddingRight: '4%' }}>
                                                    <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="18" height="4" rx="2" fill="#FBB03B" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className='edit-links-input flex justify-center items-center text-right'>
                                                <Input type='email' className='text-right' label={whichInstegram} value={slogen} onChange={(e) => { setSlogen(e.target.value) }} /></div>
                                            <div className='edit-links-footer flex flex-row gap-4'>
                                                <Button color="danger" variant="light" onPress={() => {
                                                    setWhichSction('')
                                                    setWhichIcon('')
                                                }}>
                                                    סגור
                                                </Button>
                                                <Button className='' color='primary' onClick={() => {
                                                    handleSlogen()
                                                    setWhichSction('')
                                                }}>החל</Button></div>
                                        </div>
                                    </div> : whichSection === 'phone' ?
                                        <div className='edit-links' style={{ width: '50%', height: '300px' }}>
                                            <div className='flex flex-col h-full'>
                                                <div className='edit-links-header flex flex-col items-end'>
                                                    <div className='font-bold' style={{ paddingRight: '4%', paddingTop: '5%' }}>הוסף טלפון</div>
                                                    <div style={{ paddingRight: '4%' }}>
                                                        <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect width="18" height="4" rx="2" fill="#FBB03B" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='edit-links-input flex justify-center items-center text-right'>
                                                    <Input type='email' className='text-right' label={whichInstegram} value={phone} onChange={(e) => { setPhone(e.target.value) }} /></div>
                                                <div className='edit-links-footer '><Button className='' color='primary' onClick={() => {
                                                    handlePhone()
                                                    setWhichSction('')
                                                }}>החל</Button></div>
                                            </div>
                                        </div> :
                                        <div style={{ width: '50%' }}></div>
                }
                <div className='third-main-dash flex flex-col'>

                </div>


                <div className='sec-main-dash flex flex-col'>

                    <div className='links-dash-container flex flex-row items-center justify-center'>

                        <div className='flex flex-row items-center justify-center '>
                            <div style={{
                                width: '70px', height: '70px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', background: whichInstegram === 'Instegram link' ? "radial-gradient(circle, #1A0221 54%, #fbb13b 100%)" : ''
                            }}>
                                <Image src={require('@/image/Frame.png')} style={{ objectFit: 'contain', marginLeft: '13px', marginTop: '8px' }}
                                    onClick={() => {
                                        handleLinkClick()
                                        setWhichIcon('Instegram link')
                                    }}
                                    alt='llll'
                                />
                            </div>
                            <div style={{
                                width: '70px', height: '70px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', background: whichInstegram === 'Facebook link' ? "radial-gradient(circle, #1A0221 54%, #fbb13b 100%)" : ''
                            }}>
                                <Image src={require('@/image/Facebook.png')} style={{ objectFit: 'contain', marginLeft: '13px', marginTop: '8px' }}
                                    onClick={() => {
                                        handleLinkClick()
                                        setWhichIcon('Facebook link')
                                    }}
                                    alt='llll'
                                />
                            </div>
                            <div style={{
                                width: '70px', height: '70px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', background: whichInstegram === 'Whatsapp link' ? ' radial-gradient(circle, #1A0221 54%, #fbb13b 100%)' : ''
                            }}>
                                <Image src={Whats} style={{ objectFit: 'contain', marginLeft: '13px', marginTop: '8px' }}
                                    onClick={() => {
                                        handleLinkClick()
                                        setWhichIcon('Whatsapp link')
                                    }} />
                            </div>
                            <div style={{
                                width: '70px', height: '70px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', background: whichInstegram === 'Discord link' ? ' radial-gradient(circle, #1A0221 54%, #fbb13b 100%)' : ''
                            }}>
                                <Image src={require('@/image/Discord.png')} style={{ objectFit: 'contain', marginLeft: '13px', marginTop: '8px' }}
                                    onClick={() => {
                                        handleLinkClick()
                                        setWhichIcon('Discord link')
                                    }} />
                            </div>
                            <div style={{
                                width: '70px', height: '70px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', background: whichInstegram === 'X link' ? ' radial-gradient(circle, #1A0221 54%, #fbb13b 100%)' : ''
                            }}>
                                <Image src={require('@/image/X.png')} style={{ objectFit: 'contain', marginLeft: '13px', marginTop: '8px' }}
                                    onClick={() => {
                                        handleLinkClick()
                                        setWhichIcon('X link')
                                    }} />
                            </div>
                            <div style={{
                                width: '70px', height: '70px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', background: whichInstegram === 'Youtube link' ? ' radial-gradient(circle, #1A0221 54%, #fbb13b 100%)' : ''
                            }}>
                                <Image src={require('@/image/Youtube.png')} style={{ objectFit: 'contain', marginLeft: '13px', marginTop: '8px' }}
                                    onClick={() => {
                                        handleLinkClick()
                                        setWhichIcon('Youtube link')
                                    }} />
                            </div>
                            <div></div>
                            <div style={{
                                width: '70px', height: '70px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', background: whichInstegram === 'Telegram link' ? ' radial-gradient(circle, #1A0221 54%, #fbb13b 100%)' : ''
                            }}>
                                <Image src={require('@/image/Telegram.png')} style={{ objectFit: 'contain', marginLeft: '13px', marginTop: '8px' }}
                                    onClick={() => {
                                        handleLinkClick()
                                        setWhichIcon('Telegram link')
                                    }} />
                            </div>
                        </div>


                    </div>
                    <div className='description-dash-container flex flex-col'>
                        <h1 className='about-header-dash' >פרטים
                        </h1>
                        <div style={{ paddingRight: '4%' }}>
                            <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="18" height="4" rx="2" fill="#FBB03B" />
                            </svg>
                        </div>

                        <div className='flex flex-col w-full' style={{ paddingRight: '4%', paddingTop: '10px', paddingBottom: '10px' }}>
                            <div className=' flex flex-row w-full gap-3 cursor-pointer  hover-slots-edit' style={{ background: whichInstegram === 'email' ? ' linear-gradient(90deg, #000 54%, #FBB03B  100%)' : '' }}
                                onClick={handleEditEmail}>
                                <div className='about-slots-edit-result text-right'>
                                    {email === '' ? 'הוסף אימייל' : email}</div>
                                <div className='about-slots-edit-sub text-right'>:אימייל</div>
                            </div>
                            <div style={{ height: '10px' }}></div>
                            <div className=' flex flex-row w-full gap-3  cursor-pointer  hover-slots-edit' style={{ background: whichInstegram === 'phone' ? ' linear-gradient(90deg, #000 54%, #FBB03B  100%)' : '' }}
                                onClick={handleEditPhone}>
                                <div className='about-slots-edit-result text-right '>{
                                    phone === '' ? 'הוסף טלפון' : phone
                                }</div>
                                <div className='about-slots-edit-sub text-right'>:טלפון</div>
                            </div>
                            <div style={{ height: '10px' }}></div>
                            <div className=' flex flex-row w-full gap-3 cursor-pointer  hover-slots-edit' onClick={handleEditEmail}>
                                <div className='about-slots-edit-result text-right'>{data?.address?.length === 0
                                    ? 'הוסף כתובת' : data?.address}</div>
                                <div className='about-slots-edit-sub text-right'>:כתובת</div>

                            </div>
                            <div style={{ height: '10px' }}></div>
                        </div>
                    </div>
                    <div className='about-container flex flex-col ' onClick={handleEditDescription}
                        style={{ cursor: 'pointer', background: '#000' }}>
                        <h1 className='about-header-dash' >תיאור
                        </h1>
                        <div style={{ paddingRight: '4%' }}>
                            <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="18" height="4" rx="2" fill="#FBB03B" />
                            </svg>
                        </div>
                        <div className='description-text'>
                            {descrpition}
                        </div>
                        <div className='h-10'></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditMode

