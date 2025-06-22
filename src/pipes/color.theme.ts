import { Pipe, PipeTransform } from "@angular/core";
import { ThemeService } from "../services/theme.service";

@Pipe({
    name: 'themeColour',
    standalone: false
})
export class ColourTheme implements PipeTransform
{

    constructor(private themeService: ThemeService)
    {

    }


    transform(value: any, ...args: any[]) 
    {
        let key: string = value;
        return this.themeService.getColor(key)
    }
    
}