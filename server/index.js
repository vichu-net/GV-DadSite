const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Test DB Route
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).send('DB error');
    }
    res.json(results);
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Server running on http://localhost:${PORT}`));
