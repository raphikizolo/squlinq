import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Command } from '../../components/command';
import { IFactory } from '../../components/interfaces/i.factory';
import { StudentViewModelFactory } from '../../components/factories/student.view.model.factory';
import { StudentViewModel } from '../../viewmodels/student.view.model';
import { Student } from '../../data/models/student';
import { BehaviorSubject, map, mergeMap } from 'rxjs';
import { ResultOrError } from '../../components/result.or.error';
import { ErrorResponse } from '../../data/models/error.response';
import { Person } from '../../data/models/person';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommandDirective } from '../../directives/command';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { GradeRepository } from '../../data/repositories/grade.repository';
import { ViewBase } from '../view.base';
import { CollectionModel } from '../../data/models/collection.model';
import { Grade } from '../../data/models/grade';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'add-new-student-view',
    templateUrl: 'add.new.student.view.html',
    styleUrl: 'add.new.student.view.scss',
    imports: [FlexModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatButtonModule, CommandDirective, 
        RouterModule, MatSelectModule],
    standalone: true
})
export class AddNewStudentView extends ViewBase implements OnInit 
{

    firstNameFormControl = new FormControl<string | null>(null, Validators.required);
    gradeFormControl = new FormControl<Grade | null>(null, Validators.required);
    middleNameFormControl = new FormControl<string | null>(null, Validators.required);
    surnameFormControl = new FormControl<string | null>(null, Validators.required);
    save = new Command(() => this.saveStudent())
    
    grades = new BehaviorSubject<Grade[]>([])

    constructor(@Inject(StudentViewModelFactory) private studentVmFactory: IFactory<StudentViewModel>, private snackBar: MatSnackBar, 
    private router: Router, gradeRepo: GradeRepository)
    {
        super()
        gradeRepo.findAll().pipe(
            mergeMap(r => this.roe<CollectionModel<Grade> | ErrorResponse, CollectionModel<Grade>>(r)),
            map(cm => cm.entities))
            .subscribe(grades => this.grades.next(grades))

    }

    ngOnInit() { }


    private saveStudent()
    {
        let vm = this.studentVmFactory.build();
        let p = new Person()
        let s = new Student()
        s.admissionNumber = 'dafdfwerw' //will be overwritten with a backend generated admission number.
        p.firstName = this.firstNameFormControl.value as string
        p.middleName = this.middleNameFormControl.value as string
        p.surname = this.surnameFormControl.value as string
        vm.person = p
        vm.student = s
        vm.grade = this.gradeFormControl.value as Grade
        vm.addStudent().pipe(map(r => new ResultOrError<Student | ErrorResponse, Student>(r))).subscribe(r => 
        {
            r.result.subscribe(s => this.onSave(s))
            r.error.subscribe(e => this.onSaveError(e))
        })
    }
    
    private onSaveError(e: ErrorResponse): void 
    {
        this.snackBar.open('Student failed to save.', 'Ok', { duration: 2000 });
    }

    private onSave(s: Student)
    {
        //todo. create the student list.
        
        this.router.navigate(['app', 'student-list'])

    }

    protected override onError(e: ErrorResponse)
    {
        super.onError(e)
        this.snackBar.open(`${e.message}`, 'Ok', { duration: 2000 });


    }
}