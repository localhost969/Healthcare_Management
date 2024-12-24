const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (it will create the file if it doesn't exist)
const db = new sqlite3.Database('./healthcare.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the 'doctors' table
const createDoctorsTable = `
  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    location TEXT NOT NULL
  );
`;

// Create the 'appointments' table
const createAppointmentsTable = `
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    patient_location TEXT NOT NULL,
    doctor_id INTEGER,
    appointment_time TEXT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
  );
`;

// Execute the table creation queries
db.run(createDoctorsTable, (err) => {
  if (err) {
    console.error('Error creating doctors table:', err.message);
  } else {
    console.log('Doctors table created (or already exists).');
  }
});

db.run(createAppointmentsTable, (err) => {
  if (err) {
    console.error('Error creating appointments table:', err.message);
  } else {
    console.log('Appointments table created (or already exists).');
  }
});

// Export the database connection
module.exports = db;

