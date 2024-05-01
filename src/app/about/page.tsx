import {Image} from "@nextui-org/react";
import { Suspense } from "react"
export default async function Page(){
    return(
        <div className="z-10 w-full max-w-5xl items-center font-mono text-sm text-white pt-6">
                <div className="m-3 align-middle flex justify-center text-3xl">Pedro Bruno</div>
                <div className="flex justify-center"><Image isBlurred={true} src={'https://avatars.githubusercontent.com/u/11651241?v=4'} alt="NextUI Pedro picture" width='300px' /></div>
        </div>
  )
}