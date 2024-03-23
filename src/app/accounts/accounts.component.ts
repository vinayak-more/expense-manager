import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    MatIconModule,
    MatButtonModule,

    AccountListComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {

  constructor(
    private router: Router,
  ){}

  onBack(){
    this.router.navigate(['']);
  }
}
