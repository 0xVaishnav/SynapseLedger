"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { WalletButton } from "./WalletButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/live-tracking", label: "Live Tracking" }
];


export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Logo />

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-5 text-sm font-medium text-slate-300 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white ${
                  pathname === link.href ? "text-white" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <WalletButton />
        </div>
      </nav>
    </header>
  );
}
