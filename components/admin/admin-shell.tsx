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
  { href: "/history", icon: "monitoring", key: "analysis", label: "Analysis" },
  { href: "/connect", icon: "link", key: "connect", label: "Connect" },
  { href: "/settings", icon: "settings", key: "settings", label: "Settings" },
];

function SidebarLink({ item, isActive }: { item: SidebarItem; isActive: boolean }) {
  return (
    <Link
      className={cn(
        "ml-2 flex items-center gap-3 rounded-xl px-8 py-3 font-body text-sm font-semibold uppercase tracking-widest transition-all duration-200 active:scale-[0.98]",
        isActive
          ? "translate-x-1 bg-white text-primary shadow-ambient"
          : "text-stone-500 hover:bg-white/50 hover:text-primary-container",
      )}
      href={item.href}
    >
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
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col bg-surface-container-low py-8 pr-4">
          <div className="brand-font mb-8 px-8 text-2xl font-extrabold tracking-editorial text-primary">
            The Ledger
          </div>

          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => (
              <SidebarLink item={item} isActive={activeKey === item.key} key={item.key} />
            ))}
          </nav>

          <div className="mt-auto px-8">
            <button className="btn-gradient bento-shadow w-full rounded-full py-4 text-sm font-bold text-white transition-transform active:scale-[0.98]">
              Upgrade Plan
            </button>
          </div>
        </aside>

        <main className="ml-72 min-h-screen p-12">
          {topBar}
          {children}
          {footer}
        </main>
      </div>
    </ProtectedRoute>
  );
}
