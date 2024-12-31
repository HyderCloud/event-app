"use client"
import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();
const AdminEventsProvider = ({children}) => {
const [admin, setAdmin] = useState('')
  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminEventsProvider

export const useAdmin = () => {
    return useContext(AdminContext);
  };