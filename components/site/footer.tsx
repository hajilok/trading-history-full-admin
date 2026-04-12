import Link from "next/link";

const footerLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6 md:px-6">
      <div className="mx-auto flex max-w-shell flex-col gap-4 border-t border-stone-200/70 px-2 pt-6 text-sm text-on-surface-variant md:flex-row md:items-center md:justify-between">
        <div className="font-headline text-base font-bold text-on-surface">The Editorial Ledger</div>
        <div className="flex flex-wrap items-center gap-5">
          {footerLinks.map((item) => (
            <Link className="transition-colors hover:text-primary" href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>Copyright 2026 The Editorial Ledger. All rights reserved.</div>
      </div>
    </footer>
  );
}
