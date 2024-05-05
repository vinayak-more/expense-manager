export const SELECT_TRANSACTIONS_BY_MONTHYEAR = ` 
SELECT 
T.*, 
A.accountName, 
B.accountName as toName,
C.name as categoryName
FROM TXN T 
JOIN ACCOUNT A ON T.accountId = A.Id 
LEFT JOIN ACCOUNT B ON T.toAccountId = B.Id
LEFT JOIN CATEGORY C ON T.categoryId = C.Id
WHERE monthYear = ?
`

export const SELECT_TRANSACTION_BY_ID = ` 
SELECT 
T.*, 
A.accountName, 
A.accountName as toName,
C.name as categoryName
FROM TXN T 
JOIN ACCOUNT A ON T.accountId = A.Id 
LEFT JOIN CATEGORY C ON T.categoryId = C.Id
WHERE T.id = ?
`

export const INSERT_TRANSACTION = `
INSERT INTO TXN ( dateStr, transactionType, accountId, categoryId, toAccountId, amount, note, monthYear, numericDate)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`

export const UPDATE_TRANSACTION = `
UPDATE TXN 
SET dateStr = ?, transactionType = ?, accountId = ?, categoryId = ?, toAccountId = ?, amount = ?, note = ?, monthYear = ?, numericDate = ?
WHERE id = ?
`

export const DELETE_TRANSACTION = `DELETE FROM TXN WHERE id = ?;`

export const SELECT_ACCOUNTS = ` SELECT *, A.accountName as name  FROM ACCOUNT A WHERE isDeleted = 0`

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
SET accountName = ?, balance = ?
WHERE id = ? ;
`

export const DELETE_ACCOUNT = `
UPDATE ACCOUNT
SET isDeleted = 1
WHERE id = ? ;
`

export const SELECT_ALL_CAGETORIES = ` SELECT * FROM CATEGORY WHERE isDeleted = 0`;

export const SELECT_CATEGORY_BY_ID = ` SELECT * FROM CATEGORY WHERE id = ?`

export const INSERT_CATEGORY = ` 
INSERT INTO CATEGORY (name, transactionType)
VALUES (?, ?);
`

export const UPDATE_CATEGORY = `
UPDATE CATEGORY 
SET name = ?, transactionType = ?
WHERE id = ? ;
`
export const DELETE_CATEGORY = `
UPDATE CATEGORY 
SET isDeleted = 1
WHERE id = ? ;
`

export const SELECT_DB_CHANGELOG_VERSION = ` SELECT max(version) as version from DBCHANGELOG ;`;

export const INSERT_CHANGELOG_VERSION = ` INSERT INTO DBCHANGELOG (version) VALUES (?) ;`;