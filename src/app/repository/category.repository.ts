import { Injectable } from "@angular/core";
import { DatabaseService } from "../service/database.service";
import { Category } from "../model/category.model";
import { DELETE_CATEGORY, INSERT_CATEGORY, SELECT_ALL_CAGETORIES, SELECT_CATEGORY_BY_ID, UPDATE_CATEGORY } from "./queries";

@Injectable({
    providedIn: 'root'
})
export class CategoryRepository{

    constructor(private databaseService: DatabaseService){}

    public async getAllCategories(): Promise<Category[]>{
        const categories = await this.databaseService.executeQuery(db => {
            return db.query(SELECT_ALL_CAGETORIES)
        });
        return categories.values;
    }
    
    public async save(category: Category) {
        if(category.id == 0){
            return this.databaseService.executeQuery(db => {
                return db.executeTransaction([{
                    statement: INSERT_CATEGORY,
                    values:[category.name, category.transactionType]
                }]);
            });
        } else {
            return this.databaseService.executeQuery(db => {
                return db.executeTransaction([{
                    statement: UPDATE_CATEGORY,
                    values: [category.name, category.transactionType, category.id]
                }])
            })
        }
    }

    public async getById(id: number): Promise<Category> { 
        const category = await this.databaseService.executeQuery(db=>{
            return db.query(SELECT_CATEGORY_BY_ID, [id]);
        })
        return category.values[0];
    }

    public async delete(id: number){
        return this.databaseService.executeQuery(db => {
            return db.executeTransaction([{
                statement: DELETE_CATEGORY,
                values: [id]
            }])
        });
    }
}