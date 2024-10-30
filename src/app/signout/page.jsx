"use server"
import { signOut } from '@/src/app/auth';
import Sginout from "@/components/Sginout"
import { cookies } from 'next/headers';
const page = () => {
  return (
        <Sginout form={<form className='w-full flex items-center justify-center' action={async () => {
    "use server"
    cookies().delete('user')
    cookies().delete('store')
    await signOut({redirectTo: '/signin',redirect: true})
   
 }}>
            <button className='popup-button'>התנתקות</button>
        </form>}/>
  )
}

export default page