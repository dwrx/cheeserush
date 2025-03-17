import React from "react";
import { NavLink } from "react-router-dom";
import playIcon from "../assets/joystick.png";
import shopIcon from "../assets/shopping_trolley.png";
import leaderboardIcon from "../assets/trophy.png";
import "../styles/NavMenu.css";

const NavMenu: React.FC = () => {
  return (
    <div className="nav-menu">
      <NavLink to="/" end className="nav-item">
        <img src={playIcon} alt="Play" className="nav-icon" />
        <span>Play</span>
      </NavLink>
      <NavLink to="/shop" className="nav-item">
        <img src={shopIcon} alt="Shop" className="nav-icon" />
        <span>Shop</span>
      </NavLink>
      <NavLink to="/leaderboard" className="nav-item">
        <img src={leaderboardIcon} alt="Leaderboard" className="nav-icon" />
        <span>Leaderboard</span>
      </NavLink>
    </div>
  );
};

export default NavMenu;
