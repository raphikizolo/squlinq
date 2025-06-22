import { range } from "rxjs";

export class StringUtils
{

  static isNotEmpty(c: string): boolean
  {
    return !this.isEmpty(c);
  }

  static isEmpty(a: string | undefined | null): boolean
  {

    if(a == undefined) return true;
    if(a == null) return true;
    if(a.length == 0) return true;
    for (let i = 0; i < a.length; i++)
    {
      if(a[i] !== " ") return false;
    }

    return true;

  }

}
