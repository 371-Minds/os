import type React from 'react';

interface HeaderProps {
  className?: string;
}

export const MindHeader: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`371minds-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/assets/logos/371minds-logo.png"
            alt="371 Minds"
            className="logo"
          />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MindHeader;
