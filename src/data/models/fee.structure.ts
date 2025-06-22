import { Observable } from "rxjs";
import { ApiProperty } from "../decorators/api";
import { Entity } from "./entity";
import { CollectionModel } from "./collection.model";
import { Votehead } from "./votehead";
import { ErrorResponse } from "./error.response";
import { Term } from "./term";
import { Grade } from "./grade";

export class FeeStructure extends Entity<FeeStructure>
{

    @ApiProperty
    description!: string

    voteheads!: Observable<CollectionModel<Votehead> | ErrorResponse>

    term!: Observable<Term | ErrorResponse>

    grades?: Observable<CollectionModel<Grade> | ErrorResponse>
    
    static CLASS_NAME: string = "FeeStructure"

}
