// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./vehicle.db");

// db.serialize(() => {

//   db.run(`
//     CREATE TABLE IF NOT EXISTS vehicles(
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       number TEXT,
//       type TEXT,
//       status TEXT
//     )
//   `);

//   db.run(`
//     CREATE TABLE IF NOT EXISTS drivers(
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       phone TEXT,
//       salary INTEGER
//     )
//   `);

//   db.run(`
//     CREATE TABLE IF NOT EXISTS logs(
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       date TEXT,
//       vehicle TEXT,
//       driver TEXT,
//       income INTEGER,
//       expense INTEGER
//     )
//   `);
//   db.run(`
//   CREATE TABLE IF NOT EXISTS settings(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     ownerName TEXT,
//     businessName TEXT,
//     contact TEXT,
//     currency TEXT
//   )
// `);
//   db.run(`
//   CREATE TABLE IF NOT EXISTS users(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE,
//     password TEXT
//   )
// `);

// });


// module.exports = db;

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./vehicle.db");

db.serialize(() => {

  /* USERS */
  db.run(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  /* VEHICLES */
  db.run(`
    CREATE TABLE IF NOT EXISTS vehicles(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT,
      type TEXT,
      status TEXT,
      user_id INTEGER
    )
  `);

  /* DRIVERS */
  db.run(`
  CREATE TABLE IF NOT EXISTS drivers(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    salary INTEGER,
    paid_salary INTEGER DEFAULT 0,
    remaining_salary INTEGER DEFAULT 0,
    user_id INTEGER
  )
`);


  /* LOGS */
  db.run(`
    CREATE TABLE IF NOT EXISTS logs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      vehicle TEXT,
      driver TEXT,
      income INTEGER,
      expense INTEGER,
      user_id INTEGER
    )
  `);

  /* SETTINGS */
  db.run(`
    CREATE TABLE IF NOT EXISTS settings(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ownerName TEXT,
      businessName TEXT,
      contact TEXT,
      currency TEXT,
      user_id INTEGER
    )
  `);

});

module.exports = db;
