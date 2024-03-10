import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit{
  transactionMap:Map<string, Transaction[]> | null = null;

  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.transactionMap = this.transactionService.getTransactionsGroupByDate();
    console.log(this.transactionMap);
  }
}
