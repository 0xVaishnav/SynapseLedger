import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Synapse Ledger",
  description: "IoT-native blockchain access control and live hardware tracking."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
