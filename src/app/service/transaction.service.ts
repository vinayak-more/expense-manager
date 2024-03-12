import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import { TransactionType } from '../model/transaction-type.enum';
import { AccountService } from './account.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionList: Transaction[] = [
    {
      date: "01-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 1,
      amount: 20,
      note: 'Bus'

    },
    {
      date: "01-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 2,
      category: 2,
      amount: 20,
      note: 'Riksha'

    },
    {
      date: "01-01-2023",
      transactionType: TransactionType.CREDIT,
      account: 3,
      category: 5,
      amount: 20,
      note: 'GPay'

    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Milk'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.CREDIT,
      account: 1,
      category: 5,
      amount: 20,
      note: 'Flipkart'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Tea'
    },
    {
      date: "03-01-2023",
      transactionType: TransactionType.TRANSFER,
      account: 1,
      to: 3,
      amount: 20,
      note: 'Cash withdraw'
    }
    
  ]
  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    ) { }

  public getTransactionsGroupByDate(){
    const map = new Map<string, Transaction[]>();
    for(let transaction of this.getTransactions()){
      if(map.has(transaction.date)){
        map.get(transaction.date)?.push(transaction);
      }else {
        map.set(transaction.date, [transaction]);
      }
    }
    return map;
  }

  public getTransactions(){
    const accountMap = this.getAccountMap();
    const categoryMap = this.getCategoryMap();
    const transactions = [];
    this.transactionList.forEach( transaction => {
      const newTransaciton = { ...transaction};
      newTransaciton.accountName = accountMap.get(transaction.account);
      newTransaciton.categoryName = categoryMap.get(transaction.category);
      newTransaciton.toName = accountMap.get(transaction.to);
      transactions.push(newTransaciton)
    })
    return transactions;
  }

  public saveTransaction(transaction: Transaction){
    this.transactionList.push(transaction);
  }

  private getAccountMap(){
    const accountMap = new Map<number, string>();
    this.accountService.getAccounts().forEach(account=> accountMap.set(account.id, account.name));
    return accountMap;
  }

  private getCategoryMap(){
    const categoryMap = new Map<number, string>();
    this.categoryService.getCategories().forEach(category => categoryMap.set(category.id, category.name));
    return categoryMap;
  }
}
