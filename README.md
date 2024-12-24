# Healthcare_Management  

A lightweight web-based Healthcare Management System for booking doctor appointments and managing patient records.  

![image](https://github.com/user-attachments/assets/0e75e993-0d8b-4313-bf05-3d2083b1037f)


## Installation  

1. **Clone the repository**:  
   ```bash  
   git clone https://github.com/localhost969/Healthcare_Management.git  
   cd Healthcare_Management  
   ```  

2. **Initialize the project**:  
   ```bash  
   npm init -y  
   ```  

3. **Install dependencies**:  
   ```bash  
   npm install express body-parser sqlite3  
   ```  

4. **Start the server**:  
   ```bash  
   node server.js  
   ```  

5. **Access the application**:  
   Open your browser and navigate to `http://localhost:3000` to access the patient panel or `http://localhost:3000/admin` for the admin panel.  

## Features  

- **Admin Panel**: Add and manage doctors and their specialties.  
- **Patient Panel**: Book appointments and view upcoming bookings.  
- **Map Integration**: Select or search locations on the map for patient details.  

## Project Structure  

```plaintext
Healthcare_Management/
│
├── public/
│   ├── index.html         # Patient-facing frontend interface
│   ├── admin.html         # Admin panel for managing doctors
│
├── database/
│   └── db.sqlite          # SQLite database file for storing data
│
├── server.js              # Main server file
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## Dependencies  

- `express`: For creating server-side routes.  
- `body-parser`: For parsing incoming request bodies.  
- `sqlite3`: For managing the SQLite database.  

## License  

This project is licensed under the MIT License.  

---  

