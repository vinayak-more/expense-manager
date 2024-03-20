import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Transaction } from '../model/transaction.model';
import { ReplaySubject } from 'rxjs';
import { schema } from './schema';
import { environment } from '../../environments/environment';
import { Account } from '../model/account.model';

const DB_NAME='expense-manager';
interface SQLiteDBConnectionCallback<T> { (myArguments: SQLiteDBConnection): T }

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
      environment.databaseName,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    await this.db.execute(schema);
    
    this.initStatus$.next(true);
  }

  async getTransactionsByMonthYear(monthYear: string): Promise<Transaction[]>{
    const query = ` SELECT T.*, A.accountName FROM TXN T JOIN ACCOUNT A ON T.accountId = A.Id WHERE monthYear = '${monthYear}' `;
    const result = await this.db.query(query);
    return result.values;
  }

  async getAccounts():Promise<Account[]>{
    const query = ` SELECT * FROM ACCOUNT `;
    const result = await this.db.query(query);
    return result.values;
  }

  async addTransaction(transaction: Transaction){
    const query = ` INSERT INTO TXN ( dateStr, transactionType, accountId, categoryId, toAccountId, amount, note, monthYear)
                    VALUES ('${transaction.dateStr}','${transaction.transactionType}',${transaction.accountId}, ${transaction.categoryId || null}, ${transaction.toAccountId || null}, ${transaction.amount}, ${ transaction.note ? '\'' + transaction.note + '\'' : '\'\''}, '${transaction.monthYear}')
    `;
    const result = await this.db.execute(query);
    return result;
  }

  async updateTransaction(transaction: Transaction){
    const query = ` UPDATE TXN SET 
    dateStr = '${transaction.dateStr}', 
    transactionType = '${transaction.transactionType}',
    accountId = ${transaction.accountId},
    categoryId = ${transaction.categoryId || null},
    toAccountId = ${transaction.toAccountId || null},
    amount = ${transaction.amount}, 
    note = ${ transaction.note ? '\'' + transaction.note + '\'' : '\'\''},
    monthYear = '${transaction.monthYear}'
    WHERE id = ${transaction.id}`;

    const result = await this.db.execute(query);
    return result;
  }

  /**
   * this function will handle the sqlite isopen and isclosed automatically for you.
   * @param callback: The callback function that will execute multiple SQLiteDBConnection commands or other stuff.
   * @param databaseName optional another database name
   * @returns any type you want to receive from the callback function.
   */
  async executeQuery<T>(callback: SQLiteDBConnectionCallback<T>, databaseName: string = environment.databaseName): Promise<T> {
    try {
      let isConnection = await this.sqlite.isConnection(databaseName, false);

      if (isConnection.result) {
        let db = await this.sqlite.retrieveConnection(databaseName, false);
        return await callback(db);
      }
      else {
        const db = await this.sqlite.createConnection(databaseName, false, "no-encryption", 1, false);
        await db.open();
        let cb = await callback(db);
        await this.sqlite.closeConnection(databaseName, false);
        return cb;
      }
    } catch (error) {
      throw Error(`DatabaseServiceError: ${error}`);
    }
  }
}
