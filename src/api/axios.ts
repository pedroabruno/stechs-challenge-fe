import axios from "axios"
import {CableModem} from "src/api/dataTypes"

const URL_BASE = 'https://stechs-be.vercel.app/'

export function getCableModems(page : number, filters?: any){
    return axios({
        method: 'GET',
        url: URL_BASE + 'cableModems',
        params: {
            offset: (page - 1) * 10 ,
            limit: 10,
            ...filters
        },
    })
}

export function createCableModems(data: CableModem){
    return axios({
        method: 'POST',
        url: URL_BASE + 'cableModems',
        data: data   
    })
}

export function putCableModem(id: string, data: CableModem){
    return axios({
        method: 'PUT',
        url: URL_BASE + 'cableModems/'+ id,
        data: data
    })
}

export function deleteCableModem(id: string){
    axios.delete(URL_BASE+'cableModems/'+id);
}

export function getCableModemById(id:string){
    return axios({
        method: 'GET',
        url: URL_BASE + 'cableModems/'+id,
    })
}