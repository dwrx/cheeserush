import React from "react";
import { Buffer } from "buffer";
import ReactDOM from "react-dom/client";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "./index.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import App from "./App";

window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ConnectionProvider endpoint="https://api.testnet.sonic.game">
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);
