import { Injectable } from "@angular/core";
import { PageViewModel } from "../../viewmodels/page.view.model";
import { AbstractFactory } from "./abstract.factory";
import { Observable } from "rxjs";
import { PageModel } from "../../data/models/page.model";


@Injectable()
export class PageViewModelFactory
{

    
    constructor() 
    {
        
        
    }



    build<Model, VM>(pageQuery: (link: string) => Observable<PageModel<Model>>, modelToVmAdapter: (m: Model) => VM): PageViewModel<Model, VM>
    {
        return new PageViewModel(pageQuery, modelToVmAdapter);
    }


}