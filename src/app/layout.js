import localFont from "next/font/local";
import '../../styles/globals.css'
import '../../styles/craftingtable.css'
import '../../styles/landing.css'
import '../../styles/navigation.css'
import '../../styles/dashboard.css'
import '../../styles/events.css'
import '../../styles/team.css'
import '../../styles/finance.css'
import '../../styles/calendar.css'
import '../../styles/payment.scss'
import {NextUIProvider} from "@nextui-org/react";
import StoreSlide from "@/components/bars/SideBar";
import { auth } from "./auth";
import NavBar from "@/components/bars/NavBar";
import StoreSlideMain from "@/components/bars/StoreSlideMain";
import AdminEventsProvider from "@/components/contexts/admin/AdminEventsProvider";

const nunito = localFont({
  src: "./fonts/Nunito-Italic-VariableFont_wght.ttf",
  variable: "--italic-nunito",
  weight: "100 900",
});
const nunito_v = localFont({
  src: "./fonts/Nunito-VariableFont_wght.ttf",
  variable: "--variable-nunito",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth()
  return (
    <html style={{overflow: 'hidden'}} lang="en">
               <head>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"
          ></script>
        </head>
      <body className={`flex justify-center  ${nunito_v.variable} ${nunito.variable}  antialiased`}>
        <AdminEventsProvider>
      <NextUIProvider className='w-full' locale="he-IL">
        <div className="flex flex-row w-full">
        {!session ?
        <div></div>:

          <StoreSlideMain/>
        }
         <div className="flex flex-col w-full items-center">
         {!session ?
        <div></div>:
        <NavBar/>}
        {children}
         </div>
    
          

        </div>
      </NextUIProvider>
        </AdminEventsProvider>
      </body>
    </html>
  );
}
