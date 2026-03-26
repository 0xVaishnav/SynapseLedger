export function WhySentinel() {
  const items = [
    {
      title: "IoT + Platform",
      body: "Plug Sentinel units into existing containers or upgrade your fleet boxes. All tracking, alerts and trends appear in one unified web dashboard."
    },
    {
      title: "Blockchain backed events",
      body: "Shipment seals, custody changes and tamper events are written to a blockchain ledger, giving you verifiable audit trails for compliance and disputes."
    },
    {
      title: "Telemetry in one view",
      body: "Track live weight, GPS position, temperature and battery on a single screen. Configure alert thresholds for sudden changes or unauthorized access."
    }
  ];

  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
        Why IoT Sentinel for your supply chain?
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(item => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300"
          >
            <p className="text-sm font-semibold text-slate-100">{item.title}</p>
            <p className="mt-2 text-xs text-slate-400 md:text-sm">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
