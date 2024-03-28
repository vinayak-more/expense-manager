export const schema = `
CREATE TABLE IF NOT EXISTS ACCOUNT(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountName TEXT DEFAULT NULL,
    balance REAL DEFAULT NULL,
    isDeleted INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS CATEGORY (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT DEFAULT NULL,
    transactionType TEXT DEFAULT NULL,
    isDeleted INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS TXN (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dateStr TEXT DEFAULT NULL,
  transactionType TEXT DEFAULT NULL,
  accountId INTEGER DEFAULT NULL,
  categoryId INTEGER DEFAULT NULL,
  toAccountId INTEGER DEFAULT NULL,
  amount REAL DEFAULT NULL,
  note TEXT DEFAULT NULL,
  monthYear TEXT DEFAULT NULL,
  numericDate INTEGER DEFAULT NULL
);

INSERT OR IGNORE INTO ACCOUNT (id, accountName, balance, isDeleted)
VALUES (1, 'Savings', 0, 0);

INSERT OR IGNORE INTO ACCOUNT (id, accountName, balance, isDeleted)
VALUES (2, 'Credit Card', 0, 0);

INSERT OR IGNORE INTO ACCOUNT (id, accountName, balance, isDeleted)
VALUES (3, 'Cash', 0, 0);

INSERT OR IGNORE INTO CATEGORY (id, name, transactionType)
VALUES (1, 'Food', 'DEBIT');

INSERT OR IGNORE INTO CATEGORY (id, name, transactionType)
VALUES (2, 'Transport', 'DEBIT');

INSERT OR IGNORE INTO CATEGORY (id, name, transactionType)
VALUES (3, 'Health', 'DEBIT');

INSERT OR IGNORE INTO CATEGORY (id, name, transactionType)
VALUES (4, 'Salary', 'CREDIT');

INSERT OR IGNORE INTO CATEGORY (id, name, transactionType)
VALUES (5, 'Refund', 'CREDIT');
`