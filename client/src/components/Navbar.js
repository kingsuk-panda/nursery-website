import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom'; // Added Link for logo consistency
import styles from './Navbar.module.css';
import nurseryLogo from '../assets/nursery-logo.png'; // Make sure this path is correct: client/src/assets/nursery-logo.png
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Navbar() {
  const location = useLocation();
  const { isAuthenticated, currentUser, logout } = useAuth(); // Use our AuthContext

  const getInitialTheme = () => (location.pathname === '/' ? styles.navThemeLightText : styles.navThemeDarkText);
  
  const [navTheme, setNavTheme] = useState(getInitialTheme);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);  
  const navRef = useRef(null);

  useEffect(() => {
    const initialPath = location.pathname;
    const onHomePage = initialPath === '/';
    
    setNavTheme(onHomePage ? styles.navThemeLightText : styles.navThemeDarkText);
    setIsScrolledPastHero(!onHomePage || window.scrollY > 50); // Scrolled if not home, or past threshold on home

    const handleScroll = () => {
      const isHomePage = location.pathname === '/'; 
      const navbarHeight = navRef.current ? navRef.current.offsetHeight : 70;
      const scrollThreshold = 100; 
      let currentScrollState = window.scrollY > scrollThreshold;
      
      if (isHomePage) {
        setIsScrolledPastHero(currentScrollState);
      } else {
        setIsScrolledPastHero(true); // Always show logo etc. on other pages
      }

      const themeScrollThreshold = window.innerHeight - navbarHeight - 50;  
      if (isHomePage) {
        if (window.scrollY > themeScrollThreshold) {
          setNavTheme(styles.navThemeDarkText);
        } else {
          setNavTheme(styles.navThemeLightText);
        }
      } else {
        setNavTheme(styles.navThemeDarkText);
      }
    };

    handleScroll(); // Initial call

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <nav ref={navRef} className={`${styles.nav} ${navTheme}`}>
      <div className={styles.navContentWrapper}>  
        {/* Use Link for the logo to navigate to home */}
        <Link to="/" className={`${styles.navbarLogoLink} ${isScrolledPastHero ? styles.navbarLogoVisible : ''}`}>
          <img  
            src={nurseryLogo}  
            alt="Evergreen Pushpanjali Nursery Logo"  
            className={styles.navbarLogoImage} // Dedicated class for image if needed
          />
          {/* Optionally, add span for text logo next to image if design requires */}
          {/* <span className={styles.navbarLogoText}>Evergreen</span> */}
        </Link>

        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
              onClick={() => { if (location.pathname === '/') window.scrollTo(0,0);}}
              end // Added 'end' for more precise matching of home route
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
              to="/about" // Assuming /about route exists
              className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
            >
              About
            </NavLink>
          </li>
          {/* Add other common links like Services, Contact if they exist */}
          {/*
          <li className={styles.li}>
            <NavLink to="/services" className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}>Services</NavLink>
          </li>
          <li className={styles.li}>
            <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}>Contact</NavLink>
          </li>
          */}

          {/* Authentication Links - Updated */}
          {isAuthenticated ? (
            <>
              {currentUser && currentUser.role === 'seller' && (
                <li className={styles.li}>
                  <NavLink 
                    to="/seller/dashboard" // Ensure this route will exist
                    className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li className={styles.li}>
                <NavLink 
                  to="/account" // Your existing account route
                  className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
                >
                  {/* Display user's name if available, otherwise "Account" */}
                  {currentUser?.name ? `Hi, ${currentUser.name.split(' ')[0]}` : 'Account'}
                </NavLink>
              </li>
              <li className={styles.li}>
                <button onClick={logout} className={`${styles.a} ${styles.navButtonLink}`}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={`${styles.li} ${styles.navItemPushRight}`}> 
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
                >
                  Login
                </NavLink>
              </li>
              <li className={styles.li}>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => isActive ? `${styles.a} ${styles.active} ${styles.navLinkButton}` : `${styles.a} ${styles.navLinkButton}`} // Style as a button
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>  
    </nav>
  );
}

export default Navbar;