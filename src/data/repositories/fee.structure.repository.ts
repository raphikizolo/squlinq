import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { FeeStructure } from "../models/fee.structure";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { ApiMeta } from "../meta/api.meta";
import { RepositoryChange } from "./repository.changed";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
import { mergeMap, Observable, of } from "rxjs";
import { Person } from "../models/person";
import { PersonRepository } from "./person.repository";
import { AccountRepository } from "./account.repository";
import { Account } from "../models/account";
import { Term } from "../models/term";
import { TermRepository } from "./term.repository";
import { GradeRepository } from "./grade.repository";
import { Grade } from "../models/grade";
import { CollectionModel } from "../models/collection.model";
import { TermRepositoryProvider } from "../../components/providers/term.repository.provider";
import { GradeRepositoryProvider } from "../../components/providers/grade.repository.provider";

@Injectable()
@Repository(FeeStructure)
export class FeeStructureRepository extends AbstractRepository<FeeStructure>
{
    

    /**
     *
     */
    constructor(api: Api, http: HttpClient, @Inject(REPOSITORY_META) apiMeta: ApiMeta, private termRepoProvider: TermRepositoryProvider, 
    private accountRepo: AccountRepository, private gradeRepoProvider: GradeRepositoryProvider) 
    {
        super(api.FEE_STRUCTURE_URL, FeeStructure.CLASS_NAME, http, apiMeta.getService(FeeStructureRepository, FeeStructure));
        
    }

    addFeeStructure(feeStructureDTO: { termId: string | null, personId: string }): Observable<FeeStructure | ErrorResponse>
    {
        return this.httpClient.post<FeeStructure | ErrorResponse>(this.baseUrl, feeStructureDTO).pipe(mergeMap(r => this.transformObs(r)));
    }


    protected override handleRepositoryChanges(c: RepositoryChange<FeeStructure>): void 
    {
        // throw new Error("Method not implemented.");
    }



    @EntityObservableProperty('term')
    private ownerObservableBuilder(): (r: any) => Observable<Term | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'term')).pipe(mergeMap(l => this.termRepoProvider.provide().entityQuery(l!)));
    }


    @EntityObservableProperty('grades', true)
    private feeStructureObservableBuilder(): (r: any) => Observable<CollectionModel<Grade> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'grades')).pipe(mergeMap(l => this.gradeRepoProvider.provide().collectionQuery(l!)));
    }

}