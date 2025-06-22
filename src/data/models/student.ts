import { Observable } from "rxjs";
import { ApiProperty } from "../decorators/api";
import { Entity } from "./entity";
import { Person } from "./person";
import { ErrorResponse } from "./error.response";
import { Account } from "./account";
import { CollectionModel } from "./collection.model";
import { FeeAccount } from "./fee.account";

export class Student extends Entity<Student>
{
    static CLASS_NAME: string = 'Student';

    person!: Observable<Person | ErrorResponse>
    
    feeAccounts?: Observable<CollectionModel<FeeAccount> | ErrorResponse>

    @ApiProperty
    admissionNumber!: string;

}
