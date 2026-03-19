const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    sellerSkuId: {
      type: String,
      required: true,
      unique: true,
    },
    isbn13: String,
    isbn10: String,
    title: {
      type: String,
      required: true,
    },
    author: String,
    publisher: String,
    binding: String,
    language: String,
    bookSubcategory: String,
    mainImageUrl: String,
    otherImageUrls: [String],
    edition: String,
    publicationYear: Number,
    pages: Number,
    genre: String,
    bookCategory: String,
    description: String,
    aboutAuthor: String,
    mrp: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    stockCount: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
