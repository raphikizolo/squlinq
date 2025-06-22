import { Inject, Injectable, InjectionToken, Injector, INJECTOR } from "@angular/core";
import { TableHeaderViewModel } from "../../viewmodels/table.header.view.model";
import { AbstractFactory } from "./abstract.factory";

@Injectable()
export class TableHeaderViewModelFactory extends AbstractFactory<TableHeaderViewModel>
{

    constructor(@Inject(INJECTOR) injector: Injector)
    {
        super(() => new TableHeaderViewModel());
    }

}