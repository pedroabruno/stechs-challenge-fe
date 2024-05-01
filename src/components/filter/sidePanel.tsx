import { cableModemStatusList } from "@/constants/constants";
import { RadioGroup, Radio, Button, Input } from "@nextui-org/react";

export function StatusFilter(props:{selectedValue:string, onValueChange:(value:string)=>void}){
    const {selectedValue, onValueChange} = props
    return(<div>
        <RadioGroup size='sm' label="Filter by status" color="warning" value={selectedValue} onValueChange={(value)=>{onValueChange(value)}} >
            {cableModemStatusList.map(s=>(<Radio value={s.key} key={s.key}>{s.label}</Radio>))}
        </RadioGroup>
        <Button color="default" onClick={(v)=>{onValueChange('')}} className="m-auto flex mt-1">
            Clean filter
        </Button>
    </div>);
}

export function NameFilter(props:{onValueChange:(value:string)=>void}){
    const {onValueChange} = props
    return(<Input labelPlacement='outside' placeholder="name" size='sm' variant="bordered" label="Filter by name" className="text-orange-400 py-9" onValueChange={(value)=>{onValueChange(value)}}/>)
}