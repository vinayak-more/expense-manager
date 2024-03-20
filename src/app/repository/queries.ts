export const SELECT_TRANSACTIONS_BY_MONTHYEAR = ` 
SELECT 
T.*, 
A.accountName, 
A.accountName as toName,
C.categoryName
FROM TXN T 
JOIN ACCOUNT A ON T.accountId = A.Id 
JOIN CATEGORY C ON T.categoryId = C.Id
WHERE monthYear = ?
`

export const SELECT_ACCOUNTS = ` SELECT *, A.accountName as name  FROM ACCOUNT A`