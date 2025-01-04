"use client"
import React,{ createContext } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const CraftMap = () => {
    const containerStyle = {
        width: '100%',
        height: '400px',
      };
      
      const center = {
        lat: 32.0853, // Latitude of Tel Aviv (or any desired location)
        lng: 34.7818, // Longitude of Tel Aviv
      };
      
      // עיצוב המפה להסתיר עסקים ומרכיבים אחרים
      const mapStyles = [
        {
          featureType: "poi.business", // זה מכסה את העסקים
          stylers: [
            {
              visibility: "off" // מחבא את העסקים
            }
          ]
        },
        {
          featureType: "poi", // זה כולל את כל נקודות העניין
          stylers: [
            {
              visibility: "off" // מחבא את כל נקודות העניין
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#f1f1f1", // צבע כללי לנופים
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff", // צבע כללי לכבישים
            },
            {
              lightness: 50,
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff", // צבע כללי למים
            }
          ]
        }
      ];
    
      return (
        <div className='dashboard-container'>
        <div className='w-full h-full'>
        <LoadScript googleMapsApiKey={process.env.MAP_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{
          styles: mapStyles, // הוספת העיצוב למפה
        }}
      >
        {/* אין Markers או עסקים מוצגים */}
      </GoogleMap>
    </LoadScript>
        </div>
        </div>
      );
    };

export default CraftMap