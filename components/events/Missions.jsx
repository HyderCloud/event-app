import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
const Missions = ({admin}) => {

  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [items, setItems] = useState([
    { id: 1, x: 50, y: 50, width: 100, height: 100, color: 'red' },
  ]);
  const [isPanning, setIsPanning] = useState(false);
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });
  const [isMode, setIsMode] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setContext(canvas.getContext('2d'));
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
  
    const handleMouseDown = (e) => {
      const x = (e.clientX - offset.x) / scale;
      const y = (e.clientY - offset.y) / scale;
  
      // Check if an item is clicked
      const item = items.find(
        (item) => x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height
      );
  
      if (item && isMode) {
        // Start dragging the specific item only if isMode is true
        setSelectedItem(item);
        setIsDraggingItem(true);
        setStartDragOffset({ x: e.clientX - item.x * scale, y: e.clientY - item.y * scale });
      } else if (!item && isMode) {
        // Start panning the entire canvas
        setIsPanning(true);
        setStartDragOffset({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      }
    };
  
    const handleMouseMove = (e) => {
      if (isMode) {
        if (isDraggingItem && selectedItem) {
          // Update position of only the selected item based on the initial drag offset
          const dx = (e.clientX - startDragOffset.x) / scale;
          const dy = (e.clientY - startDragOffset.y) / scale;
  
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === selectedItem.id ? { ...item, x: dx, y: dy } : item
            )
          );
        } else if (isPanning) {
          // Update canvas offset for panning
          setOffset({
            x: e.clientX - startDragOffset.x,
            y: e.clientY - startDragOffset.y,
          });
        }
      }
    };
  
    const handleMouseUp = () => {
      setIsPanning(false);
      setIsDraggingItem(false);
      setSelectedItem(null);
    };
  
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.ctrlKey) {
        // Only apply zoom if the Ctrl key is held
        const zoomFactor = 0.1;
        setScale((prevScale) => (e.deltaY > 0 ? Math.max(prevScale - zoomFactor, 0.1) : prevScale + zoomFactor));
      }
    };
  
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);
  
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [isDraggingItem, isPanning, offset, scale, selectedItem, items, startDragOffset, isMode]);
  
  const draw = () => {
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.save();
      context.translate(offset.x, offset.y);
      context.scale(scale, scale);
  
      items.forEach((item) => {
        context.fillStyle = item.color;
        context.fillRect(item.x, item.y, item.width, item.height);
      });
  
      context.restore();
    }
  };
  
  useEffect(() => {
    draw();
  }, [context, offset, scale, items]);
  
  
    return (
        <div style={{height: '900px'}}>
        <div className='flex justify-center items-center' style={{ position: 'relative', width: '100%', height: '80vh' }}>
      {/* Canvas element */}
      <canvas
        className="w-full h-full"
        ref={canvasRef}
        style={{
          backgroundColor: '#18181B',
          borderRadius: '15px',
          border: '1px solid white',
          cursor: (isPanning || isDraggingItem && isMode)? 'grabbing' : 'default',
        }}
      />
      
      <div
        className="absolute w-full flex justify-end items-center px-4"
        style={{
          height: '70px',
          top: '0',
          left: '0',
          color: 'white',
          zIndex: 1, // Ensure it's above the canvas
        }}
      >
        <Button
        color='primary'
          style={{
            color: 'white',

          }}
        >
          הוסף משימה
        </Button>
      </div>
      <div     className="absolute justify-center flex  items-center  "
        style={{
            width: '30%',
          height: '40px',
          bottom: '40px',
          color: 'white',
          zIndex: 1, // Ensure it's above the canvas
        }}>
            <div className='w-full flex flex-row shadow-examp' style={{borderRadius: '25px', height: '45px', backgroundColor: 'black'}}>
            
                <Button className='h-full glass-background' color='none' radius='none' isIconOnly onPress={()=>{setIsMode(!isMode)}}
                 style={{width: '70px', borderBottomLeftRadius: '25px',borderTopLeftRadius: '25px', borderRight: '1px solid white'}}>
                {isMode ?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55463 20.3261L3.01942 12.9463C3.02823 12.9903 3.03999 13.0337 3.05463 13.0761L5.55463 20.3261ZM2 7.64419L2.04018 8.05008C2.01346 7.91645 2 7.78049 2 7.64419Z" fill="#4285F4"/>
              <path d="M19.0026 20.6586C19.0491 20.6055 19.0898 20.5475 19.1242 20.4858L21.0078 17.0952C21.5465 16.1255 21.6099 14.9263 21.0723 13.8999C20.814 13.4067 20.4866 12.8171 20.1556 12.3218C19.991 12.0756 19.8102 11.8294 19.6228 11.6239C19.4646 11.4505 19.1882 11.1754 18.8163 11.0515C18.5979 10.9787 18.4031 10.7916 18.2381 10.495C18.1039 10.2535 18.031 10.0116 18 9.88995V3.5796C18 2.94334 17.7472 2.33317 17.2974 1.88329C16.601 1.18697 15.4925 1.12556 14.7235 1.74072L14.6203 1.82329C14.0929 2.24521 13.7587 2.86261 13.6936 3.53464L13.5644 4.8695L13.3294 3.41207C13.2306 2.79946 12.9075 2.24547 12.423 1.8579L12.2527 1.72171C11.4973 1.11737 10.4082 1.1777 9.72416 1.86174C9.24676 2.33921 8.99786 2.99922 9.04132 3.67314L9.14048 5.21005L8.82364 4.29471C8.67453 3.86394 8.39998 3.48765 8.03541 3.21419L7.96886 3.16427C7.1853 2.57661 6.07358 2.73533 5.48589 3.51893C5.14494 3.97362 4.99677 4.54449 5.07376 5.1077L5.34893 7.11985L5.24748 6.90003C5.20587 6.80991 5.15761 6.72269 5.1031 6.63935C4.18411 5.23427 2 5.88467 2 7.56374V7.64419L2.04018 8.05008L3.01942 12.9463L5.55463 20.3261C5.56893 20.3676 5.58596 20.4081 5.60559 20.4474C5.91718 21.0705 6.652 21.7001 7.72628 22.1672C8.83437 22.649 10.3916 23.0001 12.5 23.0001C14.6744 23.0001 16.2726 22.4548 17.3456 21.8825C17.8795 21.5977 18.2787 21.3089 18.5516 21.083L18.8678 20.7994L19.0026 20.6586Z" fill="#4285F4"/>
              </svg>  
              :
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75 4.42C8.16196 4.41461 8.49461 4.08196 8.5 3.67V0.75C8.5 0.335786 8.16421 0 7.75 0C7.33579 0 7 0.335786 7 0.75V3.67C7 4.08421 7.33579 4.42 7.75 4.42Z" fill="#4285F4"/>
<path d="M2.46838 2.42838C2.75399 2.14277 3.21449 2.13464 3.51 2.41L5.61 4.47C5.75295 4.60929 5.83357 4.80041 5.83357 5C5.83357 5.19959 5.75295 5.39071 5.61 5.53C5.47077 5.67261 5.27929 5.75209 5.08 5.75C4.86718 5.76219 4.65945 5.68201 4.51 5.53L2.45 3.47C2.17464 3.17449 2.18277 2.71399 2.46838 2.42838Z" fill="#4285F4"/>
<path d="M9.33 7.16L18.48 10.06C19.1282 10.2547 19.6019 10.8115 19.6904 11.4825C19.7788 12.1534 19.4656 12.8139 18.89 13.17L15.69 15.17C15.4834 15.3066 15.3066 15.4834 15.17 15.69L13.17 18.89C12.8039 19.4518 12.1447 19.7496 11.4811 19.6529C10.8176 19.5563 10.2707 19.0829 10.08 18.44L7.21 9.28C7.01252 8.67809 7.17041 8.01628 7.61834 7.56835C8.06628 7.12041 8.72809 6.96252 9.33 7.16Z" fill="#4285F4"/>
<path d="M11.08 4.16C10.9346 4.29951 10.7415 4.37821 10.54 4.38C10.3358 4.36719 10.1451 4.27364 10.01 4.12C9.86705 3.98071 9.78643 3.78959 9.78643 3.59C9.78643 3.39041 9.86705 3.19929 10.01 3.06L12.08 1.06C12.2107 0.911927 12.3953 0.822275 12.5925 0.811006C12.7897 0.799737 12.9832 0.867785 13.13 1C13.4225 1.29282 13.4225 1.76718 13.13 2.06L11.08 4.16Z" fill="#4285F4"/>
<path d="M3.14 9.97L1.08 12.06C0.820702 12.3429 0.820702 12.7771 1.08 13.06C1.22052 13.2007 1.41115 13.2798 1.61 13.28C1.808 13.2757 1.99715 13.1972 2.14 13.06L4.2 11.06C4.49245 10.7672 4.49245 10.2928 4.2 10C4.0648 9.85304 3.87594 9.76695 3.67633 9.7613C3.47672 9.75565 3.28329 9.83092 3.14 9.97Z" fill="#4285F4"/>
<path d="M0.75 7H3.67C4.08421 7 4.42 7.33579 4.42 7.75C4.42 8.16421 4.08421 8.5 3.67 8.5H0.75C0.335786 8.5 0 8.16421 0 7.75C0 7.33579 0.335786 7 0.75 7Z" fill="#4285F4"/>
                </svg>
              }
                </Button>
                <Button className='h-full glass-background' color='none' radius='none' isIconOnly  style={{width: '70px', borderRight: '1px solid white'}}>

                </Button>
            </div>
      </div>
    </div>
        </div>
    );
  };
  


export default Missions