import { Injectable, Injector } from "@angular/core";
import { AbstractProvider } from "./abstract.provider";
import { TermRepository } from "../../data/repositories/term.repository";


@Injectable()
export class TermRepositoryProvider extends AbstractProvider<TermRepository>
{

    /**
     *
     */
    constructor(injector: Injector) 
    {
        super(() => injector.get(TermRepository));
        
    }


}