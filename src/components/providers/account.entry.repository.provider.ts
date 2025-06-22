import { Injectable, Injector } from "@angular/core";
import { AbstractProvider } from "./abstract.provider";
import { AccountEntryRepository } from "../../data/repositories/account.entry.repository";



@Injectable()
export class AccountEntryRepositoryProvider extends AbstractProvider<AccountEntryRepository>
{

    
    constructor(injector: Injector) 
    {
        super(() => injector.get(AccountEntryRepository));
        
    }


}