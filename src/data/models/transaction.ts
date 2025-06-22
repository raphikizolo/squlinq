import { Observable } from "rxjs";
import { Entity } from "./entity";
import { Student } from "./student";
import { CollectionModel } from "./collection.model";
import { ErrorResponse } from "./error.response";
import { ApiProperty, Converter } from "../decorators/api";
import { AccountEntry } from "./account.entry";
import { Person } from "./person";
import { BookkeepingAction } from "./bookkeeping.action";
import { ISODateConverter } from "../../components/converters/iso.date.converter";

export class Transaction extends Entity<Transaction>
{

    @ApiProperty
    transactionNumber!: number;

    @ApiProperty
    @Converter(ISODateConverter)
    postingDate!: Date

    bookkeepingActions!: Observable<CollectionModel<BookkeepingAction> | ErrorResponse>;
    
    owner!: Observable<Person>;
    
    static CLASS_NAME: string = "Transaction"
    
    @ApiProperty
    comment!: string;

    constructor()
    {
        super();
    }

}