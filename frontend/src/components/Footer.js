import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">S</span>
          <span>Simply Buy</span>
        </div>
        <p className="footer-text">
          A modern e-commerce experience built with React &amp; Express.
        </p>
        <div className="footer-links">
          <Link to="/products">Shop</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Simply Buy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
