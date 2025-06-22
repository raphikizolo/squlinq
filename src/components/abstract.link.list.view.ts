import { CurrentLinkService } from "../services/current.link.service";
import { ICommand } from "./interfaces/i.command";

export class AbstractLinkListView
{
    links: Array<ICommand>  = [];

    /**
     *
     */
    constructor(private currentLinkService: CurrentLinkService, private myPath: string = 'home') 
    {
        
    }


    protected navigate(path: string)
    {
        this.currentLinkService.navigate([this.myPath, path]);

    }
}