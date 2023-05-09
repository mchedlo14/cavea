const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');


const pool = new Pool({
  user: 'levani',
  host: 'localhost',
  database: 'cavea',
  password: 'cavea',
  port: 5432,
});

const app = express();
const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/inventories/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const dataRecordById = id
    const start = 20 * dataRecordById;
    console.log(req.query['location'])

    if (req.query['location'] === 'მთავარი ოფისი' || req.query['location'] === 'კავეა გალერია' || req.query['location'] === 'კავეა თბილისი მოლი' || req.query['location'] === 'კავეა ისთ ფოინთი' || req.query['location'] === 'კავეა სითი მოლი') {
      const { rows } = await pool.query("SELECT * FROM inventories ORDER BY location DESC OFFSET ($1) LIMIT 20", [start])
      res.status(200).json(rows);
      return;
    } 

    if(req.query['location'] === 'ყველა'){
      const { rows } = await pool.query("SELECT * FROM inventories OFFSET ($1) LIMIT 20", [start])
      res.status(200).json(rows);
      return;
    }


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
    const { id } = req.params;

    const { rowCount } = await pool.query(
      'DELETE FROM inventories WHERE id = $1',
      [id]
    );

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