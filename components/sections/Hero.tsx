"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="grid gap-10 pt-6 md:grid-cols-[1.1fr,0.9fr] md:items-center">
      {/* LEFT: headline + CTAs */}
      <div className="space-y-6">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-slate-700/80">
          Blockchain · IoT · Supply Chain
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Turn your supply chain
          <br />
          into a{" "}
          <span className="gradient-text">verifiable, monitored network.</span>
        </h1>

        <p className="max-w-xl text-sm text-slate-300 md:text-base">
          Synapse Ledger: IoT Sentinel connects containers, locks and sensors
          directly to cryptographic events. Track integrity, react to alerts and
          prove what really happened in transit.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/products"
            className="rounded-full bg-synapse-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-synapsePurple/40 transition hover:scale-[1.02]"
          >
            Explore our Sentinel Units
          </Link>
          <Link
            href="/live-tracking"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-synapseBlue hover:text-white"
          >
            Launch Live Tracking
          </Link>
        </div>

        <p className="text-xs text-slate-400">
          Ideal for logistics, cold-chain and high-value goods partners.
        </p>
      </div>

      {/* RIGHT: animated “Synapse topology” card instead of Fleet Snapshot */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-synapse-gradient opacity-40 blur-3xl" />

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-synapsePurple/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              SYNAPSE FLOW MAP
            </p>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-300">
              End-to-end pipeline
            </span>
          </div>

          {/* vertical flow */}
          <div className="mt-5 space-y-4 text-xs text-slate-200 md:text-sm">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 ring-2 ring-synapseBlue">
                💳
              </div>
              <div>
                <p className="font-semibold text-slate-50">Wallet &amp; Apps</p>
                <p className="text-slate-400">
                  Users approve actions in MetaMask, dApps or internal tools.
                </p>
              </div>
            </div>

            <div className="ml-3 h-6 w-px bg-slate-700" />

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 ring-2 ring-synapsePurple">
                ☁️
              </div>
              <div>
                <p className="font-semibold text-slate-50">Synapse Cloud</p>
                <p className="text-slate-400">
                  AWS APIs validate intent, log events and dispatch commands to
                  Sentinel units.
                </p>
              </div>
            </div>

            <div className="ml-3 h-6 w-px bg-slate-700" />

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 ring-2 ring-emerald-500">
                📦
              </div>
              <div>
                <p className="font-semibold text-slate-50">
                  IoT Sentinel Hardware
                </p>
                <p className="text-slate-400">
                  ESP32 nodes, sensors and 12V locks react to approved commands
                  and stream telemetry.
                </p>
              </div>
            </div>

            <div className="ml-3 h-6 w-px bg-slate-700" />

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 ring-2 ring-cyan-400">
                ⛓️
              </div>
              <div>
                <p className="font-semibold text-slate-50">Blockchain Ledger</p>
                <p className="text-slate-400">
                  Critical events are anchored on-chain for verifiable history
                  and dispute resolution.
                </p>
              </div>
            </div>
          </div>

          {/* mini code-like strip */}
          
        </div>
      </div>
    </section>
  );
}
