import {ZonedDateTime} from '@internationalized/date';
import {CABLE_MODEM_STATUS} from 'constants/constants' 

export function formatDate(date: ZonedDateTime): string{
    return (date.day + '-' + date.month + '-' + date.year).toString();
}

export function getStatusColor(statusId:string):'success'|'warning'|'danger'|'default'{
    console.log(statusId)
    switch(statusId){
        case CABLE_MODEM_STATUS.ACTIVE.value :
            return 'success'
            break;
        case CABLE_MODEM_STATUS.PROVISION.value :
            return 'warning'
            break;
        case CABLE_MODEM_STATUS.SUSPENDED.value :
            return 'danger'
            break;
        default:
            return 'default'
    }
}