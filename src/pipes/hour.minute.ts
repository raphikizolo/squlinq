import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'hourMinute',
    standalone: false
})
export class HourMinute implements PipeTransform
{


  transform(value: any, ...args: any[]): string
  {
    if (value == undefined) return ''
    let d: Date = value;
    return 'fasda'
    // return this.getHours(d) + ":" + this.getMinutes(d) + " " + (d.getHours() < 12 ? "am": "pm");
  }

  getMinutes(d: Date)
  {
    return d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  }

  getHours(d: Date): string
  {
    let h = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    h = h == 0 ? 12 : h;
    return h.toString();
  }

}
