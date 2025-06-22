import { filter, interval, mergeMap, Observable, of, Subject, tap } from "rxjs";
import { PageModel } from "../models/page.model";
import { IRepository } from "./i.repository";
import { Streams } from "../../components/streams";
import { HttpClient } from "@angular/common/http";
import { Entity } from "../models/entity";
import { CollectionModel } from "../models/collection.model";
import { DeletionResponse } from "../models/deletion.response";
import { IPage } from "../models/page";
import { CollectionUpdateData } from "../models/collection.update.data";
import { RepositoryChange, Source } from "./repository.changed";
import { InjectionToken } from "@angular/core";
import { ApiMeta } from "../meta/api.meta";
import { ApiMetaRepositoryService } from "../meta/api.meta.repository.service";
import { EntityObservableProperty } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
declare var require: any;


export const REPOSITORY_META = new InjectionToken('repository_meta');
// let AbstractRepositoryClass: symbol = Symbol('AbstractRepositoryClassToken')

export abstract class AbstractRepository<T extends Entity<T>> implements IRepository<T>
{
    // static readonly cluss = AbstractRepositoryClass

    private properties = new Array<string>();
    protected links = ['self'];
    protected optionalLinks: string[] = [];
    protected sourceToken!: string;
    protected responseListName!: string;

    //replace this with an event tree system.
    // repositoryChanged: Subject<RepositoryChange<T>> = new Subject();

    constructor(protected baseUrl: string, public entityName: string, protected httpClient: HttpClient, 
        private repoMetaSvc: ApiMetaRepositoryService)
    {
        // this.repositoryChanged.subscribe(c => this.handleRepositoryChanges(c));
        this.sourceToken = entityName.toLowerCase()
        this.responseListName = entityName.substring(0, 1).toLowerCase() + entityName.substring(1) + 'List'
        repoMetaSvc.configure(this)

        this.initialize()
        

    }

    private initialize()
    {
        this.properties = this.repoMetaSvc.properties.map(p => p.a)
    }

    delete(t: T): Observable<DeletionResponse>
    {
        return this.httpClient.delete(`${this.baseUrl}/${t.id}`).pipe(mergeMap(r => this.transformToDeleteResponse(r, t)));
    }

    protected ifAdded(c: RepositoryChange<T>): Observable<T[]>
    {
        return of(c.added).pipe(filter(list => Streams.isNotEmpty(list)));
    }


    protected ifUpdated(c: RepositoryChange<T>): Observable<T[]>
    {
        return of(c.updated).pipe(filter(list => Streams.isNotEmpty(list)));
    }

    protected ifDeleted(c: RepositoryChange<T>): Observable<T[]>
    {
        return of(c.removed).pipe(filter(list => Streams.isNotEmpty(list)));
    }


    protected ifNotInChangeHierarchy(c: RepositoryChange<T>): Observable<RepositoryChange<T>>
    {
        // if(c.inChangeHierarchy(this.sourceToken)) return;
        throw Error('NI')
        // return of(c).pipe(filter(ch => !ch.inChangeHierarchy(this.sourceToken)));
        
    }

    notifyChanged(t: T[], change: "addition" | "update" | "deletion", sources: string[])
    {
        // throw new Error('Replace this with an event tree system.')
        // let c = new RepositoryChange<T>(sources.concat([this.sourceToken]));
        // switch (change) 
        // {
        //     case "addition":
        //         c.added.push(...t);
        //         // this.repositoryChanged.next(c);
        //         break;
        //     case "update":
        //         c.updated.push(...t);
        //         // this.repositoryChanged.next(c);
        //         break;
        //     case "deletion":
        //         c.removed.push(...t);
        //         // this.repositoryChanged.next(c);
        //         break;
        
        //     default:
        //         throw new Error('Error during a change notification.');
        // }

    }


    protected abstract handleRepositoryChanges(c: RepositoryChange<T>): void;


    private transformToDeleteResponse(r: any, t: T): Observable<DeletionResponse>
    {
        let missingProps = ['id', 'deleted'].filter(p => !(p in r));
        if(Streams.isNotEmpty(missingProps)) throw Error(`Error transforming a deletion response. Response is expected to have the following properties` +
            missingProps.join(','));
        throw Error("NI")
        // if(r['deleted']) setTimeout(() => this.notifyChanged([t], 'deletion', [this.sourceToken]));
        return of({ id: r['id'], deleted: r['deleted']});
    }

    protected addProperties(props: string[])
    {
        this.properties.push(...props);
    }

    protected addLinks(links: string[])
    {
        this.links.push(...links);
    }

    protected addOptionalLinks(links: string[])
    {
        this.optionalLinks.push(...links);
    }

    protected checkProperties(e: any): string[]
    {
        return Streams.where(this.properties, p => !(p in e));

    }

    protected transformToCollectionUpdateData(r: any): Observable<CollectionUpdateData>
    {
        return new Observable(subscriber => 
            {
                let cud: CollectionUpdateData = { add: [], remove: [] };
                if('add' in r) cud.add.push(...r['add']);
                if('remove' in r) cud.add.push(...r['remove']);
                subscriber.next(cud);
                subscriber.complete();
    
            });

    }

    protected extractId(e: any): string
    {
        let s = this.extractLink(e, 'self') || '';
        return s.replace(this.baseUrl + '/', '');
    }
    
    protected extractLink(e: any, property: string, _try: boolean = false): string | undefined
    {
        if(!('_links' in e)) throw Error('Object expected to have a property called _links.');
        let links = e['_links'];
        if(_try)
        {
            if(!(property in links)) return undefined;
            return links[property].href;

        }
        else
        {
            if(!(property in links)) throw Error(`Object's _links property(obj._links) expected to have a property named ${property}.`);
            return links[property].href;
        }
        
    }

    @EntityObservableProperty('self')
    selfObservableBuilder(): (r: any) => Observable<T | ErrorResponse>
    {
        return (r: any) => this.findById(this.extractId(r))
    }

    findById(id: string): Observable<T |  ErrorResponse> 
    {
        return this.httpClient.get<any>(`${this.baseUrl}/${id}`).pipe(mergeMap(r => this.transformObs(r)));
    }


    protected convertToPostData(e: T): string 
    {
        return this.repoMetaSvc.toJson(e)
    }

    private transform(r: any): T
    {
        let missingProps = this.checkProperties(r);
        let missingLinks = this.checkLinks(r);

        if(Streams.isNotEmpty(missingProps)) 
        {
            throw new Error(`Error transforming response in repository ${typeof this}. The object to be transformed into an 
                entity has the following properties missing: [${missingProps.join()}]`)
        }
        if(Streams.isNotEmpty(missingLinks)) 
            {
                throw new Error(`Error transforming response in repository ${typeof this}. The object to be transformed into an 
                    entity has the following links missing: [${missingLinks.join()}]`)
            }
        return this.convertToEntity(r);
    }
    
    private checkLinks(r: any): string[]
    {
        let links = r['_links'];
        return Streams.where(Streams.difference(new Set(this.links), new Set(this.optionalLinks)), p => !(p in links));

    }

    
    protected transformObs(r: any): Observable<T>
    {
        return of(this.transform(r));

    }


    protected convertToEntity(r: any): T
    {
        let e = Reflect.construct(this.repoMetaSvc.entityClassCtor, [])
        e.id = this.extractId(r)
        this.repoMetaSvc.loadSimpleProperties(e, r)
        this.repoMetaSvc.loadLinkProperties(e, r)
        return e
    }

    
    findAllPaged(): Observable<PageModel<T> | ErrorResponse>
    {
        return this.httpClient.get<any>(this.baseUrl).pipe(mergeMap(r => this.transformToPageModel(r)))

    }

    findAll(): Observable<CollectionModel<T> | ErrorResponse>
    {
        return this.httpClient.get<any>(this.baseUrl).pipe(mergeMap(r => this.transformToCollectionModel(r)))

    }


    protected transformToPageModel(r: any): Observable<PageModel<T>>
    {
        return new Observable(subscriber => 
            {
                let missingProps = Streams.where(['page', '_links'], p => !(p in r));
                if(Streams.isNotEmpty(missingProps)) 
                {
                    subscriber.error(new Error(`Error transforming response in repository ${typeof this}. The object to be 
                        transformed into a page model has the following properties missing: [${missingProps.join()}]`));
                    return;
                }
                let entities = this.tryGetEntities(r);
                let links = r['_links'];
                let pm: PageModel<T> = { entities: entities, page: r['page'], self: links['self']?.href };
                if(links['previous']) pm['previous'] = links['previous']?.href
                if(links['next']) pm['next'] = links['next']?.href
                subscriber.next(pm);
                subscriber.complete();
    
            });


    }

    private tryGetEntities(r: any): T[]
    {
        let e = r['_embedded'];
        if(!e) return [];
        return e[this.responseListName]?.map((e: any) => this.transform(e));
    }


    protected transformToCollectionModel(r: any): Observable<CollectionModel<T>>
    {
        return new Observable(subscriber => 
            {
                let missingProps = Streams.where(['_links'], p => !(p in r));
                if(Streams.isNotEmpty(missingProps)) 
                {
                    subscriber.error(new Error(`Error transforming response in repository. The object to be 
                        transformed into a collection model has the following properties missing: [${missingProps.join()}]`));
                    return;
                }
                let entities = [];
                if(r['_embedded'])
                {
                    let _embedded = r['_embedded'];
                    entities = _embedded[this.responseListName]?.map((e: any) => this.convertToEntity(e));
                }
                let links = r['_links'];
                let pm = { entities: entities, self: links['self']?.href };
                subscriber.next(pm);
                subscriber.complete();
    
            });

    }


    entityQuery(url: string): Observable<T | ErrorResponse>
    {
        return this.httpClient.get<any>(url).pipe(
            mergeMap(r => this.transformObs(r)),
            tap(_ => console.log(`url: ${url}. Response transformed.`)));

    }

    collectionQuery(url: string): Observable<CollectionModel<T> | ErrorResponse>
    {
        return this.httpClient.get<any>(url).pipe(mergeMap(r => this.transformToCollectionModel(r)),
                tap(c => console.log(`url: ${url}. Response transformed.`)));

    }

    pageQuery(url: string): Observable<PageModel<T> | ErrorResponse>
    {
        return this.httpClient.get<any>(url).pipe(mergeMap(r => this.transformToPageModel(r)));

    }


    add(e: T): Observable<T | ErrorResponse>
    {
        return this.httpClient.post(this.baseUrl, this.convertToPostData(e)).pipe(mergeMap(r => this.transformObs(r)), 
        tap(t => setTimeout(() => this.notifyChanged([t], 'addition', [this.sourceToken]))));

    }


    update(entity: T): Observable<T | ErrorResponse>
    {
        return this.httpClient.put(`${this.baseUrl}/${entity.id}`, JSON.stringify(entity)).pipe(mergeMap(r => this.transformObs(r)),
        tap(t => setTimeout(() => this.notifyChanged([t], 'update', [this.sourceToken]))));
    }

}