import { Injectable } from "@angular/core";
import { Account } from "../model/account.model";

@Injectable({
    providedIn: 'root'
})
export class AccountService{

    accounts: Account[] = [
        {
            id: 1,
            name: 'Savings',
            balance: 500,
        },
        {
            id: 2,
            name: 'Credit Card',
            balance: 5000,
        },
        {
            id: 3,
            name: 'Cash',
            balance: 250,
        }
    ];

    public getAccounts(){
        return [...this.accounts];
    }
}