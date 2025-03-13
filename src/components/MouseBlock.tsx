import React, { useState, useEffect } from 'react';
import mouseImage from '../assets/mouse.png';
import cheeseIcon from '../assets/cheese.png';
import '../styles/MouseBlock.css';

const MouseBlock: React.FC = () => {
  const [state, setState] = useState<'idle' | 'rushing' | 'done'>('idle');
  const [timeLeft, setTimeLeft] = useState(15);
  const reward = 50;

  useEffect(() => {
    if (state === 'rushing') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setState('done');
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state]);

  const startRush = () => setState('rushing');
  const collectCheese = () => setState('idle');

  return (
    <div className="mouse-block">
      <img src={mouseImage} alt="Mouse" className="mouse-image" />
      {state === 'idle' && (
        <button className="rush-button" onClick={startRush}>
          Rush!
        </button>
      )}
      {state === 'rushing' && (
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            ></div>
            <span className="progress-text">{timeLeft}s</span>
          </div>
          <span className="reward-text">
            Reward: {reward} <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
          </span>
        </div>
      )}
      {state === 'done' && (
        <button className="collect-button" onClick={collectCheese}>
          Collect {reward} <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
        </button>
      )}
    </div>
  );
};

export default MouseBlock;