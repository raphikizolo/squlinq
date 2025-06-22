// import { AfterViewInit, Directive, Inject, Input, ViewContainerRef } from "@angular/core";
// // import { ICommand } from "../../components/interfaces/i.command";
// // import { fromEvent } from "rxjs";
// // import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
// // import { SimpleDialogView } from "../simple-dialog-view/simple.dialog.view";
// // import { DialogViewModelFactory } from "../../components/factories/dialog.view.model.factory";
// // import { IFactory } from "../../components/interfaces/i.factory";
// // import { ContextMenuViewModelFactory } from "../../components/factories/context.menu.view.model.factory";
// // import { ContextMenuViewModel } from "../../context.menu.view.model";
// // import { ContextMenuView } from "../context-menu-view/context.menu.view";

// @Directive({
//     selector: '[contextMenu]'
// })
// export class ContextMenuDirective implements AfterViewInit
// {
    


//     @Input('contextMenu')
//     commands: ICommand[] = [];

//     host: HTMLElement;


//     constructor(v: ViewContainerRef, private dialog: MatDialog, @Inject(ContextMenuViewModelFactory) private vmFactory: IFactory<ContextMenuViewModel>) 
//     {
//         this.host = (v.element.nativeElement as HTMLInputElement);
//         fromEvent(this.host, "contextmenu").subscribe(e => this.handleContextClick(e));
        
//     }
    
    
//     private handleContextClick(e: Event): void 
//     {
//         e.preventDefault();
//         let vm = this.vmFactory.build();
//         vm.commands.push(...this.commands);
//         let me = e as MouseEvent;
//         this.dialog.open(ContextMenuView, { data: vm, position: { top: `${me.y}px`, left: `${me.x }px`}  });
        
        
//     }



//     ngAfterViewInit(): void 
//     {
        
//     }





// }