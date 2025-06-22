import { BehaviorSubject, filter, map, Observable, of } from "rxjs";
import { ErrorResponse } from "../data/models/error.response";
import { ApiMeta } from "../data/meta/api.meta";
import { Streams } from "./streams";

export class ResultOrError<T extends object, R>
{
    public get result(): Observable<R>
    {
        return this._value.pipe(filter(v => this.valid(v)), map(v => v as any as R));
    }

    public get error(): Observable<ErrorResponse>
    {
        return this._value.pipe(filter(v => !this.valid(v)), map(v => v as any as ErrorResponse));
    }

    private _value: BehaviorSubject<T>

    private errorResponseProps = ApiMeta.getInstance().getProperties(ErrorResponse, false).map(p => p.a)

    constructor(private t: T)
    {
         this._value = new BehaviorSubject(this.t)
        
    }


    private valid(v: T)
    {
        return !Streams.all(this.errorResponseProps, p => p in v)
    }


}