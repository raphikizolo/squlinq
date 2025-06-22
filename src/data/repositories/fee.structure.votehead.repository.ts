import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { combineLatest, filter, map, mergeMap, Observable, of } from "rxjs";
import { CollectionModel } from "../models/collection.model";
import { RepositoryChange } from "./repository.changed";
import { Streams } from "../../components/streams";
import { FeeStructureVotehead } from "../models/fee.structure.votehead";
import { ApiMeta } from "../meta/api.meta";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
import { PageModel } from "../models/page.model";
import { FeeAccount } from "../models/fee.account";
import { FeeAccountRepository } from "./fee.account.repository";
import { FeeStructure } from "../models/fee.structure";
import { FeeStructureRepository } from "./fee.structure.repository";

@Injectable()
@Repository(FeeStructureVotehead)
export class FeeStructureVoteheadRepository extends AbstractRepository<FeeStructureVotehead>
{
    
    
    
    constructor(api: Api, httpClient: HttpClient, @Inject(REPOSITORY_META) repoMeta: ApiMeta, private feeAccountRepo: FeeAccountRepository, 
    private feeStructureRepo: FeeStructureRepository)
    {
        super(api.FEE_STRUCTURE_VOTEHEAD_URL, FeeStructureVotehead.CLASS_NAME, httpClient, repoMeta.getService(FeeStructureVoteheadRepository, FeeStructureVotehead));
    }

    protected override handleRepositoryChanges(c: RepositoryChange<FeeStructureVotehead>): void 
    {
        // this.ifNotInChangeHierarchy(c).pipe(

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


    @EntityObservableProperty('', true)
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