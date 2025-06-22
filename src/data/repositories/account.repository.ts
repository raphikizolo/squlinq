import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { combineLatest, filter, map, mergeMap, Observable, of } from "rxjs";
import { CollectionModel } from "../models/collection.model";
import { RepositoryChange } from "./repository.changed";
import { Streams } from "../../components/streams";
import { Account } from "../models/account";
import { ApiMeta } from "../meta/api.meta";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
import { Person } from "../models/person";
import { PersonRepository } from "./person.repository";
import { AccountEntry } from "../models/account.entry";
import { AccountEntryRepository } from "./account.entry.repository";

@Injectable()
@Repository(Account)
export class AccountRepository extends AbstractRepository<Account>
{
    
    
    
    constructor(api: Api, httpClient: HttpClient, @Inject(REPOSITORY_META) repoMeta: ApiMeta, private personRepo: PersonRepository
                , private accountEntryRepo: AccountEntryRepository)
    {
        super(api.ACCOUNT_URL, Account.CLASS_NAME, httpClient, repoMeta.getService(AccountRepository, Account));
    }

    protected override handleRepositoryChanges(c: RepositoryChange<Account>): void 
    {

    }


    @EntityObservableProperty('owner')
    private ownerObservableBuilder(): (r: any) => Observable<Person | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'owner')).pipe(mergeMap(l => this.personRepo.entityQuery(l!)));
    }


    @EntityObservableProperty('accountEntries', true)
    private entriesObservableBuilder(): (r: any) => Observable<CollectionModel<AccountEntry> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'accountEntries', true)).pipe(mergeMap(l => this.accountEntryRepo.collectionQuery(l!)));
    }
    
}