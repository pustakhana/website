const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all books with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12, genre, language, search } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (genre) filter.genre = genre;
    if (language) filter.language = language;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    const books = await Book.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filter);

    res.json({
      books,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

// Get available genres
router.get('/filters/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres.filter(Boolean));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available languages
router.get('/filters/languages', async (req, res) => {
  try {
    const languages = await Book.distinct('language');
    res.json(languages.filter(Boolean));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
