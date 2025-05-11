// client/src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  // Default to light text theme (for hero) or determine based on current path
  const location = useLocation();
  const getInitialTheme = () => {
    if (location.pathname === '/') {
      // For homepage, check scroll position if possible, otherwise default to light text
      // This initial check might be complex if reloaded mid-scroll, so scroll handler will correct it
      return styles.navThemeLightText;
    }
    return styles.navThemeDarkText; // Default for other pages
  };

  const [navTheme, setNavTheme] = useState(getInitialTheme);
  const navRef = useRef(null);

  useEffect(() => {
    // Update initial theme strictly based on path when location changes
    setNavTheme(location.pathname === '/' ? styles.navThemeLightText : styles.navThemeDarkText);

    const handleScroll = () => {
      const isHomePage = location.pathname === '/';
      const navbarHeight = navRef.current ? navRef.current.offsetHeight : 70; // Default navbar height
      
      // Define the scroll threshold for theme change on Home page
      // This is when the bottom of the 100vh hero section is about to scroll past the navbar
      const scrollThreshold = window.innerHeight - navbarHeight - 50; // 50px buffer

      if (isHomePage) {
        if (window.scrollY > scrollThreshold && window.scrollY > 100) { // Ensure some scrolling has happened
          setNavTheme(styles.navThemeDarkText); // Scrolled past hero
        } else {
          setNavTheme(styles.navThemeLightText); // Over hero
        }
      } else {
        setNavTheme(styles.navThemeDarkText); // Default for other pages
      }
    };

    // Call handler once to set theme based on initial scroll, esp. for homepage
    handleScroll(); 

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); // Re-run effect if location (page) changes

  return (
    <nav ref={navRef} className={`${styles.nav} ${navTheme}`}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? `${styles.a} ${navTheme === styles.navThemeLightText ? styles.active : styles.active}` : styles.a}
            // The active class itself is now part of the theme, so just styles.a is enough for base
            // Or ensure your .active class in CSS is general enough or theme it as above.
            // Simpler: rely on theme-specific .active from CSS:
            // className={({ isActive }) => isActive ? styles.a + ' ' + styles.active : styles.a}
            // Even simpler if .active inside each theme block in CSS is sufficient:
             onClick={() => { if (location.pathname === '/') window.scrollTo(0,0);}} // Scroll to top for home
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