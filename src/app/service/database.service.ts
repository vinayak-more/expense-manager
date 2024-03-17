import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { sign } from 'crypto';
import { Transaction } from '../model/transaction.model';
import { ReplaySubject } from 'rxjs';
import { schema } from './schema';

const DB_NAME='expense-manager';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  public initStatus$ = new ReplaySubject<boolean>();
  public transactions$ = new ReplaySubject<Transaction[]>();

  constructor() { }

  async initializePlugin(){
    this.db = await this.sqlite.createConnection(
      DB_NAME,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    await this.db.execute(schema);
    
    this.initStatus$.next(true);
  }

  async loadTransactions(){
    const transactions = await this.db.query('SELECT * FROM TXN');
    this.transactions$.next(transactions.values || null);
  }

  async getTransactionsByMonthYear(monthYear: string): Promise<Transaction[]>{
    const query = ` SELECT * FROM TXN WHERE monthYear = '${monthYear}'`;
    const result = await this.db.query(query);
    return result.values;
  }

  async addTransaction(transaction: Transaction){
    const query = ` INSERT INTO TXN ( dateStr, accountId, categoryId, toAccountId, amount, note, monthYear)
                    VALUES ('${transaction.dateStr}',${transaction.accountId}, ${transaction.categoryId}, ${transaction.toAccountId || null}, ${transaction.amount}, ${ transaction.note ? '\'' + transaction.note + '\'' : '\'\''}, '${transaction.monthYear}')
    `;
    const result = await this.db.execute(query);
    this.loadTransactions();
    return result;
  }

  async updateTransaction(transaction: Transaction){
    const query = ` UPDATE TXN SET 
    dateStr = '${transaction.dateStr}', 
    accountId = ${transaction.accountId},
    categoryId = ${transaction.categoryId},
    toAccountId = ${transaction.toAccountId || null},
    amount = ${transaction.amount}, 
    note = ${ transaction.note ? '\'' + transaction.note + '\'' : '\'\''},
    monthYear = '${transaction.monthYear}'
    WHERE id = ${transaction.id}`;

    const result = await this.db.execute(query);
    this.loadTransactions();
    return result;
  }
}
