import { CollectionViewer } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, merge, mergeMap, Observable, of, Subject, zip } from "rxjs";
import { Api } from "../components/api";
import { PageModel } from "../data/models/page.model";
import { TableHeadersViewModel } from "./table.headers.view.model";
import { TableHeadersViewModelFactory } from "../components/factories/table.headers.view.model.factory";
import { Student } from "../data/models/student";
import { DefaultTimeFormat } from "../pipes/dd.mm.yy.am.pm";
import { IPage } from "../data/models/page";
import { Pair } from "../data/models/pair";
import { RxjUtils } from "../components/rxj.utils";
import { StudentRepository } from "../data/repositories/student.repository";
import { Person } from "../data/models/person";
import { StudentViewModel } from "./student.view.model";
import { StudentViewModelFactory } from "../components/factories/student.view.model.factory";
import { Router } from "@angular/router";
import { Command } from "../components/command";
import { ResultOrError } from "../components/result.or.error";
import { ErrorResponse } from "../data/models/error.response";
import { ViewModelBase } from "./view.model.base";



@Injectable()
export class StudentTableListViewModel extends ViewModelBase
{
    
    

    private page = new Subject<PageModel<Student>>();

    private items = new Subject<StudentViewModel[]>();

    headersVm!: TableHeadersViewModel;

    date = new BehaviorSubject<Date>(new Date());

    studentCount: number = 0;




    constructor(private headersVmFactory: TableHeadersViewModelFactory, private studentRepository: StudentRepository, 
        private studentVmFactory: StudentViewModelFactory, private router: Router, private api: Api)
    {
        super();
        this.initialize();
        studentRepository.findAllPaged().pipe(mergeMap(r => this.roe<PageModel<Student> | ErrorResponse, PageModel<Student>>(r))).subscribe(pm => this.page.next(pm));
        

    }

    private initialize()
    {
        this.headersVm = this.headersVmFactory.build();
        this.page.subscribe(p => this.updateHeaders(p));
        this.page.subscribe(p => this.updateItems(p));

    }
    
    private updateItems(p: PageModel<Student>): void 
    {
        this.items.next([]);
        of(p.entities).pipe(
            mergeMap(studentList => zip(studentList.map(s => s.person.pipe(
                map(p => Pair.of(s, new ResultOrError<Person | ErrorResponse, Person>(p)))))))).subscribe(re => 
                {
                    merge(re.map(d => d.b.error)).pipe(mergeMap(e => e)).subscribe(e => this.onError(e));
                    zip(re.map(d => d.b.result.pipe(map(p => Pair.of(d.a, p))))).subscribe(p => 
                    {
                        let vmList = p.map(pa => this.buildStudentVm(pa))
                        this.items.next(vmList)

                    })

                })

        this.studentCount = p.page.totalElements;
    }
    
    
    private buildStudentVm(studentData: Pair<Student, Person>) 
    {
        let vm = this.studentVmFactory.build()
        vm.person = studentData.b
        vm.student = studentData.a
        vm.showFeePaymentViewComm = new Command(() => this.router.navigate(['app', 'student-fee-payment', vm.student.id]))
        vm.showAddFeeAccountViewComm = new Command(() => this.router.navigate(['app', 'add-fee-account', vm.student.id]))
        vm.showFeeStatementViewComm = new Command(() => this.router.navigate(['app', 'student-fee-statement', vm.student.id]));
        return vm
    }
    
    updatePaymentsFromDate(date: Date) 
    {
        this.date.next(date);
    }

    private updateHeaders(p: PageModel<Student>)
    {
        this.headersVm = this.headersVmFactory.build();
        this.headersVm.loadItemFieldNames(["admissionNumber", "firstName", "middleName", "surname"]);


    }

    loadPage(pageIndex: number, pageSize: number) 
    {
        this.studentRepository.pageQuery(`${this.api.STUDENT_URL}?page=${pageIndex}&pageSize=${pageSize}`).pipe(mergeMap(r => 
            this.roe<PageModel<Student> | ErrorResponse, PageModel<Student>>(r))).subscribe(p => this.page.next(p))
    }
    


    connect(): Observable<any[]> 
    {
        return this.items;
    }


    disconnect(): void 
    {
        this.items.unsubscribe();
    }

}