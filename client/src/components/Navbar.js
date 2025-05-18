import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import nurseryLogo from '../assets/nursery-logo.png'; // Make sure this path is correct
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { isAuthenticated, currentUser, logout } = useAuth();

  const getInitialTheme = () => (location.pathname === '/' ? styles.navThemeLightText : styles.navThemeDarkText);
  
  const [navTheme, setNavTheme] = useState(getInitialTheme);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);  
  const navRef = useRef(null);

  // 👇 State for the dropdown menu 👇
  const [showDropdown, setShowDropdown] = useState(false);
  // 👇 Ref for the dropdown container to detect outside clicks 👇
  const dropdownRef = useRef(null);

  // Effect to handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      // If the click is outside the dropdown container, close the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    // Add event listener when the dropdown is shown
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Clean up event listener when the dropdown is hidden
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, dropdownRef]); // Re-run if showDropdown or dropdownRef changes


  useEffect(() => {
    const initialPath = location.pathname;
    const onHomePage = initialPath === '/';
    
    setNavTheme(onHomePage ? styles.navThemeLightText : styles.navThemeDarkText);
    setIsScrolledPastHero(!onHomePage || window.scrollY > 50);

    const handleScroll = () => {
      const isHomePage = location.pathname === '/'; 
      const navbarHeight = navRef.current ? navRef.current.offsetHeight : 70;
      const scrollThreshold = 100; 
      let currentScrollState = window.scrollY > scrollThreshold;
      
      if (isHomePage) {
        setIsScrolledPastHero(currentScrollState);
      } else {
        setIsScrolledPastHero(true);
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

    handleScroll(); 

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Function to toggle dropdown visibility
  const handleDropdownToggle = () => {
    setShowDropdown(prev => !prev);
  };

  // Function to handle logout click (closes dropdown before logging out)
  const handleLogout = () => {
    setShowDropdown(false); // Close dropdown
    logout(); // Call the logout function from AuthContext
  };

  // Function to handle account link click (closes dropdown before navigating)
  const handleAccountClick = () => {
    setShowDropdown(false); // Close dropdown
    // Navigating will be handled by the NavLink itself
  };


  return (
    <nav ref={navRef} className={`${styles.nav} ${navTheme}`}>
      <div className={styles.navContentWrapper}>  
        <Link to="/" className={`${styles.navbarLogoLink} ${isScrolledPastHero ? styles.navbarLogoVisible : ''}`}>
          <img  
            src={nurseryLogo}  
            alt="Evergreen Pushpanjali Nursery Logo"  
            className={styles.navbarLogoImage} 
          />
        </Link>

        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
              onClick={() => { if (location.pathname === '/') window.scrollTo(0,0);}}
              end
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
          {/* Add other common links if they exist */}
          {/*
          <li className={styles.li}>
            <NavLink to="/services" className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}>Services</NavLink>
          </li>
          <li className={styles.li}>
            <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}>Contact</NavLink>
          </li>
          */}

          {/* Seller Dashboard Link (remains a separate item for now) */}
          {isAuthenticated && currentUser && currentUser.role === 'seller' && (
            <li className={`${styles.li} ${styles.navItemSellerDashboard}`}> {/* Add a specific class if needed */}
              <NavLink 
                to="/seller/dashboard" // Ensure this route will exist
                className={({ isActive }) => isActive ? `${styles.a} ${styles.active}` : styles.a}
              >
                Dashboard
              </NavLink>
            </li>
          )}


          {/* Authentication/Account Links */}
          {isAuthenticated ? (
            // 👇 Account/Profile dropdown container 👇
            <li className={`${styles.li} ${styles.navItemPushRight}`} ref={dropdownRef}>
              <div className={styles.dropdownContainer}>
                {/* The button/div that triggers the dropdown */}
                <button 
                  onClick={handleDropdownToggle} 
                  className={`${styles.a} ${styles.dropdownTrigger}`} // Style like a link/button
                  aria-expanded={showDropdown} // Accessibility attribute
                  aria-haspopup="true" // Accessibility attribute
                >
                  {/* Display user's name, fallback to "Account" */}
                  {currentUser?.name ? `Hi, ${currentUser.name.split(' ')[0]}` : 'Account'}
                </button>

                {/* The dropdown menu itself - conditionally rendered */}
                {showDropdown && (
                  <div className={styles.dropdownMenu}>
                    {/* Dropdown Items */}
                    <NavLink 
                      to="/account" 
                      className={({ isActive }) => isActive ? `${styles.dropdownItem} ${styles.dropdownItemActive}` : styles.dropdownItem}
                      onClick={handleAccountClick} // Close dropdown on click
                    >
                      Your Account
                    </NavLink>
                    {/* Logout is a button inside the dropdown */}
                    <button onClick={handleLogout} className={styles.dropdownItemLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          ) : (
            // 👇 Login/Signup links when NOT authenticated 👇
            <>
              <li className={`${styles.li} ${styles.navItemPushRight}`}> {/* Push Login/Signup to the right */}
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