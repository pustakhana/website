require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('../src/server/config/db');
const { parseCSVFiles } = require('../src/server/utils/csvParser');
const Book = require('../src/server/models/Book');

const authRoutes = require('../src/server/routes/auth');
const bookRoutes = require('../src/server/routes/books');
const orderRoutes = require('../src/server/routes/orders');

const app = express();

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);

// Initialize app
const initializeApp = async () => {
  try {
    // Connect to database
    await connectDB();

    // Load books from CSV
    const booksExist = await Book.countDocuments();
    if (booksExist === 0) {
      console.log('Loading books from CSV files...');
      const booksData = await parseCSVFiles();
      await Book.insertMany(booksData);
      console.log(`✓ Successfully loaded ${booksData.length} books into database`);
    } else {
      console.log(`✓ Database already contains ${booksExist} books`);
    }
  } catch (error) {
    console.error('Failed to initialize app:', error.message);
  }
};

// Initialize on first request
let initialized = false;
app.use(async (req, res, next) => {
  if (!initialized && mongoose.connection.readyState === 0) {
    await initializeApp();
    initialized = true;
  }
  next();
});

module.exports = app;
