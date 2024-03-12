import { TransactionType } from "./transaction-type.enum";

export interface Transaction{
    date?:string,
    transactionType?: TransactionType,
    account?:number,
    category?:number,
    amount?:number,
    to?:number,
    note?:string
    accountName?:string,
    categoryName?:string,
    toName?:string,
}