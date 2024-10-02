const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 3000;
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',  // Update with your MySQL password
    database: 'mentorship_platform',
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
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: 'YOUR_GOOGLE_CLIENT_ID',
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];
        const email = payload['email'];
        const name = payload['name'];

        // Check if the user exists and if not, create a new mentor or mentoree based on registration type
        const query = `INSERT INTO Mentoree (name, email, googleID) VALUES (?, ?, ?)`;
        db.query(query, [name, email, userId], (err, result) => {
            if (err) throw err;
            res.json({ success: true, message: 'Google account registered successfully!' });
        });

    } catch (error) {
        console.error('Google authentication failed:', error);
        res.status(400).json({ success: false, message: 'Google registration failed.' });
    }
});

// Seed the database with initial mentors and mentorees
app.get('/seed', (req, res) => {
    // Insert 5 mentors
    const mentorQuery = `INSERT INTO Mentor (name, email, bio, expertise, availability, pricePerSession) VALUES ?`;
    const mentorValues = [
        ['John Doe', 'john@mentor.com', 'Experienced software engineer.', 'Software Development', 'Weekends', 50],
        ['Jane Smith', 'jane@mentor.com', 'Marketing expert.', 'Digital Marketing', 'Weekdays', 40],
        ['Michael Brown', 'michael@mentor.com', 'Project manager.', 'Project Management', 'Evenings', 60],
        ['Lisa Johnson', 'lisa@mentor.com', 'Data scientist.', 'Data Science', 'Weekdays', 55],
        ['Tom Wilson', 'tom@mentor.com', 'IT consultant.', 'IT Consulting', 'Flexible', 70],
    ];

    db.query(mentorQuery, [mentorValues], (err, result) => {
        if (err) throw err;

        // Insert 10 mentorees
        const mentoreeQuery = `INSERT INTO Mentoree (name, email, goals, preferredExpertise) VALUES ?`;
        const mentoreeValues = [
            ['Alice Cooper', 'alice@mentoree.com', 'Become a better developer.', 'Software Development'],
            ['Bob Turner', 'bob@mentoree.com', 'Learn project management.', 'Project Management'],
            ['Cathy Green', 'cathy@mentoree.com', 'Improve marketing skills.', 'Digital Marketing'],
            ['David Miller', 'david@mentoree.com', 'Get into data science.', 'Data Science'],
            ['Eve Adams', 'eve@mentoree.com', 'Understand IT consulting.', 'IT Consulting'],
            ['Frank Harris', 'frank@mentoree.com', 'Become a software architect.', 'Software Development'],
            ['Grace Lee', 'grace@mentoree.com', 'Learn digital marketing.', 'Digital Marketing'],
            ['Hank Martin', 'hank@mentoree.com', 'Master project management.', 'Project Management'],
            ['Isabella White', 'isabella@mentoree.com', 'Get into data analysis.', 'Data Science'],
            ['Jack Taylor', 'jack@mentoree.com', 'Improve IT skills.', 'IT Consulting'],
        ];

        db.query(mentoreeQuery, [mentoreeValues], (err, result) => {
            if (err) throw err;
            res.send('Database seeded with mentors and mentorees!');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

