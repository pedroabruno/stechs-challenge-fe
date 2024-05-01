import { putCableModem, deleteCableModem, createCableModems } from "@/api/axios";
import { CableModem } from "@/api/dataTypes";
import { cableModemTableColumns, CABLE_MODEM_BUTTON_TYPE } from "@/constants/constants";
import { getStatusColor, formatDate } from "@/scripts/utils";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { Chip, Pagination, Spinner } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { useEffect, useState } from "react";
import { DeleteItemModal, DetailedItemModal, EditItemModal } from "src/components/table/modals";
import { ActionButton, CreateItemButton } from  "src/components/table/buttons";
import toast, { Toaster } from 'react-hot-toast';

export function CableModemTable(props:{cableModems: CableModem[],page: number, pageLimit:number, setPage:(page:number)=>void, setIsDataUpdated:(page:boolean)=>void, notify:(promise:any)=>void}){
    const {cableModems,page,pageLimit, setPage, setIsDataUpdated, notify} = props
    const [selectedItem, setSelectedItem] = useState<CableModem>({_id: 'defaultId',name: 'Name'});
    const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false)
    const [isDetailedItemModalOpen, setIsDetailedItemModalOpen] = useState(false)
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false)
    return (
        <div className="min-w-[768px] max-w-[768px]">

            {isDetailedItemModalOpen && <DetailedItemModal isModalOpen={isDetailedItemModalOpen} onOpenChange={()=>{setIsDetailedItemModalOpen(v=>!v)}} onConfirm={()=>{notify(deleteCableModem(selectedItem._id));setIsDataUpdated(false); setPage(1)}} cableModem={selectedItem}  />}
            {isDeleteItemModalOpen && <DeleteItemModal isModalOpen={isDeleteItemModalOpen} onOpenChange={()=>{setIsDeleteItemModalOpen(v=>!v)}} onConfirm={()=>{notify(deleteCableModem(selectedItem._id));setIsDataUpdated(false); setPage(1)}}/> }
            {isEditItemModalOpen && <EditItemModal isModalOpen={isEditItemModalOpen} onOpenChange={()=>{setIsEditItemModalOpen(v=>!v)}} cableModem={selectedItem} onEdit={(id, value)=>{notify(putCableModem(id,value));setIsDataUpdated(false)}} mode="edit"/>}

            <Table isStriped aria-label="" selectionMode="single" >
                <TableHeader columns={cableModemTableColumns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={cableModems}>
                    {(item:any) => (
                        <TableRow key={item._id} onClick={(e)=> { setSelectedItem(item);setIsDetailedItemModalOpen(v=>!v) }}>
                            {(columnKey) => columnKey === 'actions' 
                                ? (<TableCell className="text-white flex gap-4 items-center">
                                        <ActionButton displayName='edit' color='primary' onClick={()=>{setSelectedItem(item);setIsEditItemModalOpen(v=>!v)}} />
                                        <ActionButton displayName='X' color='danger' onClick={()=>{setSelectedItem(item);setIsDeleteItemModalOpen(v=>!v)}} />
                                    </TableCell>) 
                                : columnKey === 'status' 
                                    ? (<TableCell className="text-white"><Chip variant="faded" color={getStatusColor(item[columnKey])}>{item[columnKey]}</Chip></TableCell>)
                                    : (<TableCell className="text-white">{columnKey === 'validSince' ? formatDate(parseAbsoluteToLocal(item[columnKey])) : item[columnKey]}</TableCell>)
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination className="p-4 justify-center flex" total={pageLimit} initialPage={page}  onChange={(page)=>{setPage(page)}} page={page}/>
        </div>
    )
}

export function AddCableModemSection(props:{setIsDataUpdated:(data:any)=>void}){
    const {setIsDataUpdated} = props
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false)
    return(
        <section>
                {isEditItemModalOpen && <EditItemModal isModalOpen={isEditItemModalOpen} onOpenChange={()=>{setIsEditItemModalOpen(v=>!v)}} onCreate={(v)=>{createCableModems(v);setIsDataUpdated(false)}} mode='create'/>}
                <div className="flex text-white font-bold">
                    <h1 className="text-2xl"> Cable Modems </h1>
                    <CreateItemButton onClick={()=>{setIsEditItemModalOpen(v=>!v)}}/>
                </div>
        </section>
    )
}

export function CableModemSkeletonTable(){
    return (
        <div className="min-w-[768px]">
            <Table aria-label="Example empty table">
            <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>Valid Since</TableColumn>
            <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'No items ...'}>{[]}</TableBody>
            </Table>
        </div>
    )
}