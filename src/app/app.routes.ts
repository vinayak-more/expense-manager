import { Routes } from '@angular/router';
import { TransactionsComponent } from './trans/transactions/transactions.component';

export const routes: Routes = [
    { path: '', component: TransactionsComponent},
    { path: 'transactions', component: TransactionsComponent},
];
