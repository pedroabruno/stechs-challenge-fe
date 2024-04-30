"use client"
import { useEffect, useState } from "react";
import {getCableModems, createCableModems, deleteCableModem, putCableModem} from "api/axios"
import { cableModemTableColumns, cableModemStatusList, cableModemTagList, CABLE_MODEM_BUTTON_TYPE, CABLE_MODEM_STATUS }  from 'constants/constants';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
    useDisclosure,
    Pagination,
    Divider, Input, DatePicker, RadioGroup, Radio , Select, SelectItem, Spinner, Code
  } from "@nextui-org/react";
import {parseZonedDateTime} from '@internationalized/date';
import { CableModem } from "api/dataTypes";
import {formatDate} from 'scripts/utils'

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
        }, 1000)
        return () => clearTimeout(response)
    }, [nameFilter, statusFilter, page])
    
    useEffect(() => {
        const response = setTimeout(() => {
            setNotification({isMessage:false, isError:false, message:''})
        }, 6000)
        return () => clearTimeout(response)
    }, [notification])

    useEffect(() => {
        getCableModems(page, {...(nameFilter && {name : nameFilter}), ...(statusFilter && {status: statusFilter})}).then(response => {setCableModems(response.data.documents); setPageLimit(1 + Math.trunc(response.data.count/10))})
    }, [notification])


    return(
        <div>
            <section className="flex">
                <div className="pr-4 bg-neutral-800 rounded-lg m-3 min-h-96">
                        <NameFilter onValueChange={setNameFilter}/>
                        <StatusFilter onValueChange={setStatusFilter}/>
                </div>
                <div>
                    <AddCableModemSection setNotification={setNotification}/>
                    <Divider className="my-4" />
                    {
                        cableModems 
                            ?  <CableModemTable cableModems={cableModems} page={page} setPage={setPage} pageLimit={pageLimit}/> 
                            : <div className="h-20"><Spinner size='lg' label="Loading..." color="secondary" className="w-10 h-10"/></div> 
                    }
                </div>
            </section>
            <section>
                {notification.isMessage && (<><Button color={notification.isError ? 'danger' : 'success'} className="capitalize">{notification.isError ? 'Error' : '✓'}</Button><Code color={notification.isError ? 'danger' : 'success'}>{notification.message}</Code></>)}
            </section>
        </div>
    )
}

function StatusFilter(props:{onValueChange:(value:string)=>void}){
    const {onValueChange} = props
    return(
        <RadioGroup label="Filter by Status" onValueChange={(value)=>{onValueChange(value)}}>
            {cableModemStatusList.map(s=>(<Radio value={s.key} key={s.key}>{s.label}</Radio>))}
        </RadioGroup>
    );
}

function NameFilter(props:{onValueChange:(value:string)=>void}){
    const {onValueChange} = props
    return(<Input variant="bordered" label="Filter by name" className="text-white" onValueChange={(value)=>{onValueChange(value)}}/>)
}

function AddCableModemSection(props:{setNotification:(data:any)=>void}){
    const {setNotification} = props
    return(
        <section>
                <div className="flex text-white font-bold">
                    <h1 className="text-2xl"> Cable Modems </h1>
                    <NewCableModemButton setNotification={setNotification}/>
                </div>
        </section>
    )
}

function CableModemTable(props:{cableModems: CableModem[],page: number, pageLimit:number, setPage:(page:number)=>void}){
    const {cableModems,page,pageLimit, setPage} = props
    return (
        <>
            <Table aria-label="Example static collection table">
                <TableHeader columns={cableModemTableColumns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={cableModems}>
                    {(item:any) => (
                        <TableRow key={item._id}>
                            {(columnKey) => columnKey === 'actions' 
                                ? (<TableCell className="text-white flex gap-4 items-center">
                                        <ActionButton displayName='edit' id={item._id} name={item.name} description={item.description} date={item.validSince} status={item.status} tags={item.tags} color='primary' onClick={(b:any)=>{putCableModem(item._id, b)}} type={CABLE_MODEM_BUTTON_TYPE.EDIT.value} />
                                        <ActionButton displayName='X' id={item._id} color='danger' onClick={()=>{deleteCableModem(item._id)}} type={CABLE_MODEM_BUTTON_TYPE.DELETE.value}/>
                                    </TableCell>) 
                                : (<TableCell className="text-white">{item[columnKey]}</TableCell>)}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination className="p-4 justify-center flex" total={pageLimit} initialPage={page}  onChange={(page)=>{setPage(page)}}/>
        </>
    )
}

function ActionButton(props:{displayName:string, id:string, color:'primary'|'danger', onClick: any, type: string, name?:string, description?:string, date?:string, status?:string, tags?:string[]}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {displayName, id, color, onClick, type, name, description, date, status, tags} = props
    return(
        <div>
            <Button size="sm" onPress={onOpen} color={color}>{displayName}</Button>
            {type === CABLE_MODEM_BUTTON_TYPE.EDIT.value 
                ? (<CableModemModal title='Editar Cable Modem' name={name} description={description} date={date} status={status} tags={tags} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onConfirm={onClick}/>) 
                : (<DeleteModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClick={onClick}/>)
            }
        </div>
    )
}

function NewCableModemButton(props:{setNotification:(data:any)=>void}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {setNotification} = props
    const onConfirm = (v:any)=>{
        createCableModems(v)
            .then(r=>{if(r.status === 201 ){setNotification({isMessage:true, isError:false, message:'New Item Added'})}else{setNotification({isMessage:true, isError:true, message:'Error Adding the item'})}})
            .catch(e => {setNotification({isMessage:true, isError:true, message:'Error Adding the item'})})
    }

    return(
        <div className="ml-auto">
            <Button size="sm" color='primary' className=" font-bold" onPress={onOpen}>&#43; nuevo Cable Modem</Button>
            <CableModemModal title='Nuevo Cable Modem' name='' description='' date='' status={CABLE_MODEM_STATUS.ACTIVE.value} tags={[]} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onConfirm={onConfirm}/>
        </div>
    )
}

function CableModemModal(props:{title:string, name?:string, description?:string, date?:string, status?:string, tags?:string[], isOpen:boolean, onOpen:()=>void, onOpenChange:()=>void, onConfirm:(data:any)=>void }){
    const {title, name, description, date, status, tags, isOpen, onOpen, onOpenChange, onConfirm} = props;
    let fechaTest = parseZonedDateTime('2022-11-07T00:45[America/Los_Angeles]');
    const[nameSelected, setNameSelected] = useState(name ?? '')
    const[descriptionSelected, setDescriptionSelected] = useState(description)
    const[dateSelected, setDateSelected] = useState(fechaTest)
    const[statusSelected, setStatusSelected] = useState(status ?? 'Available')
    const[tagsSelected, setTagsSelected] = useState(tags ?? [])
    const cableModem = {name : nameSelected, description: descriptionSelected, validSince: dateSelected.toAbsoluteString(), status: statusSelected, tags: tagsSelected}
    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                <div>
                    <ModalHeader className="flex flex-col gap-1 text-white">{title}</ModalHeader>
                        <ModalBody>
                            <Input variant="bordered" label="Name" className="text-white" value={nameSelected} isRequired onValueChange={(n)=>setNameSelected(n)}/>
                            <Input variant="bordered" label="Description" className="text-white" value={descriptionSelected} onValueChange={(d)=>setDescriptionSelected(d)}/>
                            <DatePicker variant="bordered" label="Valid Since" className="text-white" value={dateSelected} onChange={(d)=>setDateSelected(d)} />
                            <Select variant="bordered" label="Tags" placeholder="Select tags" selectionMode="multiple" className="text-white" selectedKeys={tagsSelected} onSelectionChange={(keys)=>{const tagElementList = Array.from(keys); setTagsSelected(tagElementList.map(t=>t.toString()))}}>
                                {cableModemTagList.map((tag) => (
                                    <SelectItem key={tag.value} value={tag.value} className="text-white">
                                        {tag.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <RadioGroup className="text-red" label="Status" orientation="horizontal" value={statusSelected} onValueChange={(value)=>{setStatusSelected(value)}}>
                                {cableModemStatusList.map(s=>(<Radio key={s.key} value={s.key} className="text-red">{s.label}</Radio>))}
                            </RadioGroup>
                        </ModalBody>
                    <ModalFooter>
                    <Button color="default" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button color='success' onPress={()=> {
                            onConfirm(cableModem);
                            onClose()}}>
                        Aceptar
                    </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    )
}

function DeleteModal(props:{isOpen:boolean, onOpen:()=>void, onOpenChange:()=>void, onClick:()=>void}){
    const {isOpen, onOpenChange, onClick} = props;
    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">Delete Item</ModalHeader>
              <ModalBody className="text-white">
                  Are you sure that you want to delete the item ?
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={()=>{onClick();onClose()}}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}