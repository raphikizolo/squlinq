import { Injectable } from "@angular/core";
import { BehaviorSubject, map, mergeMap } from "rxjs";
import { TermViewModel } from "./term.view.model";
import { TermViewModelFactory } from "../components/factories/term.view.model.factory";
import { StudentRepository } from "../data/repositories/student.repository";
import { Student } from "../data/models/student";
import { FeeAccountPaymentViewModel } from "./fee.account.payment.view.model";
import { FeeAccountViewModelFactory } from "../components/factories/fee.account.view.model.factory";
import { ResultOrError } from "../components/result.or.error";
import { CollectionModel } from "../data/models/collection.model";
import { Account } from "../data/models/account";
import { ErrorResponse } from "../data/models/error.response";
import { ViewModelBase } from "./view.model.base";
import { Person } from "../data/models/person";
import { FeeAccountRepository } from "../data/repositories/fee.account.repository";
import { FeeAccount } from "../data/models/fee.account";
import { Command } from "../components/command";
import { ICommand } from "../components/interfaces/i.command";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { FeeAccountStatementViewModel } from "./fee.account.statement.view.model";
import { FeeAccountStatementViewModelFactory } from "../components/factories/fee.account.statetment.view.model.factory";

@Injectable()
export class StudentFeeStatementViewModel extends ViewModelBase
{

    person!: Person;

    private _feeAccounts = new BehaviorSubject<FeeAccountStatementViewModel[]>([]);

    total = new BehaviorSubject(0);

    
    public get feeAccounts() 
    {
        return this._feeAccounts.asObservable();
    }

    private _student!: Student;

    public get student(): Student 
    {
        return this._student;
    }


    public set student(value: Student) 
    {
        if(this._student != value)
        {
            this._student = value;
            this.handleStudentChanges();

        }
    }


    constructor(private feeAccountVmFactory: FeeAccountStatementViewModelFactory, private feeAccountRepo: FeeAccountRepository) 
    {
        super()
        
    }


    private buildFeeAccountVm(f: FeeAccount)
    {
        let vm = this.feeAccountVmFactory.build();
        vm.feeAccount = f
        return vm;
    }


    private handleStudentChanges()
    {
        if(this.student)
        {
            this.loadPerson()
            this.setupFeeAccounts()
            
        }
    }
    
    private loadPerson() 
    {
        this.student.person.pipe(mergeMap(r => this.roe<Person | ErrorResponse, Person>(r))).subscribe(p => this.person = p)
    }

    private setupFeeAccounts() 
    {
        if(this.student.feeAccounts)
        {
            this.student.feeAccounts?.pipe(map(r => new ResultOrError<CollectionModel<FeeAccount> | ErrorResponse, CollectionModel<FeeAccount>>(r))).subscribe(r =>
            {
                r.error.subscribe(e => this.onError(e))
                r.result.pipe(map(cm => cm.entities.map(f => this.buildFeeAccountVm(f)))).subscribe(fList => this._feeAccounts.next(fList));
            })

        }
        else
        {
            this.student.person.pipe(mergeMap(r => this.roe<Person | ErrorResponse, Person>(r))).subscribe(p => this.feeAccountRepo.addFeeAccount({
                personId: p.id, termId: null }).pipe(mergeMap(r => this.roe<FeeAccount | ErrorResponse, FeeAccount>(r)))
                .subscribe(fa => 
                {
                    let vm = this.buildFeeAccountVm(fa)
                    this._feeAccounts.next([vm]);

                }))

        }
    }

}