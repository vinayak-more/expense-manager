import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category.model';
import { categories } from '../../data/categories';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TransactionType } from '../../model/transaction-type.enum';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatButtonToggleModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit{
  categoryMaster:Category[] = categories;
  categories:Category[] = categories;
  selectedType = TransactionType.CREDIT;

  ngOnInit(): void {
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
