import type React from 'react';

interface HeaderProps {
  className?: string;
}

export const LegacyArchaeologistHeader: React.FC<HeaderProps> = ({
  className = '',
}) => {
  return (
    <header className={`legacy-archaeologist-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/assets/logos/legacy-archaeologist-logo.png"
            alt="Legacy Code Archaeologist"
            className="logo"
          />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="#excavation">Code Excavation</a>
            </li>
            <li>
              <a href="#restoration">Restoration</a>
            </li>
            <li>
              <a href="#documentation">Documentation</a>
            </li>
            <li>
              <a href="#consulting">Consulting</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default LegacyArchaeologistHeader;
