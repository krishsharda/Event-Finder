import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span className="logo-icon">📅</span>
          <span className="logo-text">Mini Event Finder</span>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Events
          </Link>
          <Link to="/create" className="nav-link nav-link-primary">
            Create Event
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
