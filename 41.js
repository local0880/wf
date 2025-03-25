const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: '123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

let users = []; // In-memory storage for users

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Login System</h1><a href="/login">Login</a> | <a href="/register">Register</a>');
});

app.get('/login', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.send('Invalid username or password');

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.loggedIn = true;
      req.session.username = username;
      res.send(`Welcome ${username}! <a href="/logout">Logout</a>`);
    } else {
      res.send('Invalid username or password');
    }
  });
});

app.get('/register', (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form action="/register" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Register</button>
    </form>
  `);
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) return res.send('Username already exists!');

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.send('Error hashing password');
    users.push({ username, password: hashedPassword });
    res.send('Registration successful! <a href="/login">Login</a>');
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send('Error logging out');
    res.send('Logged out successfully! <a href="/login">Login again</a>');
  });
});

// Route to display users (for demonstration purposes only)
app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

