import { Injectable } from "@angular/core";
import { Category } from "../model/category.model";
import { TransactionType } from "../model/transaction-type.enum";
import { categories } from "../data/categories";
import { CategoryRepository } from "../repository/category.repository";

@Injectable({
    providedIn : 'root'
})
export class CategoryService{

    constructor(private repository: CategoryRepository){}

    public getCategoryById(id: number){
        return this.repository.getById(id);
    }

    public getCategories(){
        return this.repository.getAllCategories();
    }

    public saveCategory(category: Category){
        return this.repository.save(category);
    }

    public deleteCategory(id: number) {
        return this.repository.delete(id);
    }
  
}