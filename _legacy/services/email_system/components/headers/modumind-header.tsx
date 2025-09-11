import type React from 'react';

interface HeaderProps {
  className?: string;
}

export const ModuMindHeader: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`modumind-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/assets/logos/modumind-logo.png"
            alt="ModuMind"
            className="logo"
          />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="#modules">Modules</a>
            </li>
            <li>
              <a href="#intelligence">Intelligence</a>
            </li>
            <li>
              <a href="#integration">Integration</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ModuMindHeader;
