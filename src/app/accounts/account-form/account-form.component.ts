import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  formGroup = new FormGroup({
    'id': new FormControl(0),
    'name': new FormControl(null, Validators.required),
    'balance': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)])
  });

  constructor(
    private accountService: AccountService, 
    private router: Router, 
    private route: ActivatedRoute
    ){}


  onSubmit() {
    this.accountService.saveAccount({...this.formGroup.getRawValue()}).then(() =>
    this.router.navigate(['../'], { relativeTo:this.route}));
  }
}