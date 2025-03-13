import React, { useState } from 'react';
import cheeseIcon from '../assets/cheese.png';
import cakeImage from '../assets/cake.png';
import '../styles/InventoryBlock.css';

const InventoryBlock: React.FC = () => {
  const [cheeseBalance] = useState(150);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const items = [
    { id: 1, name: 'Cake', image: '../assets/cake.png', count: 2, effect: 'Decrease hunt time by 5 min' },
    { id: 2, name: 'Empty', image: null, count: 0, effect: '' },
    { id: 3, name: 'Empty', image: null, count: 0, effect: '' },
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
            <img
              src={item.image || '/placeholder.png'}
              alt={item.name}
              className={`item-image ${item.count === 0 ? 'greyed-out' : ''}`}
            />
            <p>{item.name} ({item.count})</p>
            {selectedItem === item.id && item.count > 0 && (
              <div className="item-actions">
                <p>{item.effect}</p>
                <button className="use-button" disabled={cheeseBalance === 0}>
                  Use
                </button>
                <button className="buy-button">Buy</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryBlock;