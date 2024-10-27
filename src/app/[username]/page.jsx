"use server"
import { cookies } from "next/headers"
import axios from "axios"
import jwt from 'jsonwebtoken';
import Dashboard from "@/components/hafaka/Dashboard"
import Visitor from "@/components/Visitor"
import MainDash from "@/components/hafaka/MainDash";

const page = async ()=>{

    const cookieStore = cookies()
    const store = cookieStore.get('store')
    const user = cookieStore.get('user')

    if(!store){
      return(
        <Visitor/>
      )
    }else if(store.value.length > 0 && user?.value.length > 0){
            const stores = await axios.get(`http://localhost:9020/getstores/${store?.value}/${user?.value}`)
    if(stores?.data?.acknowledge){
             return(
               <MainDash/>
             )
          }
          return(
            <Visitor/>
          )
          }else{
            return(
              <Visitor/>
            )
          }
} 

export default page


