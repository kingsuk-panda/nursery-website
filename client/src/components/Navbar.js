import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS module

function Navbar() {
  return (
    <nav className={styles.nav}>  {/* Apply the nav style */}
      <ul className={styles.ul}>   {/* Apply the ul style */}
        <li className={styles.li}><Link to="/" className={styles.a}>Home</Link></li>  {/* Apply the li and a styles */}
        <li className={styles.li}><Link to="/products" className={styles.a}>Products</Link></li>
        <li className={styles.li}><Link to="/about" className={styles.a}>About</Link></li>
        <li className={styles.li}>
          {localStorage.getItem('user') ? (
            <Link to="/account" className={styles.a}>Account</Link>
          ) : (
            <Link to="/login" className={styles.a}>Login / Sign Up</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;