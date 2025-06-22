import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { VoteheadPaymentViewModel } from "../../viewmodels/votehead.payment.view.model";
import { VoteheadStatementViewModel } from "../../viewmodels/votehead.statement.view.model";
import { AccountEntryViewModelFactory } from "./account.entry.view.model.factory";

@Injectable()
export class VoteheadStatementViewModelFactory extends AbstractFactory<VoteheadStatementViewModel>
{
    constructor(aeVmFactory: AccountEntryViewModelFactory)
    {
        super(() => new VoteheadStatementViewModel(aeVmFactory))
    }
}