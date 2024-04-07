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
declare var google: any;

@Component({
  selector: 'app-category-stats',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButtonToggleModule,
  ],
  templateUrl: './category-stats.component.html',
  styleUrl: './category-stats.component.scss'
})
export class CategoryStatsComponent implements OnInit, AfterViewInit {

  categories: Category[] = categories;
  transactions: Transaction[] = transactions;
  stats: Stat[];
  transactionType:TransactionType = TransactionType.DEBIT;
  
  @ViewChild('pieChart') pieChart: ElementRef;
  


  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
  ) {

  }

  ngAfterViewInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.updateStats.bind(this));
  }

  ngOnInit(): void {

    //this.updateStats();
  
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
      this.updateStats();
    });
  }

  updateStats() {
    const map = new Map<number, number>(); // Map of categoryId to amount
    for (let transaction of this.transactions) {
      if (transaction && transaction.categoryId && transaction.transactionType == this.transactionType) {
        if (map.has(transaction.categoryId)) map.set(transaction.categoryId, map.get(transaction.categoryId) + transaction.amount);
        else map.set(transaction.categoryId, transaction.amount);
      }
    }
    const categoryMap = new Map<number, string>();
    for (let category of this.categories) {
      if (category) categoryMap.set(category.id, category.name);
    }
    this.stats = [];
    for (let key of map.keys()) {
      this.stats.push(new Stat(categoryMap.get(key), map.get(key)));
    }
    this.stats.sort((a, b)=> b.amount - a.amount);
    console.log(this.stats);
    this.drawChart();
  }

  drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Amount');
    data.addRows([
      ...this.stats.map(stat=> [stat.categoryName, stat.amount])
    ]);

    // Set chart options
    var options = {
      'width': 400,
      'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(this.pieChart.nativeElement);
    chart.draw(data, options);
  }

  onToogleType(event: MatButtonToggleChange){
    console.log(event.value);
    this.transactionType = event.value;
    this.updateStats();
    this.drawChart();
  }


}

class Stat {
  constructor(
    public categoryName: string,
    public amount: number,
  ) { }
}
