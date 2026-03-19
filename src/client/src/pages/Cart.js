import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import '../styles/Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const updateQuantity = (bookId, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter((item) => item._id !== bookId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    setLoading(true);
    try {
      const orderBooks = cart.map((item) => ({
        bookId: item._id,
        quantity: item.quantity,
      }));

      await ordersAPI.createOrder({ books: orderBooks });
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-container">
      <header className="cart-header">
        <button onClick={() => navigate('/books')} className="back-btn">
          ← Back to Books
        </button>
        <h1>🛒 Shopping Cart</h1>
      </header>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/books')} className="continue-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.mainImageUrl || 'https://via.placeholder.com/80'}
                  alt={item.title}
                  className="item-image"
                />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p>{item.author}</p>
                  <div className="item-pricing">
                    <span className="price">₹{item.sellingPrice}</span>
                    {item.mrp > item.sellingPrice && (
                      <span className="mrp">₹{item.mrp}</span>
                    )}
                  </div>
                </div>
                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, parseInt(e.target.value))
                    }
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ₹{item.sellingPrice * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="checkout-btn"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
