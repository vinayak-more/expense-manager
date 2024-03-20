import { Injectable, OnInit } from '@angular/core';
import { Transaction } from '../model/transaction.model';
import { ReplaySubject, Subject, map, take } from 'rxjs';
import { DatabaseService } from './database.service';
import { TransactionRepository } from '../repository/transaction.repository';

@Injectable({
  providedIn: 'root'
})
export class TransactionService{
  selectedMonth = new Date();
  selectedMonth$ = new Subject<Date>();
  public transactions$ = new ReplaySubject<Transaction[]>();
  transactions: Transaction[] = [];

  constructor(
    private repository: TransactionRepository,
    database: DatabaseService,
  ) { 
    database.initStatus$.pipe(take(1)).subscribe(()=>this.emitTransations());
  }

  public async saveTransaction(transaction: Transaction) {
    this.repository.saveTransaction(transaction).then(() => this.emitTransations());
  }

  public async updateTransaction(transaction: Transaction){
    this.repository.updateTransaction(transaction).then(() => this.emitTransations());
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
    this.repository.getTransactionsByMonthYear(this.getMonthYear(this.selectedMonth))
    .then(value => this.transactions$.next(value));
  }

  private getMonthYear(date: Date):string{
    return date.getMonth()+'-'+date.getFullYear();
  }

  private getSelectedMonthYear(){
    return this.getMonthYear(this.selectedMonth);
  }

  public async getTransactions():Promise<Transaction[]>{
    return this.repository.getTransactionsByMonthYear(this.getSelectedMonthYear());
  }
}
