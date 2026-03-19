import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { booksAPI } from '../utils/api';
import BookCard from '../components/BookCard';
import '../styles/Books.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
    loadFilters();
    loadCart();
  }, [page, search, genre, language]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const response = await booksAPI.getBooks({
        page,
        limit: 12,
        search,
        genre,
        language,
      });
      setBooks(response.data.books);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFilters = async () => {
    try {
      const genresRes = await booksAPI.getGenres();
      const languagesRes = await booksAPI.getLanguages();
      setGenres(genresRes.data);
      setLanguages(languagesRes.data);
    } catch (error) {
      console.error('Error loading filters:', error);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const addToCart = (book) => {
    const existingItem = cart.find((item) => item._id === book._id);
    let updatedCart;
    if (existingItem) {
      existingItem.quantity += 1;
      updatedCart = [...cart];
    } else {
      updatedCart = [...cart, { ...book, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Added to cart!');
  };

  const handleLogout = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  return (
    <div className="books-container">
      <header className="books-header">
        <div className="header-content">
          <h1>📚 Pustakkhana</h1>
          <div className="header-actions">
            <button onClick={() => navigate('/cart')} className="cart-btn">
              🛒 Cart ({cart.length})
            </button>
            <button onClick={() => navigate('/orders')} className="orders-btn">
              📋 My Orders
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search books or authors..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />
        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setPage(1);
          }}
          className="filter-select"
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading books...</p>
      ) : (
        <>
          <div className="books-grid">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onAddToCart={() => addToCart(book)}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="page-btn"
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {Math.ceil(total / 12)}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / 12)}
              className="page-btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Books;
