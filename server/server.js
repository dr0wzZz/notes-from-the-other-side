const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, '../public')));

// Load users from JSON file
const users = JSON.parse(fs.readFileSync('./server/users.json'));

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.authenticated = true;
    res.status(200).send({ success: true });
  } else {
    res.status(401).send({ success: false, message: 'Invalid credentials' });
  }
});

// Auth check
app.get('/auth-check', (req, res) => {
  res.send({ authenticated: !!req.session.authenticated });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
