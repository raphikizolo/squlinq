import { FormControl, Validators } from "@angular/forms";
import { AccountEntry } from "../data/models/account.entry";
import { ViewModelBase } from "./view.model.base";
import { BehaviorSubject, map, mergeMap, Subject } from "rxjs";
import { AccountEntryRepository } from "../data/repositories/account.entry.repository";
import { CollectionModel } from "../data/models/collection.model";
import { ErrorResponse } from "../data/models/error.response";
import { AccountEntryViewModel } from "./account.entry.view.model";
import { AccountEntryViewModelFactory } from "../components/factories/account.entry.view.model.factory";
import { Streams } from "../components/streams";


export class VoteheadStatementViewModel extends ViewModelBase
{

    heightPipe = new Subject<number>() //used by the ui to pipe height changes.
    
    voteheadAccountEntries = new BehaviorSubject<AccountEntry[]>([]);
    
    paymentEntries = new BehaviorSubject<AccountEntryViewModel[]>([]);
    
    particulars: string = ''

    totalAmountPayable: number = 0

    totalAmountPaid = new BehaviorSubject(0)

    balance = 0

    private alignment = 'start center';

    sr = -1


    constructor(private aeVmFactory: AccountEntryViewModelFactory) 
    {
        super()
        this.voteheadAccountEntries.subscribe(l => this.handleVoteheadAccountChanges(l))
        this.paymentEntries.subscribe(l => this.handlePaymentEntriesChanges(l))
        this.heightPipe.subscribe(h => console.log(`${this.particulars}. height: ${h}`))
        
    }
    
    
    private handlePaymentEntriesChanges(l: AccountEntryViewModel[]): void 
    {
        this.totalAmountPaid.next(Streams.isEmpty(l) ? 0 : l.map(e => e.entry.amount).reduce((f, i) => f + i))
        this.alignment = l.length > 1 ? 'start stretch' : 'start center'
        this.balance = this.totalAmountPayable - this.totalAmountPaid.value
    }

    private handleVoteheadAccountChanges(l: AccountEntry[])
    {
        this.totalAmountPayable = Streams.isEmpty(l) ? 0: l.map(e => e.amount).reduce((f, i) => f + i)
        this.particulars = Streams.tryFirst(l)?.particulars || ''
        this.balance = this.totalAmountPayable - this.totalAmountPaid.value
        l.forEach(e => e.sameAccountReferences?.pipe(
            mergeMap(r => this.roe<CollectionModel<AccountEntry> | ErrorResponse, CollectionModel<AccountEntry>>(r)),
            map(cm => cm.entities))
            .subscribe(eList => this.paymentEntries.next(this.paymentEntries.value.concat(eList.map(e => this.buildAccountEntry(e))))))
        
    }
    
    
    private buildAccountEntry(e: AccountEntry)
    {
        let vm = this.aeVmFactory.build();
        vm.entry = e
        return vm
    }


}