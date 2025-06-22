import { Inject, Injectable, INJECTOR, Injector } from "@angular/core";
import { TableHeaderViewModel } from "./table.header.view.model";
import { TableRowViewModel } from "./table.row.view.model";
import { DataSource } from "@angular/cdk/collections";

@Injectable()
export class TableContentViewModel
{


    rows: TableRowViewModel[] = [];

    constructor(public headerVm: TableHeaderViewModel, @Inject(INJECTOR) private injector: Injector)
    {

    }

    addEmptyRow()
    {
        let r = this.injector.get(TableRowViewModel);
        r.loadCells();
        this.rows.push(r);

    }


}