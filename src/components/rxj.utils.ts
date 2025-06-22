import { BehaviorSubject, combineLatest, filter, map, mergeMap, Observable, of, Subject, Subscriber, Subscription, zip } from "rxjs";
import { PageModel } from "../data/models/page.model";
import { HttpClient } from "@angular/common/http";
import { Streams } from "./streams";
import { AnyCatcher } from "rxjs/internal/AnyCatcher";
import { Pair } from "../data/models/pair";
import { ResultOrError } from "./result.or.error";

export class RxjUtils
{

    static perpetualOf<T>(v: T): Observable<T>
    {
        return new Observable(sub => sub.next(v));
    }

    /**
     * calls zip if sources is not an empty array, of([]) if sources is an empty array. Possible usage: when you don't want the 
     * pipeline to stop if zip receives an empty array of sources. zip completes immediately if sources passed is empty.
     * @param sources 
     */
    static gigoZip<T>(sources: Observable<T>[]): Observable<T[]>
    {
        if(Streams.isEmpty(sources)) return this.perpetualOf([]);
        return zip(sources);
    }


    /**
     * Creates a pipeline that sources from the passed observable that can be switched off and on. Defaults as open.
     * @param o the source observable.
     * @returns 
     */
    static closeable<T>(o: Observable<T>): Observable<Pair<T, (close: boolean) => void>>
    {
        let state: { close: boolean } = { close: false } ;
        return o.pipe(
            filter(_ => !state.close),
            map(v => new Pair(v, b => state.close = b)));
    }


    /**
     * 
     * @param source 
     * @returns an observable that emits once and completes. Suitable to use with forkJoin since it only emits if and only if all observables 
     * complete.
     */
    static latestAndComplete<T>(source: Observable<T>): Observable<T>
    {
        return source.pipe(mergeMap(v => this.perpetualOf(v)));
    }


    /**
     * calls combineLatest if sources is not an empty array, of([]) if sources is an empty array. Possible usage: when you don't want the 
     * pipeline to stop if combine latest receives an empty array of sources. combineLatest completes immediately if sources passed is empty.
     * @param sources 
     */
    static gigoCombineLatest<T extends any>(sources: Observable<T>[]): Observable<T[]>
    {
        if(Streams.isEmpty(sources)) return this.perpetualOf([]);
        return combineLatest(sources);
    }

    static traversePages<T>(pm: PageModel<T>, httpClient: HttpClient): Observable<T[]>
    {
        return new Observable(sub => 
        {
            let r: T[] = [];
            RxjUtils.tryReturn(sub, pm, httpClient, r);

        });

    }

    private static tryReturn<T>(sub: Subscriber<T[]>, pm: PageModel<T>, httpClient: HttpClient, result: T[])
    {
        result.push(...pm.entities);
        if(!pm.next)
        {
            sub.next(result);
            sub.complete();
            return;
        }
        httpClient.get<PageModel<T>>(pm.next).subscribe(p => this.tryReturn(sub, p, httpClient, result));



    }
}