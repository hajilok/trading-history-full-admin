"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAdminPath } from "@/lib/admin-routes";

const footerLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "API Documentation" },
  { href: "#", label: "System Status" },
];

export function Footer() {
  const pathname = usePathname();

  if (isAdminPath(pathname)) {
    return null;
  }

  return (
    <footer className="mt-auto w-full bg-surface-container-low px-8 py-16 md:px-24">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="font-headline text-lg font-black text-on-surface">The Editorial Ledger</div>
          <p className="max-w-xs text-center font-body text-xs uppercase tracking-[0.28em] text-stone-400 md:text-left">
            Copyright 2026 The Editorial Ledger. High-end financial journaling.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {footerLinks.map((item) => (
            <Link
              className="font-body text-xs uppercase tracking-[0.28em] text-stone-400 opacity-70 transition hover:text-primary hover:opacity-100"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
