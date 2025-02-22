import 'dotenv/config';
import express from 'express';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { thoughtsTable } from './db/schema';
const path = require('path');


// Serve static files from "public"


const app = express();
app.use(express.json());  // Middleware to parse JSON
app.use(express.static('public'));  // Serve static files (like index.html)

// Initialize DB connection
const db = drizzle(process.env.DATABASE_URL!);

// 🔹 Route to insert a thought
app.post('/thoughts', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newThought = { text };
  const insertedThought = await db.insert(thoughtsTable).values(newThought).returning();
  res.json(insertedThought);
});

// 🔹 Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
//   });
  

// 🔹 Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
