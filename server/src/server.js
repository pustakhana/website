require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { parseCSVFiles } = require('./utils/csvParser');
const Book = require('./models/Book');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
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
