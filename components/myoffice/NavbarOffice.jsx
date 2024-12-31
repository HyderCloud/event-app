"use client"
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Drawer, DrawerContent, DrawerHeader, Avatar, DrawerBody, DrawerFooter, AvatarGroup, } from "@nextui-org/react";
const NavbarOffice = () => {
    const { isOpen: isOpen, onOpen: onOpen, onOpenChange: onOpenChange } = useDisclosure();
    return (
        <div>
            <Button variant='bordered' isIconOnly onPress={() => onOpen()} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.62 11H6C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9H15.62C16.1723 9 16.62 9.44772 16.62 10C16.62 10.5523 16.1723 11 15.62 11Z" fill="black" />
                    <path d="M6 14H18.82C19.3723 14 19.82 14.4477 19.82 15C19.82 15.5523 19.3723 16 18.82 16H6C5.44772 16 5 15.5523 5 15C5 14.4477 5.44772 14 6 14Z" fill="black" />
                </svg>

            </Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
                            <DrawerBody>

                            </DrawerBody>
                            <DrawerFooter>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default NavbarOffice