import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { Router } from "@angular/router";
import { StudentViewModelFactory } from "./student.view.model.factory";
import { TableHeadersViewModelFactory } from "./table.headers.view.model.factory";
import { VoteheadPaymentViewModelFactory } from "./votehead.payment.view.model.factory";
import { TransactionRepository } from "../../data/repositories/transaction.repository";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ISODateConverter } from "../converters/iso.date.converter";
import { FeeAccountStatementViewModel } from "../../viewmodels/fee.account.statement.view.model";
import { VoteheadStatementViewModelFactory } from "./votehead.statement.view.model.factory";

@Injectable()
export class FeeAccountStatementViewModelFactory extends AbstractFactory<FeeAccountStatementViewModel>
{

    /**
     *
     */
    constructor(private headersVmFactory: TableHeadersViewModelFactory, private studentVmFactory: StudentViewModelFactory, private router: Router, 
            private vhPaymentVmFactory: VoteheadStatementViewModelFactory, transRepo: TransactionRepository, snackBar: MatSnackBar, dateConverter: ISODateConverter) 
    {
        super(() => new FeeAccountStatementViewModel(headersVmFactory, vhPaymentVmFactory));
        
    }
}