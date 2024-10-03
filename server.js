const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 4000;  // Website now running on port 4000
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');  // Replace with your actual Google client ID

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // MySQL password is empty
    database: 'mentorship_platform',
    port: 3306,  // MySQL is running on port 3306 (XAMPP)
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Serve the registration options page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'));
});

// Serve Mentor registration page
app.get('/register-mentor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register-mentor.html'));
});

// Serve Mentoree registration page
app.get('/register-mentoree', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register-mentoree.html'));
});

// Serve Members page
app.get('/members', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/members.html'));
});

// Serve About page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'));
});

// Serve Contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/contact.html'));
});

// Serve Services page
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/services.html'));
});

// Serve Dashboard pages (static files)
app.get('/dashboard/:page', (req, res) => {
    res.sendFile(path.join(__dirname, `public/dashboard/${req.params.page}.html`));
});

// Handle traditional Mentor registration form submission
app.post('/register-mentor', (req, res) => {
    const { name, email, bio, expertise, availability, pricePerSession } = req.body;
    const query = `INSERT INTO Mentor (name, email, bio, expertise, availability, pricePerSession) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, email, bio, expertise, availability, pricePerSession], (err, result) => {
        if (err) throw err;
        res.send('Mentor account created successfully!');
    });
});

// Handle traditional Mentoree registration form submission
app.post('/register-mentoree', (req, res) => {
    const { name, email, goals, preferredExpertise } = req.body;
    const query = `INSERT INTO Mentoree (name, email, goals, preferredExpertise) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, goals, preferredExpertise], (err, result) => {
        if (err) throw err;
        res.send('Mentoree account created successfully!');
    });
});

// Google Sign-In and Registration route
app.post('/google-register', async (req, res) => {
    const { token, userType } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: 'YOUR_GOOGLE_CLIENT_ID',  // Replace with your actual Google client ID
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];
        const email = payload['email'];
        const name = payload['name'];

        // Check user type to decide whether they are mentor or mentoree
        let query = '';
        if (userType === 'mentor') {
            query = `INSERT INTO Mentor (name, email, googleID) VALUES (?, ?, ?)`;
        } else if (userType === 'mentoree') {
            query = `INSERT INTO Mentoree (name, email, googleID) VALUES (?, ?, ?)`;
        }

        db.query(query, [name, email, userId], (err, result) => {
            if (err) throw err;
            res.json({ success: true, message: 'Google account registered successfully!' });
        });

    } catch (error) {
        console.error('Google authentication failed:', error);
        res.status(400).json({ success: false, message: 'Google registration failed.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});