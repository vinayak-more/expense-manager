import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionList: Transaction[] = [
    {
      date: "01-01-2023",
      account: 'Cash',
      category: 'Transpotation',
      amount: 20,
      note: 'Bus'

    },
    {
      date: "01-01-2023",
      account: 'Cash',
      category: 'Transpotation',
      amount: 20,
      note: 'Riksha'

    },
    {
      date: "01-01-2023",
      account: 'Cash',
      category: 'Transpotation',
      amount: 20,
      note: 'Train'

    },
    {
      date: "02-01-2023",
      account: 'Cash',
      category: 'Grocary',
      amount: 20,
      note: 'Milk'
    },
    {
      date: "02-01-2023",
      account: 'Cash',
      category: 'Food',
      amount: 20,
      note: 'Snacks'
    },
    {
      date: "02-01-2023",
      account: 'Cash',
      category: 'Food',
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
      account: 'Cash',
      category: 'Food',
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
      account: 'Cash',
      category: 'Food',
      amount: 20,
      note: 'Tea'
    },
    {
      date: "02-01-2023",
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
