import React from 'react';

interface HeaderProps {
  className?: string;
}

export const EpicQuestHeader: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`epicquest-header ${className}`}>
      <div className="header-container">
        <div className="logo-section">
          <img src="/assets/logos/epicquest-logo.png" alt="EpicQuest Hub" className="logo" />
        </div>
        <nav className="navigation">
          <ul className="nav-links">
            <li><a href="#quests">Quests</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
            <li><a href="#rewards">Rewards</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default EpicQuestHeader;