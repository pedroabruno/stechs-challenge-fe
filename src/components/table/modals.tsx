import { CableModem } from "@/api/dataTypes";
import {parseZonedDateTime, parseAbsoluteToLocal} from '@internationalized/date';
import {getStatusColor} from 'src/scripts/utils'
import {cableModemStatusList, cableModemTagList }  from 'src/constants/constants';
import { getCableModemById, createCableModems } from "@/api/axios";

import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
    Input, DatePicker, RadioGroup, Radio , Select, SelectItem, Spinner, Code, Chip, Image
  } from "@nextui-org/react";
import routerHardCoded from "src/resources/images/router.png";
import { useEffect, useState } from "react";

export function DetailedItemModal(props:{cableModem:CableModem, isModalOpen:boolean, onOpenChange:()=>void, onConfirm:()=>void}){
    const {cableModem, isModalOpen, onOpenChange, onConfirm} = props;

    //Obtengo la data del BE solamente por el challenge, sin embargo no la estoy usando ya que en cableModem tengo todo lo que necesito
    const [cableModemDetailed, setCableModemDetailed] = useState<CableModem>({_id: 'defaultId',name: 'defaultName'})
    useEffect(()=>{
        getCableModemById(cableModem._id).then(d => {setCableModemDetailed(d.data)})
    },[])

    return(
        <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
                <ModalHeader className="flex flex-col gap-1 text-white">{cableModem.name}</ModalHeader>
                <ModalBody>
                    <div className="m-auto flex"><Image isBlurred={true} src={routerHardCoded.src} alt="router Pic" width='300px'/></div>
                    <Input variant="bordered" label="Item id" className="text-white" value={cableModem._id} isDisabled />
                    <Input variant="bordered" label="Description" className="text-white" value={cableModem.description} isDisabled />
                    <DatePicker variant="bordered" label="Valid Since" className="text-white" value={cableModem.validSince ? parseAbsoluteToLocal(cableModem.validSince) : parseAbsoluteToLocal("2021-11-07T07:45:00Z")} isDisabled/>
                    <Input variant="bordered" label="Status" className="text-white" value={cableModem.status} isDisabled color={getStatusColor(cableModem.status)} />
                    <div className=" text-neutral-500 text-xs border-2 rounded-xl border-neutral-800 p-2">
                        <div className="p-1">Tags</div>
                        {cableModem.tags?.map(t=>(<Chip className="m-1" key={t}>{t}</Chip>))}
                    </div>
                    <div className="">
                        <Button className="flex m-auto" color="danger" onPress={()=>{onConfirm();onOpenChange()}}>
                            Delete item
                        </Button>
                    </div>
                </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}

export function DeleteItemModal(props:{isModalOpen:boolean, onOpenChange:()=>void, onConfirm:()=>void}){
    const {isModalOpen, onOpenChange, onConfirm} = props;
    return(
        <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">Delete item</ModalHeader>
              <ModalBody className="text-white">
                  Are you sure that you want to delete the item ?
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={()=>{onConfirm();onOpenChange()}}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}

export function EditItemModal(props:{cableModem?:CableModem, isModalOpen:boolean, onOpenChange:()=>void, onEdit?:(id:string,data:any)=>void, onCreate?:(data:any)=>void , mode:string}){
    const {cableModem, isModalOpen, onOpenChange, onCreate, onEdit, mode} = props;
    //TODO arreglar fecha
    let fechaTest = parseZonedDateTime('2022-11-07T00:45[America/Los_Angeles]');
    const idSelected = cableModem?._id ?? 'defaultId'
    const[nameSelected, setNameSelected] = useState(cableModem?.name ?? '')
    const[descriptionSelected, setDescriptionSelected] = useState(cableModem?.description)
    const[dateSelected, setDateSelected] = useState(fechaTest)
    const[statusSelected, setStatusSelected] = useState(cableModem?.status ?? 'Available')
    const[tagsSelected, setTagsSelected] = useState(cableModem?.tags ?? [])
    return(
        <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                <div>
                    <ModalHeader className="flex flex-col gap-1 text-white">{mode === 'edit' ? 'Edit item' : 'Create item'}</ModalHeader>
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
                    <Button color="default" variant="light" onPress={onClose}> Cancel </Button>
                    <Button color='success' onPress={()=> {
                        mode === 'edit'
                            ? onEdit && onEdit(idSelected,{ name : nameSelected, description: descriptionSelected, validSince: dateSelected.toAbsoluteString(), status: statusSelected, tags: tagsSelected})
                            : onCreate && onCreate({ name : nameSelected, description: descriptionSelected, validSince: dateSelected.toAbsoluteString(), status: statusSelected, tags: tagsSelected}) 
                        onOpenChange()}}>
                        Confirm
                    </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    )
}