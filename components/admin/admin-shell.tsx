"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
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
  const router = useRouter();
  const { logout } = useAuth();
  const activeKey = getAdminNavKey(pathname);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isLoggingOut, startLogoutTransition] = useTransition();

  async function handleLogout() {
    setLogoutError(null);

    try {
      await logout();
      startLogoutTransition(() => {
        router.replace("/login");
      });
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : "We could not sign you out.");
    }
  }

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
            <div className="rounded-[1.5rem] bg-surface-container-low px-4 py-4 text-sm text-on-surface-variant">
              Trade ingestion is handled by the Openclaw webhook. Manual submit is unavailable in this build.
            </div>
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
            <button
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-body text-sm tracking-tight text-stone-500 transition-all duration-200 hover:bg-stone-200/60 hover:text-on-surface disabled:cursor-wait disabled:opacity-70"
              disabled={isLoggingOut}
              onClick={() => void handleLogout()}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              {isLoggingOut ? "Signing out..." : "Logout"}
            </button>
            {logoutError ? <p className="px-4 pt-2 text-xs text-primary">{logoutError}</p> : null}
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
