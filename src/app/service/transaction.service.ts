import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, take } from 'rxjs';
import { Transaction } from '../model/transaction.model';
import { TransactionRepository } from '../repository/transaction.repository';
import { DatabaseService } from './database.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService{
  selectedMonth = new Date();
  selectedMonth$ = new BehaviorSubject<Date>(this.selectedMonth);
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

  /**
   * 
   * @param dateStr Date in string with pattern DD-MM-yyyy i.e 17-03-2024
   * @returns javascript date object
   */
  public stringToDate(dateStr: string): Date {
    let splits = dateStr.split("-");
    if (splits.length != 3) return null;
    const date = new Date();
    date.setDate(parseInt(splits[0]));
    date.setMonth(parseInt(splits[1]) - 1);
    date.setFullYear(parseInt(splits[2]));
    return date;
  }

  /**
   * 
   * @param date javascript date object
   * @returns date in string with pattern DD-MM-yyyy i.e 17-03-2024
   */
  public getDateToString(date: Date) {
    return date.toLocaleDateString('es-CL');
  }
}
