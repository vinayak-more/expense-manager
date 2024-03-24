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
  accounts: Account[] = accounts;
  categories: Category[];
  editMode: boolean = false;
  header:string = 'Expense';

  formGroup = new FormGroup<TransactionForm>({
    id: new FormControl(new Date().getTime()),
    transactionType: new FormControl(TransactionType.DEBIT, { nonNullable: true }),
    date: new FormControl(new Date(), Validators.required),
    accountId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    note: new FormControl(null),
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
      transaction = { ...transaction, 'date': this.stringToDate(transaction.dateStr) };
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
    this.accountService.getAccounts().then(accounts => this.accounts = accounts);
    this.categories = this.categoryService.getCategories().filter(category => category.transactionType === this.formGroup.value.transactionType);
    this.formGroup.controls.transactionType.valueChanges.subscribe(value => this.onTransactionTypeChange(value));
  }



  onTransactionTypeChange(type: TransactionType) {
    if (type === TransactionType.TRANSFER) {
      this.formGroup.removeControl('categoryId');
      this.formGroup.addControl('toAccountId', new FormControl(null, Validators.required));
    } else {
      this.formGroup.removeControl('toAccountId');
      this.categories = this.categoryService.getCategories().filter(category => category.transactionType === type);
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
      'dateStr': this.getDateToString(this.formGroup.value.date),
    };
    if (this.editMode) {
      this.transactionService.updateTransaction(transaction);
    } else {
      this.transactionService.saveTransaction(transaction);
    }

    this.onBack();
  }

  /**
   * 
   * @param dateStr Date in string with pattern DD-MM-yyyy i.e 17-03-2024
   * @returns javascript date object
   */
  private stringToDate(dateStr: string): Date {
    let splits = dateStr.split("-");
    if (splits.length != 3) return null;
    const date = new Date();
    date.setDate(parseInt(splits[0]));
    date.setMonth(parseInt(splits[1]) - 1);
    date.setFullYear(parseInt(splits[2]));
    return date;
  }

  /**
   * 
   * @param date javascript date object
   * @returns date in string with pattern DD-MM-yyyy i.e 17-03-2024
   */
  private getDateToString(date: Date) {
    return date.toLocaleDateString('es-CL');
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

  async onDelete(){
    await this.transactionService.deleteTransaction(this.formGroup.value.id);
    this.onBack();
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