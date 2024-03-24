import { Injectable } from "@angular/core";
import { DatabaseService } from "../service/database.service";
import { Transaction } from "../model/transaction.model";
import { DELETE_TRANSACTION, INSERT_TRANSACTION, SELECT_TRANSACTIONS_BY_MONTHYEAR, SELECT_TRANSACTION_BY_ID, UPDATE_TRANSACTION } from "./queries";

@Injectable({
    providedIn: 'root'
})
export class TransactionRepository {

    constructor(private databaseService: DatabaseService) { }

    public async getTransactionsByMonthYear(monthYear: string): Promise<Transaction[]> {
        const result = await this.databaseService.executeQuery(db => {
            return db.query(SELECT_TRANSACTIONS_BY_MONTHYEAR, [monthYear]);
        });
        return result.values;
    }

    public async saveTransaction(transaction: Transaction) {
        return this.databaseService.executeQuery((db) => {
            return db.executeTransaction([{
                statement: INSERT_TRANSACTION,
                values: [
                    transaction.dateStr,
                    transaction.transactionType,
                    transaction.accountId,
                    transaction.categoryId || null,
                    transaction.toAccountId || null,
                    transaction.amount,
                    transaction.note || '',
                    transaction.monthYear
                ]
            }])
        });
    }

    public async updateTransaction(transaction: Transaction) {
        return this.databaseService.executeQuery((db) => {
            return db.executeTransaction([{
                statement: UPDATE_TRANSACTION,
                values: [
                    transaction.dateStr,
                    transaction.transactionType,
                    transaction.accountId,
                    transaction.categoryId || null,
                    transaction.toAccountId || null,
                    transaction.amount,
                    transaction.note || '',
                    transaction.monthYear,
                    transaction.id
                ]
            }])
        });
    }

    public async getTransactionById(id: number): Promise<Transaction>{
        const transaction = await this.databaseService.executeQuery( db => {
            return db.query(SELECT_TRANSACTION_BY_ID, [id]);
        })
        return transaction.values[0];
    }

    deleteTransaction(id: number) {
        return this.databaseService.executeQuery(db => {
            return db.executeTransaction([{
                statement: DELETE_TRANSACTION,
                values:[id]
            }])
        });
      }
}