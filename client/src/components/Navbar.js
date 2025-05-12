// client/src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();
  const getInitialTheme = () => {
    if (location.pathname === '/') {
      return styles.navThemeLightText;
    }
    return styles.navThemeDarkText;
  };

  const [navTheme, setNavTheme] = useState(getInitialTheme);
  const navRef = useRef(null);

  useEffect(() => {
    setNavTheme(location.pathname === '/' ? styles.navThemeLightText : styles.navThemeDarkText);

    const handleScroll = () => {
      const isHomePage = location.pathname === '/';
      const navbarHeight = navRef.current ? navRef.current.offsetHeight : 70;
      const scrollThreshold = window.innerHeight - navbarHeight - 50;

      if (isHomePage) {
        if (window.scrollY > scrollThreshold && window.scrollY > 100) {
          setNavTheme(styles.navThemeDarkText);
        } else {
          setNavTheme(styles.navThemeLightText);
        }
      } else {
        setNavTheme(styles.navThemeDarkText);
      }
    };

    handleScroll(); // Call once on mount/route change

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <nav ref={navRef} className={`${styles.nav} ${navTheme}`}>
      <ul className={styles.ul}>
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
        {/* 👇 Added styles.navItemPushRight to this li 👇 */}
        <li className={`${styles.li} ${styles.navItemPushRight}`}> 
          {localStorage.getItem('user') ? (
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