import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    ConfirmDialogComponent,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent implements OnInit {
  formGroup = new FormGroup({
    'id': new FormControl(0),
    'name': new FormControl(null, Validators.required),
    'balance': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)])
  });

  editMode = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.editMode = true;
        this.accountService.getAccountById(+params['id'])
          .then(data => this.formGroup.patchValue(data));
        this.formGroup.controls.balance.disable();
      }
    })
  }

  onSubmit() {
    this.accountService.saveAccount({ ...this.formGroup.getRawValue() }).then(() =>
      this.router.navigate(['../'], { relativeTo: this.route }));
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Are you Sure?", body: `Are you sure you want to delete Account <b> ${this.formGroup.value.name} </b>?` }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.accountService.deleteAccount(this.formGroup.value.id)
          .then(() => this.router.navigate(['../'], { relativeTo: this.route }));
      }
    });
  }
}