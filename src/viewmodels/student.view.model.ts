import { filter, map, merge, mergeMap, Observable, Subject, tap, zip } from "rxjs";
import { Student } from "../data/models/student";
import { ErrorResponse } from "../data/models/error.response";
import { StudentRepository } from "../data/repositories/student.repository";
import { PersonRepository } from "../data/repositories/person.repository";
import { Person } from "../data/models/person";
import { ResultOrError } from "../components/result.or.error";
import { Command } from "../components/command";
import { ICommand } from "../components/interfaces/i.command";
import { Grade } from "../data/models/grade";

export class StudentViewModel
{


    showFeePaymentViewComm!: ICommand;
    
    showAddFeeAccountViewComm!: ICommand;

    showFeeStatementViewComm!: ICommand
    

    person!: Person

    private _student!: Student;
    
    grade!: Grade;
    
    
    public get firstName(): any 
    {
        return this.person.firstName
    }

    public get middleName(): any 
    {
        return this.person.middleName
    }

    public get surname(): any 
    {
        return this.person.surname
    }
    
    public get admissionNumber(): any 
    {
        return this.student.admissionNumber;
    }


    public get student(): Student 
    {
        return this._student;
    }

    public set student(value: Student) 
    {
        if(this._student != value)
        {
            this._student = value;
            this.handleStudentChanges()
        }
    }


    /**
     *
     */
    constructor(private repo: StudentRepository, private personRepo: PersonRepository) 
    {
        
    }


    private handleStudentChanges()
    {

    }


    addStudent(): Observable<Student | ErrorResponse>
    {
        return this.personRepo.add(this.person).pipe(
            map(r => new ResultOrError<Person | ErrorResponse, Person>(r)),
            tap(r => r.error.subscribe(e => this.onPersonSaveError(e))),
            mergeMap(r => r.result),
            mergeMap(p => this.repo.addStudent(this.student, p.id, this.grade.id)))
    }

    private onPersonSaveError(e: ErrorResponse): void 
    {
        throw new Error(`Error saving person. Details ${e}.`);
    }




}