import { Injectable, Injector } from "@angular/core";
import { AbstractProvider } from "./abstract.provider";
import { GradeRepository } from "../../data/repositories/grade.repository";


@Injectable()
export class GradeRepositoryProvider extends AbstractProvider<GradeRepository>
{

    /**
     *
     */
    constructor(injector: Injector) 
    {
        super(() => injector.get(GradeRepository));
        
    }


}