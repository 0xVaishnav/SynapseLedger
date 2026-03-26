"use client";

import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative h-10 w-10">
        <Image
          src="/synapse-ledger-logo.png"
          alt="Synapse Ledger Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-[0.2em] text-slate-200">
          SYNAPSE
        </span>
        <span className="text-lg font-bold text-slate-50">LEDGER</span>
      </div>
    </Link>
  );
}
