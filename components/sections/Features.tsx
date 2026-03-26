export function Features() {
  const items = [
    {
      title: "Ledger-Synced Locks",
      desc: "Every unlock is backed by a transaction or signed command, so your hardware follows your on-chain rules."
    },
    {
      title: "IoT-Native Architecture",
      desc: "ESP32 Wrover, NFC readers, LTE modems and relays wired into a secure access pipeline."
    },
    {
      title: "Cloud Orchestrated",
      desc: "AWS-backed APIs route approved commands to devices in real time with observability built in."
    }
  ];

  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
        Why Synapse&nbsp;Ledger?
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map(item => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-300"
          >
            <p className="text-sm font-semibold text-slate-100">
              {item.title}
            </p>
            <p className="mt-2 text-xs text-slate-400 md:text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
