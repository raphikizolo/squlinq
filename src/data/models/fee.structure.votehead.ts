import { Observable } from "rxjs";
import { Entity } from "./entity";
import { ApiProperty } from "../decorators/api";
import { FeeStructure } from "./fee.structure";
import { Votehead } from "./votehead";
import { ErrorResponse } from "./error.response";

export class FeeStructureVotehead extends Entity<FeeStructureVotehead>
{
    @ApiProperty
    name!: string | null;

    @ApiProperty
    amount!: number | null;

    @ApiProperty
    paymentFactor!: number | null;

    feeStructure!: Observable<FeeStructure | ErrorResponse>
    
    votehead!: Observable<Votehead | ErrorResponse>
    
    static CLASS_NAME: string = "FeeStructureVotehead"

}