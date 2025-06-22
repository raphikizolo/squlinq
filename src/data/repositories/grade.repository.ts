import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { combineLatest, filter, map, mergeMap, Observable, of } from "rxjs";
import { CollectionModel } from "../models/collection.model";
import { RepositoryChange } from "./repository.changed";
import { Streams } from "../../components/streams";
import { Grade } from "../models/grade";
import { ApiMeta } from "../meta/api.meta";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
import { PageModel } from "../models/page.model";
import { Student } from "../models/student";
import { StudentRepository } from "./student.repository";
import { FeeStructure } from "../models/fee.structure";
import { FeeStructureRepository } from "./fee.structure.repository";

@Injectable()
@Repository(Grade)
export class GradeRepository extends AbstractRepository<Grade>
{
    
    
    
    constructor(api: Api, httpClient: HttpClient, @Inject(REPOSITORY_META) repoMeta: ApiMeta, private studentRepo: StudentRepository
                , private feeStructureRepo: FeeStructureRepository)
    {
        super(api.GRADE_URL, Grade.CLASS_NAME, httpClient, repoMeta.getService(GradeRepository, Grade));
    }

    protected override handleRepositoryChanges(c: RepositoryChange<Grade>): void 
    {

    }

    // protected override getJsonReplacer(): (e: any, k: string, v: any) => any 
    // {
    //     return (e, k, v) =>
    //     {
    //         if(this.links.includes(k)) return undefined;
    //         if(e[k] instanceof Date)
    //         {
    //             let d = new Date(e[k].toISOString());
    //             d.setHours(d.getHours() + 3);
    //             return d.toISOString();
    //         };
    //         return v;
    //     }
        
    // }


    @EntityObservableProperty('students', true)
    private studentsObservableBuilder(): (r: any) => Observable<PageModel<Student> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'students', true)).pipe(mergeMap(l => this.studentRepo.pageQuery(l!)));
    }


    @EntityObservableProperty('feeStructures', true)
    private feeStructuresObservableBuilder(): (r: any) => Observable<CollectionModel<FeeStructure> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'feeStructures', true)).pipe(mergeMap(l => this.feeStructureRepo.collectionQuery(l!)));
    }
    
}