import { mergeMap } from "rxjs";
import { AccountEntry } from "../data/models/account.entry";
import { ViewModelBase } from "./view.model.base";
import { ErrorResponse } from "../data/models/error.response";
import { Transaction } from "../data/models/transaction";
import { DefaultDateFormat } from "../pipes/dd.mm.yy";

export class AccountEntryViewModel extends ViewModelBase
{
    private _entry!: AccountEntry;
    
    comment?: string;

    public get entry(): AccountEntry 
    {
        return this._entry;
    }

    description = ''

    public set entry(value: AccountEntry) 
    {
        this._entry = value;
        this.handleEntryChanges()
    }


    /**
     *
     */
    constructor(private dateFormatter: DefaultDateFormat) 
    {
        super();
        
    }


    private handleEntryChanges()
    {
        this.entry.transaction?.pipe(mergeMap(r => this.roe<Transaction | ErrorResponse, Transaction>(r)))
        .subscribe(t => this.loadTransactionData(t))

    }
    
    
    private loadTransactionData(t: Transaction): void 
    {
        this.description = `Transaction no: ${t.transactionNumber}. ${this.entry.amount} paid on ${this.dateFormatter.transform(t.postingDate)}.`
        this.comment = t.comment
    }
    
}