import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { FeeAccountPaymentViewModel } from "../../viewmodels/fee.account.payment.view.model";
import { Router } from "@angular/router";
import { StudentViewModelFactory } from "./student.view.model.factory";
import { TableHeadersViewModelFactory } from "./table.headers.view.model.factory";
import { VoteheadPaymentViewModelFactory } from "./votehead.payment.view.model.factory";
import { TransactionRepository } from "../../data/repositories/transaction.repository";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ISODateConverter } from "../converters/iso.date.converter";

@Injectable()
export class FeeAccountViewModelFactory extends AbstractFactory<FeeAccountPaymentViewModel>
{

    /**
     *
     */
    constructor(private headersVmFactory: TableHeadersViewModelFactory, private studentVmFactory: StudentViewModelFactory, private router: Router, 
            private vhPaymentVmFactory: VoteheadPaymentViewModelFactory, transRepo: TransactionRepository, snackBar: MatSnackBar, dateConverter: ISODateConverter) 
    {
        super(() => new FeeAccountPaymentViewModel(headersVmFactory, vhPaymentVmFactory, transRepo, snackBar, dateConverter));
        
    }
}