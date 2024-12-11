const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db'); // Connect to MySQL database
const cors = require('cors');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const connection = require('./db'); // Ensure this connects to your database
// const externalFacultyRoutes = require('./routes/facultyRoutes'); // Add this line
const facultyRoutes = require('./routes/facultyRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});






// Route to insert student data
app.post("/studentinfo", (req, res) => {
  console.log("Request received:", req.body); // Debugging

  const {
    name,
    phone_no,
    email,
    school_name,
    board,
    standard_id,
    subject_id,
    medium,
    discount = 0.0,
    total_fees,
    shift,
    reference = null,
    paid_amount = 0.0,
    remaining_amount,
    fees_date,
    due_date,
    payment_mode,
    transaction_id = null,
    academic_year,
  } = req.body;

  // Validate required fields
  if (
    !name || !phone_no || !email || !school_name || !board || !medium || 
    !total_fees || !remaining_amount || !fees_date || !due_date || 
    !payment_mode || !academic_year
  ) {
    console.error("Validation failed: Missing required fields");
    return res.status(400).send("Missing required fields");
  }

  const query = `
    INSERT INTO studentinfo 
    (name, phone_no, email, school_name, board, standard_id, subject_id, medium, discount, total_fees, shift, reference, paid_amount, remaining_amount, fees_date, due_date, payment_mode, transaction_id, academic_year) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      name,
      phone_no,
      email,
      school_name,
      board,
      standard_id,
      subject_id,
      medium,
      discount,
      total_fees,
      shift,
      reference,
      paid_amount,
      remaining_amount,
      fees_date,
      due_date,
      payment_mode,
      transaction_id,
      academic_year,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).send(`Database error: ${err.message}`);
      }
      res.status(200).send("Student data inserted successfully");
    }
  );
});

// Fetch all standards (standard_name)
app.get('/standards', (req, res) => {
  connection.query('SELECT * FROM stdmaster', (err, results) => {
    if (err) {
      console.error('Error querying standards:', err.stack);
      return res.status(500).send('Error querying the database');
    }
    res.json(results);  // Send the results as a JSON response
  });
});

// Fetch all subjects (subject_name)
app.get('/subjects', (req, res) => {
  connection.query('SELECT * FROM submaster', (err, results) => {
    if (err) {
      console.error('Error querying subjects:', err.stack);
      return res.status(500).send('Error querying the database');
    }
    res.json(results);  // Send the results as a JSON response
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




app.get('/test-db', (req, res) => {
  connection.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Database connection test failed:', err.message);
      res.status(500).send('Database connection failed');
    } else {
      res.status(200).send('Database connection successful');
    }
  });
});


app.post("/add-faculty", (req, res) => {
  console.log("Request body:", req.body);  // Log the incoming request body
  const {
    faculty_name,
    faculty_subject,
    student_count,
    total_fees,
    payable_fees,
    paid_amount,
    remaining_amount,
  } = req.body;

  // Change the table name from 'faculty_data' to 'EnternalFaculty'
  const query = `
    INSERT INTO ExternalFaculty (
      faculty_name,
      faculty_subject,
      student_count,
      total_fees,
      payable_fees,
      paid_amount,
      remaining_amount
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [
      faculty_name,
      faculty_subject,
      student_count,
      total_fees,
      payable_fees,
      paid_amount,
      remaining_amount,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.message);
        res.status(500).send("Error inserting data into database.");
      } else {
        console.log("Insert result:", result);
        res.status(200).send("Faculty data added successfully.");
      }
    }
  );
});




// Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




// Route to add subject
app.post('/add-subject', (req, res) => {
  const { subject_name } = req.body;

  if (!subject_name) {
      return res.status(400).json({ error: 'Subject name is required' });
  }

  const query = 'INSERT INTO SubMaster (subject_name) VALUES (?)';

  connection.query(query, [subject_name], (err, result) => {
      if (err) {
          console.error('Error inserting subject:', err.message);
          return res.status(500).json({ error: 'Error adding subject: ' + err.message });
      }
      res.status(200).json({ message: 'Subject added successfully', result });
  });
});




// Assuming you already have the database connection in place (db is connected)

app.post('/add-standard', (req, res) => {
  const { standard_name } = req.body;

  if (!standard_name) {
    return res.status(400).json({ error: 'Standard name is required' });
  }

  const query = 'INSERT INTO StdMaster (standard_name) VALUES (?)';

  connection.query(query, [standard_name], (err, result) => {
    if (err) {
      console.error('Error inserting standard:', err);
      return res.status(500).json({ error: 'Error adding standard: ' + err.message });
    }
    res.status(200).json({ message: 'Standard added successfully', result });
  });
});
