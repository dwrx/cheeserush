import React from "react";
import cheeseIcon from "../assets/cheese.png";
import { formatNumber } from "../utils/formatNumber";
import "../styles/TopPanel.css";

interface TopPanelProps {
  playerData: any;
  fetchPlayerData: () => Promise<void>;
  onLevelUp: () => Promise<void>;
}

const TopPanel: React.FC<TopPanelProps> = ({ playerData, fetchPlayerData, onLevelUp }) => {
  const cheeseBalance = playerData?.cheeseBalance ? Number(playerData.cheeseBalance) : 0;
  const level = playerData?.mouseLevel || 0;
  const cheeseToNext = 100 * Math.pow(1.15, level - 1);
  const progress = Math.floor((cheeseBalance / cheeseToNext) * 100);

  const handleLevelUp = async () => {
    try {
      await onLevelUp();
      await fetchPlayerData();
    } catch (error) {
      console.error("Error leveling up:", error);
    }
  };

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
      {cheeseBalance >= cheeseToNext ? (
        <button className="level-up-button" onClick={handleLevelUp}>
          Level Up ({formatNumber(cheeseToNext)})
        </button>
      ) : (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">
            {formatNumber(cheeseBalance)}/{formatNumber(cheeseToNext)}
          </span>
        </div>
      )}
    </div>
  );
};

export default TopPanel;
