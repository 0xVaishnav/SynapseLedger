export function SupplyChainSteps() {
  const steps = [
    {
      step: "Step 1",
      title: "Buy or upgrade Sentinel units",
      body: "Choose between standalone Sentinel units or upgrade kits for existing containers. Each unit is pre-registered with a unique ID and optional blockchain address."
    },
    {
      step: "Step 2",
      title: "Link units to your account",
      body: "After purchase, link Sentinel IDs to your company account through the dashboard. Assign them to routes, shipments or SKUs for more granular tracking."
    },
    {
      step: "Step 3",
      title: "Monitor and act on alerts",
      body: "Monitor live telemetry and alerts from the Sentinel dashboard. Export reports or share blockchain proofs when shipment integrity is questioned."
    }
  ];

  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
        How the platform fits into your supply chain
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map(step => (
          <div
            key={step.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {step.step}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-100">
              {step.title}
            </p>
            <p className="mt-2 text-xs text-slate-400 md:text-sm">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
