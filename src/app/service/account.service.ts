import { Injectable } from "@angular/core";
import { Account } from "../model/account.model";
import { AccountRepository } from "../repository/account.repository";
import { Transaction } from "../model/transaction.model";
import { TransactionType } from "../model/transaction-type.enum";

@Injectable({
    providedIn: 'root'
})
export class AccountService{

    constructor(private accountRepository: AccountRepository){}

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
        return this.accountRepository.getAllAccounts();
    }

    public async updateAccountBalance(transaction: Transaction){
        switch(transaction.transactionType){
            case TransactionType.CREDIT: 
                await this.accountRepository.updateAccountBalance(transaction.accountId, transaction.amount);
                break;
            case TransactionType.DEBIT:
                await this.accountRepository.updateAccountBalance(transaction.accountId, -transaction.amount);
                break;
            case TransactionType.TRANSFER:
                await this.accountRepository.updateAccountBalance(transaction.accountId, -transaction.amount);
                await this.accountRepository.updateAccountBalance(transaction.toAccountId, transaction.amount);
        }
    }

    public async saveAccount(account: Account){
        return this.accountRepository.saveAccount(account);
    }

    public async deleteTransaction(transaction: Transaction){
        transaction.amount = -transaction.amount;
        return this.updateAccountBalance(transaction);
    }
}