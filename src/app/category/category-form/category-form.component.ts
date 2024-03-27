import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    ConfirmDialogComponent,

    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {

  formGroup = new FormGroup<CategoryForm>({
    id: new FormControl(0),
    name: new FormControl(null, Validators.required),
    transactionType: new FormControl(null, Validators.required)
  });
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.editMode = true;
        this.categoryService.getCategoryById(+params['id'])
          .then(category => this.formGroup.patchValue(category));
      }
    });
  }

  onSubmit() {
    this.categoryService.saveCategory(this.formGroup.getRawValue())
      .then(() => this.router.navigate(['../'], { relativeTo: this.route }));
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: "Are you Sure?", body: `Are you sure you want to delete category <b> ${this.formGroup.value.name} </b>?` }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.categoryService.deleteCategory(this.formGroup.value.id)
          .then(() => this.router.navigate(['../'], { relativeTo: this.route }));
      }
    })
    console.log("On Delete", this.formGroup.value.id);
  }
}

interface CategoryForm {
  id: FormControl<number | null>,
  name: FormControl<string | null>,
  transactionType: FormControl<string | null>

}