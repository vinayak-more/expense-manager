import { Injectable } from "@angular/core";
import { Category } from "../model/category.model";
import { TransactionType } from "../model/transaction-type.enum";

@Injectable({
    providedIn : 'root'
})
export class CategoryService{

    categories : Category[] = [
        {
            id: 1,
            name: 'Food',
            transactionType: TransactionType.DEBIT
        },
        {
            id: 2,
            name: 'Transport',
            transactionType: TransactionType.DEBIT
        },
        {
            id: 3,
            name: 'Medicine',
            transactionType: TransactionType.DEBIT
        },
        {
            id: 4,
            name: 'Salary',
            transactionType: TransactionType.CREDIT
        },
        {
            id: 5,
            name: 'Refund',
            transactionType: TransactionType.CREDIT
        },
    ]

    public getCategories(){
        return [ ...this.categories ];
    }
}