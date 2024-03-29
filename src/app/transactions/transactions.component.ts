import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TransactionSummaryComponent } from './transaction-summary/transaction-summary.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    HeaderComponent, 
    TransactionSummaryComponent,
    TransactionListComponent,
    TransactionAddComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

}
