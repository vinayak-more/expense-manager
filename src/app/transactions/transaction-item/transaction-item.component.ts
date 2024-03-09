import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Transaction } from '../../model/transaction.model';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [ MatCardModule, MatDividerModule],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss'
})
export class TransactionItemComponent {
  @Input() transaction!: Transaction;
}
