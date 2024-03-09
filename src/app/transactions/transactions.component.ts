import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TransactionSummaryComponent } from './transaction-summary/transaction-summary.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [HeaderComponent, TransactionSummaryComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

}
