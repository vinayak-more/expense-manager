import { TransactionType } from "../model/transaction-type.enum";
import { Transaction } from "../model/transaction.model";

export const transactions: Transaction[] = [
    {
        id: 1,
        transactionType: TransactionType.DEBIT,
        date: new Date(),
        accountId: 1,
        categoryId: 1,
        amount: 25,
        dateStr:'18-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 2,
        transactionType: TransactionType.TRANSFER,
        date: new Date(),
        accountId: 1,
        toAccountId: 2,
        amount: 25,
        dateStr:'18-03-2024',
        accountName: 'Savings',
        toName: 'Credit Card',
        note:"Credit card payment"
    }
]