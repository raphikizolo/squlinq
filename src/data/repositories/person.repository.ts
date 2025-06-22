import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { combineLatest, filter, map, mergeMap, Observable, of } from "rxjs";
import { CollectionModel } from "../models/collection.model";
import { RepositoryChange } from "./repository.changed";
import { Streams } from "../../components/streams";
import { Person } from "../models/person";
import { ApiMeta } from "../meta/api.meta";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { Account } from "../models/account";
import { ErrorResponse } from "../models/error.response";
import { AccountRepository } from "./account.repository";
import { AccountRepositoryProvider } from "../../components/providers/account.repository.provider";

@Injectable()
@Repository(Person)
export class PersonRepository extends AbstractRepository<Person>
{
    
    
    
    constructor(api: Api, httpClient: HttpClient, @Inject(REPOSITORY_META) repoMeta: ApiMeta, private accountRepoProvider: AccountRepositoryProvider)
    {
        super(api.PERSON_URL, Person.CLASS_NAME, httpClient, repoMeta.getService(PersonRepository, Person));
    }

    protected override handleRepositoryChanges(c: RepositoryChange<Person>): void 
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


    @EntityObservableProperty('accounts', true)
    private studentsObservableBuilder(): (r: any) => Observable<CollectionModel<Account> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'accounts', true)).pipe(mergeMap(l => this.accountRepoProvider.provide().collectionQuery(l!)));
    }
    
}