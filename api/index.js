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
app.get('/health', async (req, res) => {
  try {
    const bookCount = await Book.countDocuments();
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'connected',
      booksInDatabase: bookCount,
      mongooseState: mongoose.connection.readyState
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Server error',
      database: 'disconnected',
      error: error.message,
      mongooseState: mongoose.connection.readyState
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);

// Filter routes - separate from books for clarity
app.get('/api/filters/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres.filter(Boolean));
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Error fetching genres', error: error.message });
  }
});

app.get('/api/filters/languages', async (req, res) => {
  try {
    const languages = await Book.distinct('language');
    res.json(languages.filter(Boolean));
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ message: 'Error fetching languages', error: error.message });
  }
});

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
  if (!initialized) {
    try {
      if (mongoose.connection.readyState === 0) {
        await initializeApp();
      }
      initialized = true;
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }
  next();
});

module.exports = app;
