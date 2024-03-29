import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Transaction } from '../model/transaction.model';
import { ReplaySubject } from 'rxjs';
import { schema } from './schema';
import { environment } from '../../environments/environment';
import { INSERT_CHANGELOG_VERSION, SELECT_DB_CHANGELOG_VERSION } from '../repository/queries';
import { CHANGE_LOG_MASTER } from './changelog/changelog.master';

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

    await this.applyChangeLog();
    
    this.initStatus$.next(true);
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

  private async applyChangeLog(): Promise<number>{
    console.log("checking for database changelog");
    const dbVersion = await this.getDBChangeLogVersion();
    console.log(`Database changelog version is ${dbVersion}, current version is ${environment.changeLogVersion}`);
    //DB is in sync or ahead with current version
    if(dbVersion >= environment.changeLogVersion){
      console.log("No changelog diff found, skipping changelog execution");
      return 0;
    }
    console.log("Applying diff changelog")
    //apply all changelogs
    for(let i = dbVersion + 1; i <= environment.changeLogVersion; i++){
      const query = CHANGE_LOG_MASTER[i];
      console.log(`change log version: ${i}, query: ${query}`);
      this.db.execute(query);
      await this.insertDBChangeLogVersion(i);
    }
    console.log("changelog applied successfully");
    return environment.changeLogVersion;
  }

  private async getDBChangeLogVersion(): Promise<number>{
     const version = await this.db.query(SELECT_DB_CHANGELOG_VERSION);
     return version.values.length == 0 ? 0 : version.values[0]?.version;
  }

  private async insertDBChangeLogVersion(version: number){
    return this.db.executeTransaction([{
      statement: INSERT_CHANGELOG_VERSION,
      values:[version]
    }])
  }
}
