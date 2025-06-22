import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { FeeAccount } from "../models/fee.account";
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
import { TermRepositoryProvider } from "../../components/providers/term.repository.provider";

@Injectable()
@Repository(FeeAccount)
export class FeeAccountRepository extends AbstractRepository<FeeAccount>
{
    
    

    /**
     *
     */
    constructor(api: Api, http: HttpClient, @Inject(REPOSITORY_META) apiMeta: ApiMeta, private termRepo: TermRepositoryProvider, 
    private accountRepo: AccountRepository) 
    {
        super(api.FEE_ACCOUNT_URL, FeeAccount.CLASS_NAME, http, apiMeta.getService(FeeAccountRepository, FeeAccount));
        
    }

    addFeeAccount(feeAccountDTO: { termId: string | null, personId: string }): Observable<FeeAccount | ErrorResponse>
    {
        return this.httpClient.post<FeeAccount | ErrorResponse>(this.baseUrl, feeAccountDTO).pipe(mergeMap(r => this.transformObs(r)));
    }


    protected override handleRepositoryChanges(c: RepositoryChange<FeeAccount>): void 
    {
        // throw new Error("Method not implemented.");
    }



    @EntityObservableProperty('term')
    private termObservableBuilder(): (r: any) => Observable<Term | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'term')).pipe(mergeMap(l => this.termRepo.provide().entityQuery(l!)));
    }


    @EntityObservableProperty('account')
    private accountObservableBuilder(): (r: any) => Observable<Account | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'account')).pipe(mergeMap(l => this.accountRepo.entityQuery(l!)));
    }

}