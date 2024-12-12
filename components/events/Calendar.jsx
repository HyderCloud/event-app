"use client";
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // For month view
import timeGridPlugin from '@fullcalendar/timegrid'; // For day and week views
import interactionPlugin from '@fullcalendar/interaction'; // For date click interactions
import { TimeInput, Card, CardHeader, CardBody, User, Accordion,Dropdown, DropdownItem,  AccordionItem, Link, Image, Spacer, CardFooter, Divider, DatePicker, Input, Switch, CheckboxGroup, Tooltip, Checkbox, Select, SelectItem, RadioGroup, Radio, DateRangePicker, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from '@nextui-org/react'
import '@fullcalendar/core/locales/he'; // Hebrew locale
import { parseDate } from "@internationalized/date";
import { parseTime } from "@internationalized/date";

const Calendar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [events, setEvents] = useState([]);
  
  const [editingEventId, setEditingEventId] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const parseDate2 = (dateString) => {
    const date = new Date(dateString); // Create a Date object from the string
    return date.toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
  };
  const extractTime = (dateString) => {
    const date = new Date(dateString); // Create a Date object from the string
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }); // Format time (24-hour format)
  };
  const handleDateClick = (arg) => {
    setEventStartDate(arg.dateStr)
    setEventEndDate(arg.dateStr)
    onOpen(); // Open modal on date click
  };
  const handleEventClick = (info) => {
    const event = info.event;
    setEventTitle(event.title);
    setEventStartDate(parseDate2(event.start)
    ); // Format start date
    setEventEndDate(parseDate2(event.end)); // Format end date
    setEventStartTime(extractTime(event.start)); // Format start time
    setEventEndTime(extractTime(event.end)); // Format end time
    setEventDescription(event.extendedProps.description || ''); // Set description if available
    setEditingEventId(event.id); // Set the event ID being edited
    onOpen(); // Open modal on event click
  };
  const handleSubmit = () => {
    if (eventTitle && eventStartDate && eventEndDate && eventStartTime && eventEndTime) {
      const newEvent = {
        title: eventTitle,
        start: `${eventStartDate}T${eventStartTime}`,
        end: `${eventEndDate}T${eventEndTime}`,
        description: eventDescription,
        id: editingEventId || new Date().getTime(), // Use existing ID for editing, else generate new ID
      };

      if (editingEventId) {
        console.log('hi2')
          const updatedEvents = events.map((event) =>
            parseInt(event.id) === parseInt(editingEventId) ? newEvent : event
        );
        console.log(updatedEvents)
        setEvents(updatedEvents);
      } else {
        // If adding a new event
        setEvents([...events, newEvent]);
      }

      
      onOpenChange(false);
      setEventTitle('');
      setEventStartDate(null);
      setEventEndDate(null);
      setEventStartTime('');
      setEventEndTime('');
      setEventDescription('');
      setEditingEventId(null); // Reset editingEventId
      console.log('hi')
    } else {
      alert('Please fill in all the fields');
    }
  };

  // Handle the event drop (drag and drop)


  const handleEventDrop = (info) => {
    const updatedEvents = events.map(event => {
      if (event.id === info.event.id) {
        event.start = info.event.start;
        event.end = info.event.end;
      }
      return event;
    });

    setEvents(updatedEvents);
  };
  return (
    
    <div style={{ direction: 'rtl'}}>
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
                    value={parseDate(eventStartDate)}
                    onChange={setEventStartDate}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  
                  {/* End Date */}
                  <DatePicker
                    aria-label="End Date"
                    label="תאריך סיום"
                    value={parseDate(eventEndDate)}
                    onChange={setEventEndDate}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  
                  {/* Start Time */}
                  <TimeInput
                    aria-label="Start Time"
                    label="שעת התחלה"
                    value={editingEventId ? parseTime(eventStartTime) : eventStartTime}
                    onChange={setEventStartTime}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  
                  {/* End Time */}
                  <TimeInput
                    aria-label="End Time"
                    label="שעת סיום"
                    value={editingEventId ? parseTime(eventEndTime) : eventEndTime}
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
              <Button auto onPress={handleSubmit} style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '8px', padding: '10px 20px' }}>
                  {editingEventId ? 'עדכן אירוע' : 'הוסף אירוע'}
                </Button>
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
        editable={true} // Enables drag-and-drop
        droppable={true} // Allows for drag-and-drop
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
      />
    </div>
  );
};

export default Calendar;
