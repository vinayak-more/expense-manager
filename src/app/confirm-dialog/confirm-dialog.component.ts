import { Component, Inject } from '@angular/core';
import { DialogData } from './dialog-data';

import { 
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogClose,
 } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [

    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,){}

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
