import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionService } from '../../service/transaction.service';
import { TransactionType } from '../../model/transaction-type.enum';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Subscription, map } from 'rxjs';
import { Transaction } from '../../model/transaction.model';


@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    MatGridListModule, 
    MatDividerModule,
  ],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent implements OnInit, OnDestroy{
  credits = 0;
  debits = 0;
  total = 0;
  private transactionsSub:Subscription;
  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.transactionsSub = this.transactionService.transactions$
    .subscribe((transactions: Transaction[]) => this.updateStats(transactions));
  }

  private updateStats(transactions: Transaction[]){
    this.credits = 0;
      this.debits = 0;
      this.total = 0;
  
      for(let transaction of transactions){
        if(transaction.transactionType === TransactionType.CREDIT){
          this.credits += transaction.amount;
        } else if(transaction.transactionType === TransactionType.DEBIT){
          this.debits += transaction.amount;
        }
      }
      this.total = this.credits - this.debits;
  }

  ngOnDestroy(): void {
    this.transactionsSub.unsubscribe();
  }
}
