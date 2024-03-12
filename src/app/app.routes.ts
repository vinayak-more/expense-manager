import { Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';

export const routes: Routes = [
    { path: '', component: TransactionsComponent},
    { path: 'transactions', component: TransactionsComponent},
    { path: 'transactions/new', component: TransactionEditComponent},
    { path: 'transactions/edit/:id', component: TransactionEditComponent}
];
