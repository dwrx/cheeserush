import React, { useState, useEffect } from "react";
import mouseImage from "../assets/mouse.png";
import cheeseIcon from "../assets/cheese.png";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import "../styles/MouseBlock.css";

const MouseBlock: React.FC<{
  playerData: any;
  playerPda: PublicKey | null;
  program: Program | null;
  fetchPlayerData: () => Promise<void>;
  createAccount: () => Promise<void>;
}> = ({ playerData, playerPda, program, fetchPlayerData, createAccount }) => {
  const { publicKey, sendTransaction } = useWallet();
  const [state, setState] = useState<"idle" | "rushing" | "done">("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!playerData || !playerData.lastRushStart) {
      setState("idle");
      setTimeLeft(0);
      return;
    }

    const now = Date.now() / 1000;
    const rushEnd = Number(playerData.lastRushStart) + playerData.rushDuration;
    if (now < rushEnd) {
      setState("rushing");
      setTimeLeft(Math.max(0, Math.floor(rushEnd - now)));
    } else if (playerData.lastRushStart > 0) {
      setState("done");
      setTimeLeft(0);
    } else {
      setState("idle");
      setTimeLeft(0);
    }
  }, [playerData]);

  useEffect(() => {
    if (state === "rushing" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setState("done");
            fetchPlayerData();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state, timeLeft]);

  const startRush = async () => {
    if (!program || !playerPda || !publicKey) return;
    setIsLoading(true);
    try {
      const tx = await program.methods
        .startRush()
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
    } catch (error) {
      console.error("Error starting rush:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const collectCheese = async () => {
    if (!program || !playerPda || !publicKey) return;
    setIsLoading(true);
    try {
      const tx = await program.methods
        .claimRush()
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
    } catch (error) {
      console.error("Error claiming cheese:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reward = playerData
    ? Math.round(10 * Math.floor(playerData.rushDuration / 15) * (1 + playerData.mouseLevel * 0.1))
    : 0;

  return (
    <div className="mouse-block">
      <img src={mouseImage} alt="Mouse" className="mouse-image" />
      {playerData === null ? (
        <button className="rush-button" onClick={createAccount}>
          Create Account
        </button>
      ) : state === "idle" ? (
        <button className="rush-button" onClick={startRush} disabled={isLoading}>
          {isLoading ? <div className="spinner small" /> : "Rush!"}
        </button>
      ) : state === "rushing" && timeLeft > 0 ? (
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(timeLeft / playerData.rushDuration) * 100}%` }}></div>
            <span className="progress-text">{timeLeft}s</span>
          </div>
          <span className="reward-text">
            Reward: {reward} <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
          </span>
        </div>
      ) : (
        <button className="collect-button" onClick={collectCheese} disabled={isLoading}>
          {isLoading ? (
            <div className="spinner small" />
          ) : (
            <>
              Collect {reward} <img src={cheeseIcon} alt="Cheese" className="cheese-icon" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default MouseBlock;
