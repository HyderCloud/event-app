
"use client"
import React,{ createContext, useState, useRef, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Input } from '@nextui-org/react';
const center = {
    lat: 32.0853, // Initial center of the map (Tel Aviv)
    lng: 34.7818, 
  };
  const containerStyle = {
    width: '100%',
    height: '250px',
  };
const SearchingCraftingTableMap = () => {
    const [markerPosition, setMarkerPosition] = useState(center);
    const [address, setAddress] = useState('');


      return (
  
        <div className='w-full h-full'>
       <LoadScript googleMapsApiKey={process.env.MAP_API} libraries={['places']}>
       <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={12}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
          }}
        >
          {/* Marker for the selected address */}
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>
    </LoadScript>
        </div>
      
      );
}

export default SearchingCraftingTableMap