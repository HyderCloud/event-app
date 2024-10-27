"use server"
import { signOut } from '@/src/app/auth';
import Sginout from "@/components/Sginout"
import { Cookies } from 'react-cookie';
import { cookies } from 'next/headers';
const page = () => {
  return (
    <div>
        <Sginout form={<form className='w-full flex items-center justify-center' action={async () => {
    "use server"
    cookies().delete('user')
    await signOut({redirectTo: '/signin'})
   
 }}>
            <button className='popup-button'>התנתקות</button>
        </form>}/>
    </div>
  )
}

export default page