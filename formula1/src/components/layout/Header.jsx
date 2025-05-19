// Header.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-glass">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="glass-logo">F1</span>
          <span className="logo-text">Championship</span>
        </Link>

        {/* Menú principal (desktop) */}
        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/drivers">Drivers</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/schedule">Schedule</Link>
        </nav>

        {/* Botones de autenticación (desktop) */}
        <div className="desktop-auth">
          <button className="btn-glass">Login</button>
          <button className="btn-glass-primary">Sign Up</button>
        </div>

        {/* Menú hamburguesa (mobile) */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Menú móvil */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/drivers" onClick={() => setIsMenuOpen(false)}>Drivers</Link>
          <Link to="/teams" onClick={() => setIsMenuOpen(false)}>Teams</Link>
          <Link to="/schedule" onClick={() => setIsMenuOpen(false)}>Schedule</Link>
        </nav>
        <div className="mobile-auth">
          <button className="btn-glass">Login</button>
          <button className="btn-glass-primary">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;