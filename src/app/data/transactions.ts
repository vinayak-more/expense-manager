import { TransactionType } from "../model/transaction-type.enum";
import { Transaction } from "../model/transaction.model";

export const transactions: Transaction[] = [
    {
        transactionType: TransactionType.DEBIT,
        date: new Date(),
        accountId: 1,
        categoryId: 1,
        amount: 25,
        dateStr:'18-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    }
]