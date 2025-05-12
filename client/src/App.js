// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Products from './pages/Products'; // We'll replace this
import ProductsPage from './pages/ProductsPage'; // Import the new page for category display
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
      <Navbar /> {/* Navbar is fixed, rendered on all pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page handles its own full-screen hero layout */}
        
        {/* Updated /products route to use ProductsPage */}
        <Route path="/products" element={<ProductsPage />} /> 
        
        {/* For other pages, wrap their content in a container that respects the navbar */}
        <Route path="/products/:productId" element={ 
          // This route will be for showing a single product's details.
          // It still uses the container for standard page layout.
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