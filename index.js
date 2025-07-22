// Bus Booking System - Inserting and Retrieving Data (Task)
// Correct, clean, working Node.js code using Express and MySQL with raw SQL queries

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // replace with your MySQL user
    password: 'Shashvraj21!',  // replace with your MySQL password
    database: 'busbooking' // ensure this database is created
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// ===== User Endpoints ===== //

// POST /users -> Add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO Users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'User added successfully', userId: result.insertId });
    });
});

// GET /users -> Retrieve all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// ===== Bus Endpoints ===== //

// POST /buses -> Add a new bus
app.post('/buses', (req, res) => {
    const { busNumber, totalSeats, availableSeats } = req.body;
    const sql = 'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)';
    db.query(sql, [busNumber, totalSeats, availableSeats], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Bus added successfully', busId: result.insertId });
    });
});

// GET /buses/available/:seats -> Retrieve buses with available seats > specified
app.get('/buses/available/:seats', (req, res) => {
    const seats = parseInt(req.params.seats);
    const sql = 'SELECT * FROM Buses WHERE availableSeats > ?';
    db.query(sql, [seats], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Start the server
app.listen(3111, () => {
    console.log('Server running on http://localhost:3111');
});