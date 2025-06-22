import { Injectable } from "@angular/core";
import { AbstractConverter } from "./abstract.converter";


@Injectable()
export class ISODateConverter extends AbstractConverter<string, Date> 
{


    /**
     *
     */
    constructor() 
    {
        super(ISODateConverter);

    }

    override fromBackend(value: string): Date 
    {
        let d = new Date(value)
        d.setHours(d.getHours() + 3);
        return d;

    }



    override toBackend(value: Date): string 
    {
        return this.toLocalIsoString(value)
    }

    private toLocalIsoString(date: Date): string 
    {
        const pad = (n: number) => n.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); // Months are zero-based
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }


}