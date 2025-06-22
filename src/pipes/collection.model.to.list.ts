import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'collectionModelToList',
    standalone: true
})
export class CollectionModelToList implements PipeTransform
{

    transform(value: any, ...args: any[]) 
    {
        if(!value) return [];
        if('entities' in value) return value['entities'];
        return [];
    }
    
}