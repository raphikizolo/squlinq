import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { StudentFeePaymentViewModel } from "../../viewmodels/student.fee.payment.view.model";
import { StudentRepository } from "../../data/repositories/student.repository";
import { FeeAccountViewModelFactory } from "./fee.account.view.model.factory";
import { TermViewModelFactory } from "./term.view.model.factory";
import { FeeAccountRepository } from "../../data/repositories/fee.account.repository";
import { Router } from "@angular/router";
import { StudentFeeStatementViewModel } from "../../viewmodels/student.fee.statement.view.model";
import { FeeAccountStatementViewModelFactory } from "./fee.account.statetment.view.model.factory";

@Injectable()
export class StudentFeeStatementViewModelFactory extends AbstractFactory<StudentFeeStatementViewModel>
{
    
    
    constructor(feeAccountVmFactory: FeeAccountStatementViewModelFactory, feeAccountRepo: FeeAccountRepository) 
    {
        super(() => new StudentFeeStatementViewModel(feeAccountVmFactory, feeAccountRepo));
    }
}