import React from "react";
import milkIcon from "../assets/milk.png";
import cakeImage from "../assets/cake.png";
import cheeseburgerImage from "../assets/hamburger.png";
import "../styles/Shop.css";

const Shop: React.FC<{ playerData: any }> = ({ playerData }) => {
  const items = [
    {
      id: 1,
      name: "Cake",
      image: cakeImage,
      effect: "Decrease rush time",
    },
    {
      id: 2,
      name: "Milk",
      image: milkIcon,
      effect: "+10% rewards for 2h",
    },
    {
      id: 3,
      name: "Cheeseburger",
      image: cheeseburgerImage,
      effect: "Instantly finish rush",
    },
  ];

  return (
    <div className="shop-block">
      <div className="shop-alert">
        Booster packs are coming soon.
      </div>
      <div className="shop-list">
        {items.map((item) => (
          <div key={item.id} className="shop-item">
            <img src={item.image} alt={item.name} className="shop-item-image" />
            <div className="shop-item-info">
              <h3 className="shop-item-name">{item.name}</h3>
              <p className="shop-item-effect">{item.effect}</p>
            </div>
            <button className="buy-button" disabled>
              Buy with $SONIC
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
