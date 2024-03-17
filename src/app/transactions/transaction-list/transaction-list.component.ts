import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../service/transaction.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactionMap: Map<string, Transaction[]> | null = null;
  transactionsSub: Subscription;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionsSub = this.transactionService.transactions$
    .subscribe(transactions => this.transactionMap = this.getTransactionsGroupByDate(transactions));
  }

  private getDateAsString(date: Date) {
    return date.toLocaleDateString('es-CL');
  }

  private getTransactionsGroupByDate(transactions: Transaction[]): Map<string, Transaction[]> {
    const map = new Map<string, Transaction[]>();
    for (let transaction of transactions) {
      if (map.has(this.getDateAsString(transaction.date))) {
        map.get(this.getDateAsString(transaction.date))?.push(transaction);
      } else {
        map.set(this.getDateAsString(transaction.date), [transaction]);
      }
    }
    return map;
  }

  ngOnDestroy(): void {
    this.transactionsSub.unsubscribe();
  }
}
