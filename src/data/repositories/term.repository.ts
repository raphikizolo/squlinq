import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { combineLatest, filter, map, mergeMap, Observable, of } from "rxjs";
import { CollectionModel } from "../models/collection.model";
import { RepositoryChange } from "./repository.changed";
import { Streams } from "../../components/streams";
import { Term } from "../models/term";
import { ApiMeta } from "../meta/api.meta";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
import { PageModel } from "../models/page.model";
import { FeeAccount } from "../models/fee.account";
import { FeeAccountRepository } from "./fee.account.repository";
import { FeeStructure } from "../models/fee.structure";
import { FeeStructureRepository } from "./fee.structure.repository";

@Injectable()
@Repository(Term)
export class TermRepository extends AbstractRepository<Term>
{
    
    
    
    constructor(api: Api, httpClient: HttpClient, @Inject(REPOSITORY_META) repoMeta: ApiMeta, private feeAccountRepo: FeeAccountRepository, 
    private feeStructureRepo: FeeStructureRepository)
    {
        // super(api.Term_URL, 'TermList', httpClient, "Term");
        super(api.TERM_URL, Term.CLASS_NAME, httpClient, repoMeta.getService(TermRepository, Term));
        // this.addProperties(['firstName', 'middleName', 'surname']);
        // this.addLinks(['projects']);
        // this.addOptionalLinks(['projects']);
    }

    protected override handleRepositoryChanges(c: RepositoryChange<Term>): void 
    {
        // this.ifNotInChangeHierarchy(c).pipe(
        //     mergeMap(c => this.ifUpdated(c)), 
        //     mergeMap(updatedList => combineLatest(updatedList.map(t => t.voteheads.pipe(mergeMap(v => of(v?.entities)))))),
        //     mergeMap(vv => of(Streams.where(vv, v => v != undefined))),
        //     mergeMap(vv => of(vv.reduce((r, i) => r!.concat(i!)))),
        //     filter(v => v != undefined)/*<--redundant but pleases the compiler so..*/).subscribe(v => this.voteheadRepo
        //         .notifyChanged(v!, "update", c.sources));

    }

    
    // protected override convertToEntity(r: any): Term
    // {
    //     let p = new Term();
    //     p.id = this.extractId(r);
    //     p.firstName = r.name
    //     p.middleName = r.middleName
    //     p.surname = r.surname
    //     p.self = this.findById(p.id);
    //     return p;
    // }

    

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


    @EntityObservableProperty('feeAccounts', true)
    private feeAccountsObservableBuilder(): (r: any) => Observable<PageModel<FeeAccount> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'feeAccounts', true)).pipe(mergeMap(l => this.feeAccountRepo.pageQuery(l!)));
    }

    @EntityObservableProperty('feeStructure', true)
    private feeStructureObservableBuilder(): (r: any) => Observable<FeeStructure | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'feeStructure', true)).pipe(mergeMap(l => this.feeStructureRepo.entityQuery(l!)));
    }
    
}