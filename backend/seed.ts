import db from "./src/database.js";

function run() {
  const insert = db.prepare(
    "INSERT INTO user (username, password) VALUES (?, ?)"
  );

  insert.run("luke", "test123");
  insert.run("jack", "password123");
  insert.run("admin", "admin123");

  console.log("Test users added!");
}

run();