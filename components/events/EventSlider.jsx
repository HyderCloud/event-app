import React, {useEffect, useState} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { Swiper, SwiperSlide  } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'
import { Navigation, Pagination, Virtual  } from 'swiper/modules';
import 'swiper/css/virtual';
const EventSlider = ({data, store}) => {
const router = useRouter()

  return (
    <div style={{width: '1080px'}}>
        <Swiper
          
          slidesPerView={3}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[ Pagination, Virtual]}
          virtual
        >
        
          {data && data.map((item, index) => (
     
            <SwiperSlide key={index}>
              <Card className="" style={{ width: '340px' }}>
                <CardHeader className="flex gap-3">
                  <div style={{width: '60px'}}>
                    { console.log(item.key)}
                    { console.log(store)}
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={store.profile_img}
                    style={{backgroundSize: 'cover',
                      backgroundPosition: 'center'}}
                    width={40}
                  />
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-md " style={{fontWeight:'700'}}>{item?.name}</p>
                    <div>
                    <Link href={`/${store?.name}`} className="text-small inline-block"  style={{color:'#006FEE'}}>@{store?.name}</Link>
                    </div>
                  </div>
                  <div className='flex flex-row'>

                    <div>{item?.status === 'in progress' ? 
                      <div style={{width: '10px', height: '10px', borderRadius: '100px', backgroundColor: '#F5A524'}}></div>:
                  item?.status === 'active'  ? <div style={{width: '10px', height: '10px', borderRadius: '100px', backgroundColor: '#17C964'}}></div>:
                   <div></div>
                  }</div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody style={{height: '250px', cursor: 'pointer'}}>
                  <div onClick={()=>{
                    router.push(`/${item?.name}/${item?._id}`)
                  }} className='h-full w-full'>

                  </div>
                </CardBody>
                <Divider />
                <CardFooter>
                  
                </CardFooter>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
};

export default EventSlider;
