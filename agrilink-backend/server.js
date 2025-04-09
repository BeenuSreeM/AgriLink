// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Beenu@1685", // your MySQL password, leave empty if none
//   database: "agrilink",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("MySQL connection error:", err);
//     return;
//   }
//   console.log("Connected to MySQL DB");
// });

// // Format timestamp to MySQL DATETIME
// function formatTimestamp(isoString) {
//   const date = new Date(isoString);
//   const pad = (n) => n.toString().padStart(2, "0");

//   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
//          `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
// }

// // POST /messages
// app.post("/messages", (req, res) => {
//   const { id, sender, content, timestamp, is_expert } = req.body;

//   const formattedTimestamp = formatTimestamp(timestamp);

//   const sql = `
//     INSERT INTO messages (id, sender, content, timestamp, is_expert)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(sql, [id, sender, content, formattedTimestamp, is_expert], (err, result) => {
//     if (err) {
//       console.error("Error inserting message:", err);
//       return res.status(500).send("Error inserting message");
//     }
//     res.status(200).send("Message stored successfully");
//   });
// });

// // GET /messages
// app.get("/messages", (req, res) => {
//   const sql = "SELECT * FROM messages ORDER BY timestamp ASC";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching messages:", err);
//       return res.status(500).send("Error fetching messages");
//     }
//     res.json(results);
//   });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });



const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beenu@1685', // your DB password
  database: 'agrilink'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL DB');
});

app.post('/api/messages', (req, res) => {
  const { id, sender, content, timestamp, isExpert } = req.body;

  const formattedTime = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');

  const sql = `INSERT INTO messages (id, sender, content, timestamp, is_expert) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [id, sender, content, formattedTime, isExpert ? 1 : 0], (err) => {
    if (err) {
      console.error('Error inserting message:', err);
      return res.status(500).send('Message save failed');
    }
    res.send('Message saved');
  });
});

app.post('/api/bookings', (req, res) => {
  const { expert_id, expert_name, specialization, date_selected, time_selected } = req.body;

  const sql = `INSERT INTO bookings (expert_id, expert_name, specialization, date_selected, time_selected) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [expert_id, expert_name, specialization, date_selected, time_selected], (err) => {
    if (err) {
      console.error('Error saving booking:', err);
      return res.status(500).send('Booking failed');
    }
    res.send('Booking saved');
  });
});

app.listen(3001, () => {
  console.log('Server is running at http://localhost:3001');
});
