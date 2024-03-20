import { Injectable } from "@angular/core";
import { DatabaseService } from "../service/database.service";
import { Transaction } from "../model/transaction.model";
import { INSERT_TRANSACTION, SELECT_TRANSACTIONS_BY_MONTHYEAR } from "./queries";

@Injectable({
    providedIn: 'root'
})
export class TransactionRepository{

    constructor(private databaseService: DatabaseService){}

    public async getTransactionsByMonthYear(monthYear:string):Promise<Transaction[]>{
        const result = await this.databaseService.executeQuery(db => {
            return db.query(SELECT_TRANSACTIONS_BY_MONTHYEAR, [monthYear]);
        });
        return result.values;
    }

    public async saveTransaction(transaction: Transaction){
        return this.databaseService.executeQuery((db)=>{
            return db.executeSet([{
                statement: INSERT_TRANSACTION,
                values:[ 
                    transaction.dateStr,
                    transaction.transactionType,
                    transaction.accountId,
                    transaction.categoryId || null,
                    transaction.toAccountId || null,
                    transaction.amount,
                    transaction.note || '',
                    transaction.monthYear
                ]
            }], true)
        });
    }
}