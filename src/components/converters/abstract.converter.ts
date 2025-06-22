import { Converter } from "./i.converter";

export abstract class AbstractConverter<T, R> implements Converter<T, R>
{
    static CONVERTERS = "Convertersasadfrqwe"

    /**
     *
     */
    constructor(public clazz: Function) 
    {
        
    }

    abstract fromBackend(value: T): R 

    abstract toBackend(value: R): T 
    
}