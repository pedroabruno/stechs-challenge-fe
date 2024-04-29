'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import logo from "../resources/images/serialCables.png";
import {Providers} from "./providers";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabs = [{name:'Home', link:'/home'},{name:'Cable Modems', link:'/cableModems'},{name:'Us', link:'/us'}]
  const path = usePathname()
  return (
    <html lang="en" className="dark">
        <body>
        <Providers>
            <div className="flex bg-gray-500 gap-0 items-center">
                <img src={logo.src} alt="logo" className="p-2 w-20 h-14" />
                <div className="flex">
                    {tabs.map(t =>  (<Tab key={t.link} name={t.name} link={t.link} selected={t.link === path}/>))}
                </div>
            </div>
            {children}
            <footer className="text-white py-10 justify-center flex ">
                Done by Pedro
            </footer>
        </Providers>
        </body>
    </html>
  );
}

function Tab(props : {name:string, link:string, selected:boolean}){
    const {name, link, selected} = props
    return(
        <div className={"px-4 " + (selected ? 'font-bold text-purple-950' : 'text-white') }>
            <a className="relative" href={link}>{name}</a>
        </div>
    )
}