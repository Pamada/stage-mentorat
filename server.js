const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session'); // For session management
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 4000;
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID'); // Replace with your Google client ID

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'your-secret-key',  // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

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

// Routes for static pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/contact.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/services.html'));
});

app.get('/members', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/members.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.get('/register-mentor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register-mentor.html'));
});

app.get('/register-mentoree', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register-mentoree.html'));
});

// Handle traditional Mentor registration form submission
app.post('/register-mentor', (req, res) => {
    const { name, email, password, expertise } = req.body;
    const query = `INSERT INTO Mentor (name, email, password, expertise) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, password, expertise], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Mentor account created successfully!' });
    });
});

// Handle traditional Mentoree registration form submission
app.post('/register-mentoree', (req, res) => {
    const { name, email, password } = req.body;
    const query = `INSERT INTO Mentoree (name, email, password) VALUES (?, ?, ?)`;
    db.query(query, [name, email, password], (err, result) => {
        if (err) throw err;
        res.json({ success: true, message: 'Mentoree account created successfully!' });
    });
});

// Handle login for both mentor and mentoree
app.post('/login', (req, res) => {
    const { email, password, userType } = req.body;
    let query = '';

    if (userType === 'mentor') {
        query = `SELECT * FROM Mentor WHERE email = ?`;
    } else if (userType === 'mentoree') {
        query = `SELECT * FROM Mentoree WHERE email = ?`;
    }

    db.query(query, [email], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const user = results[0];

        if (password === user.password) {  // Password should be hashed using bcrypt in real cases
            // Store user information in session
            req.session.user = {
                name: user.name,
                email: user.email,
                userType: userType
            };
            return res.json({ success: true, message: 'Login successful!' });
        } else {
            return res.json({ success: false, message: 'Incorrect password.' });
        }
    });
});

// Google Sign-In and Registration route
app.post('/google-login', async (req, res) => {
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
        res.status(400).json({ success: false, message: 'Google login failed.' });
    }
});

// Dashboard route (requires user to be logged in)
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/members');  // Redirect to login if no user is logged in
    }
    res.sendFile(path.join(__dirname, 'public/dashboard/dashboard.html'));
});

// Serve user data to frontend
app.get('/user-data', (req, res) => {
    if (req.session.user) {
        return res.json({ success: true, user: req.session.user });
    }
    res.json({ success: false, message: 'No user logged in.' });
});

// Serve all other dashboard pages
app.get('/dashboard/:page', (req, res) => {
    const validPages = ['search', 'inbox', 'calendar', 'todo', 'contacts', 'invoice', 'settings'];
    if (validPages.includes(req.params.page)) {
        return res.sendFile(path.join(__dirname, `public/dashboard/${req.params.page}.html`));
    }
    res.status(404).send('Page not found');
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/dashboard');
        }
        res.redirect('/');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


