import React, { useState, useEffect } from "react";
import cheeseIcon from "../assets/cheese.png";
import broImage from "../assets/bro.png";
import lockImage from "../assets/lock.png";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { formatNumber } from "../utils/formatNumber";
import "../styles/TeamBlock.css";

interface BroData {
  id: number;
  level: number;
  capacity: number;
  yieldPerMin: number;
  last_claim?: number;
  unlocked: boolean;
  unlockLevel?: number;
}

const TeamBlock: React.FC<{
  playerData: any;
  playerPda: PublicKey | null;
  program: Program | null;
  fetchPlayerData: () => Promise<void>;
}> = ({ playerData, playerPda, program, fetchPlayerData }) => {
  const { publicKey, sendTransaction } = useWallet();
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getUpgradeCost = (level: number) => Math.floor(200 * Math.pow(1.25, level - 1));
  const getNextCapacity = (capacity: number) => Math.floor(capacity * 1.2);
  const getNextYield = (yieldPerMin: number) => Math.floor(yieldPerMin * 1.15);

  const claimBroCheese = async (broIndex: number) => {
    if (!program || !playerPda || !publicKey) return;
    const tx = await program.methods
      .claimBrosCheese(broIndex)
      .accounts({
        player: playerPda,
        // @ts-ignore
        referrer: null,
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

  const levelUpBro = async (broIndex: number) => {
    if (!program || !playerPda || !publicKey) return;
    const tx = await program.methods
      .levelUpBro(broIndex)
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

  const onChainBros: BroData[] = playerData?.bros
    ? playerData.bros.map((bro: any, index: number) => ({
        id: index + 1,
        level: bro.level,
        capacity: Number(bro.capacity),
        yieldPerMin: Number(bro.yieldPerMin),
        last_claim: Number(bro.lastClaim),
        unlocked: true,
      }))
    : [];
  const additionalBros: BroData[] = [
    {
      id: 2,
      level: 0,
      capacity: 30,
      yieldPerMin: 0,
      unlocked: playerData?.mouseLevel >= 10,
      unlockLevel: 10,
    },
    {
      id: 3,
      level: 0,
      capacity: 40,
      yieldPerMin: 0,
      unlocked: playerData?.mouseLevel >= 20,
      unlockLevel: 20,
    },
    {
      id: 4,
      level: 0,
      capacity: 40,
      yieldPerMin: 0,
      unlocked: playerData?.mouseLevel >= 30,
      unlockLevel: 30,
    },
  ];

  const team: BroData[] = [...onChainBros, ...additionalBros].slice(0, 4);

  const computePendingCheese = (bro: BroData) => {
    if (!bro.last_claim) return 0;
    const now = Math.floor(Date.now() / 1000);
    const elapsedMinutes = Math.floor((now - bro.last_claim) / 60);
    const pending = bro.yieldPerMin * elapsedMinutes;
    return Math.min(pending, bro.capacity);
  };

  return (
    <div className="team-block">
      <div className="team-header">
        <h2 className="team-title">Lil Bros</h2>
        {playerData && (
          <button className="upgrade-toggle-button" onClick={() => setShowUpgrades(!showUpgrades)}>
            {showUpgrades ? "Back" : "Upgrade"}
          </button>
        )}
      </div>
      <div className="team-list">
        {team.map((bro: BroData) => {
          const pending = bro.unlocked && bro.last_claim ? computePendingCheese(bro) : 0;
          return (
            <div key={bro.id} className={`team-member ${!bro.unlocked ? "locked" : ""}`}>
              {bro.unlocked && <div className="level-circle">LVL {formatNumber(bro.level)}</div>}
              <img src={bro.unlocked ? broImage : lockImage} alt="Lil Bro" className={`bro-image`} />
              {bro.unlocked ? (
                showUpgrades ? (
                  <div className="upgrade-info">
                    <p className="upgrade-detail">
                      <b>Cost:</b> {formatNumber(getUpgradeCost(bro.level))}{" "}
                      <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
                    </p>
                    <p className="upgrade-detail">
                      <b>Capacity:</b> {formatNumber(getNextCapacity(bro.capacity))}
                    </p>
                    <p className="upgrade-detail">
                      <b>Yield:</b> {formatNumber(getNextYield(bro.yieldPerMin))} / min
                    </p>
                    <button
                      className="level-up-button"
                      onClick={() => levelUpBro(bro.id - 1)}
                      disabled={
                        playerData?.cheeseBalance && Number(playerData.cheeseBalance) < getUpgradeCost(bro.level)
                      }
                    >
                      Level Up
                    </button>
                  </div>
                ) : (
                  <button className="claim-button" onClick={() => claimBroCheese(bro.id - 1)}>
                    <span>
                      {formatNumber(pending)}/{formatNumber(bro.capacity)}
                    </span>
                    <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
                  </button>
                )
              ) : (
                <p className="locked-text">Unlock at LVL {bro.unlockLevel}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamBlock;
