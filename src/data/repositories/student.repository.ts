import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Student } from "../models/student";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { ApiMeta } from "../meta/api.meta";
import { RepositoryChange } from "./repository.changed";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
import { mergeMap, Observable, of } from "rxjs";
import { Person } from "../models/person";
import { PersonRepository } from "./person.repository";
import { PageModel } from "../models/page.model";
import { CollectionModel } from "../models/collection.model";
import { FeeAccount } from "../models/fee.account";
import { FeeAccountRepository } from "./fee.account.repository";

@Injectable()
@Repository(Student)
export class StudentRepository extends AbstractRepository<Student>
{
    
    

    /**
     *
     */
    constructor(api: Api, http: HttpClient, @Inject(REPOSITORY_META) apiMeta: ApiMeta, private personRepo: PersonRepository, 
    private feeAccountRepo: FeeAccountRepository) 
    {
        super(api.STUDENT_URL, Student.CLASS_NAME, http, apiMeta.getService(StudentRepository, Student));
        
    }

    addStudent(student: Student, personId: string, gradeId: string): Observable<Student | ErrorResponse>
    {
        return this.httpClient.post<Student | ErrorResponse>(`${this.baseUrl}?personId=${personId}&gradeId=${gradeId}`, student)
    }


    protected override handleRepositoryChanges(c: RepositoryChange<Student>): void 
    {
    }



    @EntityObservableProperty('person')
    private ownerObservableBuilder(): (r: any) => Observable<Person | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'person')).pipe(mergeMap(l => this.personRepo.entityQuery(l!)));
    }

    @EntityObservableProperty('feeAccounts', true)
    private feeAccountsObservableBuilder(): (r: any) => Observable<CollectionModel<FeeAccount> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'feeAccounts')).pipe(mergeMap(l => this.feeAccountRepo.collectionQuery(l!)));
    }

}