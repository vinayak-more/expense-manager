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

    this.loadTransactions();

    const transaction = await this.db.query('SELECT * FROM TXN');

    console.log("$$ Transactions",transaction.values);

    const accounts = await this.db.query('SELECT * FROM ACCOUNT');
    console.log("$$ Accounts",accounts.values);

    const category = await this.db.query('SELECT * FROM CATEGORY');
    console.log("$$ categories",category.values);

  }

  async loadTransactions(){
    const transactions = await this.db.query('SELECT * FROM TXN');
    this.transactions$.next(transactions.values || null);
  }

  async addTransaction(transaction: Transaction){
    const query = ` INSERT INTO TXN ( dateStr, accountId, categoryId, toAccountId, amount, note, monthYear)
                    VALUES ('${transaction.dateStr}',${transaction.accountId}, ${transaction.categoryId}, ${transaction.toAccountId || null}, ${transaction.amount}, ${ transaction.note ? '\'' + transaction.note + '\'' : '\'\''}, '${transaction.monthYear}')
    `;
    const result = await this.db.execute(query);
    this.loadTransactions();
    return result;
  }
}
