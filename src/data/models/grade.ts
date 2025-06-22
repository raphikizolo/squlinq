import { Observable } from "rxjs";
import { Entity } from "./entity";
import { Student } from "./student";
import { CollectionModel } from "./collection.model";
import { ApiProperty } from "../decorators/api";
import { ErrorResponse } from "./error.response";
import { FeeStructure } from "./fee.structure";

export class Grade extends Entity<Grade>
{
    @ApiProperty
    level!: number;
    
    students?: Observable<CollectionModel<Student> | ErrorResponse>;

    feeStructures?: Observable<CollectionModel<FeeStructure> | ErrorResponse>
    
    static CLASS_NAME: string = "Grade"
}