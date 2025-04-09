const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Beenu@1685', // your password
  database: 'agrilink'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

// POST: Save message
app.post('/api/messages', (req, res) => {
  const { id, sender, content, timestamp, isExpert } = req.body;
  const query = 'INSERT INTO messages (id, sender, content, timestamp, is_expert) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, sender, content, timestamp, isExpert], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ status: 'Message saved' });
  });
});

// POST: Save booking
app.post('/api/bookings', (req, res) => {
  const { expert_id, expert_name, specialization, date_selected, time_selected } = req.body;
  const query = 'INSERT INTO bookings (expert_id, expert_name, specialization, date_selected, time_selected) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [expert_id, expert_name, specialization, date_selected, time_selected], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ status: 'Booking saved' });
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
