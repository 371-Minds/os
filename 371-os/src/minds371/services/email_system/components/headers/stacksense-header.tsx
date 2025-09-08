import type React from 'react';

interface HeaderProps {
  className?: string;
}

export const StackSenseHeader: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`stacksense-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/assets/logos/stacksense-logo.png"
            alt="StackSense"
            className="logo"
          />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="#analytics">Analytics</a>
            </li>
            <li>
              <a href="#insights">Insights</a>
            </li>
            <li>
              <a href="#tools">Tools</a>
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

export default StackSenseHeader;
