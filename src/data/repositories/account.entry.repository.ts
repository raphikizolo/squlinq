import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { combineLatest, filter, map, mergeMap, Observable, of } from "rxjs";
import { CollectionModel } from "../models/collection.model";
import { RepositoryChange } from "./repository.changed";
import { Streams } from "../../components/streams";
import { AccountEntry } from "../models/account.entry";
import { ApiMeta } from "../meta/api.meta";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { Account } from "../models/account";
import { ErrorResponse } from "../models/error.response";
import { AccountRepository } from "./account.repository";
import { AccountRepositoryProvider } from "../../components/providers/account.repository.provider";
import { Transaction } from "../models/transaction";
import { TransactionRepository } from "./transaction.repository";

@Injectable()
@Repository(AccountEntry)
export class AccountEntryRepository extends AbstractRepository<AccountEntry>
{
    
    
    
    constructor(api: Api, httpClient: HttpClient, @Inject(REPOSITORY_META) repoMeta: ApiMeta, private accountRepoProvider: AccountRepositoryProvider,
                private transactionRepo: TransactionRepository)
    {
        super(api.ACCOUNT_ENTRY_URL, AccountEntry.CLASS_NAME, httpClient, repoMeta.getService(AccountEntryRepository, AccountEntry));
    }

    protected override handleRepositoryChanges(c: RepositoryChange<AccountEntry>): void 
    {

    }

    addSameAccountReference(dto: { entryOneId: string, entryTwoId: string}): Observable<AccountEntry | ErrorResponse>
    {
        return this.httpClient.post<AccountEntry | ErrorResponse>(`${this.baseUrl}/same_account_reference`, JSON.stringify(dto))
    }

    
    @EntityObservableProperty('account')
    private accountsObservableBuilder(): (r: any) => Observable<Account | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'account')).pipe(mergeMap(l => this.accountRepoProvider.provide().entityQuery(l!)));
    }


    @EntityObservableProperty('transaction', true)
    private transactionObservableBuilder(): (r: any) => Observable<Transaction | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'transaction')).pipe(mergeMap(l => this.transactionRepo.entityQuery(l!)));
    }


    @EntityObservableProperty('crossReferences', true)
    private xReferenceObservableBuilder(): (r: any) => Observable<CollectionModel<AccountEntry> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'crossReferences')).pipe(mergeMap(l => this.collectionQuery(l!)));
    }


    @EntityObservableProperty('sameAccountReferences', true)
    private sameAccountxReferenceObservableBuilder(): (r: any) => Observable<CollectionModel<AccountEntry> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'sameAccountReferences')).pipe(mergeMap(l => this.collectionQuery(l!)));
    }
    
}