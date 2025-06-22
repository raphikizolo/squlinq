import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { StudentFeePaymentViewModel } from "../../viewmodels/student.fee.payment.view.model";
import { StudentRepository } from "../../data/repositories/student.repository";
import { FeeAccountViewModelFactory } from "./fee.account.view.model.factory";
import { TermViewModelFactory } from "./term.view.model.factory";
import { FeeAccountRepository } from "../../data/repositories/fee.account.repository";
import { Router } from "@angular/router";

@Injectable()
export class StudentFeePaymentViewModelFactory extends AbstractFactory<StudentFeePaymentViewModel>
{
    
    
    constructor(private termVmFactory: TermViewModelFactory, private studentRepo: StudentRepository, 
        private feeAccountVmFactory: FeeAccountViewModelFactory, feeAccountRepo: FeeAccountRepository, router: Router) 
    {
        super(() => new StudentFeePaymentViewModel(termVmFactory, studentRepo, feeAccountVmFactory, feeAccountRepo, router));
    }
}