import { ICommand } from "./interfaces/i.command";

export class Command implements ICommand
{
    

    constructor(private action: (args: any) => void, public name: string = '', public args: any = undefined)
    {

    }



    execute(): void 
    {
        this.action(this.args);
    }
    
}