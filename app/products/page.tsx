const products = [
  {
    type: "Hardware Unit",
    badge: "Best for new deployments",
    name: "IoT Sentinel Core Unit",
    desc: "Standalone Sentinel device for containers and pallets. Includes GPS, weight sensor, temperature, and tamper detection.",
    price: "₹4,999"
  },
  {
    type: "Upgrade Kit",
    badge: "Great for existing fleets",
    name: "Legacy Box Upgrade Kit",
    desc: "Retrofit kit to upgrade existing supply-chain boxes with Sentinel capabilities. Ideal for fleets that already have standardized containers.",
    price: "₹1,449"
  },
  {
    type: "SaaS Subscription",
    badge: "Required for monitoring",
    name: "Sentinel Cloud Dashboard",
    desc: "Cloud dashboard access with device management, alert rules, blockchain audit trail, and API integration for ERP/TMS.",
    price: "From ₹999 / month"
  }
];

export default function ProductsPage() {
  return (
    <div className="space-y-10 pt-4">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-50">
          Sentinel Units &amp; Upgrade Options
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Choose between core Sentinel hardware, upgrade kits for existing
          boxes, and the cloud dashboard subscription. Use “Request Quote” during
          demos to show how companies might start a pilot.
        </p>
      </div>

      {/* product cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {products.map(p => (
          <div
            key={p.name}
            className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {p.type}
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-50">{p.name}</p>
            <div className="mt-2 inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-[11px] text-slate-200">
              {p.badge}
            </div>
            <p className="mt-3 text-xs text-slate-400 md:text-sm">{p.desc}</p>

            <div className="mt-4 border-t border-slate-800 pt-3 text-sm font-semibold text-slate-100">
              {p.price}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button className="flex-1 rounded-full bg-synapse-gradient px-4 py-2 text-xs font-semibold text-white shadow-md shadow-synapsePurple/40 transition hover:scale-[1.02]">
                Request Quote
              </button>
              <button className="flex-1 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-synapseBlue hover:text-white">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
