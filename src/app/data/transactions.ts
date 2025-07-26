import { TransactionType } from "../model/transaction-type.enum";
import { Transaction } from "../model/transaction.model";

function parseDateStr(dateStr: string): Date {
    // Handles dd-MM-yyyy
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export const transactions: Transaction[] = [
    {
        id: 1,
        transactionType: TransactionType.DEBIT,
        date: parseDateStr('01-03-2024'),
        accountId: 1,
        categoryId: 1,
        amount: 25,
        dateStr:'01-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 2,
        transactionType: TransactionType.TRANSFER,
        date: parseDateStr('01-03-2024'),
        accountId: 1,
        toAccountId: 2,
        amount: 250,
        dateStr:'01-03-2024',
        accountName: 'Savings',
        toName: 'Credit Card',
        note:"Credit card payment"
    },
    {
        id: 3,
        transactionType: TransactionType.DEBIT,
        date: parseDateStr('03-03-2024'),
        accountId: 1,
        categoryId: 2,
        amount: 250,
        dateStr:'03-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 4,
        transactionType: TransactionType.DEBIT,
        date: parseDateStr('04-03-2024'),
        accountId: 1,
        categoryId: 3,
        amount: 25,
        dateStr:'04-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 5,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('05-03-2024'),
        accountId: 1,
        categoryId: 4,
        amount: 25,
        dateStr:'05-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 6,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('07-03-2024'),
        accountId: 1,
        categoryId: 5,
        amount: 25,
        dateStr:'07-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 5,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('10-03-2024'),
        accountId: 1,
        categoryId: 4,
        amount: 25,
        dateStr:'10-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 6,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('15-03-2024'),
        accountId: 1,
        categoryId: 5,
        amount: 25,
        dateStr:'15-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport',
        note:'Bus'
    },
    {
        id: 5,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('15-03-2024'),
        accountId: 1,
        categoryId: 4,
        amount: 25,
        dateStr:'15-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 6,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('18-03-2024'),
        accountId: 1,
        categoryId: 5,
        amount: 25,
        dateStr:'18-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 5,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('20-03-2024'),
        accountId: 1,
        categoryId: 4,
        amount: 25,
        dateStr:'20-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 6,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('22-03-2024'),
        accountId: 1,
        categoryId: 5,
        amount: 25,
        dateStr:'22-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 5,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('25-03-2024'),
        accountId: 1,
        categoryId: 4,
        amount: 25,
        dateStr:'25-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 6,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('30-03-2024'),
        accountId: 1,
        categoryId: 5,
        amount: 25,
        dateStr:'30-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 5,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('31-03-2024'),
        accountId: 1,
        categoryId: 4,
        amount: 25,
        dateStr:'31-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
    {
        id: 6,
        transactionType: TransactionType.CREDIT,
        date: parseDateStr('31-03-2024'),
        accountId: 1,
        categoryId: 5,
        amount: 25,
        dateStr:'31-03-2024',
        accountName: 'Savings',
        categoryName: 'Transport'
    },
];