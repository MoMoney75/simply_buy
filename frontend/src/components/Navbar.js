import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, logout, cartCount, user } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  function handleLogout() {
    setMenuOpen(false);
    logout();
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon">S</span>
          Simply Buy
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {menuOpen && (
          <div
            className="nav-overlay"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/products"
                className={isActive('/products')}
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/cart"
                className={`${isActive('/cart')} cart-link`}
                onClick={() => setMenuOpen(false)}
              >
                Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
              <span className="nav-user">
                Hi, {user?.first_name || user?.username}
              </span>
              <button className="btn btn-secondary nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={isActive('/login')}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary nav-cta"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
