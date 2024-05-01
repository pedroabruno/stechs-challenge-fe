'use client'
import "./globals.css";
import {Image} from "@nextui-org/react";
import logo from "src/resources/images/tpLink.png";
import {tabs} from "src/constants/constants"
import {Providers} from "./providers";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname()
  return (
    <html lang="en" className="dark">
        <body>
        <Providers>
            <div className="flex bg-gray-500/5 gap-0 items-center">
                <Link className="relative" href={'/'}><Image src={logo.src} alt="logo" className="p-2 w-20 h-14" /></Link>
                <div className="flex m-auto">
                    {tabs.map(t =>  (<Tab key={t.link} name={t.name} link={t.link} selected={t.link === path}/>))}
                </div>
            </div>
            {children}
        </Providers>
        </body>
    </html>
  );
}

function Tab(props : {name:string, link:string, selected:boolean}){
    const {name, link, selected} = props
    return(
        <div className={"px-4 text-white " + (selected && 'font-bold') }>
            <Link className="relative" href={link}>{name}</Link>
        </div>
    )
}