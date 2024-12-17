// backend/server.js

import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT ;

// MySQL database connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Use environment variables for sensitive data
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
});
console.log({
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Check if Employee ID exists
const checkEmployeeIdExistence = (employeeId, callback) => {
  const query = 'SELECT * FROM employees WHERE employeeId = ?';
  db.query(query, [employeeId], callback);
};

// Check if Email exists
const checkEmailExistence = (email, callback) => {
  const query = 'SELECT * FROM employees WHERE email = ?';
  db.query(query, [email], callback);
};

// Add new employee route
app.post('/api/employees', (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

  // Check if Employee ID exists
  checkEmployeeIdExistence(employeeId, (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (result.length > 0) return res.status(400).send('Employee ID already exists');
    
    // Check if Email exists
    checkEmailExistence(email, (err, result) => {
      if (err) return res.status(500).send('Database error');
      if (result.length > 0) return res.status(400).send('Email already exists');

      // Add employee if both checks pass
      const query = 'INSERT INTO employees (name, employeeId, email, phone, department, dateOfJoining, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [name, employeeId, email, phone, department, dateOfJoining, role], (err, result) => {
        if (err) return res.status(500).send('Error adding employee');
        return res.status(200).send('Employee added successfully');
      });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
