import React from "react";
import playIcon from "../assets/joystick.png";
import shopIcon from "../assets/shopping_trolley.png";
import settingsIcon from "../assets/trophy.png";
import "../styles/NavMenu.css";

const NavMenu: React.FC = () => {
  return (
    <div className="nav-menu">
      <div className="nav-item active">
        <img src={playIcon} alt="Play" className="nav-icon" />
        <span>Play</span>
      </div>
      <div className="nav-item">
        <img src={shopIcon} alt="Shop" className="nav-icon" />
        <span>Shop</span>
      </div>
      <div className="nav-item">
        <img src={settingsIcon} alt="Settings" className="nav-icon" />
        <span>Leaderboard</span>
      </div>
    </div>
  );
};

export default NavMenu;
