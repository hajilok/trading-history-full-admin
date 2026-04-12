"use client";

import Link from "next/link";

import { useAuth } from "@/components/auth/auth-provider";
import { cn } from "@/lib/cn";

type AdminTopBarProps = {
  navItems?: Array<{
    active?: boolean;
    href?: string;
    label: string;
  }>;
  profileName?: string;
  profileRole?: string;
  showSearch?: boolean;
  title?: string;
};

export function AdminTopBar({
  navItems = [],
  profileName,
  profileRole,
  showSearch = true,
  title,
}: AdminTopBarProps) {
  const { user } = useAuth();
  const resolvedProfileName = profileName || user?.name;
  const resolvedProfileRole = profileRole || user?.role;

  return (
    <header className="flex h-20 items-center justify-between bg-stone-50/70 px-8 shadow-sm backdrop-blur-xl">
      <div className="flex items-center gap-6">
        {showSearch ? (
          <div className="group relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
              search
            </span>
            <input
              className="w-64 rounded-full bg-surface-container-low py-2 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
              placeholder="Search accounts, assets..."
              type="text"
            />
          </div>
        ) : null}

        {title ? <h2 className="font-headline text-xl font-bold tracking-tight text-on-surface">{title}</h2> : null}

        {navItems.length ? (
          <nav className="hidden items-center gap-8 font-label text-sm font-medium tracking-wide lg:flex">
            {navItems.map((item) => (
              item.href ? (
                <Link
                  className={cn(
                    "transition-all",
                    item.active
                      ? "border-b-2 border-primary-container pb-1 text-primary"
                      : "text-stone-600 hover:text-primary-container",
                  )}
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "transition-all",
                    item.active
                      ? "border-b-2 border-primary-container pb-1 text-primary"
                      : "text-stone-600",
                  )}
                  key={item.label}
                >
                  {item.label}
                </span>
              )
            ))}
          </nav>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-stone-200/50 hover:text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        {resolvedProfileName ? (
          <div className="flex items-center gap-2 pl-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(181,35,48,0.88))] text-white shadow-[0_10px_24px_rgba(181,35,48,0.18)]">
              <span className="material-symbols-outlined text-base">person</span>
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-on-surface">{resolvedProfileName}</span>
              {resolvedProfileRole ? (
                <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                  {resolvedProfileRole}
                </span>
              ) : null}
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_more</span>
          </div>
        ) : (
          <button className="p-2 text-on-surface-variant transition-colors hover:text-primary">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        )}
      </div>
    </header>
  );
}
