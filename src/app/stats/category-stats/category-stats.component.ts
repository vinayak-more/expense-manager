import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { TransactionService } from '../../service/transaction.service';
import { Category } from '../../model/category.model';
import { categories } from '../../data/categories';
import { Transaction } from '../../model/transaction.model';
import { transactions } from '../../data/transactions';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TransactionType } from '../../model/transaction-type.enum';
import { CurrencyPipe } from '@angular/common';
import { PiechartComponent } from './piechart/piechart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { BurndownChartComponent } from './burndown/burndownchart.component';

@Component({
  selector: 'app-category-stats',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    PiechartComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgIf,
    BurndownChartComponent,
  ],
  templateUrl: './category-stats.component.html',
  styleUrl: './category-stats.component.scss'
})
export class CategoryStatsComponent {
  categories: Category[] = categories;
  transactions: Transaction[] = transactions;
  transactionType:TransactionType = TransactionType.DEBIT;
  chartType: string = 'allocation';
}

