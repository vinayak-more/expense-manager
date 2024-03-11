import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionType } from '../model/transaction.model';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../model/transaction.model';

@Component({
  selector: 'app-transaction-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
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
export class TransactionEditComponent implements OnInit{
  formGroup = new FormGroup({
    transactionType: new FormControl(TransactionType.DEBIT.toString(), Validators.required),
    date: new FormControl(new Date(), Validators.required),
    account: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    note:new FormControl(null),
  });

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    ){}

  ngOnInit(): void {
  }

  onSubmit(){
    this.transactionService.saveTransaction({
      ...this.formGroup.value,
      date:this.formGroup.value.date?this.formGroup.value.date.toLocaleDateString('en-in'):'',
    });
    this.onBack();
  }

  onBack(){
    this.router.navigate(['transactions'])
  }

}
