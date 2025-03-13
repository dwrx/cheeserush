import React from 'react';
import cheeseIcon from '../assets/cheese.png';
import broImage from '../assets/mouse.png';
import '../styles/TeamBlock.css';

const TeamBlock: React.FC = () => {
  const team = [
    { id: 1, level: 1, capacity: 20, current: 15, unlocked: true },
    { id: 2, level: 0, capacity: 30, current: 0, unlocked: false, unlockLevel: 10 },
    { id: 3, level: 0, capacity: 40, current: 0, unlocked: false, unlockLevel: 20 },
  ];

  return (
    <div className="team-block">
      <h2 className="team-title">Lil Bros</h2>
      <div className="team-list">
        {team.map((bro) => (
          <div key={bro.id} className={`team-member ${!bro.unlocked ? 'locked' : ''}`}>
            <img src={broImage} alt="Lil Bro" className="bro-image" />
            {bro.unlocked ? (
              <>
                <p>Level {bro.level} (Max: {bro.capacity})</p>
                <button className="claim-button">
                  Claim {bro.current} <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
                </button>
                <button className="level-up-button">
                  Level Up for 50 <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
                </button>
              </>
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