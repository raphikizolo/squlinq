import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'isBold',
    standalone: false
})
export class IsBold implements PipeTransform
{

    transform(value: any, ...args: any[]) 
    {
        let b: boolean = value
        return b ? 'bold' : 'normal'
    }
    
}