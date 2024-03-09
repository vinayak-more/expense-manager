import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-item-summary',
  standalone: true,
  imports: [],
  templateUrl: './transaction-item-summary.component.html',
  styleUrl: './transaction-item-summary.component.scss'
})
export class TransactionItemSummaryComponent {
  @Input() date!: string;
}
