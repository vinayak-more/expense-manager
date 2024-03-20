export const SELECT_TRANSACTIONS_BY_MONTHYEAR = ` 
SELECT 
T.*, 
A.accountName, 
A.accountName as toName
FROM TXN T JOIN ACCOUNT A ON T.accountId = A.Id 
WHERE monthYear = ?
`

export const SELECT_ACCOUNTS = ` SELECT *, A.accountName as name  FROM ACCOUNT A`