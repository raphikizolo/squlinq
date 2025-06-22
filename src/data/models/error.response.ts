import { ApiProperty } from "../decorators/api";

export class ErrorResponse
{

    @ApiProperty
    message!: string;

    @ApiProperty
    httpStatus!: number;

    @ApiProperty
    timestamp!: Date;
    
}