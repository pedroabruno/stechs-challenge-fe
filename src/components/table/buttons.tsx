import { createCableModems } from "@/api/axios";
import { CABLE_MODEM_BUTTON_TYPE, CABLE_MODEM_STATUS } from "@/constants/constants";
import {
    Button,
    useDisclosure,
  } from "@nextui-org/react";
import { EditItemModal} from "src/components/table/modals";

export function ActionButton(props:{displayName:string, color:'primary'|'danger', onClick: any}){
    const {displayName, color, onClick} = props
    return(
        <div>
            <Button size="sm" onPress={onClick} color={color}>{displayName}</Button>
        </div>
    )
}

export function CreateItemButton(props:{onClick:(data:any)=>void}){
    const {onClick} = props
    return(
        <div className="ml-auto">
            <Button size="sm" color='primary' className=" font-bold" onPress={onClick}>&#43; nuevo Cable Modem</Button>
        </div>
    )
}