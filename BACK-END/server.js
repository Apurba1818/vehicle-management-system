// const express = require("express");
// const cors = require("cors");
// const db = require("./database");

// const app = express();

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const SECRET = "vehicle-secret-key";

// /* Middleware */
// app.use(cors());
// app.use(express.json());

// /* ================= AUTH ROUTES ================= */

// /* REGISTER */
// app.post("/register", async (req, res) => {

//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   const hash = await bcrypt.hash(password, 10);

//   db.run(
//     "INSERT INTO users(username,password) VALUES(?,?)",
//     [username, hash],
//     function (err) {
//       if (err) {
//         return res.status(500).json({ error: "User already exists" });
//       }
//       res.json({ message: "User registered successfully" });
//     }
//   );
// });


// /* LOGIN */
// app.post("/login", (req, res) => {

//   const { username, password } = req.body;

//   db.get(
//     "SELECT * FROM users WHERE username=?",
//     [username],
//     async (err, user) => {

//       if (!user) {
//         return res.status(401).json({ error: "Invalid username" });
//       }

//       const valid = await bcrypt.compare(password, user.password);

//       if (!valid) {
//         return res.status(401).json({ error: "Invalid password" });
//       }

//       const token = jwt.sign(
//         { id: user.id, username: user.username },
//         SECRET,
//         { expiresIn: "1d" }
//       );

//       res.json({ token });
//     }
//   );
// });


// /* Test route */
// app.get("/", (req, res) => {
//   res.send("Backend running");
// });


// /* ================= VEHICLES ================= */

// /* GET vehicles */
// app.get("/vehicles", (req, res) => {
//   db.all("SELECT * FROM vehicles", [], (err, rows) => {
//     if (err) return res.status(500).json(err);
//     res.json(rows);
//   });
// });

// /* POST vehicle */
// app.post("/vehicles", (req, res) => {

//   const { number, type, status } = req.body;

//   if (!number || !type || !status) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   const sql = `
//     INSERT INTO vehicles(number,type,status)
//     VALUES(?,?,?)
//   `;

//   db.run(sql, [number, type, status], function(err){
//     if(err){
//       return res.status(500).json(err);
//     }

//     res.json({
//       message: "Vehicle added successfully",
//       id: this.lastID
//     });
//   });
// });

// /* UPDATE vehicle */
// app.put("/vehicles/:id", (req, res) => {

//   const { number, type, status } = req.body;

//   const sql = `
//     UPDATE vehicles
//     SET number=?, type=?, status=?
//     WHERE id=?
//   `;

//   db.run(sql, [number, type, status, req.params.id], function(err){
//     if(err) return res.status(500).json(err);

//     res.json({ message: "Vehicle updated" });
//   });
// });


// /* DELETE vehicle */
// app.delete("/vehicles/:id", (req, res) => {

//   db.run("DELETE FROM vehicles WHERE id=?", [req.params.id], function(err){
//     if(err) return res.status(500).json(err);

//     res.json({ message: "Vehicle deleted" });
//   });

// });


// /* ================= DRIVERS ================= */

// /* GET drivers */
// app.get("/drivers", (req, res) => {
//   db.all("SELECT * FROM drivers", [], (err, rows) => {
//     if (err) return res.status(500).json(err);
//     res.json(rows);
//   });
// });

// /* POST driver */
// app.post("/drivers", (req, res) => {

//   const { name, phone, salary } = req.body;

//   if (!name || !phone || !salary) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   const sql = `
//     INSERT INTO drivers(name,phone,salary)
//     VALUES(?,?,?)
//   `;

//   db.run(sql, [name, phone, salary], function(err){
//     if(err){
//       return res.status(500).json(err);
//     }

//     res.json({
//       message: "Driver added successfully",
//       id: this.lastID
//     });
//   });
// });

// /* UPDATE driver */
// app.put("/drivers/:id", (req, res) => {

//   const { name, phone, salary } = req.body;

//   const sql = `
//     UPDATE drivers
//     SET name=?, phone=?, salary=?
//     WHERE id=?
//   `;

//   db.run(sql, [name, phone, salary, req.params.id], function(err){
//     if(err) return res.status(500).json(err);

//     res.json({ message: "Driver updated" });
//   });
// });


// /* DELETE driver */
// app.delete("/drivers/:id", (req, res) => {

//   db.run("DELETE FROM drivers WHERE id=?", [req.params.id], function(err){
//     if(err) return res.status(500).json(err);

//     res.json({ message: "Driver deleted" });
//   });

// });


// /* ================= DAILY LOGS ================= */

// /* GET logs */
// app.get("/logs", (req, res) => {
//   db.all("SELECT * FROM logs", [], (err, rows) => {
//     if (err) return res.status(500).json(err);
//     res.json(rows);
//   });
// });

// /* POST log */
// app.post("/logs", (req, res) => {

//   const { date, vehicle, driver, income, expense } = req.body;

//   if (!date || !vehicle || !driver) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   const sql = `
//     INSERT INTO logs(date,vehicle,driver,income,expense)
//     VALUES(?,?,?,?,?)
//   `;

//   db.run(sql, [date, vehicle, driver, income || 0, expense || 0], function(err){
//     if(err){
//       return res.status(500).json(err);
//     }

//     res.json({
//       message: "Log added successfully",
//       id: this.lastID
//     });
//   });
// });

// /* ================= DASHBOARD STATS ================= */

// app.get("/dashboard", (req, res) => {

//   const result = {};

//   db.get("SELECT COUNT(*) AS totalVehicles FROM vehicles", [], (err, row) => {
//     result.totalVehicles = row.totalVehicles;

//     db.get("SELECT COUNT(*) AS totalDrivers FROM drivers", [], (err2, row2) => {
//       result.totalDrivers = row2.totalDrivers;

//       db.get("SELECT SUM(income) AS income FROM logs", [], (err3, row3) => {
//         result.totalIncome = row3.income || 0;

//         db.get("SELECT SUM(expense) AS expense FROM logs", [], (err4, row4) => {
//           result.totalExpense = row4.expense || 0;

//           result.netProfit = result.totalIncome - result.totalExpense;

//           res.json(result);
//         });
//       });
//     });
//   });
// });

// /* ================= MONTHLY REPORT ================= */

// app.get("/reports", (req, res) => {

//   const sql = `
//     SELECT 
//       substr(date,1,7) AS month,
//       SUM(income) AS totalIncome,
//       SUM(expense) AS totalExpense,
//       SUM(income) - SUM(expense) AS profit
//     FROM logs
//     GROUP BY month
//     ORDER BY month DESC
//   `;

//   db.all(sql, [], (err, rows) => {
//     if (err) return res.status(500).json(err);
//     res.json(rows);
//   });
// });

// /* ================= INCOME SUMMARY ================= */

// app.get("/income", (req, res) => {

//   const sql = `
//     SELECT 
//       vehicle,
//       driver,
//       SUM(income) AS totalIncome
//     FROM logs
//     GROUP BY vehicle, driver
//     ORDER BY totalIncome DESC
//   `;

//   db.all(sql, [], (err, rows) => {
//     if (err) return res.status(500).json(err);
//     res.json(rows);
//   });
// });

// /* ================= SETTINGS ================= */

// /* GET settings */
// app.get("/settings", (req, res) => {
//   db.get("SELECT * FROM settings ORDER BY id DESC LIMIT 1", [], (err, row) => {
//     if (err) return res.status(500).json(err);
//     res.json(row || {});
//   });
// });


// /* POST / UPDATE settings */
// app.post("/settings", (req, res) => {

//   const { ownerName, businessName, contact, currency } = req.body;

//   db.run("DELETE FROM settings", [], () => {

//     const sql = `
//       INSERT INTO settings(ownerName,businessName,contact,currency)
//       VALUES(?,?,?,?)
//     `;

//     db.run(sql, [ownerName, businessName, contact, currency], function(err){
//       if(err) return res.status(500).json(err);

//       res.json({ message: "Settings saved" });
//     });

//   });

// });

// /* ================= JWT VERIFY ================= */

// function verifyToken(req, res, next) {

//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: "Token missing" });
//   }

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: "Invalid token" });
//     }

//     req.user = user;
//     next();
//   });
// }


// /* Server start */
// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const db = require("./database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const SECRET = "vehicle-secret-key";

/* Middleware */
app.use(cors());
app.use(express.json());

/* ================= JWT VERIFY ================= */
function verifyToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token missing" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, user) => {

    if (err)
      return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
}

/* ================= AUTH ================= */

app.post("/register", async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  const hash = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users(username,password) VALUES(?,?)",
    [username, hash],
    function(err){
      if (err)
        return res.status(500).json({ error: "User exists" });

      res.json({ message: "Registered successfully" });
    }
  );
});

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, user) => {

      if (!user)
        return res.status(401).json({ error: "Invalid username" });

      const valid = await bcrypt.compare(password, user.password);

      if (!valid)
        return res.status(401).json({ error: "Invalid password" });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
});

/* ================= VEHICLES ================= */

app.get("/vehicles", verifyToken, (req,res)=>{
  db.all(
    "SELECT * FROM vehicles WHERE user_id=?",
    [req.user.id],
    (err,rows)=> res.json(rows)
  );
});

app.post("/vehicles", verifyToken, (req,res)=>{

  const { number,type,status } = req.body;

  db.run(
    "INSERT INTO vehicles(number,type,status,user_id) VALUES(?,?,?,?)",
    [number,type,status,req.user.id],
    function(){
      res.json({ id:this.lastID });
    }
  );
});

app.put("/vehicles/:id", verifyToken, (req,res)=>{

  const { number,type,status } = req.body;

  db.run(
    "UPDATE vehicles SET number=?,type=?,status=? WHERE id=? AND user_id=?",
    [number,type,status,req.params.id,req.user.id],
    ()=> res.json({ message:"Vehicle updated" })
  );
});

app.delete("/vehicles/:id", verifyToken, (req,res)=>{
  db.run(
    "DELETE FROM vehicles WHERE id=? AND user_id=?",
    [req.params.id,req.user.id],
    ()=> res.json({ message:"Vehicle deleted" })
  );
});

/* ================= DRIVERS ================= */

/* GET drivers */
app.get("/drivers", verifyToken, (req,res)=>{
  db.all(
    "SELECT * FROM drivers WHERE user_id=?",
    [req.user.id],
    (err,rows)=> res.json(rows)
  );
});

/* POST driver */
app.post("/drivers", verifyToken, (req,res)=>{

  const { name,phone,salary } = req.body;

  db.run(
    `INSERT INTO drivers
     (name,phone,salary,paid_salary,remaining_salary,user_id)
     VALUES(?,?,?,?,?,?)`,
    [name,phone,salary,0,salary,req.user.id],
    function(){
      res.json({ id:this.lastID });
    }
  );
});

/* UPDATE driver */
app.put("/drivers/:id", verifyToken, (req,res)=>{

  const { name,phone,salary } = req.body;

  db.run(
    `UPDATE drivers
     SET name=?, phone=?, salary=?, remaining_salary=?
     WHERE id=? AND user_id=?`,
    [name,phone,salary,salary,req.params.id,req.user.id],
    ()=> res.json({ message:"Driver updated" })
  );
});

/* DELETE driver */
app.delete("/drivers/:id", verifyToken, (req,res)=>{
  db.run(
    "DELETE FROM drivers WHERE id=? AND user_id=?",
    [req.params.id,req.user.id],
    ()=> res.json({ message:"Driver deleted" })
  );
});

/* PAY DRIVER SALARY */
app.put("/drivers/pay/:id", verifyToken, (req,res)=>{

  const { amount } = req.body;
  const uid = req.user.id;

  db.get(
    "SELECT remaining_salary FROM drivers WHERE id=? AND user_id=?",
    [req.params.id, uid],
    (err,row)=>{

      if(!row) return res.status(404).json({error:"Driver not found"});

      const newRemaining = row.remaining_salary - amount;

      /* update salary */
      db.run(
        `UPDATE drivers
         SET paid_salary = paid_salary + ?,
             remaining_salary = ?
         WHERE id=? AND user_id=?`,
        [amount,newRemaining,req.params.id,uid]
      );

      /* auto add expense into logs */
      const today = new Date().toISOString().slice(0,10);

      db.run(
        `INSERT INTO logs(user_id,date,vehicle,driver,income,expense)
         VALUES(?,?,?,?,?,?)`,
        [uid,today,"Salary Payment","Driver Salary",0,amount]
      );

      res.json({ message:"Salary paid & expense recorded" });

    }
  );

});




/* ================= LOGS ================= */

app.get("/logs", verifyToken, (req,res)=>{
  db.all(
    "SELECT * FROM logs WHERE user_id=?",
    [req.user.id],
    (err,rows)=> res.json(rows)
  );
});

app.post("/logs", verifyToken, (req,res)=>{

  const { date,vehicle,driver,income,expense } = req.body;

  db.run(
    "INSERT INTO logs(user_id,date,vehicle,driver,income,expense) VALUES(?,?,?,?,?,?)",
    [req.user.id,date,vehicle,driver,income||0,expense||0],
    function(){
      res.json({ id:this.lastID });
    }
  );
});

/* ================= DASHBOARD ================= */

app.get("/dashboard", verifyToken, (req,res)=>{

  const uid = req.user.id;

  db.get("SELECT COUNT(*) totalVehicles FROM vehicles WHERE user_id=?", [uid], (e,v)=>{
    db.get("SELECT COUNT(*) totalDrivers FROM drivers WHERE user_id=?", [uid], (e2,d)=>{
      db.get("SELECT SUM(income) income FROM logs WHERE user_id=?", [uid], (e3,i)=>{
        db.get("SELECT SUM(expense) expense FROM logs WHERE user_id=?", [uid], (e4,ex)=>{

          res.json({
            totalVehicles: v.totalVehicles,
            totalDrivers: d.totalDrivers,
            totalIncome: i.income || 0,
            totalExpense: ex.expense || 0,
            netProfit: (i.income||0)-(ex.expense||0)
          });

        });
      });
    });
  });
});

/* ================= REPORTS ================= */

app.get("/reports", verifyToken, (req,res)=>{

  const sql = `
    SELECT substr(date,1,7) AS month,
           SUM(income) AS totalIncome,
           SUM(expense) AS totalExpense,
           SUM(income)-SUM(expense) AS profit
    FROM logs
    WHERE user_id=?
    GROUP BY month
    ORDER BY month DESC
  `;

  db.all(sql,[req.user.id],(err,rows)=> res.json(rows));
});

/* ================= SETTINGS ================= */

app.get("/settings", verifyToken, (req,res)=>{
  db.get(
    "SELECT * FROM settings WHERE user_id=?",
    [req.user.id],
    (err,row)=> res.json(row)
  );
});

app.post("/settings", verifyToken, (req,res)=>{

  const { ownerName,businessName,contact,currency } = req.body;

  db.run("DELETE FROM settings WHERE user_id=?", [req.user.id], ()=>{

    db.run(
      "INSERT INTO settings(ownerName,businessName,contact,currency,user_id) VALUES(?,?,?,?,?)",
      [ownerName,businessName,contact,currency,req.user.id],
      ()=> res.json({ message:"Settings saved" })
    );

  });
});

/* ================= VEHICLE ANALYTICS ================= */

app.get("/vehicle-profit", verifyToken, (req,res)=>{

  const sql = `
    SELECT 
      vehicle,
      SUM(income) AS totalIncome,
      SUM(expense) AS totalExpense,
      SUM(income) - SUM(expense) AS profit
    FROM logs
    WHERE user_id = ?
    GROUP BY vehicle
    ORDER BY profit DESC
  `;

  db.all(sql,[req.user.id],(err,rows)=>{
    if(err) return res.status(500).json(err);
    res.json(rows);
  });

});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

