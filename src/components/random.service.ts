import { Injectable } from "@angular/core";

@Injectable()
export class RandomService
{

  nextBoolean(): boolean
  {
    return this.trial(.5);
  }

  constructor()
  {

  }

/**
 * Simulates the occurrence of an event.
 * @param probability the probability of an event occurring.
 * @returns true if the event occurred.
 */
  trial(probability: number): boolean
  {
    if(probability < 0 || probability > 1) throw new Error("Probability must be between 0 and 1");
    let o = this.nextDouble_(1);
    return o <= probability;

  }

  nextDouble_(b: number): number
  {
    return this.nextDouble(0, b);

  }

  nextDouble(lb: number, b: number): number
  {
    let r = Math.random() * (b - lb) + lb;
    return r !== b ? r : this.nextDouble(lb, b);
  }

  nextInt(lb: number, b: number = 4_294_967_296): number
  {
    if(lb == b) return lb;
    let r = Math.floor(Math.random() * (b - lb)) + lb;
    // console.log("lb: " + lb + ". b: " + b + ". r: " + r);
    return r !== b ? r : this.nextInt(lb, b);

  }

  nextInt_(b: number)
  {
    return this.nextInt(0, b);

  }


  private alph = "abcdefghijklmnopqrstuvwxyz";

  private nums = "0123456789";

  private alNums = "abcdefghijklmnopqrstuvwxyz0123456789";


  nextString(len: number = 10, withDigits = false): string
  {
    let i = 1;
    let s = "";
    let sset = withDigits ? this.alNums : this.alph;
    while(i++ < len)
    {
      let c = sset.at(this.nextInt(0, sset.length));
      s = s.concat(c ? c : "");
    }

    return s;

  }

  nextUUId(): string
  {
    return this.nextString(40, true);
  }


}


