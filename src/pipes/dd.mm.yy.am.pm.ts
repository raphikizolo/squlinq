import { Pipe, PipeTransform } from "@angular/core";
import { HourMinute } from "./hour.minute";

@Pipe({
    name: 'defaultDateTimeFormat',
    standalone: false
})
export class DefaultTimeFormat implements PipeTransform
{


    constructor(private hm: HourMinute)
    {

    }

    transform(value: any, ...args: any[]): string
    {
        let d: Date = value;
        if(!d) return '';
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${this.hm.transform(d)}`;
    }

    

}
