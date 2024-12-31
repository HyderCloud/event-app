"use server"
import { cookies } from "next/headers";
import StoreSlide from "./SideBar"

const StoreSlideMain = () => {
    const cookieStore = cookies();
    const typeCookie = cookieStore.get('type');
    const officeCookie = cookieStore.get('myoffice');

  return (
    <StoreSlide auth={typeCookie?.value} office={officeCookie?.value}/>
  )
}

export default StoreSlideMain
