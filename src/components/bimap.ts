export class BiMap<S, T>
{
    private forward = new Map<S, T>();
    
    private reverse = new Map<T, S>();


    set(k: S, v: T)
    {
        this.forward.set(k, v);
        this.reverse.set(v, k);
    }


    get(k: S): T | undefined
    {
        return this.forward.get(k)
    }

    getKey(v: T): S | undefined
    {
        return this.reverse.get(v)
    }

    computeIfAbsent(k: S, valueGetter: (k: S) => T): T
    {
        let v = this.get(k);
        if(v != undefined) return v;
        v = valueGetter(k);
        this.set(k, v);
        return v;
    }
}