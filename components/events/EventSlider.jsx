import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button, AvatarGroup, Avatar } from "@nextui-org/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import 'swiper/css/virtual';
import axios from 'axios';

const EventSlider = ({ data, store }) => {
  const router = useRouter()
  const [team, setTeam] = useState([])
  const getEvents = async () => {
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${data[0]?._id}`)
    setTeam(getAllEvents.data?.team)
    console.log("🚀 ~ getEvents ~ getAllEvents.data?.team:", getAllEvents.data?.team)
  }
 useEffect(()=>{
  if(data?.length > 0){
    getEvents()
  }
 },[data])
  return (
    <div className='w-full' style={{ marginTop: "60px", width: "1000px", height: "210px" }}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Virtual]}
        virtual
      >
        {data && data.map((item, index) => (

          <SwiperSlide key={index}>
            <div className='card-event flex flex-col gap-1'>
              <div className='flex flex-row w-full justify-between '>
                <div style={{ fontSize: "32px", fontWeight: "bold" }}>{item?.name}</div>
                <div style={{ width: "70px", height: "70px", background: "black", borderRadius: '6px' }}>

                </div>
              </div>
              <div className='w-full'>
                <Button className='view-button-yellow' radius='full'>
                  <div className='flex flex-row items-center gap-2'>
                    <div>
                      <svg width="24" height="24" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.94264 9.17431C1.65942 8.76938 1.65942 8.23062 1.94264 7.82569C2.83925 6.5563 5.04686 3.94 8.00003 3.94C10.9532 3.94 13.1608 6.5563 14.0574 7.82569C14.3407 8.23062 14.3407 8.76938 14.0574 9.17431C13.1608 10.4437 10.9532 13.06 8.00003 13.06C5.04686 13.06 2.83925 10.4437 1.94264 9.17431Z" stroke="#FBBC05" stroke-width="1.368" stroke-miterlimit="10" stroke-linecap="round" />
                        <path d="M7.99997 10.78C9.25918 10.78 10.28 9.75921 10.28 8.5C10.28 7.24079 9.25918 6.22 7.99997 6.22C6.74076 6.22 5.71997 7.24079 5.71997 8.5C5.71997 9.75921 6.74076 10.78 7.99997 10.78Z" stroke="#FBBC05" stroke-width="1.368" stroke-miterlimit="10" stroke-linecap="square" />
                      </svg>
                    </div>
                    <div style={{ color: "#FBBC05" }}>
                      הסתכל
                    </div>

                  </div>
                </Button>
              </div>
              <div className='w-full h-full items-end flex flex-row justify-between' style={{paddingLeft: "20px"}}>
                <div className='flex flex-row gap-4' >
                  <div>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.74 3.89999L4.26004 3.89999C3.30974 3.89999 2.54004 4.66969 2.54004 5.61999L2.54004 15.08C2.54004 16.0303 3.30974 16.8 4.26004 16.8H8.56004L12 21.1L15.44 16.8H19.74C20.6903 16.8 21.46 16.0303 21.46 15.08L21.46 5.61999C21.46 4.66969 20.6903 3.89999 19.74 3.89999Z" stroke="#9095A1" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="round" />
                      <path d="M7.69995 8.20999L16.3 8.20999" stroke="#9095A1" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="square" />
                      <path d="M7.70996 12.5L12.87 12.5" stroke="#9095A1" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="square" />
                    </svg>
                  </div>
                  <div>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.16 5.61999L17.16 16.37C17.16 19.466 14.666 21.96 11.57 21.96C8.47398 21.96 5.97998 19.466 5.97998 16.37L5.97998 6.90999C5.97998 4.75999 7.69998 3.03999 9.84998 3.03999C12 3.03999 13.72 4.75999 13.72 6.90999L13.72 15.51C13.72 16.714 12.774 17.66 11.57 17.66C10.366 17.66 9.41998 16.714 9.41998 15.51L9.41998 8.19999" stroke="#9095A1" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="round" />
                    </svg>
                  </div>
                </div>
                <div>
                  <AvatarGroup max={3}>
                    {team?.map((item,index)=>{
                      return(
                        <Avatar src={`${item?.pr_image}`}/>
                      )
                    })}
                  </AvatarGroup>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;