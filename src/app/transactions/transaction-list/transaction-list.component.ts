import { Component } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  transactionList: Transaction[] = [
    {
      date: new Date(),
      account: 'Cash',
      category: 'Transpotation',
      amount: 20,
      note: 'Bus'

    },
    {
      date: new Date(),
      account: 'Cash',
      category: 'Grocary',
      amount: 20,
      note: 'Milk'
    }
  ]
}
