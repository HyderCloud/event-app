"use client"
import React, { createContext, useContext, useState } from 'react';
 
const EventsSwitcherContext = createContext();
const EventsSwitcher = ({children}) => {
    const [switchEvents,setSwitchEvent ] = useState([])
  return (
    <EventsSwitcherContext.Provider value={{ switchEvents, setSwitchEvent }}>
        {children}
    </EventsSwitcherContext.Provider>
  )
}

export default EventsSwitcher

export const useEventSwich = () => {
    return useContext(EventsSwitcherContext);
  };