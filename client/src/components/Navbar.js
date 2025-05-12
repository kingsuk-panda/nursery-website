import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

// 👇 Import your logo image (make sure path is correct)
import nurseryLogo from '../assets/nursery-logo.png'; 

function Navbar() {
  const location = useLocation();
  const getInitialTheme = () => (location.pathname === '/' ? styles.navThemeLightText : styles.navThemeDarkText);
  
  const [navTheme, setNavTheme] = useState(getInitialTheme);
  // 👇 State to track if we've scrolled past the hero area
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false); 
  const navRef = useRef(null);

  useEffect(() => {
    // Set initial theme/scroll state based on path
    const initialPath = location.pathname;
    setNavTheme(initialPath === '/' ? styles.navThemeLightText : styles.navThemeDarkText);
    // Assume not scrolled past hero initially on load or route change
    setIsScrolledPastHero(initialPath === '/' && window.scrollY > 50); // Initial check with small threshold

    const handleScroll = () => {
      const isHomePage = location.pathname === '/'; // Check current location inside handler too
      const navbarHeight = navRef.current ? navRef.current.offsetHeight : 70;
      
      // Threshold should be when the top of the page scrolls significantly, 
      // maybe half the hero height or a fixed value like 100px. Let's use 100px.
      const scrollThreshold = 100; 

      let currentScrollState = window.scrollY > scrollThreshold;
      
      // Only show navbar logo if scrolled on homepage, or always on other pages?
      // Let's show it ONLY when scrolled on homepage for the "move" effect.
      // On other pages, maybe it's always visible? Let's try always visible on other pages.
      if (isHomePage) {
         setIsScrolledPastHero(currentScrollState);
      } else {
         setIsScrolledPastHero(true); // Always show logo on other pages
      }

      // --- Theme switching logic (remains mostly the same) ---
      const themeScrollThreshold = window.innerHeight - navbarHeight - 50; 
      if (isHomePage) {
        if (window.scrollY > themeScrollThreshold) {
          setNavTheme(styles.navThemeDarkText);
        } else {
          setNavTheme(styles.navThemeLightText);
        }
      } else {
        setNavTheme(styles.navThemeDarkText); // Dark text theme for other pages
      }
      // --- End Theme switching logic ---
    };

    handleScroll(); // Call once to set initial states correctly

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]); // Re-run effect if location (page) changes

  return (
    <nav ref={navRef} className={`${styles.nav} ${navTheme}`}>
      {/* Optional Wrapper for max-width content alignment */}
      <div className={styles.navContentWrapper}> 
        {/* 👇 Navbar Logo - Conditionally visible */}
        <img 
          src={nurseryLogo} 
          alt="Evergreen Pushpanjali Nursery Logo" 
          // Apply base style + visibility style based on state
          className={`${styles.navbarLogo} ${isScrolledPastHero ? styles.navbarLogoVisible : ''}`} 
        />

        <ul className={styles.ul}>
          {/* Link Items remain the same */}
          <li className={styles.li}>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
              onClick={() => { if (location.pathname === '/') window.scrollTo(0,0);}}
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
          <li className={`${styles.li} ${styles.navItemPushRight}`}> 
            {localStorage.getItem('user') ? (
              <NavLink to="/account" className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}>Account</NavLink>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}>Login / Sign Up</NavLink>
            )}
          </li>
        </ul>
      </div> 
    </nav>
  );
}

export default Navbar;