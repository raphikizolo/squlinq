import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { ContextMenuViewModel } from "../../viewmodels/context.menu.view.model";

@Injectable()
export class ContextMenuViewModelFactory extends AbstractFactory<ContextMenuViewModel>
{
    /**
     *
     */
    constructor() 
    {
        super(() => new ContextMenuViewModel());
        
    }
}