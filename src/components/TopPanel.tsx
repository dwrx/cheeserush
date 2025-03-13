import React from 'react';
import cheeseIcon from '../assets/cheese.png';
import { formatNumber } from '../utils/formatNumber';
import '../styles/TopPanel.css';

const TopPanel: React.FC = () => {
  const cheeseBalance = 1234567;
  const level = 42;
  const progress = 75;
  const cheeseToNext = 2000000;

  return (
    <div className="top-panel">
      <div className="stats">
        <div className="stat-item">
          <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
          <span>{formatNumber(cheeseBalance)}</span>
        </div>
        <div className="stat-item">
          <span>Level {formatNumber(level)}</span>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">
          {progress}% ({formatNumber(cheeseBalance)}/{formatNumber(cheeseToNext)})
        </span>
      </div>
    </div>
  );
};

export default TopPanel;