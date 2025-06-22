import { Pipe, PipeTransform } from "@angular/core";
import { HourMinute } from "./hour.minute";

@Pipe({ name: 'defaultDateFormat'})
export class DefaultDateFormat implements PipeTransform
{


    constructor()
    {

    }

    transform(value: any, ...args: any[]): string
    {
        let d: Date = value;
        if(!d) return '';
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }

    

}
