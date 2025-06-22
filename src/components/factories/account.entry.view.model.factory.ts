import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { TermViewModel } from "../../viewmodels/term.view.model";
import { DefaultDateFormat } from "../../pipes/dd.mm.yy";
import { AccountEntryViewModel } from "../../viewmodels/account.entry.view.model";

@Injectable()
export class AccountEntryViewModelFactory extends AbstractFactory<AccountEntryViewModel>
{

    /**
     *
     */
    constructor(df: DefaultDateFormat) 
    {
        super(() => new AccountEntryViewModel(df));
        
    }
}