import { Injectable } from "@angular/core";
import { DatabaseService } from "../service/database.service";
import { Account } from "../model/account.model";
import { INSERT_ACCOUNT, SELECT_ACCOUNTS, SELECT_ACCOUNT_BY_ID, UPDATE_ACCOUNT, UPDATE_ACCOUNT_BALANCE} from './queries'

@Injectable({
    providedIn: 'root'
})
export class AccountRepository{

    constructor(private databaseService: DatabaseService){}

    public async getAllAccounts():Promise<Account[]>{
       const accounts = await this.databaseService.executeQuery(db=> db.query(SELECT_ACCOUNTS));
       return accounts.values;
    }

    public async getAccount(id: number): Promise<Account>{
        const account = await this.databaseService.executeQuery( db => db.query(SELECT_ACCOUNT_BY_ID, [id]))
        return account.values[0];
    }

    public async updateAccountBalance(id: number, balance:number){
        const account = await this.getAccount(id);
        return await this.databaseService.executeQuery( db => {
            return db.executeTransaction([{
                statement: UPDATE_ACCOUNT_BALANCE,
                values:[account.balance + balance, id]
            }])
        });
    }

    public async saveAccount(account: Account){
        if(account.id == 0){
            return this.databaseService.executeQuery(db => {
                return db.executeTransaction([{
                    statement: INSERT_ACCOUNT,
                    values:[account.name, account.balance]
                }])
            });
        } else {
            return this.databaseService.executeQuery(db => {
                return db.executeTransaction([{
                    statement: UPDATE_ACCOUNT,
                    values: [account.name, account.balance, account.id]
                }])
            });
        }
    }
}