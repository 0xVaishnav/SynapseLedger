"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is an IoT Sentinel unit?",
    a: "An IoT Sentinel unit is a hardware device that mounts to containers or pallets and streams telemetry such as GPS, weight, temperature and tamper events to the Synapse Ledger platform."
  },
  {
    q: "Do I have to buy new containers?",
    a: "No. You can either deploy standalone Sentinel units or use upgrade kits that retrofit your existing containers and fleet boxes."
  },
  {
    q: "Where does blockchain come in?",
    a: "Critical events like seal breaks, custody changes and tamper alerts are anchored to a blockchain ledger. This creates verifiable audit trails you can share with partners or regulators."
  },
  {
    q: "Is this the final production platform?",
    a: "This is an R&D prototype that demonstrates end-to-end flows: from IoT hardware and cloud dashboards to blockchain logging. The architecture is designed to evolve into a production-grade platform."
  },
  {
    q: "Who would typically use IoT Sentinel?",
    a: "Logistics providers, cold-chain operators, high-value goods shippers and any organization that needs strong guarantees around shipment integrity."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-6 pt-4">
      <h1 className="text-3xl font-semibold text-slate-50">
        Frequently Asked Questions
      </h1>

      <div className="space-y-3">
        {faqs.map((item, idx) => {
          const open = openIndex === idx;
          return (
            <button
              key={item.q}
              onClick={() => setOpenIndex(open ? null : idx)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 text-left text-sm text-slate-200 transition hover:border-synapseBlue/70"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium">{item.q}</span>
                <span className="text-lg text-slate-500">
                  {open ? "▾" : "▸"}
                </span>
              </div>
              {open && (
                <p className="mt-2 text-xs text-slate-400 md:text-sm">
                  {item.a}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
