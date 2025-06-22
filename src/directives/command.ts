import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { ICommand } from "../components/interfaces/i.command";

export interface IArgsCommand
{
  command: ICommand;
  /**
   * Gets the arguments for this command.
   * @param command 
   * @returns a list of arguments for th
   */
  argsGetter: (command: ICommand) => any[];
}

@Directive({
    selector: '[command]',
    standalone: true
})
export class CommandDirective implements OnInit, OnChanges, OnDestroy
{
  @Input('command')
  data!: ICommand | IArgsCommand;


  // command!: ICommand;
  host: HTMLElement;
  cleaner: Subscription;

  constructor(v: ViewContainerRef)
  {
    this.host = (v.element.nativeElement as HTMLInputElement);
    this.cleaner = fromEvent(this.host, "click").subscribe(() => this.execute());
  }
  
  
  ngOnDestroy(): void 
  {
    this.cleaner.unsubscribe()
  }


  ngOnChanges(changes: SimpleChanges): void
  {

  }

  private execute()
  {
    if(this.hasArgsGetter())
    {
      let c = this.data as IArgsCommand
      let action: () => void;
      if(c.command.argsExecute) action = () => c.command.argsExecute?.(c.argsGetter(c.command))
      else action = () => { throw new Error(`Command ${c.command.name} is expected to have the argsExecute function.`) }
      action()

    }
    else
    {
      let c = this.data as ICommand
      c.execute()

    }

  }


  ngOnInit(): void
  {

    


  }


  private hasArgsGetter(): boolean
  {
    return 'argsGetter' in this.data

  }



}
