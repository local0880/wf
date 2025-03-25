const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Route to render the employee form
app.get('/', (req, res) => {
    res.render('form');
});

// Route to handle form submission and display result
app.post('/submit', (req, res) => {
    const employeeDetails = req.body;
    res.render('result', { employee: employeeDetails });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

