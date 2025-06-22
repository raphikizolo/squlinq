export class Utils
{


    static throwIfNull<T>(thing: T | undefined | null, msg: string = `Error. Item cannot be null.`): T
    {
        if(thing) return thing;
        throw new Error(msg);

    }
}