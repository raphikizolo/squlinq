import { AfterViewInit, Component, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { FlexModule } from "@angular/flex-layout";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CommonModule } from "@angular/common";
import { Streams } from "../../components/streams";
import { MainViewTabHeaderViewModelFactory } from "../../components/factories/main.view.tab.header.view.model.factory";
import { IFactory } from "../../components/interfaces/i.factory";
import { MainViewTabHeaderViewModel } from "../../viewmodels/main.view.tab.header.view.model";
import { Command } from "../../components/command";
import { CommandDirective } from "../../directives/command";

@Component({
    selector: 'main-view',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss'],
    imports: [MatIconModule, FlexModule, MatMenuModule, RouterModule, MatSidenavModule, CommonModule, CommandDirective],
    standalone: true
})
export class MainView implements AfterViewInit
{


    showCurrentLink!: Observable<Boolean>

    // private _tabHeaders: BehaviorSubject<MainViewTabHeaderViewModelFactory[]> = new BehaviorSubject(['Home', 'Classes', 'Students', 'Accounts', "Fees"]);
    private _tabHeaders: BehaviorSubject<MainViewTabHeaderViewModel[]> = new BehaviorSubject(new Array<MainViewTabHeaderViewModel>());
    
    public get tabHeaders(): Observable<MainViewTabHeaderViewModel[]> 
    {
        return this._tabHeaders.asObservable();
    }

    // tabChildren: Map<string, string[]> = new Map();
    
    childParent: Map<string, string> = new Map();

    private nameToUrl = new Map<string, string>([
        ['Home', 'home'],
        ['Classes', 'add-new-class'],
        ['Add Class', 'add-class'],
        ['Remove Class', 'remove-class'],
        ['Students', 'student-list'],
        ['Student List', 'student-list'],
        ['Add Student', 'add-student'],
        ['Remove Student', 'remove-student'],
        ['Accounts', 'chart-of-accounts'],
        ['Chart Of Accounts', 'chart-of-accounts'],
        ['Add Account', 'add-account'],
        ['Fees', 'fee-structure-list'],
        ['Fee Structures', 'fee-structure-list'],
        ['Add Fee Structure', 'add-fee-structure'],
        ['Fee Statement', 'fee-statement'],
        ['Fee Payment', 'fee-payment'],
        
    ])

    constructor(private dialog: MatDialog, private router: Router, 
        @Inject(MainViewTabHeaderViewModelFactory) private tabHeaderVmFactory: IFactory<MainViewTabHeaderViewModel>) 
    {
        this.loadTabs()
        
    }

    private buildTabHeaderVm(name: string)
    {
        let vm = this.tabHeaderVmFactory.build();
        vm.name = name;
        vm.actionComm = new Command(() => this.router.navigate(['app', this.nameToUrl.get(name)!!]));
        return vm;
    }

    private loadTabs()
    {
        let vmList = ['Home', 'Classes', 'Students', 'Accounts', "Fees"].map(n => this.buildTabHeaderVm(n));

        // Streams.computeIfAbsent(this.tabChildren, 'Students', _ => []).push(...['Add Student', 'Remove Student'])

        this._tabHeaders.next(vmList)
        let nameVmMap = Streams.associateBy(vmList, vm => vm.name);
        ['Student List', 'Add Student', 'Remove Student'].map(n => this.buildTabHeaderVm(n)).forEach(vm => nameVmMap.get('Students')?.addChild(vm));

        ['Add Class', 'Remove Class'].map(n => this.buildTabHeaderVm(n)).forEach(vm => nameVmMap.get('Classes')?.addChild(vm));

        // Streams.computeIfAbsent(this.tabChildren, 'Classes', _ => []).push(...['Add Class', 'Remove Class'])

        // Streams.computeIfAbsent(this.tabChildren, 'Accounts', _ => []).push(...['Add Account', 'Chart of Accounts'])
        ['Add Account', 'Chart Of Accounts'].map(n => this.buildTabHeaderVm(n)).forEach(vm => nameVmMap.get('Accounts')?.addChild(vm));

        // Streams.computeIfAbsent(this.tabChildren, 'Fees', _ => []).push(...['Fee Structures', 'Fee Statement', 'Collect Fees'])
        ['Fee Structures', 'Fee Statement', 'Fee Payment'].map(n => this.buildTabHeaderVm(n)).forEach(vm => nameVmMap.get('Fees')?.addChild(vm));
        // this.tabChildren.forEach((value, key) => value.forEach(v => this.childParent.set(v, key)))

    }

    // hasChildren(name: string)
    // {
    //     return this.tabChildren.has(name) && Streams.isNotEmpty(this.tabChildren.get(name)!!)
    // }

    expandHeader(vm: MainViewTabHeaderViewModel)
    {
        let newList = new Array<MainViewTabHeaderViewModel>();
        if(Streams.last(this._tabHeaders.value) == vm)
        {
            newList.push(...this._tabHeaders.value,...vm.children)
        }
        else
        {
            let headers = this._tabHeaders.value;
            let i = headers.indexOf(vm);
            let before = headers.slice(0, i);
            let after = headers.slice(i + 1);
            // let children = this.tabChildren.get(vm) || [];
            newList = [...before, vm,...vm.children,...after]
        }
        this._tabHeaders.next(newList);
        newList.filter(h => h != vm).forEach(h => this.collapseHeader(h))
    }

    collapseHeader(vm: MainViewTabHeaderViewModel)
    {
        if(vm.hasChildren)
        {
            let headers = [...this._tabHeaders.value];
            vm.children.forEach(c => Streams.remove(headers, c));
            this._tabHeaders.next(headers);
        }
    }

    // processClass(name: string)
    // {
        
    // }

    expanded(vm: MainViewTabHeaderViewModel)
    {
        let child = Streams.random(vm.children);
        return this._tabHeaders.value.includes(child);
    }



    ngAfterViewInit(): void 
    {
        //At some point in the future, this will select between last open view or default view which at the time of writing was the project list view.
        this.loadAppropriateView();
        
    }
    

    private loadAppropriateView() 
    {
        // this.router.navigateByUrl("/accounts");  
        
    }





    private shouldShowCurrentLink(a: string[] | undefined): boolean
    {
        if(!a) return false;
        if(a.length == 0) return false;
        if(a.length != 1) return true;
        return a[0] != 'home';
    }
}