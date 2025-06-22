import { EnvironmentInjector, inject, Inject, Injector } from "@angular/core";
import { Streams } from "../../components/streams";
import { Pair } from "../models/pair";
import { Triple } from "../models/triple";
import { ApiMeta } from "./api.meta";
import { AbstractConverter } from "../../components/converters/abstract.converter";

export class ApiMetaRepositoryService
{


    private _properties: Array<Pair<string, Function|undefined>> = [];
    
    repository: any;

    public get properties(): Array<Pair<string, Function|undefined>> 
    {
        if(Streams.isNotEmpty(this._properties))
        {
            return this._properties
        }
        this._properties = this.repoMeta.getProperties(this.entityClassCtor)
        return this._properties

    }

    private _linkProperties: Array<Triple<string, string | undefined, boolean>> = [];
    
    public get linkProperties(): Array<Triple<string, string | undefined, boolean>> 
    {
        if(Streams.isNotEmpty(this._linkProperties))
        {
            return this._linkProperties;
        }
        this._linkProperties = this.repoMeta.getLinkProperties(this.repoCtor)
        return this._linkProperties
    }



    /**
     *
     */
    constructor(public repoCtor: Function, public entityClassCtor: Function, private repoMeta: ApiMeta, 
        private converters: AbstractConverter<unknown, unknown>[])
    {
        
    }

    configure(repository: any)
    {
        this.repository = repository
        

    }

    toJson(entity: any): string
    {
        let m = new Object()
        this.properties.forEach(prop => this.toJsonProperty(prop, entity, m))
        return JSON.stringify(m)    
    }
    
    private toJsonProperty(pData: Pair<string, Function | undefined>, entity: any, m: any): void 
    {
        if (pData.a in entity)
        {
            if(pData.b)
            {
                let converter = this.findConverter(pData.b)
                // m.set(pData.a, converter.toBackend(entity[pData.a]))
                m[pData.a] = converter.toBackend(entity[pData.a])
            }
            else
            {
                m[pData.a] = entity[pData.a]


            }
        }
        else
        {
            throw Error(`Entity ${this.entityClassCtor.name} expected to have property ${pData}.`)
        }
    }
    
    
    private findConverter(b: Function) 
    {
        return Streams.first(this.converters, c => c.clazz == b)
    }

    loadSimpleProperties(entityInstance: any, response: any)
    {
        this.properties.forEach(prop => this.loadSimpleProperty(prop, entityInstance, response))

    }

    private loadSimpleProperty(pData: Pair<string, Function|undefined>, entityInstance: any, response: any)
    {
        if (pData.a in response)
        {
            if(pData.b)
            {
                let converter = this.findConverter(pData.b)
                entityInstance[pData.a] = converter.fromBackend(response[pData.a])
            }
            else
            {
                entityInstance[pData.a] = response[pData.a]

            }
        }
        else
        {
            throw Error(`Response destined to be entity ${this.entityClassCtor.name} expected to have property ${pData.a}.`)
        }

    }

    loadLinkProperties(entityInstance: any, response: any)
    {
        this.linkProperties.forEach(lp => this.loadLinkProperty(lp, entityInstance, response))

    }

    private loadLinkProperty(propertyKeyBuilderPair: Triple<string, string | undefined, boolean>, entityInstance: any, response: any): void 
    {
        let links = response['_links']
        if(propertyKeyBuilderPair.a in links)
        {
            let builderMethod = propertyKeyBuilderPair.b || ''
            if (builderMethod in this.repository)
            {
                let builder = this.repository[builderMethod].apply(this.repository)
                entityInstance[propertyKeyBuilderPair.a] = builder(response)
            }
            else
            {
                throw Error(`method ${builderMethod} expected to be in repository instance ${this.repository} for entity ${this.repoCtor.name}.`)
            }
        }
        else
        {
            if(propertyKeyBuilderPair.c) return
            throw Error(`Link property ${propertyKeyBuilderPair.a} expected to be in response ${JSON.stringify(response)}. Response destined to be entity` + 
                ` ${this.entityClassCtor.name}.`)
        }
        
    }

}