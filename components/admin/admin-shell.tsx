"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { getAdminNavKey, type AdminNavKey } from "@/lib/admin-routes";
import { cn } from "@/lib/cn";

type AdminShellProps = {
  children: ReactNode;
  footer?: ReactNode;
  topBar?: ReactNode;
};

type SidebarItem = {
  href: string;
  icon: string;
  key: AdminNavKey;
  label: string;
};

const sidebarItems: SidebarItem[] = [
  { href: "/history", icon: "analytics", key: "analysis", label: "Analysis" },
  { href: "/connect", icon: "sync_alt", key: "connect", label: "Connect" },
  { href: "/settings", icon: "settings", key: "settings", label: "Settings" },
];

const utilityItems = [
  { href: "#", icon: "help_outline", label: "Help Center" },
  { href: "/login", icon: "logout", label: "Logout" },
];

function SidebarLink({ item, isActive }: { item: SidebarItem; isActive: boolean }) {
  return (
    <Link
      className={cn(
        "relative ml-2 flex items-center gap-3 rounded-xl px-6 py-3.5 font-body text-sm tracking-tight transition-all duration-200 active:scale-[0.98]",
        isActive
          ? "bg-stone-200/50 font-bold text-primary"
          : "text-stone-500 hover:bg-stone-200/60 hover:text-on-surface",
      )}
      href={item.href}
    >
      {isActive ? <span className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-full bg-primary-container" /> : null}
      <span
        className="material-symbols-outlined"
        style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
      >
        {item.icon}
      </span>
      {item.label}
    </Link>
  );
}

export function AdminShell({ children, footer, topBar }: AdminShellProps) {
  const pathname = usePathname();
  const activeKey = getAdminNavKey(pathname);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-surface text-on-surface antialiased">
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-stone-100 py-6">
          <div className="mb-10 px-6">
            <div className="font-headline text-lg font-black text-primary">Financial Atelier</div>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
              Premium Ledger
            </p>
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <SidebarLink item={item} isActive={activeKey === item.key} key={item.key} />
            ))}
          </nav>

          <div className="px-4 pb-6">
            <button className="btn-gradient bento-shadow w-full rounded-full py-3 text-sm font-bold text-white transition-transform active:scale-[0.98]">
              New Trade
            </button>
          </div>

          <div className="mt-auto bg-stone-100/70 px-2 pt-4">
            {utilityItems.map((item) => (
              <Link
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-body text-sm tracking-tight text-stone-500 transition-all duration-200 hover:bg-stone-200/60 hover:text-on-surface"
                href={item.href}
                key={item.label}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        {topBar ? <div className="fixed left-64 right-0 top-0 z-30">{topBar}</div> : null}

        <main className={cn("ml-64 min-h-screen bg-surface p-12", topBar ? "pt-28" : "")}>
          {children}
          {footer}
        </main>
      </div>
    </ProtectedRoute>
  );
}
