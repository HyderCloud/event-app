"use client"
import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";
import axios from "axios";
import StoreForm from "@/components/landing/sginin/StoreForm";

const page = () => {
    const [cookie, setCookie, removeCookie] = useCookies('')
    const [data, setData] = useState(null)
    const { decodedToken, isExpire } = useJwt(cookie.user)
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:9020/getuser/${decodedToken?.email}`);
            setData(response.data);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }

    };
    useEffect(() => {
        if (decodedToken) {
            fetchData()
        }
    }, [decodedToken])

    return (
        <div>
<StoreForm/>
        </div>
    )
}

export default page