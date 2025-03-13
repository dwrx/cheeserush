import React, { useState } from "react";
import cheeseIcon from "../assets/cheese.png";
import broImage from "../assets/mouse.png";
import { formatNumber } from "../utils/formatNumber";
import "../styles/TeamBlock.css";

const TeamBlock: React.FC = () => {
  const [cheeseBalance] = useState(6000);
  const [showUpgrades, setShowUpgrades] = useState(false);

  const team = [
    { id: 1, level: 40, capacity: 1200, current: 950, unlocked: true, yieldPerMin: 6 },
    { id: 2, level: 0, capacity: 30, current: 0, unlocked: false, unlockLevel: 10, yieldPerMin: 0 },
    { id: 3, level: 0, capacity: 40, current: 0, unlocked: false, unlockLevel: 20, yieldPerMin: 0 },
    { id: 4, level: 0, capacity: 40, current: 0, unlocked: false, unlockLevel: 30, yieldPerMin: 0 },
  ];

  const getUpgradeCost = (level: number) => level * 125;
  const getNextCapacity = (capacity: number) => Math.floor(capacity * 1.2);
  const getNextYield = (yieldPerMin: number) => Math.floor(yieldPerMin * 1.15);

  return (
    <div className="team-block">
      <div className="team-header">
        <h2 className="team-title">Lil Bros</h2>
        <button className="upgrade-toggle-button" onClick={() => setShowUpgrades(!showUpgrades)}>
          {showUpgrades ? "Back" : "Upgrade"}
        </button>
      </div>
      <div className="team-list">
        {team.map((bro) => (
          <div key={bro.id} className={`team-member ${!bro.unlocked ? "locked" : ""}`}>
            {bro.unlocked && <div className="level-circle">LVL {formatNumber(bro.level)}</div>}
            <img src={broImage} alt="Lil Bro" className="bro-image" />
            {bro.unlocked ? (
              showUpgrades ? (
                <div className="upgrade-info">
                  <p className="upgrade-detail">
                    <b>Cost:</b> {formatNumber(getUpgradeCost(bro.level))}{" "}
                    <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
                  </p>
                  <p className="upgrade-detail">
                    <b>Capacity:</b> {formatNumber(getNextCapacity(bro.capacity))}
                  </p>
                  <p className="upgrade-detail">
                    <b>Yield:</b> {formatNumber(getNextYield(bro.yieldPerMin))} / min
                  </p>
                  <button className="level-up-button" disabled={cheeseBalance < getUpgradeCost(bro.level)}>
                    Level Up
                  </button>
                </div>
              ) : (
                <>
                  <button className="claim-button">
                    <span>
                      {formatNumber(bro.current)}/{formatNumber(bro.capacity)}
                    </span>
                    <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
                  </button>
                </>
              )
            ) : (
              <p className="locked-text">Unlock at LVL {bro.unlockLevel}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamBlock;
