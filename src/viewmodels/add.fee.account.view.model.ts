import { Account } from "../data/models/account";
import { FeeAccount } from "../data/models/fee.account";
import { ViewModelBase } from "./view.model.base";
import { Term } from "../data/models/term";
import { Command } from "../components/command";
import { ICommand } from "../components/interfaces/i.command";
import { FeeAccountRepository } from "../data/repositories/fee.account.repository";
import { Person } from "../data/models/person";
import { mergeMap } from "rxjs";
import { ErrorResponse } from "../data/models/error.response";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";
import { Student } from "../data/models/student";

@Injectable()
export class AddFeeAccountViewModel extends ViewModelBase
{


    canSubmit = false

    public get description(): string 
    {
        if(this.term)
        {
            return `New Fee Account of ${this.month(this.term?.openingDate.getMonth()) || ''} ${this.term?.openingDate.getFullYear()}` ;

        }
        return ''
    }

    
    term!: Term;

    person!: Person

    private _student!: Student;

    public get student(): Student 
    {
        return this._student;
    }

    public set student(value: Student) 
    {
        this._student = value;
        this.handleStudentChanges()
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

        }
    }


    constructor(private feeAccountRepo: FeeAccountRepository)
    {
        super();

    }

    private handleStudentChanges()
    {
        this.student.person.pipe(mergeMap(r => this.roe<Person | ErrorResponse, Person>(r))).subscribe(p => this.person = p)
    }


    addFeeAccount()
    {
        return this.feeAccountRepo.addFeeAccount({ termId: this.term.id, personId: this.person.id })

    }

    private mos = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    private month(m: number)
    {
        return this.mos[m];
    }



}