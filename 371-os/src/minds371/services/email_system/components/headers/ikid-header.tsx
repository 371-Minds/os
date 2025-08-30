import React from 'react';

interface HeaderProps {
  className?: string;
}

export const IkidHeader: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`ikid-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img src="/assets/logos/ikid-logo.png" alt="Ikid Edventures" className="logo" />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li><a href="#adventures">Adventures</a></li>
            <li><a href="#learning">Learning</a></li>
            <li><a href="#games">Games</a></li>
            <li><a href="#parents">Parents</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default IkidHeader;