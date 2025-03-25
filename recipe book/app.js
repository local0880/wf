const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('home'); // Render the home.ejs file
});

app.get('/recipe1', (req, res) => {
  res.render('recipe1'); // Render the recipe1.ejs file
});

app.get('/recipe2', (req, res) => {
  res.render('recipe2'); // Render the recipe2.ejs file
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

