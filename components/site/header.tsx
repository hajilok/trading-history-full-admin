"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/submit", label: "Submit" },
  { href: "/profile", label: "Profile" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto max-w-shell rounded-[2rem] border border-white/60 bg-white/70 px-5 py-4 shadow-ambient backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link
              className="font-headline text-xl font-extrabold tracking-editorial text-primary md:text-2xl"
              href="/"
            >
              The Editorial Ledger
            </Link>
            <div className="flex items-center gap-2 md:hidden">
              <Button size="sm" variant="secondary">
                Login
              </Button>
              <Button size="sm">Logout</Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 md:gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    className={cn(
                      "rounded-capsule px-4 py-2 font-headline text-sm font-semibold tracking-tight transition-colors",
                      isActive
                        ? "bg-primary-fixed text-primary shadow-insetSoft"
                        : "text-on-surface-variant hover:text-on-surface",
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <Button size="sm" variant="secondary">
                Login
              </Button>
              <Button size="sm">Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
