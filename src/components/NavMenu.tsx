import React from 'react';
// import playIcon from '../assets/play-icon.png';
// import shopIcon from '../assets/shop-icon.png';
// import settingsIcon from '../assets/settings-icon.png';
import '../styles/NavMenu.css';

const NavMenu: React.FC = () => {
  return (
    <div className="nav-menu">
      <div className="nav-item active">
        {/* <img src={playIcon} alt="Play" className="nav-icon" /> */}
        <span>Play</span>
      </div>
      <div className="nav-item">
        {/* <img src={shopIcon} alt="Shop" className="nav-icon" /> */}
        <span>Shop</span>
      </div>
      <div className="nav-item">
        {/* <img src={settingsIcon} alt="Settings" className="nav-icon" /> */}
        <span>Settings</span>
      </div>
    </div>
  );
};

export default NavMenu;