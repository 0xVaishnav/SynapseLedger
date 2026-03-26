"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts"
        });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };
    check();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found. Please install it.");
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const truncate = (addr: string) =>
    addr.slice(0, 6) + "..." + addr.slice(addr.length - 4);

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="rounded-full bg-synapse-gradient px-4 py-2 text-sm font-semibold text-white shadow-md shadow-synapsePurple/40 transition hover:scale-[1.02] hover:shadow-lg disabled:opacity-70"
    >
      {isConnecting
        ? "Connecting..."
        : account
        ? truncate(account)
        : "Connect Wallet"}
    </button>
  );
}
