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

@Component({
  selector: 'app-transaction-edit',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,

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
  accounts: Account[];
  categories: Category[];
  editMode: boolean = false;

  formGroup = new FormGroup<TransactionForm>({
    id: new FormControl(new Date().getTime()),
    transactionType: new FormControl(TransactionType.DEBIT, { nonNullable: true }),
    date: new FormControl(new Date(), Validators.required),
    account: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    note: new FormControl(null),
    ref: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private categoryService: CategoryService,
  ) {

    let transaction = null;
    if (this.router.getCurrentNavigation()?.extras?.state) {
      transaction = <Transaction>this.router.getCurrentNavigation()?.extras?.state['transaction'];
      transaction = { ...transaction, 'date': this.transactionService.getDate(transaction.date) };
    }
    if (transaction) {
      this.editMode = true;
      this.onTransactionTypeChange(transaction.transactionType);
      this.formGroup.patchValue(transaction);
    } else {
      this.editMode = false;
    }
  }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
    this.categories = this.categoryService.getCategories().filter(category => category.transactionType === this.formGroup.value.transactionType);
    this.formGroup.controls.transactionType.valueChanges.subscribe(value => this.onTransactionTypeChange(value));
  }

  onTransactionTypeChange(type: TransactionType) {
    if (type === TransactionType.TRANSFER) {
      this.formGroup.removeControl('category');
      this.formGroup.addControl('to', new FormControl(null, Validators.required));
    } else {
      this.formGroup.removeControl('to');
      this.categories = this.categoryService.getCategories().filter(category => category.transactionType === type);
      if (this.formGroup.contains('category'))
        this.formGroup.controls.category.reset();
      else this.formGroup.addControl('category', new FormControl(null, Validators.required));
    }
  }

  onSubmit() {
    const transaction = {
      ...this.formGroup.getRawValue(),
      'monthYear': this.getMonthYear(this.formGroup.value.date),
    };
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

}

interface TransactionForm {
  id?: FormControl<number | null>,
  transactionType: FormControl<TransactionType>,
  date: FormControl<Date>,
  account: FormControl<number | null>,
  amount: FormControl<number | null>,
  note?: FormControl<string | null>,
  category?: FormControl<number | null>,
  to?: FormControl<number | null>,
  ref?:FormControl<string | null>,
}