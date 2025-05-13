// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage'; // Shows category cards
import CategoryProductsPage from './pages/CategoryProductsPage'; // ADDED: Shows products for a specific category
import ProductPage from './pages/ProductPage';   // For individual product details later
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        
        {/* 👇 ADDED: Dynamic route for displaying products of a specific category 👇 */}
        <Route path="/products/:categoryName" element={
          // This page will handle its own layout including navbar spacing
          <CategoryProductsPage /> 
        } />
        
        {/* Route for individual product details - ensure it doesn't clash or order correctly.
            If product IDs are unique and don't look like category names (e.g., 'plants'), this is okay.
            A more specific path like /product/:productId might be safer later if needed.
            For now, assuming categoryName will not be a product ID.
        */}
        <Route path="/product/:productId" element={ // Changed from /products/:productId to avoid conflict for now
          <div className="container page-content">
            <ProductPage />
          </div>
        } />

        {/* Other page routes */}
        <Route path="/login" element={<div className="container page-content"><Login /></div>} />
        <Route path="/account" element={<div className="container page-content"><Account /></div>} />
        <Route path="/cart" element={<div className="container page-content"><Cart /></div>} />
        <Route path="/checkout" element={<div className="container page-content"><Checkout /></div>} />
        <Route path="/about" element={<div className="container page-content"><About /></div>} />
      </Routes>
    </Router>
  );
}

export default App;