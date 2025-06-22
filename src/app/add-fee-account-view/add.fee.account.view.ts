import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Command } from '../../components/command';
import { IFactory } from '../../components/interfaces/i.factory';
import { BehaviorSubject, map, mergeMap } from 'rxjs';
import { ResultOrError } from '../../components/result.or.error';
import { ErrorResponse } from '../../data/models/error.response';
import { Person } from '../../data/models/person';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommandDirective } from '../../directives/command';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { GradeRepository } from '../../data/repositories/grade.repository';
import { ViewBase } from '../view.base';
import { CollectionModel } from '../../data/models/collection.model';
import { Grade } from '../../data/models/grade';
import { SelectionModel } from '@angular/cdk/collections';
import { FeeAccount } from '../../data/models/fee.account';
import { Term } from '../../data/models/term';
import { StudentRepository } from '../../data/repositories/student.repository';
import { Student } from '../../data/models/student';
import { AddFeeAccountViewModel } from '../../viewmodels/add.fee.account.view.model';
import { TermRepository } from '../../data/repositories/term.repository';
import { TermViewModel } from '../../viewmodels/term.view.model';
import { TermViewModelFactory } from '../../components/factories/term.view.model.factory';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'add-fee-account-view',
    templateUrl: 'add.fee.account.view.html',
    styleUrl: 'add.fee.account.view.scss',
    imports: [FlexModule, FormsModule, MatFormFieldModule, MatIconModule, MatMenuModule, ReactiveFormsModule, CommonModule, MatButtonModule, CommandDirective, 
        RouterModule, MatSelectModule],
    providers: [AddFeeAccountViewModel],
    standalone: true
})
export class AddNewFeeAccountView extends ViewBase implements OnInit 
{

    save = new Command(() => this.saveFeeAccount())

    
    
    terms = new BehaviorSubject<TermViewModel[]>([])

    termFormControl = new FormControl<TermViewModel | null>(null, Validators.required)

    constructor(private snackBar: MatSnackBar, 
        private router: Router, 
        private route: ActivatedRoute, 
        private studentRepo: StudentRepository, 
        private termRepo: TermRepository,
        private termVmFactory: TermViewModelFactory,
        public vm: AddFeeAccountViewModel)
    {
        super()
        route.params.pipe(
                    map(p => p['id']! as string),
                    mergeMap(id => studentRepo.findById(id)),
                    mergeMap(r => this.roe<Student | ErrorResponse, Student>(r))).subscribe(p => 
                        {
                            this.vm.student = p;
                            this.loadTerms()
                        })
        

    }

    ngOnInit() { }

    private loadTerms()
    {
        this.termRepo.findAll().pipe(
            mergeMap(r => this.roe<CollectionModel<Term> | ErrorResponse, CollectionModel<Term>>(r)),
            map(cm => cm.entities),
            map(l => l.map(t => this.buildTermVm(t)))).subscribe(vmList => this.terms.next(vmList))

    }


    private buildTermVm(t: Term): any 
    {
        let vm = this.termVmFactory.build()
        vm.term = t
        return vm
        

    }


    private saveFeeAccount()
    {
        this.vm.term = this.termFormControl.value!!.term
        this.vm.addFeeAccount().pipe(mergeMap(r => this.roe<FeeAccount | ErrorResponse, FeeAccount>(r))).subscribe(x => 
            this.snackBar.open(`Fee Account saved`, 'Ok', { duration: 5000 }))
    }
    
}