import { Injectable } from '@angular/core';
import { Transaction, TransactionType } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionList: Transaction[] = [
    {
      date: "01-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 'Cash',
      category: 'Transpotation',
      amount: 20,
      note: 'Bus'

    },
    {
      date: "01-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 'Cash',
      category: 'Transpotation',
      amount: 20,
      note: 'Riksha'

    },
    {
      date: "01-01-2023",
      transactionType: TransactionType.CREDIT,
      account: 'Cash',
      category: 'Cashback',
      amount: 20,
      note: 'GPay'

    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 'Cash',
      category: 'Grocary',
      amount: 20,
      note: 'Milk'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.CREDIT,
      account: 'Cash',
      category: 'Refund',
      amount: 20,
      note: 'Flipkart'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 'Cash',
      category: 'Food',
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 'Cash',
      category: 'Food',
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 'Cash',
      category: 'Food',
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
      transactionType: TransactionType.DEBIT,
      account: 'Cash',
      category: 'Food',
      amount: 20,
      note: 'Tea'
    },
    
  ]
  constructor() { }

  public getTransactionsGroupByDate(){
    const map = new Map<string, Transaction[]>();
    for(let transaction of this.transactionList){
      if(map.has(transaction.date)){
        map.get(transaction.date)?.push(transaction);
      }else {
        map.set(transaction.date, [transaction]);
      }
    }
    return map;
  }
}
