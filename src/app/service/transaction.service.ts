import { Injectable, OnInit } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import { AccountService } from './account.service';
import { CategoryService } from './category.service';
import { ReplaySubject, Subject, map, take } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService{
  selectedMonth = new Date();
  selectedMonth$ = new Subject<Date>();
  public transactions$ = new ReplaySubject<Transaction[]>();
  transactions: Transaction[] = [];

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private database: DatabaseService,
  ) { 
    database.initStatus$.pipe(take(1)).subscribe(()=>this.emitTransations());
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

  public async saveTransaction(transaction: Transaction) {
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
    this.database.updateTransaction(transaction)
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
    this.database.getTransactionsByMonthYear(this.getMonthYear(this.selectedMonth))
    .then(value => this.transactions$.next(this.initTransactions(value)));
  }

  private getMonthYear(date: Date):string{
    return date.getMonth()+'-'+date.getFullYear();
  }
}
