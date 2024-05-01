"use client"
import { useEffect, useState } from "react";
import {getCableModems} from "src/api/axios"
import {Button, Divider, Code, } from "@nextui-org/react";
import { NameFilter, StatusFilter } from "@/components/filter/sidePanel";
import { AddCableModemSection, CableModemSkeletonTable, CableModemTable } from "@/components/table/table";

export default function Page(){
    const[cableModems, setCableModems] = useState([])
    const[page, setPage] = useState(1)
    const[nameFilter, setNameFilter] = useState('')
    const[statusFilter, setStatusFilter] = useState('')
    const[pageLimit, setPageLimit] = useState(1)
    const[notification, setNotification] = useState({isMessage:false, isError:false, message:''})

    useEffect(() => {
        const response = setTimeout(() => {
            getCableModems(page, {...(nameFilter && {name : nameFilter}), ...(statusFilter && {status: statusFilter})}).then(response => {setCableModems(response.data.documents); setPageLimit(1 + Math.trunc(response.data.count/10))})
        }, 300)
        return () => clearTimeout(response)
    }, [nameFilter, statusFilter, page, notification])
    
    useEffect(() => {
        if(notification.isMessage){
            const response = setTimeout(() => {
                setNotification({isMessage:false, isError:false, message:''})
            }, 6000)
            return () => clearTimeout(response)
        }
    }, [notification])

    return(
        <div>
            <section className="flex">
                <div className="p-4 bg-neutral-800 rounded-lg m-3 min-h-[648px]">
                        <NameFilter onValueChange={setNameFilter}/>
                        <StatusFilter selectedValue={statusFilter} onValueChange={setStatusFilter}/>
                </div>
                <div>
                    <AddCableModemSection setNotification={setNotification}/>
                    <Divider className="my-4" />
                    {
                        cableModems.length !== 0
                            ?  <CableModemTable cableModems={cableModems} page={page} setPage={setPage} pageLimit={pageLimit}/> 
                            :  <CableModemSkeletonTable/>
                    }
                </div>
            </section>
            <section>
                {notification.isMessage && (<><Button color={notification.isError ? 'danger' : 'success'} className="capitalize">{notification.isError ? 'Error' : '✓'}</Button><Code color={notification.isError ? 'danger' : 'success'}>{notification.message}</Code></>)}
            </section>
        </div>
    )
}

