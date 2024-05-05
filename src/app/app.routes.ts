import { Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { ManageComponent } from './manage/manage.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountFormComponent } from './accounts/account-form/account-form.component';
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { StatsComponent } from './stats/stats.component';

export const routes: Routes = [
    { path: '', redirectTo: 'transactions', pathMatch: "full" },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'transactions/new', component: TransactionEditComponent },
    { path: 'transactions/edit/:id', component: TransactionEditComponent },
    { path: 'manage', component: ManageComponent },
    { path: 'accounts', component: AccountsComponent },
    { path: 'accounts/new', component: AccountFormComponent },
    { path: 'accounts/:id', component: AccountFormComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'category/new', component: CategoryFormComponent },
    { path: 'category/:id', component: CategoryFormComponent },
    { path: 'stats', component: StatsComponent },
];
