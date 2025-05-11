import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>
          {localStorage.getItem('user') ? ( // Check if user is logged in (example)
            <Link to="/account">Account</Link>
          ) : (
            <Link to="/login">Login / Sign Up</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;