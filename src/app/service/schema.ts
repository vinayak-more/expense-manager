export const schema = `
CREATE TABLE IF NOT EXISTS ACCOUNT(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountName TEXT DEFAULT NULL,
    balance INTEGER DEFAULT NULL
)
CREATE TABLE IF NOT EXISTS CATEGORY(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryName TEXT DEFAULT NULL,
    transactionType TEXT DEFAULT NULL
)
CREATE TABLE IF NOT EXISTS TXN (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT DEFAULT NULL,
  accountId INTEGER DEFAULT NULL,
  categoryId INTEGER DEFAULT NULL,
  toAccountId INTEGER DEFAULT NULL,
  amount INTEGER DEFAULT NULL,
  note TEXT DEFAULT NULL,
  monthYear TEXT DEFAULT NULL,
  FOREIGN KEY(accountId) REFERENCES ACCOUNT(ID),
  FOREIGN KEY(categoryId) REFERENCES CATEGORY(Id)
);

`