import { Term } from "../data/models/term";
import { DefaultDateFormat } from "../pipes/dd.mm.yy";

export class TermViewModel
{

    public get description(): string 
    {
        return `${this.dateFormat.transform(this.term.openingDate)} to ${this.dateFormat.transform(this.term.closingDate)}`;
    }
    

    term!: Term;

    /**
     *
     */
    constructor(private dateFormat: DefaultDateFormat) 
    {
        
    }

    
}