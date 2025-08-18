import React from 'react';

interface HeaderProps {
  className?: string;
}

export const LyricLinesHeader: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`lyriclines-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img src="/assets/logos/lyriclines-logo.png" alt="LyricLines" className="logo" />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li><a href="#lyrics">Lyrics</a></li>
            <li><a href="#artists">Artists</a></li>
            <li><a href="#playlists">Playlists</a></li>
            <li><a href="#discover">Discover</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default LyricLinesHeader;