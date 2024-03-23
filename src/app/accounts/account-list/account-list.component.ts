import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Account } from '../../model/account.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [
    MatGridListModule,
    MatDividerModule,
  ],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent  implements OnInit{

  accounts:Account[] = [
    {
      id: 1,
      name: "Savings",
      balance: 0
    },
    {
      id: 2,
      name: "Credit Card",
      balance: 97000
    }
  ];

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    this.accountService.getAccounts().then(data => this.accounts = data);
  }
}
