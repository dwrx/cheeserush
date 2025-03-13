import React, { useState } from 'react';
import milkIcon from '../assets/milk.png';
import cakeImage from '../assets/cake.png';
import cheeseburgerImage from '../assets/hamburger.png';
import '../styles/InventoryBlock.css';

const InventoryBlock: React.FC = () => {
  const [cheeseBalance] = useState(150);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const items = [
    { id: 1, name: 'Cake', image: cakeImage, count: 14, effect: 'Decrease hunt time by 5 min' },
    { id: 2, name: 'Milk', image: milkIcon, count: 1, effect: '+10% rewards for 2h' },
    { id: 3, name: 'Cheeseburger', image: cheeseburgerImage, count: 0, effect: 'Instantly finish hunt' },
  ];

  return (
    <div className="inventory-block">
      <h2 className="inventory-title">Inventory</h2>
      <div className="inventory-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="inventory-item"
            onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
          >
            <div className="count-circle">{item.count > 99 ? '99+' : item.count}</div>
            <img
              src={item.image || '/placeholder.png'}
              alt={item.name}
              className={`item-image ${item.count === 0 ? 'greyed-out' : ''}`}
            />
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-effect">{item.effect}</p>
            </div>
            {selectedItem === item.id && item.count > 0 && (
              <button className="use-button" disabled={cheeseBalance === 0}>
                Use
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryBlock;