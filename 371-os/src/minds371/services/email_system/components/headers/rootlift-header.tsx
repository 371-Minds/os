import React from 'react';

interface HeaderProps {
  className?: string;
}

export const RootliftHeader: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`rootlift-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img src="/assets/logos/rootlift-logo.png" alt="Rootlift Digital" className="logo" />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li><a href="#digital-transformation">Digital Transformation</a></li>
            <li><a href="#solutions">Solutions</a></li>
            <li><a href="#case-studies">Case Studies</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default RootliftHeader;