"use client"
import React, {useEffect, useState} from "react";
import { useJwt } from "react-jwt";
import axios from 'axios';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import UsernameSection from "@/components/landing/sginin/UsernameSection";
import ProfessionSection from "@/components/landing/sginin/ProfessionSection";
import ProductSection from "@/components/landing/sginin/ProductSection";
import StoreSection from "@/components/landing/sginin/StoreSection";
import { useCookies } from "react-cookie";

const page =  () => {
    const router = useRouter()
    const [cookie, setCookie, removeCookie]= useCookies("store")
    const pathName = usePathname()
    const [events, setEvents] = useState([])
    const searchParams = useSearchParams();
    const [ data, setData] = useState(null)
    const [username, setUsername] = useState('')
    const [profession, setProfessoion] = useState('')
    const { decodedToken, isExpired } = useJwt(pathName.slice(10));
    const {decodedToken2, isExpired2} = useJwt(cookie.store)
    const usernameParam = searchParams.get('username')
    const professionParam = searchParams.get('professional')

    const handleProfession = (data)=>{
      setProfessoion(data)
    }

    const handleUsername = (data)=>{
        setUsername(data)
    }

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:9020/getuser/${decodedToken.email}`);
          setData(response.data); // Set fetched data in the state
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    useEffect(() => {

        if (1===1) { // Ensure token is available and not expired

          fetchData();
        }
      }, [decodedToken ]);
    
    if (cookie.store){
      console.log(cookie)
      router.push('/home')
    } else
    if ( usernameParam === null&& professionParam === null){
        return (<UsernameSection  onUsername={handleUsername} />)
    }
    else if( usernameParam === 'access' && professionParam === null){
        return(<ProfessionSection  onProfession={handleProfession}/>)
    }
    else if ( professionParam === 'access'){
        return(<StoreSection id={decodedToken?.user_id} email={decodedToken?.email} username={username} profession={profession}/>)
    }
    else{
        return (<div>hello</div>)
    }
}

export default page