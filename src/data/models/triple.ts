export class Triple<T, Q, R>
{
    constructor(readonly a: T, readonly b: Q, readonly c: R)
    {

    }


    static of<T, R, S>(a: T, b: R, c: S)
    {
        return new Triple(a, b, c);
    }
}