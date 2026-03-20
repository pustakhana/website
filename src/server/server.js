require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { parseCSVFiles } = require('./utils/csvParser');
const Book = require('./models/Book');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// Serve static files from React build
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const bookCount = await Book.countDocuments();
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'connected',
      booksInDatabase: bookCount
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Server error',
      database: 'disconnected',
      error: error.message
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

// Catch-all: Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Initialize app
const initializeApp = async () => {
  try {
    // Connect to database
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    await connectDB();
    console.log('✓ Database connected successfully');

    // Load books from CSV
    const booksExist = await Book.countDocuments();
    console.log(`Database contains ${booksExist} books`);
    
    if (booksExist === 0) {
      console.log('Loading books from CSV files...');
      try {
        const booksData = await parseCSVFiles();
        console.log(`Inserting ${booksData.length} books into database...`);
        const result = await Book.insertMany(booksData);
        console.log(`✓ Successfully loaded ${result.length} books into database`);
      } catch (csvError) {
        console.error('Failed to load CSV files:', csvError.message);
        console.warn('⚠ Continuing without CSV data - database is empty');
      }
    } else {
      console.log(`✓ Database already contains ${booksExist} books`);
    }

    // Start server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

initializeApp();

module.exports = app;
