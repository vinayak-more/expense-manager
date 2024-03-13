import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'app-transaction-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  selectedMonth: string;

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.setSelectedMonth(this.transactionService.getSelectedMonth());
    this.transactionService.getSelectedMonth$().subscribe(date => this.setSelectedMonth(date));
  }

  setSelectedMonth(date: Date) {
    this.selectedMonth = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
  }

  onNextMonth() {
    this.transactionService.onNextMonth();
  }

  onPrevMonth() {
    this.transactionService.onPrevMonth();
  }
}
