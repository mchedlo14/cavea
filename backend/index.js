// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Create a pool to handle database connections
const pool = new Pool({
  user: 'levani',
  host: 'localhost',
  database: 'cavea',
  password: 'cavea',
  port: 5432,
});

// Create express app
const app = express();

// Use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define endpoints
app.get('/inventories', async (req, res) => {
  try {
    // Get all inventories from the database
    const { rows } = await pool.query('SELECT * FROM inventories');

    // Return the inventories as a response
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/inventories', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, price, location } = req.body;

    // Insert the new inventory into the database
    const { rows } = await pool.query(
      'INSERT INTO inventories (name, price, location) VALUES ($1, $2, $3) RETURNING *',
      [name, price, location]
    );

    // Return the newly created inventory as a response
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/inventories/:id', async (req, res) => {
  try {
    // Extract the inventory ID from the request parameters
    const { id } = req.params;

    // Delete the inventory from the database
    const { rowCount } = await pool.query(
      'DELETE FROM inventories WHERE id = $1',
      [id]
    );

    // Check if the inventory was deleted
    if (rowCount === 0) {
      res.status(404).json({ message: 'Inventory not found' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
