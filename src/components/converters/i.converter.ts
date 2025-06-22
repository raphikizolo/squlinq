export interface Converter<T, R>
{

    fromBackend(value: T): R

    toBackend(value: R): T
    
}