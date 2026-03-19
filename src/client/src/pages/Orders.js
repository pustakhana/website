import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import '../styles/Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await ordersAPI.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="orders-container">
      <header className="orders-header">
        <button onClick={() => navigate('/books')} className="back-btn">
          ← Back to Books
        </button>
        <h1>📋 My Orders</h1>
      </header>

      {loading ? (
        <p className="loading">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
          <button onClick={() => navigate('/books')} className="shop-btn">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className={`order-status status-${getStatusColor(order.status)}`}>
                  {order.status.toUpperCase()}
                </div>
              </div>

              <div className="order-items">
                <h4>Items ({order.books.length})</h4>
                {order.books.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-title">
                      {item.title} {item.author && `by ${item.author}`}
                    </span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <strong>Total: ₹{order.totalPrice}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
