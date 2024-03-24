import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, take } from 'rxjs';
import { Transaction } from '../model/transaction.model';
import { TransactionRepository } from '../repository/transaction.repository';
import { DatabaseService } from './database.service';
import { AccountService } from './account.service';

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
    private accountService: AccountService,
    database: DatabaseService,
  ) { 
    database.initStatus$.pipe(take(1)).subscribe(()=>this.emitTransations());
  }

  public async saveTransaction(transaction: Transaction) {
    await this.accountService.updateAccountBalance(transaction);
    this.repository.saveTransaction(transaction).then(() => this.emitTransations());
  }

  public async updateTransaction(transaction: Transaction){
    const transactionEntity = await this.repository.getTransactionById(transaction.id);
    await this.accountService.deleteTransaction(transactionEntity);
    await this.accountService.updateAccountBalance(transaction);
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

  public async deleteTransaction(id: number) {
    const transactionEntity = await this.repository.getTransactionById(id);
    await this.accountService.deleteTransaction(transactionEntity);
    this.repository.deleteTransaction(id).then(() => this.emitTransations());;
  }
}
