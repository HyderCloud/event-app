import localFont from "next/font/local";
import '../../styles/globals.css'
import '../../styles/landing.css'
import '../../styles/navigation.css'
import '../../styles/dashboard.css'
import '../../styles/events.css'
import '../../styles/team.css'
import '../../styles/finance.css'
import {NextUIProvider} from "@nextui-org/react";
import StoreSlide from "@/components/slidebar/StoreSlide";
import { auth } from "./auth";
import NavBar from "@/components/slidebar/NavBar";

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
    <html lang="en">
               <head>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"
          ></script>
        </head>
      <body className={`flex justify-center  ${nunito_v.variable} ${nunito.variable}  antialiased`}>
      <NextUIProvider className='w-full'>
        <div className="flex flex-row w-full">
        {!session ?
        <div></div>:

        <StoreSlide>
        </StoreSlide>
        }
         <div className="flex flex-col w-full items-center">
         {!session ?
        <div></div>:
        <NavBar/>}
        {children}
         </div>
    
          

        </div>
      </NextUIProvider>
      </body>
    </html>
  );
}
