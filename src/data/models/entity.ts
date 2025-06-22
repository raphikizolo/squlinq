import { Observable } from "rxjs";
import { ApiProperty, Converter } from "../decorators/api";
import { ISODateConverter } from "../../components/converters/iso.date.converter";

export class Entity<T>
{
    // static CLASS_NAME = 'Entity'

    self!: Observable<T>;

    @ApiProperty
    id!: string;

    @ApiProperty
    @Converter(ISODateConverter)
    dateCreated?: Date;

    @ApiProperty
    @Converter(ISODateConverter)
    dateModified?: Date;

    /**
     *
     */
    constructor() 
    {
        this.dateModified = this.dateCreated = new Date();
        
        
    }


}