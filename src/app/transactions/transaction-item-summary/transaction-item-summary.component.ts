import { Component, Input, OnInit } from '@angular/core';
import { Transaction, TransactionType } from '../../model/transaction.model';

@Component({
  selector: 'app-transaction-item-summary',
  standalone: true,
  imports: [],
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
      } else {
        this.debits += transaction.amount;
      }
    }
  }
}
