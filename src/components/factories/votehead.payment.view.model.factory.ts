import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { VoteheadPaymentViewModel } from "../../viewmodels/votehead.payment.view.model";

@Injectable()
export class VoteheadPaymentViewModelFactory extends AbstractFactory<VoteheadPaymentViewModel>
{
    constructor()
    {
        super(() => new VoteheadPaymentViewModel())
    }
}