import { Command } from "../components/command";
import { Streams } from "../components/streams";

export class MainViewTabHeaderViewModel
{

    name: string = '';
    
    actionComm!: Command;

    public get className(): string
    {
        if(this.parent) return 'child-header';
        return 'top-header';
    }

    public get hasChildren(): boolean 
    {
        return Streams.isNotEmpty(this.children);
    }

    parent: MainViewTabHeaderViewModel | undefined;

    children = new Array<MainViewTabHeaderViewModel>();


    /**
     *
     */
    constructor() 
    {
        
    }


    addChild(c: MainViewTabHeaderViewModel)
    {
        this.children.push(c)
        c.parent = this;

    }




}