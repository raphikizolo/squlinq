import { Injectable } from "@angular/core";
import { ICommand } from "../components/interfaces/i.command";
import { Command } from "../components/command";
import { Utils } from "../components/utils";
import { Streams } from "../components/streams";

@Injectable()
export class TableHeaderViewModel
{
    command!: ICommand;

    constructor()
    {

    
    }

    setHeaderName(name: string)
    {
        this.command = new Command(args => this.headerAction(args), name);
    }


    private headerAction(args: any)
    {
        console.log(`Header ${this.command.name} clicked.`);
    }


    

    // getHeaderIndex(name: string): number
    // {
        // let h = Streams.first(this.headers, h => h.name == name);
        // return this.headers.indexOf(h);
    // }

    
}