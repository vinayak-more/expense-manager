import { Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [
    { path: '', component: TransactionsComponent},
    { path: 'transactions', component: TransactionsComponent},
];
