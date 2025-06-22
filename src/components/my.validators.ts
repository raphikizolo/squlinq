import { AbstractControl, ValidatorFn } from "@angular/forms";
import { RgxUtils } from "./rgx.utils";
import { Streams } from "./streams";

export class MyValidators
{

    static num(ctrl: AbstractControl): { [key: string]: any } | null
    {
        // let r = new RegExp('[0-9]+');
        let b = RgxUtils.matches(ctrl.value, '[0-9]+');
        // console.log(`is num: ${b}`);
        // let a = Streams.all([false, false], x => x);
        if(b) return null;
        return { 'NaN': true };

    }
}