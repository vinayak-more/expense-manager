import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { TransactionType } from '../../model/transaction-type.enum';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-item-summary',
  standalone: true,
  imports: [ MatGridListModule, CurrencyPipe],
  templateUrl: './transaction-item-summary.component.html',
  styleUrl: './transaction-item-summary.component.scss'
})
export class TransactionItemSummaryComponent implements OnInit {
  @Input() date!: string;
  @Input() transactions!: Transaction[];
  credits: number = 0;
  debits: number = 0;

  ngOnInit(): void {
    this.credits = 0;
    this.debits = 0;
    for(let transaction of this.transactions){
      if(transaction.transactionType === TransactionType.CREDIT){
        this.credits+=transaction.amount;
      } else if(transaction.transactionType === TransactionType.DEBIT){
        this.debits += transaction.amount;
      }
    }
  }
}
