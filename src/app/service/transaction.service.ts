import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import { TransactionType } from '../model/transaction-type.enum';
import { AccountService } from './account.service';
import { CategoryService } from './category.service';
import { ReplaySubject, Subject, map, take } from 'rxjs';
import { Firestore, Timestamp, addDoc, collection, collectionData, doc, getDoc, getFirestore, query, updateDoc, where } from '@angular/fire/firestore';
import { getDocs } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  selectedMonth = new Date();
  selectedMonth$ = new Subject<Date>();
  public transactions$ = new ReplaySubject<Map<string, Transaction[]>>();
  db: Firestore;
  transactions: Transaction[] = [];

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private store: Firestore,
  ) { 
    this.emitTransations();
    this.db = getFirestore();
  }

  public getDate(date: Date | Timestamp): Date{
    if(date instanceof Timestamp){
      return date.toDate();
    }
    return date;
  }

  public getDateAsString(date: Date | Timestamp){
    if(date instanceof Timestamp){
      date = date.toDate();
    }
    return date.toLocaleDateString('es-CL');
  }

  private getTransactions$(){
    return getDocs(query(
      collection(this.store, 'txn'), 
      where('monthYear', '==', this.getMonthYear(this.selectedMonth))))
      .then(snapshot=>{
        const transactions: Transaction[] = []
        snapshot.forEach(docData=>{
          transactions.push({...<Transaction>docData.data(), 'ref': docData.id});
        });
        console.log(transactions);
        this.initTransactions(transactions);
        return this.getTransactionsGroupByDate(transactions)
      })
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

  public async saveTransaction(transaction: Transaction) {
    await addDoc(collection(this.store, 'txn'), transaction);
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
    await updateDoc(doc(this.store, 'txn', transaction.ref), {...transaction});
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
    this.getTransactions$().then(data=> this.transactions$.next(data));
  }
}
