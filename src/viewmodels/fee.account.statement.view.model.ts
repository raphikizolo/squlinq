import { BehaviorSubject, combineLatest, map, mergeMap, Observable, Subject, Subscription } from "rxjs";
import { Account } from "../data/models/account";
import { FeeAccount } from "../data/models/fee.account";
import { ViewModelBase } from "./view.model.base";
import { ErrorResponse } from "../data/models/error.response";
import { Term } from "../data/models/term";
import { TableHeadersViewModel } from "./table.headers.view.model";
import { Command } from "../components/command";
import { TableHeadersViewModelFactory } from "../components/factories/table.headers.view.model.factory";
import { CollectionModel } from "../data/models/collection.model";
import { AccountEntry } from "../data/models/account.entry";
import { ICommand } from "../components/interfaces/i.command";
import { TransactionRepository } from "../data/repositories/transaction.repository";
import { Transaction } from "../data/models/transaction";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Streams } from "../components/streams";
import { ISODateConverter } from "../components/converters/iso.date.converter";
import { AccountEntryViewModel } from "./account.entry.view.model";
import { VoteheadStatementViewModelFactory } from "../components/factories/votehead.statement.view.model.factory";
import { VoteheadStatementViewModel } from "./votehead.statement.view.model";


export class FeeAccountStatementViewModel extends ViewModelBase
{


    private items = new BehaviorSubject<VoteheadStatementViewModel[]>([]);

    private page = new BehaviorSubject<VoteheadStatementViewModel[]>([]);

    headersVm!: TableHeadersViewModel;

    private mos = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    total = new BehaviorSubject(0);

    totalExpected = new BehaviorSubject(0)

    public get description(): string 
    {
        if(this.term)
        {
            return `${this.account.name} of ${this.month(this.term?.openingDate.getMonth()) || ''} ${this.term?.openingDate.getFullYear()}` ;

        }
        return ''
    }

    private _account!: Account;
    
    term!: Term;

    public get account(): Account 
    {
        return this._account;
    }


    public set account(value: Account) 
    {
        this._account = value;
        this.handleAccountChanges()
        
    }


    private _feeAccount!: FeeAccount;

    public get feeAccount(): FeeAccount 
    {
        return this._feeAccount;
    }


    public set feeAccount(value: FeeAccount) 
    {

        if(this._feeAccount != value)
        {
            this._feeAccount = value;
            this.handleFeeAccountChanges()

        }
    }


    constructor(private headersVmFactory: TableHeadersViewModelFactory, private vhPaymentVmFactory: VoteheadStatementViewModelFactory)
    {
        super();
        this.initialize();
    }


    private initialize()
    {
        this.headersVm = this.headersVmFactory.build();
        this.page.subscribe(p => this.updateHeaders(p));
        this.page.subscribe(p => this.updateItems(p));
        this.page.subscribe(p => this.wireTotalAmountPaidPipe(p));
        this.items.subscribe(l => this.calculateTotalPayable(l))
        this.items.subscribe(l => this.calculateTotal(l))

    }
    
    private subs = new Array<Subscription>()
    
    private wireTotalAmountPaidPipe(vms: VoteheadStatementViewModel[]): void 
    {
        this.subs.forEach(s => s.unsubscribe())
        Streams.clear(this.subs)
        let s = vms.map(v => v.totalAmountPaid.subscribe(_ => this.updateTotalPaid()))
        this.subs.push(...s)
    }
    
    
    private updateTotalPaid(): void 
    {
        this.total.next(this.page.value.map(v => v.totalAmountPaid.value).reduce((t, v) => t + v))
        
    }
    
    
    private calculateTotalPayable(l: VoteheadStatementViewModel[]): void 
    {
        this.totalExpected.next(Streams.isNotEmpty(l) ? l.map(v => v.totalAmountPayable).reduce((p, c) => p + c): 0)
    }

    private calculateTotal(l: VoteheadStatementViewModel[]) 
    {
        this.total.next(Streams.isNotEmpty(l) ? l.map(v => v.totalAmountPaid).map(v => Number(v)).reduce((p, c) => p + c) : 0)
    }
    
    private updateItems(l: VoteheadStatementViewModel[]): void 
    {
        this.items.next(l);
    }
    
    
    private updateHeaders(p: VoteheadStatementViewModel[])
    {
        this.headersVm = this.headersVmFactory.build();
        this.headersVm.loadItemFieldNames(['sr', 'particulars', 'totalAmountPayable', 'paid', 'balance']);
    }

    loadPage() 
    {
        // this.studentRepository.entriesOfDate(this.date.value, p).subscribe(p => this.page.next(p));
    }
    


    connect(): Observable<any[]> 
    {
        return this.items;
    }


    disconnect(): void 
    {
        this.items.unsubscribe();
    }


    private handleFeeAccountChanges()
    {
        combineLatest([
            this.feeAccount.account.pipe(mergeMap(r => this.roe<Account | ErrorResponse, Account>(r))), 
            this.feeAccount.term.pipe(mergeMap(r => this.roe<Term | ErrorResponse, Term>(r))),

        ]).subscribe(l => 
        {
            this.account = l[0]
            this.term = l[1]

        })


    }

    private handleAccountChanges()
    {
        this.account.accountEntries?.pipe(
            mergeMap(r => this.roe<CollectionModel<AccountEntry> | ErrorResponse, CollectionModel<AccountEntry>>(r)),
            map(r => r.entities),
            map(l => Streams.group(l, e => e.debit)),
            map(m => this.buildVoteheadStatementVms(m))).subscribe(l => this.page.next(l))
    }
    
    
    private buildVoteheadStatementVms(m: Map<boolean, AccountEntry[]>): VoteheadStatementViewModel[]
    {
        let debits = m.get(true)
        let voteheadGroups = Streams.group(debits || [], e => e.particulars)
        let i = 1
        let vms = Array<VoteheadStatementViewModel>();
        voteheadGroups.forEach((group, _) => vms.push(this.buildVoteheadStatementVm(group, i++)))
        return vms
    }
    
    
    private buildVoteheadStatementVm(group: AccountEntry[], i: number)
    {
        let vm = this.vhPaymentVmFactory.build()
        vm.voteheadAccountEntries.next(group)
        vm.sr = i
        return vm
    }

    private month(m: number)
    {
        return this.mos[m];
    }



}