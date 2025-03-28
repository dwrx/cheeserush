import React, { useState, useEffect, useCallback } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { WalletProvider, useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopPanel from "./components/TopPanel";
import MouseBlock from "./components/MouseBlock";
import TeamBlock from "./components/TeamBlock";
import InventoryBlock from "./components/InventoryBlock";
import Shop from "./components/Shop";
import Leaderboard from "./components/Leaderboard";
import NavMenu from "./components/NavMenu";
import CheeseRushIDL from "./assets/idl.json";
import "./styles/App.css";

const wallets = [new PhantomWalletAdapter()];

const App: React.FC = () => {
  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <Router>
          <Game />
        </Router>
      </WalletModalProvider>
    </WalletProvider>
  );
};

const Game: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, wallet, signTransaction, sendTransaction } = useWallet();
  const [playerData, setPlayerData] = useState<any>(null);

  const provider = React.useMemo(() => {
    if (!wallet || !connection) return null;
    return new AnchorProvider(connection, wallet as any, AnchorProvider.defaultOptions());
  }, [wallet, connection]);

  const program = React.useMemo(() => {
    if (!provider) return null;
    return new Program(CheeseRushIDL as Idl, provider);
  }, [provider]);

  const playerPda = React.useMemo(() => {
    if (!publicKey || !program) return null;
    return PublicKey.findProgramAddressSync([Buffer.from("player"), publicKey.toBuffer()], program.programId)[0];
  }, [publicKey, program]);

  const fetchPlayerData = useCallback(async () => {
    if (!program || !playerPda) return;
    try {
      // @ts-ignore
      const account = await program.account.player.fetch(playerPda);
      setPlayerData(account);
    } catch (e) {
      if (e instanceof Error && e.message.includes("Account does not exist")) {
        setPlayerData(null);
      } else {
        console.error("Error fetching player data:", e);
      }
    }
  }, [program, playerPda]);

  useEffect(() => {
    if (publicKey && wallet && program && playerPda) {
      fetchPlayerData();
    }
  }, [publicKey, wallet, program, playerPda, fetchPlayerData]);

  const createAccount = async () => {
    if (!program || !publicKey || !playerPda) return;
    try {
      const tx = await program.methods
        .initializePlayer(null)
        .accounts({
          player: playerPda,
          owner: publicKey,
        })
        .transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;
      const signedTx = await signTransaction!(tx);
      const txId = await sendTransaction(signedTx, connection);
      await connection.confirmTransaction(txId);
      await fetchPlayerData();
    } catch (e) {
      console.error("Error creating account:", e);
    }
  };

  const levelUp = async () => {
    if (!program || !playerPda || !publicKey) return;
    try {
      const tx = await program.methods
        .levelUpMouse()
        .accounts({
          player: playerPda,
          owner: publicKey,
        })
        .transaction();
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;
      const signedTx = await signTransaction!(tx);
      const txId = await sendTransaction(signedTx, connection);
      await connection.confirmTransaction(txId);
      await fetchPlayerData();
    } catch (error) {
      console.error("Error leveling up:", error);
    }
  };

  return (
    <div className="app-container">
      {!publicKey ? (
        <div className="connect-wallet">
          <WalletMultiButton />
          <div className="beta-alert">
            Cheese Rush is in early beta test on <b>Sonic Testnet v1</b>. You may need test SOL from Faucet{" "}
            <a href="https://faucet.sonic.game/" target="_blank" rel="noopener noreferrer">
              https://faucet.sonic.game/
            </a>{" "}
            to play.
          </div>
        </div>
      ) : (
        <>
          <TopPanel playerData={playerData} fetchPlayerData={fetchPlayerData} onLevelUp={levelUp} />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <MouseBlock
                      playerData={playerData}
                      playerPda={playerPda}
                      program={program}
                      fetchPlayerData={fetchPlayerData}
                      createAccount={createAccount}
                    />
                    <TeamBlock
                      playerData={playerData}
                      playerPda={playerPda}
                      program={program}
                      fetchPlayerData={fetchPlayerData}
                    />
                    <InventoryBlock
                      playerData={playerData}
                      playerPda={playerPda}
                      program={program}
                      fetchPlayerData={fetchPlayerData}
                    />
                  </>
                }
              />
              <Route path="/shop" element={<Shop playerData={playerData} />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
          <NavMenu />
        </>
      )}
    </div>
  );
};

export default App;
