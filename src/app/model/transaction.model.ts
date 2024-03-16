import { TransactionType } from "./transaction-type.enum";

export interface Transaction{
    transactionType: TransactionType,
    date:Date,
    monthYear?:string,
    account:number,
    amount:number,
    note?:string
    category?:number,
    to?:number,
    id?:number,
    accountName?:string,
    categoryName?:string,
    toName?:string,
    ref?:string,
}