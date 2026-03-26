"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true); // demo only
  };

  return (
    <div className="space-y-8 pt-4">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-50">Contact Us</h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Share feedback, questions, or collaboration ideas around the IoT
          Sentinel platform and Synapse Ledger. This form is a front-end demo
          and simulates a send action.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-200"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-slate-400">Name</label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-synapseBlue"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">
              Work email
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-synapseBlue"
              placeholder="you@company.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-400">
            Company / Organization
          </label>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-synapseBlue"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-400">Message</label>
          <textarea
            className="min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-synapseBlue"
            placeholder="Tell us what you want to explore, clarify, or build with Sentinel."
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-synapse-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-synapsePurple/40 transition hover:scale-[1.02]"
        >
          {sent ? "Message sent" : "Send message"}
        </button>
      </form>
    </div>
  );
}
