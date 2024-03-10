import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../../model/transaction.model';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [
    NgClass,
    MatGridListModule, 
    MatDividerModule],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent implements OnInit{
  credits = 0;
  debits = 0;
  total = 0;
  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    const transactions = this.transactionService.getTransactions();
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
}
