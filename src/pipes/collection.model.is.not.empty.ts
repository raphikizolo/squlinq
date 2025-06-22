import { Pipe, PipeTransform } from "@angular/core";
import { Streams } from "../components/streams";

@Pipe({
    name: 'collectionModelIsNotEmpty',
    standalone: true
})
export class CollectionModelIsNotEmpty implements PipeTransform
{



    transform(value: any, ...args: any[]) 
    {
        if(!value) return false;
        if(!('entities' in value)) return false;
        return Streams.isNotEmpty(value['entities']);
        
    }
    
}