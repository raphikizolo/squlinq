import { Observable } from "rxjs";
import { Entity } from "./entity";
import { Student } from "./student";
import { ApiProperty } from "../decorators/api";
import { Account } from "./account";
import { Person } from "./person";
import { ErrorResponse } from "./error.response";
import { CollectionModel } from "./collection.model";
import { Transaction } from "./transaction";

export class AccountEntry extends Entity<AccountEntry>
{

    account!: Observable<Account | ErrorResponse>;

    //change the backend in line with the changes here.

    //links two entries in the same account.
    // sameAccountReference?: Observable<AccountEntry | ErrorResponse>
    sameAccountReferences?: Observable<CollectionModel<AccountEntry> | ErrorResponse>

    transaction?: Observable<Transaction | ErrorResponse>

    //links entries in different accounts.
    crossReferences!: Observable<CollectionModel<AccountEntry> | ErrorResponse>

    @ApiProperty
    debit!: boolean;

    @ApiProperty
    particulars!: string;

    @ApiProperty
    amount!: number;
    
    static CLASS_NAME: string = "AccountEntry";

    
    constructor()
    {
        super();
    }

}