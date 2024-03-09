import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Transaction } from '../../model/transaction.model';
import { TransactionItemSummaryComponent } from '../transaction-item-summary/transaction-item-summary.component';
import { NgClass, NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [ 
    NgFor,
    NgClass,
    TransactionItemSummaryComponent,
    MatCardModule, 
    MatDividerModule,
    MatGridListModule,
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss'
})
export class TransactionItemComponent {
  @Input() transactions!: Transaction[];
  @Input() transactionDate!: string;
}
