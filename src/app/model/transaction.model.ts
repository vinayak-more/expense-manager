import { TransactionType } from "./transaction-type.enum";

export interface Transaction{
    transactionType: TransactionType,
    date:Date,
    monthYear?:string,
    accountId:number,
    amount:number,
    note?:string
    categoryId?:number,
    toAccountId?:number,
    id?:number,
    accountName?:string,
    categoryName?:string,
    toName?:string,
}