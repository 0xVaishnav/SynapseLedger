import Link from "next/link";

export function CTA() {
  return (
    <section className="mt-20 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-10 text-center md:px-10">
      <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
        Ready to pilot IoT Sentinel with Synapse Ledger?
      </h2>
      <p className="mt-3 text-sm text-slate-300 md:text-base">
        Use the Live Tracking demo to simulate Sentinel units, then explore the
        hardware and cloud dashboard options that fit your fleet.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className="rounded-full bg-synapse-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-synapsePurple/40 transition hover:scale-[1.03]"
        >
          Explore Sentinel Units
        </Link>
        <Link
          href="/live-tracking"
          className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-synapseBlue hover:text-white"
        >
          Open Live Demo
        </Link>
      </div>
    </section>
  );
}
