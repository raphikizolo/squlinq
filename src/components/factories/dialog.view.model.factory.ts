import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { DialogViewModel } from "../../viewmodels/dialog.view.model";

@Injectable()
export class DialogViewModelFactory extends AbstractFactory<DialogViewModel>
{
    constructor()
    {
        super(() => new DialogViewModel())
    }
}