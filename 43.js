const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome! Go to <a href="/download">/download</a> to download the file.');
});

// Route to download the file
app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, '41.js'); // Replace with your file path
    console.log('File path:', filePath); // Log the file path for debugging
    res.download(filePath, 'example.txt', (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Internal Server Error: ' + err.message);
        } else {
            console.log('File sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

