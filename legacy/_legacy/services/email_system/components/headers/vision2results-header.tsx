import type React from 'react';

interface HeaderProps {
  className?: string;
}

export const Vision2ResultsHeader: React.FC<HeaderProps> = ({
  className = '',
}) => {
  return (
    <header className={`vision2results-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/assets/logos/vision2results-logo.png"
            alt="Vision2Results"
            className="logo"
          />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="#vision">Vision</a>
            </li>
            <li>
              <a href="#strategy">Strategy</a>
            </li>
            <li>
              <a href="#execution">Execution</a>
            </li>
            <li>
              <a href="#results">Results</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Vision2ResultsHeader;
