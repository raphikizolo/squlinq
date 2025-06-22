export class RgxUtils
{


    static matches(str: string, rgx: string): boolean
    {
        let r = new RegExp(rgx);
        let m = r.exec(str);
        if(!m) return false;
        return m[0] == str;
    }
}