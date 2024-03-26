import { Injectable } from "@angular/core";
import { DatabaseService } from "../service/database.service";
import { Category } from "../model/category.model";
import { SELECT_ALL_CAGETORIES } from "./queries";

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
}