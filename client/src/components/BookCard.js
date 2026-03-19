import React from 'react';
import '../styles/BookCard.css';

function BookCard({ book, onAddToCart }) {
  const discount = book.mrp > book.sellingPrice
    ? Math.round(((book.mrp - book.sellingPrice) / book.mrp) * 100)
    : 0;

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img
          src={book.mainImageUrl || 'https://via.placeholder.com/150x200'}
          alt={book.title}
          className="book-image"
        />
        {discount > 0 && <div className="discount-badge">{discount}% OFF</div>}
      </div>

      <div className="book-content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-publisher">{book.publisher}</p>

        <div className="book-metadata">
          {book.binding && <span className="badge">{book.binding}</span>}
          {book.language && <span className="badge">{book.language}</span>}
        </div>

        <div className="book-pricing">
          <span className="selling-price">₹{book.sellingPrice}</span>
          {book.mrp > book.sellingPrice && (
            <span className="mrp-price">₹{book.mrp}</span>
          )}
        </div>

        <button onClick={onAddToCart} className="add-to-cart-btn">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default BookCard;
