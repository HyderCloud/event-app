import {HeaderLanding} from "@/components/landing/HeaderLanding";
import NavBar from "../../components/landing/NavBar";

export default function Home() {
  return (
   <main className="flex min-h-screen flex-col  items-center w-full " style={{backgroundColor: "#ECEDEE"}}>
    <NavBar/>
    <HeaderLanding/>
   </main>
  );
}
