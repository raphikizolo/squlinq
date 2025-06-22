import { Observable } from "rxjs";
import { Entity } from "./entity";
import { ApiProperty } from "../decorators/api";
import { FeeStructure } from "./fee.structure";

export class Votehead extends Entity<Votehead>
{
    @ApiProperty
    name!: string;

    @ApiProperty
    amount!: number;

    @ApiProperty
    paymentFactor!: number

    feeStructure!: Observable<FeeStructure>

}