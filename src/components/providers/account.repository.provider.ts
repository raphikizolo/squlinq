import { Injectable, Injector } from "@angular/core";
import { AbstractProvider } from "./abstract.provider";
import { AccountRepository } from "../../data/repositories/account.repository";


@Injectable()
export class AccountRepositoryProvider extends AbstractProvider<AccountRepository>
{

    /**
     *
     */
    constructor(injector: Injector) 
    {
        super(() => injector.get(AccountRepository));
        
    }


}