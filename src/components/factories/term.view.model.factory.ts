import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { TermViewModel } from "../../viewmodels/term.view.model";
import { DefaultDateFormat } from "../../pipes/dd.mm.yy";

@Injectable()
export class TermViewModelFactory extends AbstractFactory<TermViewModel>
{

    /**
     *
     */
    constructor(dateF: DefaultDateFormat) 
    {
        super(() => new TermViewModel(dateF));
        
    }
}