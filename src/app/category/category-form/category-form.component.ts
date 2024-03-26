import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,

    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  
  formGroup = new FormGroup<CategoryForm>({
    id: new FormControl(0),
    name: new FormControl(null, Validators.required),
    transactionType: new FormControl(null, Validators.required)
  });

  constructor(private categoryService: CategoryService){}

  onSubmit(){
    console.log(this.formGroup.value);
    this.categoryService.saveCategory(this.formGroup.getRawValue())
  }
}

interface CategoryForm{
  id:FormControl<number | null>,
  name:FormControl<string | null>,
  transactionType: FormControl<string | null>

}