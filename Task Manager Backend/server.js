const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const app = express();

dotenv.config(); // Load environment variables

// Middleware
app.use(express.json());
// const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes); // User Authentication Routes
app.use('/api/tasks', taskRoutes); // Task Routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
