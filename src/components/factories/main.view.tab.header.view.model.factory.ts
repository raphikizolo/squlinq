import { Injectable } from "@angular/core";
import { AbstractFactory } from "./abstract.factory";
import { MainViewTabHeaderViewModel } from "../../viewmodels/main.view.tab.header.view.model";

@Injectable()
export class MainViewTabHeaderViewModelFactory extends AbstractFactory<MainViewTabHeaderViewModel>
{

    /**
     *
     */
    constructor() 
    {
        super(() => new MainViewTabHeaderViewModel());
        
    }


}