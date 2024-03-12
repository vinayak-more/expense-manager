import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-transaction-edit',
  standalone: true,
  imports: [
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

  formGroup = new FormGroup<TransactionForm>({
    transactionType: new FormControl(TransactionType.DEBIT, Validators.required),
    date: new FormControl(new Date(), Validators.required),
    account: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    note: new FormControl(null),
  });

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
    this.categories = this.categoryService.getCategories().filter(category => category.transactionType === this.formGroup.value.transactionType);
    this.formGroup.controls.transactionType.valueChanges.subscribe(value => this.onTransactionTypeChange(value));

  }

  onTransactionTypeChange(type: TransactionType) {
    if(type === TransactionType.TRANSFER){
      this.formGroup.removeControl('category');
      this.formGroup.addControl('to', new FormControl(null, Validators.required));
    } else {
      this.formGroup.removeControl('to');
      this.categories = this.categoryService.getCategories().filter(category => category.transactionType === type);
      if(this.formGroup.contains('category'))
        this.formGroup.controls.category.reset();
      else this.formGroup.addControl('category', new FormControl(null, Validators.required));
    }
  }

  onSubmit() {
    this.transactionService.saveTransaction({
      ...this.formGroup.value,
      date: this.formGroup.value.date ? this.formGroup.value.date.toLocaleDateString('en-in') : '',
    });
    this.onBack();
  }

  onBack() {
    this.router.navigate(['transactions'])
  }

}

interface TransactionForm{
  transactionType: FormControl<TransactionType | null>,
    date: FormControl<Date>,
    account: FormControl<number | null>,
    amount: FormControl<number | null>,
    note: FormControl<string | null>,
    category?: FormControl<number | null>,
    to?:FormControl<number | null>,
}