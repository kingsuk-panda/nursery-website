// client/src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Changed from Link to NavLink
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
          >
            Products
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
          >
            About
          </NavLink>
        </li>
        <li className={styles.li}>
          {localStorage.getItem('user') ? ( // Assuming you'll implement user logic
            <NavLink 
              to="/account" 
              className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
            >
              Account
            </NavLink>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
            >
              Login / Sign Up
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;