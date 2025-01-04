"use client"
import React, { Children, createContext, useContext, useState } from 'react';
 
const EventsNameContext = createContext();
const EventsContextProvider = ({children}) => {
    const [names, setNames] = useState([])
  return (
    <EventsNameContext.Provider value={{ names, setNames }}>
           {children}
    </EventsNameContext.Provider>
  )
}

export default EventsContextProvider

export const useEventName = () => {
    return useContext(EventsNameContext);
  };