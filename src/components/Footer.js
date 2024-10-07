import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <Link to="/about">About Us</Link> {/* Updated link to point to About Us page */}
          <Link to="/contact">Contact</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Help</Link>
        </div>
        <p className="footer-text">&copy; 2024 W A L L I All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
