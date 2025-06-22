import { Component, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { StudentTableListViewModel } from '../viewmodels/student.table.list.view.model';
import { FieldNameToSentenseCase } from '../pipes/field.name.to.sentense.case';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommandDirective } from '../directives/command';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TableHeaderViewModelFactory } from '../components/factories/table.header.view.model.factory';

@Component({
    selector: 'student-list-view',
    templateUrl: 'student.list.view.html',
    styleUrl: 'student.list.view.scss',
    providers: [StudentTableListViewModel, TableHeaderViewModelFactory],
    imports: [FlexModule, MatTableModule, FieldNameToSentenseCase, CommonModule, MatIconModule, MatMenuModule, CommandDirective, MatPaginatorModule],
    standalone: true
})
export class StudentListView implements OnInit 
{

    log(col: string,element: any) 
    {
        console.log(`${col}: ${element}`);
        
    }

    



    constructor(public vm: StudentTableListViewModel) 
    {

    }

    ngOnInit() 
    {
        
    }


    onPageChange($event: PageEvent) 
    {
        this.vm.loadPage($event.pageIndex, $event.pageSize)
    }

}