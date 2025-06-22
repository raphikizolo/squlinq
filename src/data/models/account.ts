import { Observable } from "rxjs";
import { Entity } from "./entity";
import { Term } from "./term";
import { CollectionModel } from "./collection.model";
import { Student } from "./student";
import { ApiProperty } from "../decorators/api";
import { AccountEntry } from "./account.entry";
import { Person } from "./person";
import { ErrorResponse } from "./error.response";

export class Account extends Entity<Account>
{

    @ApiProperty
    name!: string;

    @ApiProperty
    type!: string;

    accountEntries?: Observable<CollectionModel<AccountEntry> | ErrorResponse>;
    
    owner!: Observable<Person | ErrorResponse>;
    
    static CLASS_NAME: string = "Account";

    constructor()
    {
        super();

    }
}