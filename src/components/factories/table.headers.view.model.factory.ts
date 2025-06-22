import { Inject, Injectable, InjectionToken, Injector, INJECTOR } from "@angular/core";
import { TableHeaderViewModel } from "../../viewmodels/table.header.view.model";
import { AbstractFactory } from "./abstract.factory";
import { TableHeadersViewModel } from "../../viewmodels/table.headers.view.model";
import { TableHeaderViewModelFactory } from "./table.header.view.model.factory";

@Injectable()
export class TableHeadersViewModelFactory extends AbstractFactory<TableHeadersViewModel>
{

    constructor(@Inject(INJECTOR) injector: Injector)
    {
        super(() => new TableHeadersViewModel(injector.get(TableHeaderViewModelFactory)));
    }

}