import { AbstractConverter } from "../../components/converters/abstract.converter";
import { Converter } from "../../components/converters/i.converter";
import { Streams } from "../../components/streams";
// import { Entity } from "../models/entity";
import { Pair } from "../models/pair";
import { Triple } from "../models/triple";
// import { AbstractRepository } from "../repositories/abstract.repository";
import { ApiMetaRepositoryService } from "./api.meta.repository.service";

export class ApiMeta
{
    
    

    
    private static instance?: ApiMeta = undefined;

    //repoclass => [(link_prop1, propObservableBuilder1), (link_prop2, propObservableBuilder2)...]
    private linkPropertyMap: Map<string, Set<Triple<string, string|undefined, boolean>>> = new Map();

    //entityclass => [prop1, prop2...]
    private simpleProperyMap: Map<string, Set<Pair<string, Function|undefined>>> = new Map();

    private repositories: Map<any, Function> = new Map();

    converters: AbstractConverter<unknown, unknown>[] = []


    getService(repoCtor: Function, entityClassCtor: Function)
    {
        return new ApiMetaRepositoryService(repoCtor, entityClassCtor, this, this.converters);
    }

    getProperties(entityClass: Function, isModel = true)
    {
        const { Entity } = require("../models/entity");
        let l = new Array(...this.simpleProperyMap.get(entityClass.name) || new Set<Pair<string, Function|undefined>>())
        if(isModel)
        {
            l = l.concat(...this.simpleProperyMap.get(Entity.name) || new Set<Pair<string, Function|undefined>>())
        }
        return l
        
    }


    getLinkProperties(repoCtor: Function)
    {
        const { AbstractRepository } = require("../repositories/abstract.repository");
        return new Array(...this.linkPropertyMap.get(repoCtor.name) || new Set<Triple<string, string, boolean>>())
        .concat(...this.linkPropertyMap.get(AbstractRepository.name) || new Set<Triple<string, string, boolean>>())
    }
    
    addRepository(entity: any, ctor: Function) 
    {
        this.repositories.set(entity, ctor);
    
    
    }



    registerApiLinkProperty(name: string, linkPropertyName: string)
    {
        Streams.computeIfAbsent(this.linkPropertyMap, name, k => new Set()).add(Triple.of(linkPropertyName, undefined, false));
    }


    addApiLinkProperty(name: string, linkPropertyName: string, observableBuilder: string, optional=false)
    {
        // Streams.computeIfAbsent(this.linkPropertyMap, name, k => new Set()).add(Pair.of(linkPropertyName, observableBuilder));
        if(this.linkPropertyMap.has(linkPropertyName))
        {
            let s = this.linkPropertyMap.get(linkPropertyName)!
            // let p = Streams.first(s, pa => pa.a == linkPropertyName)
            s.add(Triple.of(linkPropertyName, observableBuilder, optional))
        }
        else
        {
            Streams.computeIfAbsent(this.linkPropertyMap, name, k => new Set()).add(Triple.of(linkPropertyName, observableBuilder, optional));

        }
    }

    addApiProperty(name: string, propertyKey: string) 
    {
        let l = Streams.computeIfAbsent(this.simpleProperyMap, name, k => new Set())
        if(Streams.tryFirst(l, p => p.a == propertyKey)) return
        l.add(Pair.of(propertyKey, undefined));
        
    }

    addConverter(name: string, propertyKey: string, converterCtor: Function) 
    {
        let l = Streams.computeIfAbsent(this.simpleProperyMap, name, k => new Set())
        let pd = Streams.tryFirst(l, p => p.a == propertyKey)
        if(pd) l.delete(pd)
        l.add(Pair.of(propertyKey, converterCtor))
        
    }

    static getInstance()
    {
        return this.instance ? this.instance : this.createInstance();

    }


    private static createInstance()
    {
        this.instance = new ApiMeta();
        return this.instance;

    }
}