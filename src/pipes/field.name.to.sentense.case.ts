import { Pipe, PipeTransform } from "@angular/core";
import { Streams } from "../components/streams";

@Pipe({
    name: 'fieldNameToSentCase'
})
export class FieldNameToSentenseCase implements PipeTransform
{

    private uc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    transform(value: any, ...args: any[]) 
    {
        let v: string = value;
        if(!v) return '';
        let chars = v.split('').filter(c => c.trim() != '');
        let upperCaseLetters = chars.filter(c => this.uc.includes(c));
        chars[0] = chars[0].toUpperCase();
        upperCaseLetters.forEach(u => Streams.insert(chars, chars.indexOf(u), [' ']));
        return chars.join('');

    }
    
}