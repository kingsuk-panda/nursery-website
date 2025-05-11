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
import About from './pages/About'; // Added Import
import Navbar from './components/Navbar'; // Import the Navbar component
import './App.css'; // Import the app-wide styles

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container"> {/* Add the container here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} /> {/* Added Route */}
        </Routes>
      </div> {/* Closing tag for container */}
    </Router>
  );
}

export default App;