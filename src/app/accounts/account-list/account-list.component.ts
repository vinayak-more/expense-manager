import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Account } from '../../model/account.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe, NgClass } from '@angular/common';
import { accounts } from '../../data/accounts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    RouterLink,
    
    MatGridListModule,
    MatDividerModule,
  ],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent  implements OnInit{

  accounts:Account[] = accounts;

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    this.accountService.getAccounts().then(data => this.accounts = data);
  }
}
