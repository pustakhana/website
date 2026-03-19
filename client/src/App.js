import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Navigate to="/books" />} />
      </Routes>
    </Router>
  );
}

export default App;
