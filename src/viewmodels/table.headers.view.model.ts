import { Injectable } from "@angular/core";
import { TableHeaderViewModel } from "./table.header.view.model";
import { combineLatest, mergeMap, Observable, of, Subject } from "rxjs";
import { TableHeaderViewModelFactory } from "../components/factories/table.header.view.model.factory";
import { Streams } from "../components/streams";
import { Pair } from "../data/models/pair";

@Injectable()
export class TableHeadersViewModel
{

    // entryHeads!: Observable<string[]>;

    itemFieldNames = new Subject<TableHeaderViewModel[]>();

    columnNames = new Array<string>();


    constructor(private tableHeaderVmFactory: TableHeaderViewModelFactory)
    {
        this.itemFieldNames.subscribe(h => this.refreshColumnNames(h));


    }

    private refreshColumnNames(headers: TableHeaderViewModel[])
    {
        Streams.clear(this.columnNames);
        this.columnNames.push(...headers.map(x => x.command.name));
    }


    loadItemFieldNames(headerNames: string[])
    {
        this.itemFieldNames.next(headerNames.map(n => this.buildHeader(n)))
    }

    private buildHeader(name: string)
    {
        let vm = this.tableHeaderVmFactory.build();
        vm.setHeaderName(name);
        return vm;

    }

   
    
    
    

}