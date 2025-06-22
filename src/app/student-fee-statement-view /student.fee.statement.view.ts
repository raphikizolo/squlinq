import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentFeePaymentViewModel } from '../../viewmodels/student.fee.payment.view.model';
import { StudentFeePaymentViewModelFactory } from '../../components/factories/student.fee.payment.factory';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StudentRepository } from '../../data/repositories/student.repository';
import { map, mergeMap } from 'rxjs';
import { ErrorResponse } from '../../data/models/error.response';
import { Student } from '../../data/models/student';
import { ViewBase } from '../view.base';
import { FeeAccountPaymentViewModel } from '../../viewmodels/fee.account.payment.view.model';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommandDirective } from '../../directives/command';
import { FieldNameToSentenseCase } from '../../pipes/field.name.to.sentense.case';
import { TableHeaderViewModelFactory } from '../../components/factories/table.header.view.model.factory';
import { StudentTableListViewModel } from '../../viewmodels/student.table.list.view.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ICommand } from '../../components/interfaces/i.command';
import { Command } from '../../components/command';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FeeAccountStatementViewModel } from '../../viewmodels/fee.account.statement.view.model';
import { StudentFeeStatementViewModelFactory } from '../../components/factories/student.fee.statement.factory';
import { StudentFeeStatementViewModel } from '../../viewmodels/student.fee.statement.view.model';
import { HeightUpdaterDirective } from '../../directives/height.updater.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'student-fee-payment-view',
    templateUrl: 'student.fee.statement.view.html',
    styleUrl: 'student.fee.statement.view.scss',
    providers: [TableHeaderViewModelFactory],
    imports: [RouterModule, FlexModule, MatSelectModule, CommonModule, MatDatepickerModule, ReactiveFormsModule, MatTableModule, FieldNameToSentenseCase, 
        MatIconModule, CommandDirective, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatMenuModule, 
    MatDatepickerModule, HeightUpdaterDirective, MatTooltipModule],
    standalone: true
})

export class StudentFeeStatementView extends ViewBase implements OnInit 
{



    id: string = ""

    termFormCtrl = new FormControl('', Validators.required);
    
    vm!: StudentFeeStatementViewModel;

    feeAccountsCtrl = new FormControl<FeeAccountStatementViewModel | null>(null)
    
    selectedFeeAccount: FeeAccountStatementViewModel | undefined;


    constructor(router: ActivatedRoute, private vmFactory: StudentFeeStatementViewModelFactory, studentRepo: StudentRepository) 
    {
        super();
        router.params.pipe(
            map(p => this.id = p['id']), //assignment in typescript returns the value after assignment. wierd but it happens.
            mergeMap(id => studentRepo.findById(id)),
            mergeMap(r => this.roe<Student | ErrorResponse, Student>(r))).subscribe(s => this.loadVm(s))
        
    }
    
    
    private loadVm(s: Student): void 
    {
        this.vm = this.vmFactory.build();
        this.vm.student = s
        
    }

    ngOnInit() { }


    selectionChanged(e: MatSelectChange<FeeAccountStatementViewModel>) 
    {
        this.selectedFeeAccount = e.value
        
    }

    getDescription(payment: any) 
    {
        return payment['description']

    }
}