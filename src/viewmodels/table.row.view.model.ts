import { Inject, Injectable, Injector, INJECTOR } from "@angular/core";
import { TableCellViewModel } from "./table.cell.view.model";
import { TableHeaderViewModel } from "./table.header.view.model";
import { Streams } from "../components/streams";

@Injectable()
export class TableRowViewModel
{

    cells: TableCellViewModel[] = [];

    headerVm!: TableHeaderViewModel;
    
    constructor(@Inject(INJECTOR)private injector: Injector)
    {

    }

    loadCells()
    {
        // this.headerVm.headers.forEach(h => this.addCell(h.name));
    }

    addCell(header: string)
    {
        let c = this.injector.get(TableCellViewModel);
        // let i = this.headerVm.getHeaderIndex(header);
        // Streams.insert(this.cells, i, c);

    }
}