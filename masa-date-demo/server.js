
const express = require('express');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port=process.env.PORT || 3000;
app.listen(port, () => { console.log('Sunucu çalışıyor http://localhost:${port}');
}9;
const db = new sqlite.Database('./demo.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'demoSecret', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Veritabanı oluştur
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT UNIQUE,
    password TEXT,
    profile_completed INTEGER DEFAULT 0,
    table_number INTEGER,
    age INTEGER,
    gender TEXT,
    interests TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER,
    receiver_id INTEGER,
    status TEXT DEFAULT 'pending'
  )`);
});

// Sayfalar
app.get('/', (req, res) => res.redirect('/login'));

app.get('/register', (req, res) => res.render('register'));
app.post('/register', async (req, res) => {
  const { name, phone, password } = req.body;
  const pwdHash = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users (name, phone, password) VALUES (?,?,?)`, [name, phone, pwdHash], function(err) {
    if (err) return res.send('Telefon numarası zaten kayıtlı.');
    res.redirect('/login');
  });
});

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => {
  const { phone, password } = req.body;
  db.get(`SELECT * FROM users WHERE phone = ?`, [phone], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.send('Telefon numarası veya şifre hatalı.');
    }
    req.session.userId = user.id;
    res.redirect('/profile');
  });
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  db.get(`SELECT * FROM users WHERE id = ?`, [req.session.userId], (e, user) => {
    if (!user.profile_completed) {
      return res.render('profile', { user });
    }
    res.redirect('/users');
  });
});

app.post('/profile', (req, res) => {
  const { age, gender, interests, table_number } = req.body;
  db.run(`UPDATE users SET age=?, gender=?, interests=?, table_number=?, profile_completed=1 WHERE id=?`, 
    [age, gender, interests, table_number, req.session.userId]);
  res.redirect('/users');
});

app.get('/users', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  db.all(`SELECT * FROM users WHERE id != ? AND profile_completed=1`, [req.session.userId], (e, others) => {
    db.all(`SELECT * FROM requests WHERE receiver_id = ?`, [req.session.userId], (e, rec) => {
      res.render('users', { others, rec });
    });
  });
});

app.post('/request', (req, res) => {
  const { receiver } = req.body;
  db.run(`INSERT INTO requests (sender_id, receiver_id) VALUES (?,?)`, [req.session.userId, receiver]);
  res.redirect('/users');
});

app.post('/respond', (req, res) => {
  const { reqId, action } = req.body;
  db.run(`UPDATE requests SET status = ? WHERE id = ?`, [action, reqId]);
  res.redirect('/users');
});

app.listen(3000, () => console.log('Sunucu http://localhost:3000 adresinde çalışıyor.'));
