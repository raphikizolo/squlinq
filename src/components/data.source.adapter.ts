import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";

export class DataSourceAdapter
{

    private subs = new Array<Subscription>();

    private adapter: BehaviorSubject<any> | undefined = new BehaviorSubject<any>([]);

    private bridge = new Subject<any>();

    private sourceSubscription: Subscription | undefined;

    constructor() 
    {

        
    }

    changeSource(source: Observable<any>)
    {
        this.sourceSubscription?.unsubscribe();
        this.sourceSubscription = source.subscribe(v => this.bridge.next(v));
    }

    
    connect(collectionViewer: CollectionViewer): Observable<any[]> 
    {
        this.adapter = new BehaviorSubject([]);
        this.subs.push(this.bridge.subscribe(v => this.adapter?.next(v)));
        return this.adapter;

    }


    disconnect(collectionViewer: CollectionViewer): void 
    {
        this.subs.forEach(s => s.unsubscribe());
        this.adapter = undefined;
    }
}