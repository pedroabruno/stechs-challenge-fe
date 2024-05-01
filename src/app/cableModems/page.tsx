"use client"
import { useEffect, useState } from "react";
import {getCableModems} from "src/api/axios"
import {Button, Divider, Code, } from "@nextui-org/react";
import { NameFilter, StatusFilter } from "@/components/filter/sidePanel";
import { AddCableModemSection, CableModemSkeletonTable, CableModemTable } from "@/components/table/table";
import toast, { Toaster } from "react-hot-toast";

export default function Page(){
    const[cableModems, setCableModems] = useState([])
    const[page, setPage] = useState(1)
    const[nameFilter, setNameFilter] = useState('')
    const[statusFilter, setStatusFilter] = useState('')
    const[pageLimit, setPageLimit] = useState(1)
    const[isDataUpdated, setIsDataUpdated] = useState(true)

    useEffect(() => {
        const response = setTimeout(() => {
            getCableModems(page, {...(nameFilter && {name : nameFilter}), ...(statusFilter && {status: statusFilter})}).then(response => {setCableModems(response.data.documents); setPageLimit(1 + Math.trunc((response.data.count-1)/10) );})
        }, 200)
        setIsDataUpdated(true)
        return () => clearTimeout(response)
    }, [nameFilter, statusFilter, page, isDataUpdated])

    function notify(promise:any){
        toast.promise(
            promise,
             {
               loading: 'Loading...',
               success: <b>Sucess!</b>,
               error: <b>Error.</b>,
             }
           );
    }

    return(
        <div>
            <Toaster position="top-right" reverseOrder={false}/>
            <section className="flex">
                <div className="p-4 bg-neutral-800 rounded-lg m-3 min-h-[648px]">
                        <NameFilter onValueChange={setNameFilter} setPage={setPage}/>
                        <StatusFilter selectedValue={statusFilter} onValueChange={setStatusFilter} setPage={setPage}/>
                </div>
                <div>
                    <AddCableModemSection setIsDataUpdated={setIsDataUpdated} notify={notify}/>
                    <Divider className="my-4" />
                    {
                        cableModems.length !== 0
                            ?  <CableModemTable cableModems={cableModems} page={page} setPage={setPage} pageLimit={pageLimit} setIsDataUpdated={setIsDataUpdated} notify={notify}/> 
                            :  <CableModemSkeletonTable/>
                    }
                </div>
            </section>
        </div>
    )
}

