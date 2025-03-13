import React from 'react';
import TopPanel from './components/TopPanel';
import MouseBlock from './components/MouseBlock';
import TeamBlock from './components/TeamBlock';
import InventoryBlock from './components/InventoryBlock';
import NavMenu from './components/NavMenu';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="game-wrapper">
        <TopPanel />
        <MouseBlock />
        <TeamBlock />
        <InventoryBlock />
        <NavMenu />
      </div>
    </div>
  );
};

export default App;