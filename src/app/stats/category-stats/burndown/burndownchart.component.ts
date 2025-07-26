import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { Transaction } from '../../../model/transaction.model';
import { Category } from '../../../model/category.model';
import { CategoryService } from '../../../service/category.service';
import { TransactionService } from '../../../service/transaction.service';
import { categories } from '../../../data/categories';
import { transactions } from '../../../data/transactions';
import { TransactionType } from '../../../model/transaction-type.enum';
declare var google: any;

@Component({
    selector: 'app-burndownchart',
    standalone: true,
    imports: [CurrencyPipe, NgFor, NgClass],
    templateUrl: './burndownchart.component.html',
    styleUrl: './burndownchart.component.scss'
})
export class BurndownChartComponent {
    @ViewChild('burndownChart') burndownChart: ElementRef;
    categories: Category[] = categories;
    transactions: Transaction[] = transactions;
    burndownData: { date: string; total: number, change:number }[] = [];

    constructor(
        private categoryService: CategoryService,
        private transactionService: TransactionService,
    ) { }

    ngOnInit(): void {
        this.transactionService.selectedMonth$.subscribe(() => {
            this.init();
        })

    }
    init() {
        Promise.all(
            [this.categoryService.getCategories(),
            this.transactionService.getTransactions()]
        ).then((value: [Category[], Transaction[]]) => {
            this.categories = value[0];
            this.transactions = value[1];
            this.updateBurndown();
        });
    }

    ngAfterViewInit(): void {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(this.updateBurndown.bind(this));
    }


    updateBurndown() {
        if (!this.transactions) return;
        // Group by date and sum
        const map = new Map<string, number>();
        for (let transaction of this.transactions) {
            if (transaction && transaction.dateStr) {
                const date = transaction.dateStr;
                const amount = transaction.transactionType == TransactionType.TRANSFER ? 0 : transaction.transactionType == TransactionType.DEBIT ? -transaction.amount : transaction.amount;
                if (map.has(date)) map.set(date, map.get(date) + amount);
                else map.set(date, amount);
            }
        }
        const sorted = Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
        let balance = 0;
        this.burndownData = []
        for(const [date, total] of sorted) {
            balance += total;
            this.burndownData.push({date, total: balance, change: total});
        }
        this.drawChart();
    }

    drawChart() {
        if (!this.burndownChart || !this.burndownData || !google.visualization) return;
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Total');
        data.addRows([
            ...this.burndownData.map(day => [day.date.split("-")[0], day.total])
        ]);
        var options = {
            'width': 400,
            'height': 250,
            'curveType': 'function',
            'legend': { position: 'bottom' },
            'pointSize': 5,
            'hAxis': { title: 'Date', showTextEvery: 1, slantedText: true, slantedTextAngle: 45 },
            'vAxis': { }
        };
        var chart = new google.visualization.LineChart(this.burndownChart.nativeElement);
        chart.draw(data, options);
    }

    trackByIndex(index: number, item: any) {
        return index;
    }
}
