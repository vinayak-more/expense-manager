export interface Transaction{
    date:string,
    transactionType: number,
    account:string,
    category:string,
    amount:number,
    note?:string
}
export const TransactionType = Object.freeze({
    DEBIT: 1,
    CREDIT: 2
})