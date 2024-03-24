import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Transaction } from '../../model/transaction.model';
import { TransactionItemSummaryComponent } from '../transaction-item-summary/transaction-item-summary.component';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { TransactionType } from '../../model/transaction-type.enum';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [ 
    NgFor,
    NgClass,
    CurrencyPipe,
    TransactionItemSummaryComponent,
    MatIconModule,
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
  transactionType = TransactionType;

  constructor(private router:Router){}

  onClick(transaction: Transaction){
    this.router.navigate(
      ['transactions', 'edit', transaction.id], 
      {state : {'transaction': {...transaction}}}
      ); 
  }
}
