const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get available genres - MUST come before /:id route
router.get('/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres.filter(Boolean));
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Error fetching genres', error: error.message });
  }
});

// Get available languages - MUST come before /:id route
router.get('/languages', async (req, res) => {
  try {
    const languages = await Book.distinct('language');
    res.json(languages.filter(Boolean));
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ message: 'Error fetching languages', error: error.message });
  }
});

// Get all books with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, genre, language, search } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (genre && genre !== '') filter.genre = genre;
    if (language && language !== '') filter.language = language;
    if (search && search !== '') {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    console.log('Fetching books with filter:', filter);
    const books = await Book.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);

    console.log(`Found ${books.length} books out of ${total}`);
    res.json({
      books,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
});

module.exports = router;
