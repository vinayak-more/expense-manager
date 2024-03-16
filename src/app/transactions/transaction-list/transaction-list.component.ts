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
export class TransactionListComponent implements OnInit, OnDestroy{
  transactionMap:Map<string, Transaction[]> | null = null;
  transactionsSub: Subscription;

  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.transactionsSub = this.transactionService.transactions$.subscribe( transactionMap => this.transactionMap = transactionMap);
  }

  ngOnDestroy(): void {
    this.transactionsSub.unsubscribe();
  }
}
