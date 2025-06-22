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

@Component({
    selector: 'student-fee-payment-view',
    templateUrl: 'student.fee.payment.view.html',
    styleUrl: 'student.fee.payment.view.scss',
    providers: [TableHeaderViewModelFactory],
    imports: [RouterModule, FlexModule, MatSelectModule, CommonModule, MatDatepickerModule, ReactiveFormsModule, MatTableModule, FieldNameToSentenseCase, 
        MatIconModule, CommandDirective, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatMenuModule, 
    MatDatepickerModule],
    standalone: true
})

export class StudentFeePaymentView extends ViewBase implements OnInit 
{
    

    

    id: string = ""

    termFormCtrl = new FormControl('', Validators.required);
    
    vm!: StudentFeePaymentViewModel;

    feeAccountsCtrl = new FormControl<FeeAccountPaymentViewModel | null>(null)
    
    selectedFeeAccount: FeeAccountPaymentViewModel | undefined;



    postedDateCtrl: FormControl<Date | null> = new FormControl(null);

    

    


    constructor(router: ActivatedRoute, private vmFactory: StudentFeePaymentViewModelFactory, studentRepo: StudentRepository) 
    {
        super();
        router.params.pipe(
            map(p => this.id = p['id']), 
            mergeMap(id => studentRepo.findById(id)),
            mergeMap(r => this.roe<Student | ErrorResponse, Student>(r))).subscribe(s => this.loadVm(s))
        
        this.postedDateCtrl.valueChanges.subscribe(v => 
        {
            if(this.selectedFeeAccount)
            {
                this.selectedFeeAccount.postingDate = v
            }
        }
        )

    }
    
    
    private loadVm(s: Student): void 
    {
        this.vm = this.vmFactory.build();
        this.vm.student = s
        
    }

    ngOnInit() { }


    selectionChanged(e: MatSelectChange<FeeAccountPaymentViewModel>) 
    {
        this.selectedFeeAccount = e.value
        
    }
}