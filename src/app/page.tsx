"use client"
import {Image} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";
import landingPagePhoto from "src/resources/images/landingPageWall.jpg";
export default function Home() {
  return (
    <NextUIProvider>
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="z-10 w-full max-w-5xl items-center font-mono text-sm text-white m-a">
                <div className="m-3 align-middle flex justify-center text-6xl">Welcome to Cable-Modem</div>
                <div className="flex justify-center"><Image isBlurred={true} src={landingPagePhoto.src} alt="NextUI Album Cover" width='600px' /></div>
            </div>
        </main>
    </NextUIProvider>
  );
}
