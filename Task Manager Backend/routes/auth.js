const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');


// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Ensure required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const user = await User.create({ name, email, password });
    const token = user.generateJWT();

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = user.generateJWT();
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

// const express = require('express');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.create({ name, email, password });
//     const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;
