export interface Transaction{
    date:Date,
    account:string,
    category:string,
    amount:number,
    note?:string
}