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
      id: 1,
      date: new Date(new Date("01-01-2023")),
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 1,
      amount: 20,
      note: 'Bus'

    },
    {
      id: 2,
      date: new Date("01-01-2023"),
      transactionType: TransactionType.DEBIT,
      account: 2,
      category: 2,
      amount: 20,
      note: 'Riksha'

    },
    {
      id: 3,
      date: new Date("01-01-2023"),
      transactionType: TransactionType.CREDIT,
      account: 3,
      category: 5,
      amount: 20,
      note: 'GPay'

    },
    {
      id: 4,
      date: new Date("02-01-2023"),
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Milk'
    },
    {
      id: 5,
      date: new Date("02-01-2023"),
      transactionType: TransactionType.CREDIT,
      account: 1,
      category: 5,
      amount: 20,
      note: 'Flipkart'
    },
    {
      id: 6,
      date: new Date("02-01-2023"),
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Tea'
    },
    {
      id: 7,
      date: new Date("02-01-2023"),
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Tea'
    },
    {
      id: 8,
      date: new Date("02-01-2023"),
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Tea'
    },
    {
      id: 9,
      date: new Date("02-01-2023"),
      transactionType: TransactionType.DEBIT,
      account: 1,
      category: 3,
      amount: 20,
      note: 'Tea'
    },
    {
      id: 10,
      date: new Date("03-01-2023"),
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

  public getTransactionsGroupByDate() {
    const map = new Map<string, Transaction[]>();
    for (let transaction of this.getTransactions()) {
      if (map.has(this.getDateAsString(transaction.date))) {
        map.get(this.getDateAsString(transaction.date))?.push(transaction);
      } else {
        map.set(this.getDateAsString(transaction.date), [transaction]);
      }
    }
    return map;
  }

  public getDateAsString(date: Date){
    return date.toLocaleDateString('es-CL');
  }

  public getTransactions() {
    const accountMap = this.getAccountMap();
    const categoryMap = this.getCategoryMap();
    const transactions: Transaction[] = [];
    this.transactionList.forEach(transaction => {
      const newTransaciton = { ...transaction };
      newTransaciton.accountName = accountMap.get(transaction.account);
      newTransaciton.categoryName = categoryMap.get(transaction.category);
      newTransaciton.toName = accountMap.get(transaction.to);
      transactions.push(newTransaciton)
    })
    return transactions;
  }

  public getTransaction(id: number) {
    return this.transactionList.find(transaction => transaction.id === id);
  }

  public saveTransaction(transaction: Transaction) {
    transaction.id = this.transactionList.length,
    this.transactionList.push(transaction);
  }

  private getAccountMap() {
    const accountMap = new Map<number, string>();
    this.accountService.getAccounts().forEach(account => accountMap.set(account.id, account.name));
    return accountMap;
  }

  private getCategoryMap() {
    const categoryMap = new Map<number, string>();
    this.categoryService.getCategories().forEach(category => categoryMap.set(category.id, category.name));
    return categoryMap;
  }

  public updateTransaction(transaction: Transaction){
    const index = this.transactionList.findIndex(ele=> ele.id == transaction.id);
    this.transactionList[index] = transaction;
  }
}
