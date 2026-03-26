export function MapSection() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200 mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
        DEVICE / DEMO LOCATION
      </p>

      <p className="mb-3 text-slate-300">
        Current demonstration site: <br />
        <span className="font-semibold text-slate-100">
          St. John College of Engineering &amp; Management, Palghar
        </span>
      </p>

      <div className="overflow-hidden rounded-2xl border border-slate-700">
        <iframe
          title="St John College Palghar Map"
          width="100%"
          height="280"
          loading="lazy"
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.027497826017!2d72.75365047417908!3d19.696974231735675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71e0a54e07aff%3A0x3a69bbd1836dd69!2sSt.%20John%20College%20of%20Engineering%20and%20Management%2C%20Palghar!5e0!3m2!1sen!2sin!4v1707049999999"
        ></iframe>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        This represents the physical testing site for hardware integration
        (ESP32 + Relay + 12V Lock + Cloud sync).
      </p>
    </section>
  );
}
