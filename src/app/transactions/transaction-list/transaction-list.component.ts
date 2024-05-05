import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../service/transaction.service';
import { Subscription, take } from 'rxjs';
import { transactions } from '../../data/transactions';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule, 
    TransactionItemComponent,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactionMap: Map<string, Transaction[]> | null = this.getTransactionsGroupByDate(transactions);
  transactionsSub: Subscription;

  @ViewChild("txnList") txnList:ElementRef;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionsSub = this.transactionService.transactions$
    .subscribe(transactions => this.transactionMap = this.getTransactionsGroupByDate(transactions));
  }

  private getTransactionsGroupByDate(transactions: Transaction[]): Map<string, Transaction[]> {
    const map = new Map<string, Transaction[]>();
    for (let transaction of transactions) {
      if (map.has(transaction.dateStr)) {
        map.get(transaction.dateStr)?.push(transaction);
      } else {
        map.set(transaction.dateStr, [transaction]);
      }
    }
//    this.txnList.nativeElement.scrollIntoView();
    return map;
  }

  ngAfterViewInit(){
   this.txnList.nativeElement.scrollIntoView();
  }

  ngOnDestroy(): void {
    this.transactionsSub.unsubscribe();
  }
}
