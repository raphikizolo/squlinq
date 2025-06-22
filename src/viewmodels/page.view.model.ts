import { BehaviorSubject, Observable } from "rxjs";
import { Command } from "../components/command";
import { ICommand } from "../components/interfaces/i.command";
import { PageModel } from "../data/models/page.model";


export class PageViewModel<Model, ViewModel>
{
    

    private _currentItems: BehaviorSubject<ViewModel[]> = new BehaviorSubject<ViewModel[]>([]);

    private _page: PageModel<Model> | undefined;
    
    public get page(): PageModel<Model> | undefined 
    {
        return this._page;
    }

    public set page(value: PageModel<Model> | undefined) 
    {
        if(this._page != value)
        {
            this._page = value;
            this.handlePageChanges();
        }
    }
    
    
    public get currentItems(): Observable<ViewModel[]> 
    {
        return this._currentItems.asObservable();
    }


    more: ICommand | undefined

    /**
     *
     */
    constructor(private pageQuery: (link: string) => Observable<PageModel<Model>>, private modelToVmAdapter: (m: Model) => ViewModel) 
    {
        
        
    }

    private handlePageChanges()
    {
        if(this.page)
        {
            if(this.page.next) this.more = new Command(_ => this.loadNextItems());
            this._currentItems.next(this._currentItems.value.concat(this.page.entities.map(m => this.modelToVmAdapter(m))));
        }
        else
        {
            this.more = undefined;
        }
    }


    private loadNextItems(): void 
    {
        this.pageQuery(this.page!.next!).subscribe(p => this.page = p);
    }


}