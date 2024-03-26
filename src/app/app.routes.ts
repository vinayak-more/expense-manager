import { Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { ManageComponent } from './manage/manage.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountFormComponent } from './accounts/account-form/account-form.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
    { path: '', redirectTo:'transactions', pathMatch: "full"},
    { path: 'transactions', component: TransactionsComponent},
    { path: 'transactions/new', component: TransactionEditComponent},
    { path: 'transactions/edit/:id', component: TransactionEditComponent},
    { path: 'manage', component: ManageComponent},
    { path: 'accounts', component: AccountsComponent},
    { path: 'accounts/new', component: AccountFormComponent},
    { path: 'category', component: CategoryComponent},
];
