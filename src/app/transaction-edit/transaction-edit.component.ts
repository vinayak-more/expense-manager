import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionType } from '../model/transaction-type.enum';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../model/transaction.model';
import { MatSelectModule } from '@angular/material/select';
import { Account } from '../model/account.model';
import { AccountService } from '../service/account.service';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category.model';
import { NgIf } from '@angular/common';
import { accounts } from '../data/accounts';
import { categories } from '../data/categories';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-transaction-edit',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transaction-edit.component.html',
  styleUrl: './transaction-edit.component.scss'
})
export class TransactionEditComponent implements OnInit {
  accounts: Account[] = accounts;
  categoryMaster : Category[] = categories;
  categories: Category[];
  editMode: boolean = false;
  header:string = 'Expense';
  transaction:Transaction;

  formGroup = new FormGroup<TransactionForm>({
    id: new FormControl(new Date().getTime()),
    transactionType: new FormControl(TransactionType.DEBIT, { nonNullable: true }),
    date: new FormControl(new Date(), Validators.required),
    accountId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{0,2})?$/)]),
    note: new FormControl(null),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
  ) {
    let transaction = null;
    if (this.router.getCurrentNavigation()?.extras?.state) {
      transaction = <Transaction>this.router.getCurrentNavigation()?.extras?.state['transaction'];
      this.transaction = { ...transaction, 'date': this.transactionService.stringToDate(transaction.dateStr) };
    }
  }

  ngOnInit(): void {
    Promise.all([
      this.accountService.getAccounts(), 
      this.categoryService.getCategories()])
      .then((value: [Account[], Category[]]) =>{
      this.accounts = value[0];
      this.categoryMaster = value[1];
      this.categories = this.categoryMaster.filter(category => category.transactionType === this.formGroup.value.transactionType);
    });
    if (this.transaction) {
      if(this.transaction.id){
        this.editMode = true;
        this.onTransactionTypeChange(this.transaction.transactionType);
      } else {
        this.editMode = false;
      }
      this.formGroup.patchValue(this.transaction);
    } else {
      this.editMode = false;
    }
    this.formGroup.controls.transactionType.valueChanges.subscribe(value => this.onTransactionTypeChange(value));
  }

  onTransactionTypeChange(type: TransactionType) {
    if (type === TransactionType.TRANSFER) {
      this.formGroup.removeControl('categoryId');
      this.formGroup.addControl('toAccountId', new FormControl(null, Validators.required));
    } else {
      this.formGroup.removeControl('toAccountId');
      this.categories = this.categoryMaster.filter(category => category.transactionType === type);
      if (this.formGroup.contains('categoryId'))
        this.formGroup.controls.categoryId.reset();
      else this.formGroup.addControl('categoryId', new FormControl(null, Validators.required));
    }
    this.updateHeader(type);
  }


  onSubmit() {
    const transaction = {
      ...this.formGroup.getRawValue(),
      'monthYear': this.getMonthYear(this.formGroup.value.date),
      'dateStr': this.transactionService.getDateToString(this.formGroup.value.date),
    };
    console.log(transaction);
    if (this.editMode) {
      this.transactionService.updateTransaction(transaction);
    } else {
      this.transactionService.saveTransaction(transaction);
    }

    this.onBack();
  }

  private getMonthYear(date: Date) {
    return date.getMonth() + '-' + date.getFullYear();
  }

  onBack() {
    this.router.navigate(['transactions'])
  }

  updateHeader(type: TransactionType){
    switch(type){
      case TransactionType.CREDIT: this.header = "Income"; return;
      case TransactionType.DEBIT: this.header = "Expense"; return;
      case TransactionType.TRANSFER: this.header = "Transfer"; return;
    }
  }

  async onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Are you Sure?", body: `Are you sure you want to delete this Transaction?` }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.transactionService.deleteTransaction(this.formGroup.value.id)
          .then(() => this.onBack());
      }
    });
  }

}

interface TransactionForm {
  id?: FormControl<number | null>,
  transactionType: FormControl<TransactionType>,
  date: FormControl<Date>,
  accountId: FormControl<number | null>,
  amount: FormControl<number | null>,
  note?: FormControl<string | null>,
  categoryId?: FormControl<number | null>,
  toAccountId?: FormControl<number | null>,
}