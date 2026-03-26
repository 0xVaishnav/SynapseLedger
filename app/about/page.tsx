import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string; // optional image path in /public
  email?: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  {
    name: "Vaishnav Swami",
    role: "Lead & Blockchain Developer",
    bio: "Leads the blockchain and security layer for Synapse Ledger. Focused on verifiable shipment events, device identity and secure audit trails.",
    image: "/vs.png",
    email: "mailto:122vaishnav7020@sjcem.edu.in",
    linkedin: "https://www.linkedin.com/in/vaishnavswami/"
  },
  {
    name: "Omkar Poojary",
    role: "Embedded & IoT Systems Engineer",
    bio: "Designs Sentinel’s hardware, sensors and telemetry pipeline, ensuring reliable data capture, battery efficiency and field durability.",
    image: "/op.png",
    email: "mailto:122omkar7015@sjcem.edu.in",
    linkedin: "https://www.linkedin.com/in/pranjal-patil-718680368/"
  },
  {
    name: "Pranjal Patil",
    role: "Cloud Engineer",
    bio: "Develops the APIs, authentication and analytics for supply chain visibility and real-time operational intelligence.",
    image: "/pp.png",
    email: "mailto:122pranjal7052@sjcem.edu.in",
    linkedin: "https://www.linkedin.com/in/pathak-sanjeev07/"
  },
  {
    name: "Sanjeev Pathak",
    role: "Full Stack Developer, Operations & Business",
    bio: "Drives partnerships, business strategy, documentation and market research to align Sentinel with real-world logistics challenges.",
    image: "/sp.png",
    email: "mailto:122sanjeev7009@sjcem.edu.in",
    linkedin: "https://www.linkedin.com/in/sanjeev-pathak-123456/"
  }
];

export default function AboutPage() {
  return (
    <div className="space-y-10 pt-4">
      {/* Company intro */}
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-50">
          About Our Company
        </h1>
        <p className="max-w-3xl text-sm text-slate-300 md:text-base">
          We are a team of passionate innovators building{" "}
          <span className="font-semibold">Synapse Ledger: IoT Sentinel</span> — a
          blockchain-backed IoT Sentinel unit platform designed to make supply
          chains safer, more transparent, and fully trackable.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300">
            <p className="text-base font-semibold text-slate-100">Our Mission</p>
            <p className="mt-2 text-slate-400">
              Our mission is to empower logistics and supply-chain companies
              with real-time visibility into shipment integrity. Using IoT
              telemetry and blockchain verification, we aim to prevent loss,
              tampering and disputes through verifiable tracking and smart
              alerts.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300">
            <p className="text-base font-semibold text-slate-100">
              What we&apos;re building
            </p>
            <p className="mt-2 text-slate-400">
              IoT Sentinel units, upgrade kits and a cloud dashboard that
              connect containers, pallets and boxes directly to your ledger.
              Each event is linked to a cryptographic record, giving your
              operations team the confidence to act on trusted data.
            </p>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="space-y-5">
        <h2 className="text-2xl font-semibold text-slate-50">
          Meet the Team
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {team.map(member => (
            <article
              key={member.name}
              className="flex gap-5 rounded-3xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300"
            >
              {/* Avatar */}
              <div className="relative h-20 w-20 shrink-0">
                {member.image ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-700">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-lg font-semibold text-slate-200">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-50">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-synapseBlue">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xs text-slate-400 md:text-sm">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-300">
                  {member.email && (
                    <a
                      href={member.email}
                      className="inline-flex items-center gap-1 hover:text-white"
                    >
                      <span role="img" aria-label="email">
                        📧
                      </span>
                      <span>Email</span>
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-white"
                    >
                      <span role="img" aria-label="linkedin">
                        🔗
                      </span>
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
