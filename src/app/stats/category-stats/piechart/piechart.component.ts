import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Transaction } from '../../../model/transaction.model';
import { Category } from '../../../model/category.model';
declare var google: any;

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [CurrencyPipe, NgFor],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.scss'
})
export class PiechartComponent implements AfterViewInit, OnChanges {
  @Input() transactions: Transaction[] = [];
  @Input() categories: Category[] = [];
  @Input() transactionType: string;
  @ViewChild('pieChart') pieChart: ElementRef;

  stats: { categoryName: string; amount: number }[] = [];

  ngAfterViewInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.updateStats.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateStats();
  }

  updateStats() {
    if (!this.transactions || !this.categories) return;
    const map = new Map<number, number>();
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
      this.stats.push({ categoryName: categoryMap.get(key), amount: map.get(key) });
    }
    this.stats.sort((a, b) => b.amount - a.amount);
    this.drawChart();
  }

  drawChart() {
    if (!this.pieChart || !this.stats || this.stats.length === 0 || !google.visualization) return;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Amount');
    data.addRows([
      ...this.stats.map(stat => [`${stat.categoryName}`, stat.amount])
    ]);
    var options = {
      'width': 500,
      'height': 300,
      'is3D': true
    };
    var chart = new google.visualization.PieChart(this.pieChart.nativeElement);
    chart.draw(data, options);
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
