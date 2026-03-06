const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(__dirname));

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create transactions table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                passengerName TEXT NOT NULL,
                departureDate TEXT NOT NULL,
                fromCity TEXT NOT NULL,
                toCity TEXT NOT NULL,
                airline TEXT NOT NULL,
                price TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                console.log('Transactions table ready.');
            }
        });
    }
});

// API Endpoints

// GET /api/bookings - Retrieve all bookings
app.get('/api/bookings', (req, res) => {
    db.all('SELECT * FROM transactions ORDER BY timestamp DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// POST /api/bookings - Create a new booking
app.post('/api/bookings', (req, res) => {
    const { passengerName, departureDate, fromCity, toCity, airline, price } = req.body;

    // Basic validation
    if (!passengerName || !departureDate || !fromCity || !toCity || !airline || !price) {
        return res.status(400).json({ error: 'Missing required booking fields.' });
    }

    const sql = `
        INSERT INTO transactions (passengerName, departureDate, fromCity, toCity, airline, price)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [passengerName, departureDate, fromCity, toCity, airline, price];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Error inserting transaction:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Booking successfully saved to database.',
            id: this.lastID,
            data: {
                passengerName,
                departureDate,
                fromCity,
                toCity,
                airline,
                price
            }
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
