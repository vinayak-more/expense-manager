import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../service/transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent implements OnInit, OnDestroy{
  transactionMap:Map<string, Transaction[]> | null = null;
  selectedMonthSub: Subscription;
  transactionsSub: Subscription;

  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.transactionsSub = this.transactionService.getTransactions$().subscribe( transactionMap => this.transactionMap = transactionMap);
    this.selectedMonthSub = this.transactionService.getSelectedMonth$().subscribe(month=>{
      // this.transactionMap = this.transactionService.getTransactions();
    });
  }

  ngOnDestroy(): void {
    this.selectedMonthSub.unsubscribe();
    this.transactionsSub.unsubscribe();
  }
}
