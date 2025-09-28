import type React from 'react';

interface HeaderProps {
  className?: string;
}

export const ReadySetBuildHeader: React.FC<HeaderProps> = ({
  className = '',
}) => {
  return (
    <header className={`readysetbuild-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img
            src="/assets/logos/readysetbuild-logo.png"
            alt="ReadySetBuild"
            className="logo"
          />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="#solutions">Solutions</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#team">Team</a>
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

export default ReadySetBuildHeader;
