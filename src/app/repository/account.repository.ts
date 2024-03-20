import { Injectable } from "@angular/core";
import { DatabaseService } from "../service/database.service";
import { Account } from "../model/account.model";
import { SELECT_ACCOUNTS} from './queries'

@Injectable({
    providedIn: 'root'
})
export class AccountRepository{

    constructor(private databaseService: DatabaseService){}

    public async getAllAccounts():Promise<Account[]>{
       const accounts = await this.databaseService.executeQuery(db=> db.query(SELECT_ACCOUNTS));
       return accounts.values;
    }
}