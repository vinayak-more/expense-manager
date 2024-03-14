import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import { TransactionType } from '../model/transaction-type.enum';
import { AccountService } from './account.service';
import { CategoryService } from './category.service';
import { Subject, map } from 'rxjs';
import { Firestore, Timestamp, addDoc, collection, collectionData, getDoc, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  selectedMonth = new Date();
  selectedMonth$ = new Subject<Date>();

  transactionList: Transaction[] = [];
  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private store: Firestore,
  ) { }

  

  public getDateAsString(date: Date | Timestamp){
    if(date instanceof Timestamp){
      date = date.toDate();
    }
    return date.toLocaleDateString('es-CL');
  }

  public getTransactions$(){
    return collectionData(query(
      collection(this.store, 'txn'), 
      where('monthYear', '==', this.getMonthYear(this.selectedMonth))))
      .pipe(
        map((transactions: Transaction[])=>{
        return this.initTransactions(transactions);
      }),
      map((transactions: Transaction[])=>{
        return this.getTransactionsGroupByDate(transactions);
      }));
  }

  private initTransactions(transactions: Transaction[]){
    const accountMap = this.getAccountMap();
    const categoryMap = this.getCategoryMap();
    transactions.forEach( transaction =>{
      transaction.accountName = accountMap.get(transaction.account);
      transaction.categoryName = categoryMap.get(transaction.category);
      transaction.toName = accountMap.get(transaction.to);
    })
    return transactions;
  }

  public getTransactionsGroupByDate(transactions: Transaction[]) {
    const map = new Map<string, Transaction[]>();
    for (let transaction of transactions) {
      if (map.has(this.getDateAsString(transaction.date))) {
        map.get(this.getDateAsString(transaction.date))?.push(transaction);
      } else {
        map.set(this.getDateAsString(transaction.date), [transaction]);
      }
    }
    return map;
  }
  private getMonthYear(date:Date){
    return date.getMonth() + '-' + date.getFullYear();
  }

  public getTransactions() {
    const accountMap = this.getAccountMap();
    const categoryMap = this.getCategoryMap();
    const transactions: Transaction[] = [];
    this.transactionList.forEach(transaction => {
      if(transaction.date.getMonth() != this.selectedMonth.getMonth()) return;
      if(transaction.date.getFullYear() != this.selectedMonth.getFullYear()) return;

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

  public async saveTransaction(transaction: Transaction) {
    transaction.id = this.transactionList.length,
    this.transactionList.push(transaction);
    await addDoc(collection(this.store, 'txn'), transaction);
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

  public getSelectedMonth(){
    return this.selectedMonth;
  }

  public getSelectedMonth$(){
    return this.selectedMonth$;
  }

  public onNextMonth(){
    this.selectedMonth.setMonth(this.selectedMonth.getMonth() + 1);
    this.selectedMonth$.next(this.selectedMonth);
  }

  public onPrevMonth(){
    this.selectedMonth.setMonth(this.selectedMonth.getMonth() - 1);
    this.selectedMonth$.next(this.selectedMonth);
  }
}
