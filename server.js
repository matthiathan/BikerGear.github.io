const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: 'mattcoombes247@gmail.com', // Your email
        pass: 'J@zzyGr33n56' // Your email password or app-specific password
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { to, subject, message } = req.body;

    const mailOptions = {
        from: 'mattcoombes247@gmail.com',
        to: to,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Error sending email' });
        }
        res.json({ success: true, info });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

const dbConfig = {
    user: '', // Use Windows Authentication
    server: 'Matt-Desktop\\HOSTING', 
    database: 'LucaWeb',
    options: {
        trustedConnection: true,
    },
};

// Endpoint to handle sign up
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
            .input('Email', sql.NVarChar, email)
            .input('PasswordHash', sql.NVarChar, hashedPassword)
            .query('INSERT INTO UserDetails (Email, PasswordHash) VALUES (@Email, @PasswordHash)');
        
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('SQL error', err);
        res.status(400).json({ error: 'Error registering user.' });
    }
});

// Endpoint to handle login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('Email', sql.NVarChar, email)
            .query('SELECT * FROM UserDetails WHERE Email = @Email');
        
        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.json({ message: 'Login successful!', userId: user.UserID});
    } catch (err) {
        console.error('SQL error', err);
        res.status(400).json({ error: 'Login failed.' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
