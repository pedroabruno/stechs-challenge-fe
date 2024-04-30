import {ZonedDateTime} from '@internationalized/date';

export function formatDate(date: ZonedDateTime): string{
    return (date.day + '-' + date.month + '-' + date.year).toString();
}