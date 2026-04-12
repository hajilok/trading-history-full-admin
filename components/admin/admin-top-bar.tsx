import Link from "next/link";

import { cn } from "@/lib/cn";

type AdminTopBarProps = {
  navItems?: Array<{
    active?: boolean;
    href?: string;
    label: string;
  }>;
  profileName?: string;
  showSearch?: boolean;
  title?: string;
};

export function AdminTopBar({
  navItems = [],
  profileName,
  showSearch = true,
  title,
}: AdminTopBarProps) {
  return (
    <header className="-mx-12 -mt-12 mb-10 flex h-20 w-[calc(100%+6rem)] items-center justify-between bg-white/70 px-12 shadow-sm backdrop-blur-xl">
      <div className="flex items-center gap-8">
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

        {title ? <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">{title}</h2> : null}

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

      <div className="flex items-center gap-6">
        <button className="p-2 text-on-surface-variant transition-colors hover:text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        {profileName ? (
          <div className="flex items-center gap-3 rounded-full bg-surface-container-low px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined text-lg">person</span>
            </div>
            <span className="text-sm font-semibold text-on-surface">{profileName}</span>
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
