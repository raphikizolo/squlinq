import { InjectionToken, Injector } from "@angular/core";
import { IFactory } from "../interfaces/i.factory";
import { Token } from "@angular/compiler";

export abstract class AbstractFactory<T> implements IFactory<T>
{

    constructor(private builder: () => T)
    {

    }


    build(): T 
    {
        return this.builder();
    }

}