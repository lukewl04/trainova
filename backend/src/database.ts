import Database from "better-sqlite3";


const db: Database.Database = new Database("trainova.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    userid INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    weight REAL,
    coachID INTEGER,
    FOREIGN KEY (coachID) REFERENCES user(userid)
  );
`);
console.log("Database path:", db.name);

export default db;