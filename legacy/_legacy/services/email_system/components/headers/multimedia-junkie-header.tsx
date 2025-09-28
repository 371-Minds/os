import type React from 'react';

interface HeaderProps {
  className?: string;
}

export const MultimediaJunkieHeader: React.FC<HeaderProps> = ({
  className = '',
}) => {
  return (
    <header className={`multimedia-junkie-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/assets/logos/multimedia-junkie-logo.png"
            alt="Multimedia Junkie"
            className="logo"
          />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="#video">Video</a>
            </li>
            <li>
              <a href="#audio">Audio</a>
            </li>
            <li>
              <a href="#graphics">Graphics</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MultimediaJunkieHeader;
