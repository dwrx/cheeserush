import React from 'react';
import cheeseIcon from '../assets/cheese.png';
import '../styles/TopPanel.css';

const TopPanel: React.FC = () => {
  const cheeseBalance = 150;
  const level = 3;
  const progress = 60;
  const cheeseToNext = 200;

  return (
    <div className="top-panel">
      <div className="stats">
        <div className="stat-item">
          <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
          <span>{cheeseBalance}</span>
        </div>
        <div className="stat-item">
          <span>Level {level}</span>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">{progress}% ({cheeseBalance}/{cheeseToNext})</span>
      </div>
    </div>
  );
};

export default TopPanel;