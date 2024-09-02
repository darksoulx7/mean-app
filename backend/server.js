const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sukuna#3597',
    database: 'mean_crud_db'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// CRUD operations

// Create
app.post('/api/students', (req, res) => {
    const student = req.body;
    const query = 'INSERT INTO students (name, age, major) VALUES (?, ?, ?)';
    db.query(query, [student.name, student.age, student.major], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...student });
    });
});

app.get('/users',(req, res) => {
    const userList = [
        {
            'id': 3264364362232,
            'department': 'cloud',
            'name': 'dddddd',
            'mobile': 3268383333,
            'email': 'harshank2007@gmail.com',
            'gender': 'male',
            'doj': '20/07/2001',
            'city': 'patan',
            'salary': 12000,
            'address': 'patan',
            'status': 'active',
          }
    ]
    res.status(200).json({  data: userList });
})
// Read
app.get('/api/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Update
app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const student = req.body;
    const query = 'UPDATE students SET name = ?, age = ?, major = ? WHERE id = ?';
    db.query(query, [student.name, student.age, student.major, id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ id, ...student });
    });
});

// Delete
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM students WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Student deleted successfully' });
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
