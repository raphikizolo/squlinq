import { RandomService } from "./random.service";

export class Streams
{
    static random<T>(it: Iterable<T>, r: RandomService = new RandomService())
    {
        let a = this.toArray(it);
        if(this.isEmpty(a))
        {
            throw new Error('Expecting a non empty iterable.')
        }
        return a.at(r.nextInt(0, a.length))!!
    }

    static update<R, T>(m: Map<R, T>, s: Map<R, T>)
    {
        s.forEach((v, k) => m.set(k, v));

    }


    static associate<T, R, S>(coll: Iterable<T>, keySelector: (e: T) => R, valueSelector: ((e: T) => S)): Map<R, S> 
    {
        let m = new Map<R,S>();
        this.toArray(coll).forEach(i => m.set(keySelector(i), valueSelector(i)));
        return m;
    }


    static associateBy<T, R>(coll: Iterable<T>, keySelector: (e: T) => R): Map<R, T> 
    {
        return this.associate(coll, keySelector, i => i)
    }

    static associateWith<T, R>(coll: Iterable<T>, valueSelector: (e: T) => R): Map<T, R> 
    {
        return this.associate(coll, i => i, valueSelector)
    }


    static last<T>(it: Iterable<T>): T
    {
        this.first(it); //so it throws if empty.
        let a = this.toArray(it);
        return a[a.length - 1];

    }

    static maxNumber(it: Iterable<number>): number
    {
        return this.max(it, i => i);
    }

    static max<T>(it: Iterable<T>, selector: (t: T) => number): T
    {
        let l = this.first(it); //so that it throws an exception if it is empty.
        let a = this.toArray(it);
        a.forEach(i => 
        {
            if(selector(i) > selector(l)) l = i;
        });
        return l;
    }

    static remove<T>(arr: T[], i: T): boolean
    {
        let ix = arr.indexOf(i);
        if(ix == -1) return false;
        arr.splice(ix, 1);
        return true;


    }

    /**
     * same function as the native array.reduce but returns the initial value if the passed iterable is empty.
     * @param iter collection to be reduced.
     * @param reducer function that reduces the items of the element.
     * @param initialValue the first value.
     * @returns the reduction result.
     */
    static gigoReduce<T>(iter: Iterable<T>, reducer: (r: T, i: T) => T, initialValue: T): T
    {
        let a = this.toArray(iter);
        if(this.isEmpty(a)) return initialValue;
        return a.reduce(reducer);
    }

    static toSet<T, U>(iter: Iterable<T>, idSelector: (((i: T) => U) | undefined) = undefined): Set<T>
    {
        if(idSelector)
        {
            let m = this.group(iter, idSelector);
            let v = new Array(...m.values());
            let items = v.map(a => this.first(a));
            return new Set(items);
        }
        return new Set(iter);

    }

    static all<T>(iter: Iterable<T>, pred: (i: T) => boolean): boolean
    {
        if(this.isEmpty(iter)) return false;
        let a = this.toArray(iter);
        for (let i = 0; i < this.toArray(iter).length; i++) 
        {
            if(!pred(a[i])) return false;
        
        }
        return true;
    }

    static sort<T>(arr: Array<T>, selector: (i: T) => number)
    {
        arr.sort((a, b) => selector(a) - selector(b));
    }


    static runIfPresent<T, U>(c: Map<T, U>, key: T, func: (k: U) => void): void
    {
        let v = c.get(key);
        if(v) func(v);

    }

    static difference<T>(a: Set<T>, b: Set<T>)
    {
        return this.where(a, i => !b.has(i));
    }


    static group<T, U>(coll: Iterable<T>, keySelector: (p: T) => U): Map<U, T[]> 
    {
        let m = new Map<U, T[]>();
        (new Array(...coll)).forEach(i => 
        {
            let key = keySelector(i);
            let valueList = Streams.computeIfAbsent(m, key, k => new Array<T>());
            valueList.push(i);
        });
        return m;
    }


    static computeIfAbsent<T, U>(map: Map<T, U>, key: T, mapper: (k: T) => U): U
    {
        let v = map.get(key);
        if(v) return v;
        v = mapper(key);
        map.set(key, v);
        return map.get(key)!;
    }


    static any<T>(coll: T[], pred: (i: T) => boolean): boolean
    {
        let x = this.tryFirst(coll, pred);
        return x ? true: false;
    }

    static tryFirst<T>(coll: Iterable<T>, pred: ((t: T) => boolean) | undefined = undefined): T | undefined
    {
        try
        {
            return this.first(coll, pred);

        }
        catch(e)
        {
            return undefined;
        }
    }

    
    static clear<T>(coll: T[]): T[]
    {
        return coll.splice(0, coll.length);
        
    }
    static flatten<T>(coll: T[], flattener: (r: T[], i: T) => T[]): T[] 
    {
        let r: T[] = [];
        coll.forEach(x => 
        {
            r = flattener(r, x);
        }
        )
        return r;
    }

    static toArray<T>(i: Iterable<T>): T[]
    {
        if(i instanceof Array || 'length' in i) return i as T[]; //a little bit risky. Change when you know more.
        return Array.of(...i);
    }

    static isNotEmpty<T>(coll: Iterable<T>): boolean
    {
        return !this.isEmpty(coll);
        
    }

    static isEmpty<T>(coll: Iterable<T>): boolean
    {
        return this.toArray(coll).length == 0;
    }


    static where<T>(coll: Iterable<T>, pred: (t: T) => boolean): T[]
    {
        return new Array(...coll).filter(pred);
    }

    static insert<T>(coll: T[], index: number, items: T[]): Streams
    {
        coll.splice(index, 0, ...items);
        return this;
    }

    static first<T>(coll: Iterable<T>, pred: ((t: T) => boolean) | undefined = undefined): T
    {
        let arr = new Array(...coll);
        if(pred)
        {
            let x = arr.find(pred);
            if(x) return x;
            throw new Error("There is no item satisfying the passed predicate.");
        }
        else
        {
            let x = arr.at(0);
            if(x !== undefined) return x;
            throw new Error("Collection has no items.");
        }
    }

}