require('dotenv').config({ path: '../../.env' });
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
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);

// Catch-all: Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
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

    // Start server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize app:', error.message);
    process.exit(1);
  }
};

initializeApp();

module.exports = app;
