export class Pair<A, B>
{

    constructor(readonly  a: A, readonly b: B)
    {

    }


    static of<T, R>(a: T, b: R)
    {
        return new Pair(a, b);
    }
}