import { FormControl, Validators } from "@angular/forms";
import { AccountEntry } from "../data/models/account.entry";
import { ViewModelBase } from "./view.model.base";
import { BehaviorSubject } from "rxjs";

export class PaymentDTO
{
    /**
     *
     */
    constructor(public particulars: string, public amount: number, public sameAccountReferenceId: string) 
    {
        
    }
}

export class VoteheadPaymentViewModel extends ViewModelBase
{
    
    private _expectedPayment!: AccountEntry;
    
    particulars: string = ''
    amountPayable: number = 0
    
    amount: number = 0;
    

    amountFormControl = new FormControl<number | null>(null, Validators.compose([Validators.required, Validators.min(50)]))
    

    public get expectedPayment(): AccountEntry 
    {
        return this._expectedPayment;
    }


    public set expectedPayment(value: AccountEntry) 
    {
        this._expectedPayment = value;
        this.handleExpectedPaymentChanges()
    }

    sr = -1




    private handleExpectedPaymentChanges()
    {
        this.particulars = this.expectedPayment.particulars
        this.amountPayable = this.expectedPayment.amount
        this.amount = 0;
    }


    buildPaymentDTO()
    {
        return new PaymentDTO(this.particulars, this.amountFormControl.value || 0, this.expectedPayment.id)
        
    }


}