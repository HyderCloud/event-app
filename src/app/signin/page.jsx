
import Sginin from "@/components/landing/sginin/Sginin"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const page = async () => {
    const cookieStore = cookies()
    const user = cookieStore.get('user')

    const session = await auth()
    if(!session){
      return (<Sginin/>)
    }else{
      return redirect(`/dashbord/${user?.value}`)
    }
}

export default page