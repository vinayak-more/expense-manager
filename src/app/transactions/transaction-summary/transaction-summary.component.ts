import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [MatGridListModule, MatDividerModule],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss'
})
export class TransactionSummaryComponent {

}
