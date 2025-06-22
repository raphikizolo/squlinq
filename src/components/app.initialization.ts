import { Inject, Injectable } from "@angular/core";
import { ApiMeta } from "../data/meta/api.meta";
import { REPOSITORY_META } from "../data/repositories/abstract.repository";
import { AbstractConverter } from "./converters/abstract.converter";

@Injectable()
export class AppInitialization
{

    /**
     *
     */
    constructor(@Inject(REPOSITORY_META) api: ApiMeta, @Inject(AbstractConverter.CONVERTERS) converters: AbstractConverter<unknown, unknown>[]) 
    {
        //this needs to happen early.
        api.converters = converters
        
    }

    initialize()
    {
        //early code.
    }
}