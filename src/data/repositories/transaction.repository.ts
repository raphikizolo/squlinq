import { Inject, Injectable } from "@angular/core";
import { AbstractRepository, REPOSITORY_META } from "./abstract.repository";
import { Api } from "../../components/api";
import { HttpClient } from "@angular/common/http";
import { combineLatest, filter, map, mergeMap, Observable, of } from "rxjs";
import { CollectionModel } from "../models/collection.model";
import { RepositoryChange } from "./repository.changed";
import { Streams } from "../../components/streams";
import { Transaction } from "../models/transaction";
import { ApiMeta } from "../meta/api.meta";
import { EntityObservableProperty, Repository } from "../decorators/api";
import { ErrorResponse } from "../models/error.response";
import { PageModel } from "../models/page.model";
import { FeeAccount } from "../models/fee.account";
import { FeeAccountRepository } from "./fee.account.repository";
import { FeeStructure } from "../models/fee.structure";
import { FeeStructureRepository } from "./fee.structure.repository";
import { BookkeepingAction } from "../models/bookkeeping.action";
import { BookkeepingActionRepository } from "./bookkeeping.action.repository";
import { FeePaymentDTO } from "../../viewmodels/fee.account.payment.view.model";

@Injectable()
@Repository(Transaction)
export class TransactionRepository extends AbstractRepository<Transaction>
{
    
    
    
    
    constructor(api: Api, httpClient: HttpClient, @Inject(REPOSITORY_META) repoMeta: ApiMeta, private bookkeepingActionRepo: BookkeepingActionRepository)
    {
        super(api.TRANSACTION_URL, Transaction.CLASS_NAME, httpClient, repoMeta.getService(TransactionRepository, Transaction));
    }

    protected override handleRepositoryChanges(c: RepositoryChange<Transaction>): void 
    {
        

    }

    
    payFee(dto: FeePaymentDTO): Observable<Transaction | ErrorResponse>
    {
        let body = JSON.stringify(dto)
        return this.httpClient.post<Transaction | ErrorResponse>(`${this.baseUrl}/fee_payment`, body)
        
    }


    @EntityObservableProperty('bookkeepingActions')
    private bookkeepingActionsObservableBuilder(): (r: any) => Observable<CollectionModel<BookkeepingAction> | ErrorResponse> 
    {
        return (r: any) => of(this.extractLink(r, 'bookkeepingActions')).pipe(mergeMap(l => this.bookkeepingActionRepo.collectionQuery(l!)));
    }

}