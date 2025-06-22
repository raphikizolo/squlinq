import { BehaviorSubject, combineLatest, map, mergeMap, Observable, Subject, Subscription } from "rxjs";
import { Account } from "../data/models/account";
import { FeeAccount } from "../data/models/fee.account";
import { ViewModelBase } from "./view.model.base";
import { ErrorResponse } from "../data/models/error.response";
import { Term } from "../data/models/term";
import { TableHeadersViewModel } from "./table.headers.view.model";
import { PaymentDTO, VoteheadPaymentViewModel } from "./votehead.payment.view.model";
import { Command } from "../components/command";
import { TableHeadersViewModelFactory } from "../components/factories/table.headers.view.model.factory";
import { CollectionModel } from "../data/models/collection.model";
import { AccountEntry } from "../data/models/account.entry";
import { VoteheadPaymentViewModelFactory } from "../components/factories/votehead.payment.view.model.factory";
import { ICommand } from "../components/interfaces/i.command";
import { TransactionRepository } from "../data/repositories/transaction.repository";
import { Transaction } from "../data/models/transaction";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Streams } from "../components/streams";
import { ISODateConverter } from "../components/converters/iso.date.converter";
import { FormControl } from "@angular/forms";


export class FeePaymentDTO
{
    comment: string = '';

    theComment(c: string) 
    {
        this.comment = c
        return this
        
    }
    
    public payments = new Array<PaymentDTO>()
   
    postingDate!: string

    constructor(public feeAccountId: string) 
    {
        
    }

    addPayments(l: PaymentDTO[]): this
    {
        this.payments.push(...l)
        return this
    }

    thePostingDate(l: string): this
    {
        this.postingDate = l
        return this
    }
}

export class FeeAccountPaymentViewModel extends ViewModelBase
{

    submitComm: ICommand = new Command(() => this.submitPayments());

    postingDate: Date | null = new Date()
    


    private items = new BehaviorSubject<VoteheadPaymentViewModel[]>([]);

    private page = new Subject<VoteheadPaymentViewModel[]>();

    headersVm!: TableHeadersViewModel;

    private mos = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    total = new BehaviorSubject(0);

    canSubmit = false

    totalExpected = new BehaviorSubject(0)

    commentFormCtrl: FormControl<string | null> = new FormControl('')

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


    constructor(private headersVmFactory: TableHeadersViewModelFactory, private vhPaymentVmFactory: VoteheadPaymentViewModelFactory
        , private transactionRepo: TransactionRepository, private snackBar: MatSnackBar, private dateConverter: ISODateConverter)
    {
        super();
        this.initialize();
        

    }


    private submitPayments()
    {
        this.items.pipe(
            map(l => l.filter(v => v.amountFormControl.value && v.amountFormControl.value >= 50)),
            map(l => l.map(v => v.buildPaymentDTO())),
            map(l => new FeePaymentDTO(this.feeAccount.id).addPayments(l).theComment(this.commentFormCtrl.value || '').thePostingDate(this.dateConverter.toBackend(this.postingDate!!))),
            mergeMap(dto => this.transactionRepo.payFee(dto)),
            mergeMap(r => this.roe<Transaction | ErrorResponse, Transaction>(r))).subscribe(t => this.snackBar
                .open(`Fee paid. Transaction number ${t.transactionNumber}`, 'Ok', { duration: 5000 }))
        
        

    }

    private initialize()
    {
        this.headersVm = this.headersVmFactory.build();
        this.page.subscribe(p => this.updateHeaders(p));
        this.page.subscribe(p => this.updateItems(p));
        this.items.subscribe(l => this.wireTotalPipe(l))
        this.items.subscribe(l => this.calculateTotalPayable(l))

    }
    
    
    private calculateTotalPayable(l: VoteheadPaymentViewModel[]): void 
    {
        this.totalExpected.next(Streams.isNotEmpty(l) ? l.map(v => v.amountPayable).reduce((p, c) => p + c): 0)
    }

    private totalPipeSubs: Subscription[] = []
    
    private wireTotalPipe(l: VoteheadPaymentViewModel[]): void 
    {
        this.totalPipeSubs.forEach(s => s.unsubscribe())
        let subs = l.map(vm => vm.amountFormControl.valueChanges.subscribe(_ => this.calculateTotal()))
        this.totalPipeSubs.push(...subs)
    }
    
    private calculateTotal() 
    {
        this.items.subscribe(l => this.total.next(l.map(v => v.amountFormControl.value || 0).map(v => Number(v)).reduce((p, c) => p + c)))
    }
    
    private updateItems(l: VoteheadPaymentViewModel[]): void 
    {
        this.items.next(l);
    }
    
    
    private updateHeaders(p: VoteheadPaymentViewModel[])
    {
        this.headersVm = this.headersVmFactory.build();
        this.headersVm.loadItemFieldNames(['sr', 'particulars', 'amountPayable', 'amount']);


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
        // this.feeAccount.account.pipe(mergeMap(r => this.roe<Account | ErrorResponse, Account>(r))).subscribe(a => this.account = a)
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
            map(l => l.filter(e => e.debit)),
            map(m => this.buildVoteheadPaymentVms(m))).subscribe(l => this.page.next(l))
    }
    
    
    private buildVoteheadPaymentVms(m: AccountEntry[]): VoteheadPaymentViewModel[]
    {
        return m.map((e, i) => this.buildVoteheadPaymentVm(e, i))
    }
    
    
    private buildVoteheadPaymentVm(e: AccountEntry, i: number)
    {
        let vm = this.vhPaymentVmFactory.build()
        vm.expectedPayment = e
        vm.sr = i + 1
        return vm
    }

    private month(m: number)
    {
        return this.mos[m];
    }



}