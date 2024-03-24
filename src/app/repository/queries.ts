export const SELECT_TRANSACTIONS_BY_MONTHYEAR = ` 
SELECT 
T.*, 
A.accountName, 
A.accountName as toName,
C.categoryName
FROM TXN T 
JOIN ACCOUNT A ON T.accountId = A.Id 
LEFT JOIN CATEGORY C ON T.categoryId = C.Id
WHERE monthYear = ?
`

export const SELECT_TRANSACTION_BY_ID = ` 
SELECT 
T.*, 
A.accountName, 
A.accountName as toName,
C.categoryName
FROM TXN T 
JOIN ACCOUNT A ON T.accountId = A.Id 
LEFT JOIN CATEGORY C ON T.categoryId = C.Id
WHERE T.id = ?
`

export const INSERT_TRANSACTION = `
INSERT INTO TXN ( dateStr, transactionType, accountId, categoryId, toAccountId, amount, note, monthYear)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`

export const UPDATE_TRANSACTION = `
UPDATE TXN 
SET dateStr = ?, transactionType = ?, accountId = ?, categoryId = ?, toAccountId = ?, amount = ?, note = ?, monthYear = ?
WHERE id = ?
`

export const SELECT_ACCOUNTS = ` SELECT *, A.accountName as name  FROM ACCOUNT A`

export const SELECT_ACCOUNT_BY_ID = ` 
SELECT *, A.accountName as name  FROM ACCOUNT A 
WHERE id = ?`

export const UPDATE_ACCOUNT_BALANCE = ` UPDATE ACCOUNT SET balance = ? where id = ?`;

export const INSERT_ACCOUNT = ` 
INSERT INTO ACCOUNT ( accountName, balance )
VALUES (?, ?);
`

export const UPDATE_ACCOUNT = `
UPDATE ACCOUNT 
SET name = ?, balance = ?
WHERE id = ? ;
`
