import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { combineLatest, filter, map, mergeMap, Observable, of } from "rxjs";
import { CollectionModel } from "../models/collection.model";
import { RepositoryChange } from "./repository.changed";
import { Streams } from "../../components/streams";
import { ApiMeta } from "../meta/api.meta";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
import { Person } from "../models/person";
import { PersonRepository } from "./person.repository";
import { AccountEntry } from "../models/account.entry";
import { AccountEntryRepository } from "./account.entry.repository";
import { BookkeepingAction } from "../models/bookkeeping.action";
import { Account } from "../models/account";
import { AccountRepository } from "./account.repository";
import { AccountEntryRepositoryProvider } from "../../components/providers/account.entry.repository.provider";
import { AccountRepositoryProvider } from "../../components/providers/account.repository.provider";

@Injectable()
@Repository(BookkeepingAction)
export class BookkeepingActionRepository extends AbstractRepository<BookkeepingAction>
{
    
    
    
    constructor(api: Api, httpClient: HttpClient, @Inject(REPOSITORY_META) repoMeta: ApiMeta, private personRepo: PersonRepository
                , private accountEntryRepo: AccountEntryRepositoryProvider, private accountRepo: AccountRepositoryProvider)
    {
        super(api.BOOKKEEPING_ACTION_URL, BookkeepingAction.CLASS_NAME, httpClient, repoMeta.getService(BookkeepingActionRepository, BookkeepingAction));
    }

    protected override handleRepositoryChanges(c: RepositoryChange<BookkeepingAction>): void 
    {

    }


    @EntityObservableProperty('accounts', true)
    private accountsObservableBuilder(): (r: any) => Observable<CollectionModel<Account> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'accounts')).pipe(mergeMap(l => this.accountRepo.provide().collectionQuery(l!)));
    }


    @EntityObservableProperty('accountEntries', true)
    private entriesObservableBuilder(): (r: any) => Observable<CollectionModel<AccountEntry> | ErrorResponse>
    {
        return (r: any) => of(this.extractLink(r, 'accountEntries', true)).pipe(mergeMap(l => this.accountEntryRepo.provide().collectionQuery(l!)));
    }
    
}