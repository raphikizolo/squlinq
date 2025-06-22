import { Injectable } from "@angular/core";
import { PageModel } from "../data/models/page.model";
import { Streams } from "./streams";
import { IPage } from "../data/models/page";

@Injectable()
export class PageBuilder
{
    
    createPageModel<T>(items: T[], pageNumber: number, pageSize: number): PageModel<T> 
    {
        let p = this.createPage(items, pageNumber, pageSize);
        if(Streams.isEmpty(items)) return { entities: [], page: p, self: '' };
        return {
            entities: this.slice(items, p),
            page: p,
            self: ''
        }
    }
    
    
    private slice<T>(items: T[], p: IPage): T[] 
    {
        //if pageSize = 10
        //if pageNumber = 0, index = 0
        //if pageNumber = 1, index = 1 * 10 = 10.
        let index = p.number * p.size
        return items.slice(index, index + p.size);
    }
    
    //15
    //15/10 = 1.5
    private createPage<T>(items: T[], pageNumber: number, pageSize: number): IPage 
    {
        return {
            number: pageNumber,
            size: pageSize,
            totalElements: items.length,
            totalPages: Streams.isEmpty(items) ? 0 : (items.length < pageSize ? 1: Math.ceil(items.length/pageSize))
        }
    }


}