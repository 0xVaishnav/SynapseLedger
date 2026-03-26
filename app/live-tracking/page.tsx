"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// -----------------------------
// CONTRACT + CONSTANTS
// -----------------------------

const UNIT_ID = "UNIT-01";

// Deployed UnitControl contract on Ganache (chainId 1337)
const CONTRACT_ADDRESS =
  "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";

// ABI from Remix
const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "unitId",
        type: "string",
      },
    ],
    name: "lockUnit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "unitId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "cmd",
        type: "string",
      },
    ],
    name: "UnitCommand",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "unitId",
        type: "string",
      },
    ],
    name: "unlockUnit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// AWS endpoints from .env.local
const AWS_SET_COMMAND_URL =
  process.env.NEXT_PUBLIC_AWS_SET_COMMAND_URL || "";
const AWS_GET_UNIT_STATE_URL =
  process.env.NEXT_PUBLIC_AWS_GET_UNIT_STATE_URL || "";

// -----------------------------
// HELPERS
// -----------------------------
function getUnitControlContract() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

function shortAddress(addr: string) {
  if (!addr) return "";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

// -----------------------------
// PAGE COMPONENT
// -----------------------------
export default function LiveTrackingPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("Idle");
  const [activity, setActivity] = useState<string[]>([]);
  const [txHash, setTxHash] = useState<string | null>(null);

  // live state from AWS
  const [bottleCount, setBottleCount] = useState<number>(0);
  const [tamperState, setTamperState] = useState<"OK" | "TAMPER">("OK");
  const [weightGrams, setWeightGrams] = useState<number>(0);

  // -----------------------------
  // ACTIVITY LOG HELPER
  // -----------------------------
  function pushActivity(message: string) {
    const ts = new Date().toLocaleTimeString();
    setActivity((prev) => {
      const next = [`[${ts}] ${message}`, ...prev];
      return next.slice(0, 40);
    });
  }

  // -----------------------------
  // WALLET
  // -----------------------------
  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("MetaMask not found. Please install MetaMask.");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const addr = accounts[0];
      setWalletAddress(addr);
      pushActivity(`Wallet connected: ${addr}`);
    } catch (err: any) {
      console.error(err);
      pushActivity("Wallet connection cancelled or failed.");
    }
  }

  async function disconnectWallet() {
    // We can only clear the dapp's local state; MetaMask connection
    // itself is controlled from the MetaMask UI.
    setWalletAddress(null);
    pushActivity("Wallet disconnected in dashboard.");

    try {
      if (window.ethereum?.request) {
        // Best-effort: some wallets may respond to this permissions call.
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
      }
    } catch (e) {
      console.warn("Wallet disconnect is mostly user-controlled:", e);
    }
  }

  async function copyAddress() {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      pushActivity("Wallet address copied to clipboard.");
    } catch (e) {
      console.warn("Clipboard copy failed", e);
    }
  }

  // auto-connect if already authorized
  useEffect(() => {
    async function checkAccounts() {
      if (!window.ethereum) return;
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (e) {
        console.warn("Could not read existing accounts");
      }
    }
    checkAccounts();
  }, []);

  // -----------------------------
  // AWS: send command (setUnitCommand)
  // -----------------------------
  async function sendCloudCommand(cmd: "UNLOCK" | "LOCK") {
    if (!AWS_SET_COMMAND_URL) {
      console.warn("AWS_SET_COMMAND_URL not configured");
      return;
    }

    const res = await fetch(AWS_SET_COMMAND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unit_id: UNIT_ID,
        cmd,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Cloud error: ${text}`);
    }
  }

  // -----------------------------
  // BLOCKCHAIN + CLOUD COMMAND
  // -----------------------------
  async function handleCommand(cmd: "UNLOCK" | "LOCK") {
    try {
      setIsSending(true);
      setStatus(`Preparing ${cmd.toLowerCase()} transaction…`);

      if (!window.ethereum) {
        alert("MetaMask not available");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const contract = getUnitControlContract();

      setStatus(`Waiting for MetaMask to confirm ${cmd.toLowerCase()}…`);
      const tx =
        cmd === "UNLOCK"
          ? await contract.unlockUnit(UNIT_ID)
          : await contract.lockUnit(UNIT_ID);

      setTxHash(tx.hash);
      pushActivity(
        `Transaction sent for ${cmd} (hash: ${tx.hash.slice(0, 10)}...)`
      );

      setStatus("Waiting for on-chain confirmation…");
      const receipt = await tx.wait();

      await sendCloudCommand(cmd);

      const msg = `On-chain ${cmd.toLowerCase()} for ${UNIT_ID} in block ${
        receipt.blockNumber
      }, synced to cloud.`;
      setStatus(msg);
      pushActivity(msg);
    } catch (err: any) {
      console.error(err);
      if (err?.code === "ACTION_REJECTED") {
        setStatus("User rejected transaction in MetaMask.");
        pushActivity("MetaMask transaction was rejected by user.");
      } else {
        setStatus(`Error: ${err.message || "Unknown error"}`);
        pushActivity(`Error sending ${cmd} command: ${err.message || err}`);
      }
    } finally {
      setIsSending(false);
    }
  }

  // -----------------------------
  // POLL UNIT STATE (AWS)
  // -----------------------------
  useEffect(() => {
    if (!AWS_GET_UNIT_STATE_URL) {
      console.warn("AWS_GET_UNIT_STATE_URL not configured");
      return;
    }

    let cancelled = false;

    async function fetchUnitState() {
      try {
        const url = `${AWS_GET_UNIT_STATE_URL}?unit_id=${UNIT_ID}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;

        if (typeof data.bottle_count === "number") {
          setBottleCount(data.bottle_count);
        }
        if (data.tamper_state === "TAMPER" || data.tamper_state === "OK") {
          setTamperState(data.tamper_state);
        }
        if (typeof data.weight_grams === "number") {
          setWeightGrams(data.weight_grams);
        }
      } catch (err) {
        console.warn("Error polling unit state:", err);
      }
    }

    fetchUnitState();
    const id = setInterval(fetchUnitState, 2500); // every 2.5s

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const tamperCount = tamperState === "TAMPER" ? 1 : 0;

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:px-6">
        {/* HEADER (no extra wallet button here, navbar handles that) */}
        <section>
          <p className="text-xs font-semibold tracking-wide text-indigo-400">
            Live demo · Synapse Ledger Sentinel Unit
          </p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
            Live Tracking Demo
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            This interface demonstrates end-to-end control of a Sentinel Unit in
            the Synapse Ledger ecosystem — using blockchain authorization,
            MetaMask signatures, Ganache transactions, cloud synchronization,
            real-time weight sensing, tamper detection and NFC-based bottle
            inventory.
          </p>
        </section>

        {/* MAIN GRID: LEFT = CONTROL+STATUS+WALLET, RIGHT = SNAPSHOT+MAP+INSIGHT+LOG */}
        <section className="grid gap-6 lg:grid-cols-[340px,1fr]">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* Unit Control */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl shadow-black/50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Unit Control
              </p>
              <p className="mt-2 text-lg font-semibold">
                Sentinel Unit:{" "}
                <span className="text-indigo-300">{UNIT_ID}</span>
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Control the lock state of the Synapse Ledger Sentinel Unit via
                on-chain transactions and synchronized cloud commands.
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleCommand("UNLOCK")}
                  disabled={isSending}
                  className="flex-1 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/30 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Unlock Unit
                </button>
                <button
                  onClick={() => handleCommand("LOCK")}
                  disabled={isSending}
                  className="flex-1 rounded-full border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Lock Unit
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Pipeline
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  Wallet signature → UnitControl smart contract (Ganache) →
                  blockchain event log → cloud sync (AWS) → Sentinel hardware
                  (ESP32 + PN532 + HX711 + reed + relay) → solenoid unit lock &
                  live telemetry back to dashboard.
                </p>
              </div>

              {/* Wallet section (merged UX, no extra header button) */}
              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-[11px] text-slate-400">
                <p className="font-semibold text-slate-300">Wallet</p>

                {walletAddress ? (
                  <>
                    <p className="mt-1 text-slate-300">
                      Connected:{" "}
                      <span className="font-mono text-indigo-300">
                        {shortAddress(walletAddress)}
                      </span>
                    </p>
                    <p className="mt-1 break-all text-slate-500">
                      {walletAddress}
                    </p>

                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={copyAddress}
                        className="flex-1 rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-100 hover:bg-slate-700"
                      >
                        Copy
                      </button>
                      <button
                        onClick={disconnectWallet}
                        className="flex-1 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-rose-300 hover:bg-rose-950/60"
                      >
                        Disconnect
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="mt-2 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-slate-700"
                  >
                    Connect MetaMask
                  </button>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Status
                </p>
                <span className="flex items-center gap-2 text-[11px] text-emerald-200">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                  </span>
                  <span>Live</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-200">{status}</p>
              {txHash && (
                <p className="mt-1 break-all text-[11px] text-slate-400">
                  Last tx: <span className="text-slate-300">{txHash}</span>
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {/* Snapshot */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl shadow-black/50">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wide text-slate-200">
                  Sentinel Fleet Snapshot
                </h2>
                <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-0.5 text-[11px] font-medium text-indigo-300">
                  Live data
                </span>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-950/80 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                    Active Drug Bottles
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{bottleCount}</p>
                </div>

                <div className="rounded-2xl bg-slate-950/80 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                    Tamper Alerts
                  </p>
                  <p
                    className={`mt-2 text-3xl font-semibold ${
                      tamperState === "TAMPER" ? "text-rose-400" : ""
                    }`}
                  >
                    {tamperCount}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    State:{" "}
                    <span
                      className={
                        tamperState === "TAMPER"
                          ? "text-rose-300"
                          : "text-emerald-300"
                      }
                    >
                      {tamperState === "TAMPER" ? "TAMPER" : "OK"}
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950/80 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                    Live Unit Load
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <p className="text-3xl font-semibold">
                      {weightGrams.toFixed(1)}
                    </p>
                    <span className="text-sm text-slate-400">g</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Updated every few seconds from HX711 load cell.
                  </p>
                </div>
              </div>
            </div>

            {/* Map + Insights + Activity */}
            <div className="space-y-4">
              {/* Map */}
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Live Location (Demo)
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  St. John College of Engineering, Palghar — reference location
                  for this Sentinel unit.
                </p>
                <div className="mt-3 overflow-hidden rounded-2xl border border-slate-800">
                  <iframe
                    title="Unit Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.782987378512!2d72.74651881537353!3d19.693701986744265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be70eccf2cea9fb%3A0x4a6985572ede1620!2sSt.%20John%20College%20of%20Engineering%20and%20Management!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height={230}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Insight + Activity side by side */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Live Device Insight
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                    <li>
                      • Blockchain authorization ensures cryptographic control
                      of unit lock state.
                    </li>
                    <li>
                      • NFC (PN532) tracks dual-use chemical bottles for
                      real-time inventory.
                    </li>
                    <li>
                      • HX711 5kg load cell streams live weight for anomaly
                      detection.
                    </li>
                    <li>
                      • Reed-switch based tamper channel alerts when the unit is
                      opened under lock.
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Activity Log
                  </p>
                  <div className="mt-2 h-32 overflow-y-auto rounded-2xl bg-slate-950/80 px-3 py-2 text-[11px] text-slate-300">
                    {activity.length === 0 ? (
                      <p className="text-slate-500">
                        No recent activity yet. Interact with the unit to see
                        events here.
                      </p>
                    ) : (
                      <ul className="space-y-1">
                        {activity.map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
