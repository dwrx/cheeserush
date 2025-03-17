import React, { useState } from "react";
import milkIcon from "../assets/milk.png";
import cakeImage from "../assets/cake.png";
import cheeseburgerImage from "../assets/hamburger.png";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import "../styles/InventoryBlock.css";

const InventoryBlock: React.FC<{
  playerData: any;
  playerPda: PublicKey | null;
  program: Program | null;
  fetchPlayerData: () => Promise<void>;
}> = ({ playerData, playerPda, program, fetchPlayerData }) => {
  const { publicKey, sendTransaction } = useWallet();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const items = playerData
    ? [
        {
          id: 1,
          name: "Cake",
          image: cakeImage,
          count: playerData.inventory.cake,
          effect: "Decrease rush time by 5 min",
        },
        { id: 2, name: "Milk", image: milkIcon, count: playerData.inventory.milk, effect: "+10% rewards for 2h" },
        {
          id: 3,
          name: "Cheeseburger",
          image: cheeseburgerImage,
          count: playerData.inventory.burger,
          effect: "Instantly finish rush",
        },
      ]
    : [];

  console.log(playerData?.inventory);

  const handleBoostItem = async (boostType: any) => {
    if (!program || !playerPda || !publicKey) return;
    const tx = await program.methods
      .useBoost(boostType)
      .accounts({
        player: playerPda,
        owner: publicKey,
      })
      .transaction();
    const { blockhash } = await program.provider.connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = publicKey;
    const txId = await sendTransaction(tx, program.provider.connection);
    await program.provider.connection.confirmTransaction(txId);
    await fetchPlayerData();
  };

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
            <div className="count-circle">{item.count > 99 ? "99+" : item.count}</div>
            <img
              src={item.image || "/placeholder.png"}
              alt={item.name}
              className={`item-image ${item.count === 0 ? "greyed-out" : ""}`}
            />
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-effect">{item.effect}</p>
            </div>
            {selectedItem === item.id && item.count > 0 && (
              <button
                className="use-button"
                disabled={!playerData?.lastRushStart?.toNumber()}
                onClick={() => handleBoostItem({ [item.name.toLowerCase()]: {} })}
              >
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
