// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is fixed, rendered on all pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page handles its own full-screen hero layout */}
        
        {/* For other pages, wrap their content in a container that respects the navbar */}
        <Route path="/products" element={
          <div className="container page-content">
            <Products />
          </div>
        } />
        <Route path="/products/:productId" element={
          <div className="container page-content">
            <ProductPage />
          </div>
        } />
        <Route path="/login" element={
          <div className="container page-content">
            <Login />
          </div>
        } />
        <Route path="/account" element={
          <div className="container page-content">
            <Account />
          </div>
        } />
        <Route path="/cart" element={
          <div className="container page-content">
            <Cart />
          </div>
        } />
        <Route path="/checkout" element={
          <div className="container page-content">
            <Checkout />
          </div>
        } />
        <Route path="/about" element={
          <div className="container page-content">
            <About />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;