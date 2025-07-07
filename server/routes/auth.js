const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();
const saltRounds = 10;

// 📝 REGISTER ROUTE
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("📥 Register attempt:", email);

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ error: 'DB error' });
    }

    if (results.length > 0) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ error: 'User already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role || 'user'],
        (err, result) => {
          if (err) {
            console.error("❌ Insert error:", err);
            return res.status(500).json({ error: 'Insert error' });
          }

          console.log("✅ User registered:", email);
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    } catch (err) {
      console.error("❌ Server error:", err);
      res.status(500).json({ error: 'Server error' });
    }
  });
});

// 🔐 LOGIN ROUTE
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login attempt:", email);

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ error: 'DB error' });
    }

    if (results.length === 0) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Stored Hash:", user.password);
      console.log("Password Match:", isMatch);
      if (!isMatch) {
        console.log("❌ Invalid password:", email);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      console.log("✅ Login successful:", email);
      res.json({ message: 'Login successful', user });
    } catch (error) {
      console.error("❌ Compare error:", error);
      res.status(500).json({ error: 'Server error' });
    }
  });
});


module.exports = router;
