import { Observable } from "rxjs";
import { Entity } from "./entity";
import { Term } from "./term";
import { CollectionModel } from "./collection.model";
import { Student } from "./student";
import { ApiProperty } from "../decorators/api";
import { Person } from "./person";
import { ErrorResponse } from "./error.response";
import { Account } from "./account";
import { AccountEntry } from "./account.entry";


export type BookkeepingActionType = "JOURNAL_ENTRY" | "LEDGER_ENTRY" | "ADJUSTMENT_ENTRY" | 'CLOSING_ENTRY' | 'TRIAL_BALANCE' 
| 'INCOME_STATEMENT' | 'BALANCE_SHEET'

export class BookkeepingAction extends Entity<BookkeepingAction>
{

    @ApiProperty
    types: BookkeepingActionType[] = []

    accounts?: Observable<CollectionModel<Account> | ErrorResponse>

    accountEntries?: Observable<CollectionModel<AccountEntry> | ErrorResponse>;
    


    
    static CLASS_NAME: string = "BookkeepingAction";

    constructor()
    {
        super();

    }
}