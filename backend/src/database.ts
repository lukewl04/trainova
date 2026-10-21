import Database from "better-sqlite3";

const db: Database.Database = new Database("trainova.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS coaches (
    coachid INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    weight REAL,
    coachID INTEGER REFERENCES coaches(coachid)
  );
`);

export default db;