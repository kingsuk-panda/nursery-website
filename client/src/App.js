// client/src/App.js
import React from 'react';
// BrowserRouter as Router is REMOVED from here (moved to index.js)
import { Route, Routes, useLocation } from 'react-router-dom'; 
import Home from './pages/Home'; // Corrected import based on your filename
import ProductsPage from './pages/ProductsPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import ProductPage from './pages/ProductPage';
// VVV CORRECTED IMPORT NAME AND PATH FOR YOUR EXISTING LOGIN FILE VVV
import Login from './pages/Login'; // Import Login component from Login.js
import SignupPage from './pages/SignupPage'; 
import Account from './pages/Account';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <Navbar />
      <main className={isAuthPage ? "authPageMain" : "standardPageMain"}>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:categoryName" element={<CategoryProductsPage />} />
          
          <Route path="/product/:productId" element={
            <div className="container page-content">
              <ProductPage />
            </div>
          } />

          {/* VVV CORRECTED ROUTE ELEMENT TO USE YOUR IMPORTED COMPONENT VVV */}
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignupPage />} /> {/* This route uses the SignupPage component we'll create */}

          {/* Other pages with standard wrapper */}
          <Route path="/account" element={<div className="container page-content"><Account /></div>} />
          <Route path="/cart" element={<div className="container page-content"><Cart /></div>} />
          <Route path="/checkout" element={<div className="container page-content"><Checkout /></div>} />
          <Route path="/about" element={<div className="container page-content"><About /></div>} />
        </Routes>
      </main>
      {/* Add Footer here if you have one and want it on all pages except auth potentially */}
      {/* {!isAuthPage && <Footer />} */}
    </>
  );
}

export default App;