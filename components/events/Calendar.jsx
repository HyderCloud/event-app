"use client";
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // For month view
import timeGridPlugin from '@fullcalendar/timegrid'; // For day and week views
import interactionPlugin from '@fullcalendar/interaction'; // For date click interactions
import { TimeInput, Card, CardHeader, CardBody, User, Accordion, AccordionItem, Link, Image, Spacer, CardFooter, Divider, DatePicker, Input, Switch, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from '@nextui-org/react'
import '@fullcalendar/core/locales/he'; // Hebrew locale



const Calendar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [events, setEvents] = useState([]);
  
  // Form input states
  const [eventTitle, setEventTitle] = useState('');
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleDateClick = (arg) => {
    setEventStartDate(arg.dateStr); // Set the start date when a date is clicked
    setEventEndDate(arg.dateStr); // Default the end date to the clicked date
    onOpen(); // Open modal on date click
  };

  const handleSubmit = () => {
    if (eventTitle && eventStartDate && eventEndDate) {
      const newEvent = {
        title: eventTitle,
        start: `${eventStartDate}T${eventStartTime}`,
        end: `${eventEndDate}T${eventEndTime}`,
        description: eventDescription,
      };

      // Add the new event to the events state
      setEvents([...events, newEvent]);

      // Close the modal after adding the event
      onOpenChange(false);
      
      // Reset form fields
      setEventTitle('');
      setEventStartDate(null);
      setEventEndDate(null);
      setEventStartTime('');
      setEventEndTime('');
      setEventDescription('');
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <div style={{ direction: 'rtl' }}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">הוסף אירוע חדש</ModalHeader>
              <ModalBody>
                <form>
                  {/* Event Title Input */}
                  <Input
                    clearable
                    underlined
                    label="כותרת האירוע"
                    placeholder="הכנס כותרת"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    fullWidth
                  />
                  
                  {/* Start Date */}
                  <DatePicker
                    aria-label="Start Date"
                    label="תאריך התחלה"
           
                    onChange={setEventStartDate}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  
                  {/* End Date */}
                  <DatePicker
                    aria-label="End Date"
                    label="תאריך סיום"
             
                    onChange={setEventEndDate}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  
                  {/* Start Time */}
                  <TimeInput
                    aria-label="Start Time"
                    label="שעת התחלה"
              
                    onChange={setEventStartTime}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  
                  {/* End Time */}
                  <TimeInput
                    aria-label="End Time"
                    label="שעת סיום"
                   
                    onChange={setEventEndTime}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  
                  {/* Event Description */}
                  <Textarea
                    aria-label="Event Description"
                    label="תיאור"
                    placeholder="הכנס תיאור קצר"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    fullWidth
                    style={{
                        marginBottom: '15px',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        height: '120px',
                      }}
                  />
                </form>
              </ModalBody>
              <ModalFooter style={{ backgroundColor: '#f2f2f2', borderRadius: '0 0 10px 10px', padding: '15px 30px' }}>
                <Button auto onPress={handleSubmit} style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '8px', padding: '10px 20px' }}>הוסף אירוע</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        timezone="Asia/Jerusalem"
        locale="he"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />
    </div>
  );
};

export default Calendar;
