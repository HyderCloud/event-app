import React, {useEffect, useState} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";
import { Swiper, SwiperSlide  } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'
import { Navigation, Pagination, Virtual  } from 'swiper/modules';
import 'swiper/css/virtual';
const EventConnection = ({data, store}) => {
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
              <Card className="glass-background" style={{ width: '340px' }}>
                <CardHeader className="flex gap-3">
                  <div style={{width: '60px'}}>
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
                    <p className="text-md " style={{fontWeight:'700', color: 'white'}}>{item?.name}</p>
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
                  <div style={{height: '250px', cursor: 'pointer', background: `url(${item?.tubnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'}} onClick={()=>{
                    router.push(`/${item?.name}/${item?.origin}`) }}
                    alt="Woman listing to music"
                    className="object-cover"

                  ></div>

                <Divider />
                <div style={{paddingLeft: '80px'}}>
                <CardFooter className="glass-background text-right justify-end  items-center border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large w-full  shadow-small z-10"  style={{bottom: '20px'}}>
              <Button onClick={()=>{
                    router.push(`/${item?.name}/${item?._id}`) }} className="text-tiny text-white "  color="primary" radius="lg" size="sm">
                explore
              </Button>
              <div className='w-10'></div>
              <div  className="text-right text-tiny w-full text-black">כותרת הפרומו</div>
      </CardFooter>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
};

export default EventConnection;