import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaHome,
  FaStore,
  FaCreditCard,
  FaShoppingCart,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');

  const handleSidebarOpen = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(true);
    console.log("Opening sidebar with tab:", tab); 
  };
  const dispatch = useDispatch();
  const {  isAuthenticated } = useSelector(state => state.auth);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.luxuryLogo}>
            <span className={styles.evidens}>EVIDENS</span>
            <span className={styles.deBeaute}>DE BEAUTÉ</span>
          </Link>
        </div>
        <ul className={styles.links}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          {/* Auth Buttons */}
          {!isAuthenticated && (
            <>
              <li><Link to="/login">Login</Link></li>
            
            </>
          )}
          {isAuthenticated && (
            <li>
              
              <Link  onClick={() => dispatch(logout())}>Logout</Link >
            </li>
          )}
        </ul>
        <div className={styles.button}>
          <li>
                <button onClick={() => { setIsOpen(false); handleSidebarOpen("cart"); }}>
                  <FaShoppingCart className={styles.icon} />
                </button>
          </li>
          <li>
            <button onClick={() => { setIsOpen(false); handleSidebarOpen("favorites"); }}>
              <FaHeart className={styles.icon} />
            </button>
          </li>
        </div>
        <div className={styles.icons}>
          <button onClick={() => handleSidebarOpen("favorites")}>
            <FaHeart size={22} />
          </button>
          <button onClick={() => handleSidebarOpen("cart")}>
            <FaShoppingCart size={22} />
          </button>
          <button onClick={() => setIsOpen(true)}>
            <FaBars size={22} />
          </button>
        </div>
      </nav>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div className={styles.mobileDrawer}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <FaTimes size={22} />
            </button>
            <ul>
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <FaHome className={styles.icon} /> Home
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => setIsOpen(false)}>
                  <FaStore className={styles.icon} /> Shop
                </Link>
              </li>
            
              {!isAuthenticated && (
                <>
                  <li>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <FaSignInAlt className={styles.icon} /> Login
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <li>
                  <Link onClick={() => { dispatch(logout()); setIsOpen(false); }}>
                    <FaSignOutAlt className={styles.icon} /> Logout
                  </Link>
                </li>
              )}
            
            </ul>
          </div>
        </>
      )}

      {/* Sidebar Component */}
      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}

export default Navbar;
