"use client"
import Image from "next/image";
import {NextUIProvider} from "@nextui-org/react";
export default function Home() {
  return (
    <NextUIProvider>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex text-white">WELCOME TO SOMETHING Y UNA ANIMACION </div>
        </main>
    </NextUIProvider>
  );
}
