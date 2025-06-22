import { Observable } from "rxjs";
import { ApiProperty } from "../decorators/api";
import { Entity } from "./entity";
import { Person } from "./person";
import { ErrorResponse } from "./error.response";
import { Account } from "./account";
import { CollectionModel } from "./collection.model";
import { Term } from "./term";

export class FeeAccount extends Entity<FeeAccount>
{
    static CLASS_NAME: string = 'FeeAccount';

    account!: Observable<Account | ErrorResponse>
    
    term!: Observable<Term | ErrorResponse>

}
