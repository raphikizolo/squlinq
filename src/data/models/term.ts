import { Observable } from "rxjs";
import { Entity } from "./entity";
import { CollectionModel } from "./collection.model";
import { ApiProperty, Converter } from "../decorators/api";
import { ErrorResponse } from "./error.response";
import { Account } from "./account";
import { FeeStructure } from "./fee.structure";
import { PageModel } from "./page.model";
import { FeeAccount } from "./fee.account";
import { ISODateConverter } from "../../components/converters/iso.date.converter";

export class Term extends Entity<Term>
{
    @ApiProperty
    @Converter(ISODateConverter)
    openingDate!: Date;
    
    @ApiProperty
    @Converter(ISODateConverter)
    closingDate!: Date;

    feeAccounts?: Observable<PageModel<FeeAccount> | ErrorResponse>;

    feeStructure?: Observable<FeeStructure | ErrorResponse>
    
    static CLASS_NAME: string = "Term";


}