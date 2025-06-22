import { Observable } from "rxjs";
import { PageModel } from "../models/page.model";
import { ErrorResponse } from "../models/error.response";
import { CollectionModel } from "../models/collection.model";

export interface IRepository<T>
{
    findById(id: string): Observable<T | ErrorResponse>;
    
    findAll(): Observable<CollectionModel<T> | ErrorResponse>;
    
    findAllPaged(): Observable<PageModel<T> | ErrorResponse>;

    add(entity: T): Observable<T | ErrorResponse>;

    update(entity: T): Observable<T | ErrorResponse>;


}