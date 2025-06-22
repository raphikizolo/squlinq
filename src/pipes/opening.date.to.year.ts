import { Pipe, PipeTransform } from "@angular/core";
import { Term } from "../data/models/term";
import { Streams } from "../components/streams";
import { CollectionModel } from "../data/models/collection.model";

@Pipe({
    name: 'termToYear'
})
export class TermOpeningDateToYear implements PipeTransform
{


    transform(value: any, ...args: any[]) 
    {
        if(!value) return '';
        if(value instanceof Term)
        {
            return value.openingDate.getFullYear();
        }
        
        if(!('entities' in value)) return '';
        let terms: Term[] = value['entities'];
        if(Streams.isEmpty(terms)) return '';
        return terms[0].openingDate.getFullYear();

    }
    
}