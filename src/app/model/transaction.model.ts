export interface Transaction{
    date?:string,
    transactionType?: string,
    account?:string,
    category?:string,
    amount?:number,
    note?:string
}
export const TransactionType = Object.freeze({
    CREDIT: 'CREDIT',
    DEBIT: 'DEBIT',
    TRANSFER: 'TRANSFER'
    
})