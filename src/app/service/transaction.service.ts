import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import { AccountService } from './account.service';
import { CategoryService } from './category.service';
import { ReplaySubject, Subject, map, take } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  selectedMonth = new Date();
  selectedMonth$ = new Subject<Date>();
  public transactions$ = new ReplaySubject<Transaction[]>();
  transactions: Transaction[] = [];

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private database: DatabaseService,
  ) { 
    this.emitTransations();
  }

  



  private initTransactions(transactions: Transaction[]){
    const accountMap = this.getAccountMap();
    const categoryMap = this.getCategoryMap();
    transactions.forEach( transaction =>{
      transaction.accountName = accountMap.get(transaction.accountId);
      transaction.categoryName = categoryMap.get(transaction.categoryId);
      transaction.toName = accountMap.get(transaction.toAccountId);
    })
    return transactions;
  }

  // public getTransactionsGroupByDate(transactions: Transaction[]) {
  //   const map = new Map<string, Transaction[]>();
  //   for (let transaction of transactions) {
  //     if (map.has(this.getDateAsString(transaction.date))) {
  //       map.get(this.getDateAsString(transaction.date))?.push(transaction);
  //     } else {
  //       map.set(this.getDateAsString(transaction.date), [transaction]);
  //     }
  //   }
  //   return map;
  // }

  public async saveTransaction(transaction: Transaction) {
    //await addDoc(collection(this.store, 'txn'), transaction);
    console.log('saving transaction', transaction);
    this.database.addTransaction(transaction);
    this.emitTransations();
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

  public async updateTransaction(transaction: Transaction){
    this.emitTransations();
  }

  public getSelectedMonth(){
    return this.selectedMonth;
  }

  public getSelectedMonth$(){
    return this.selectedMonth$;
  }

  public onNextMonth(){
    this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1);
    this.selectedMonth$.next(this.selectedMonth);
    this.emitTransations();
  }

  public onPrevMonth(){
    this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1);
    this.selectedMonth$.next(this.selectedMonth);
    this.emitTransations();
  }

  private emitTransations(){
    this.database.transactions$.subscribe(data => this.transactions$.next(data));
  }
}
