import { Observable } from "rxjs";
import { Entity } from "./entity";
import { CollectionModel } from "./collection.model";
import { ApiProperty } from "../decorators/api";
import { Account } from "./account";
import { ErrorResponse } from "./error.response";

export class Person extends Entity<Person>
{
    static CLASS_NAME = 'Person'

    @ApiProperty
    firstName!: string

    @ApiProperty
    middleName!: string
    
    @ApiProperty
    surname!: string

    accounts?: Observable<CollectionModel<Account> | ErrorResponse>;
        
}