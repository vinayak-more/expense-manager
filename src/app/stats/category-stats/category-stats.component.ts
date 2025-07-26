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

@Component({
  selector: 'app-category-stats',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    PiechartComponent,
  ],
  templateUrl: './category-stats.component.html',
  styleUrl: './category-stats.component.scss'
})
export class CategoryStatsComponent implements OnInit {

  categories: Category[] = categories;
  transactions: Transaction[] = transactions;
  transactionType:TransactionType = TransactionType.DEBIT;
  
  @ViewChild('pieChart') pieChart: ElementRef;

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
  ) {

  }

  ngOnInit(): void {

    this.transactionService.selectedMonth$.subscribe(()=>{
      this.init();
    })

  }
  init(){
    Promise.all(
      [this.categoryService.getCategories(),
      this.transactionService.getTransactions()]
    ).then((value: [Category[], Transaction[]]) => {
      this.categories = value[0];
      this.transactions = value[1];
    });
  }

  onToogleType(event: MatButtonToggleChange){
    console.log(event.value);
    this.transactionType = event.value;
  }
}

