import { Injectable } from "@angular/core";

@Injectable()
export class Api
{
    PROTOCOL = 'https://';

    URL: string = `${this.PROTOCOL}squlinq.ddns.net/api/v0`;

    PERSON_URL = `${this.URL}/people`;
    
    STUDENT_URL: string = `${this.URL}/students`;
    
    GRADE_URL: string = `${this.URL}/grades`;
    
    FEE_ACCOUNT_URL: string = `${this.URL}/fee_accounts`;
    
    ACCOUNT_URL: string = `${this.URL}/accounts`;
    
    TERM_URL: string = `${this.URL}/terms`
    
    ACCOUNT_ENTRY_URL: string = `${this.URL}/account_entries`
    
    BOOKKEEPING_ACTION_URL: string = `${this.URL}/bookkeeping_actions`
    
    FEE_STRUCTURE_VOTEHEAD_URL: string = `${this.URL}/fee_structure_voteheads`
    
    FEE_STRUCTURE_URL: string = `${this.URL}/fee_structures`
    
    TRANSACTION_URL: string = `${this.URL}/transactions`
    
}