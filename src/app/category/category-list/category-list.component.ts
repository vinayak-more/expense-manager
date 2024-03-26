import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category.model';
import { categories } from '../../data/categories';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TransactionType } from '../../model/transaction-type.enum';
import { CategoryService } from '../../service/category.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonToggleModule,
    MatButtonModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit{
  categoryMaster:Category[] = categories;
  categories:Category[] = categories;
  selectedType = TransactionType.CREDIT;

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryService.getCategories().then( values => {
      this.categoryMaster = values;
      this.updateCategoryList();
    })
    this.updateCategoryList();
  }

  onChange(event: MatButtonToggleChange){
    console.log(event.value);
    this.selectedType = event.value;
    this.updateCategoryList();
  }

  updateCategoryList(){
    this.categories = this.categoryMaster.filter(category => category.transactionType == this.selectedType);
  }
}
