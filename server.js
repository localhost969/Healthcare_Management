const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static HTML files

// Initialize SQLite database
const db = new sqlite3.Database('./database/db.sqlite');

// Create tables for doctors and appointments
db.serialize(() => {
  // Create the doctors table with an added location column
  db.run(`CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL -- Add this column for doctor locations
  )`);

  // Create the appointments table
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    patient_location TEXT NOT NULL,
    doctor_id INTEGER,
    appointment_time TEXT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
  )`);
});

// Routes for the Admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API to get all doctors for Admin
app.get('/api/doctors', (req, res) => {
  db.all('SELECT id, name, specialty, location FROM doctors', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API to add a doctor (with location)
app.post('/api/doctors', (req, res) => {
  const { name, specialty, location } = req.body;
  if (!name || !specialty || !location) {
    return res.status(400).json({ error: 'Name, specialty, and location are required.' });
  }

  const stmt = db.prepare('INSERT INTO doctors (name, specialty, location) VALUES (?, ?, ?)');
  stmt.run(name, specialty, location, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
  stmt.finalize();
});

// Routes for the Patient panel
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to get all appointments with doctor details
app.get('/api/appointments', (req, res) => {
  const query = `
    SELECT appointments.id, appointments.patient_name, appointments.patient_location, appointments.appointment_time, 
           doctors.name AS doctor_name, doctors.specialty, doctors.location AS doctor_location
    FROM appointments
    JOIN doctors ON appointments.doctor_id = doctors.id
  `;
  
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API to book an appointment
app.post('/api/appointments', (req, res) => {
  const { patient_name, patient_location, doctor_id, appointment_time } = req.body;
  const stmt = db.prepare('INSERT INTO appointments (patient_name, patient_location, doctor_id, appointment_time) VALUES (?, ?, ?, ?)');
  stmt.run(patient_name, patient_location, doctor_id, appointment_time, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
  stmt.finalize();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

