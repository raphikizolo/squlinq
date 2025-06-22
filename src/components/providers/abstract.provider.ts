import { InjectionToken, Injector } from "@angular/core";
import { IFactory } from "../interfaces/i.factory";
import { Token } from "@angular/compiler";
import { IProvider } from "../interfaces/i.provider";

export abstract class AbstractProvider<T> implements IProvider<T>
{

    constructor(private provider: () => T)
    {

    }


    provide(): T 
    {
        return this.provider();
    }

}