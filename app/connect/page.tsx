import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTopBar } from "@/components/admin/admin-top-bar";

const tokens = [
  {
    created: "Apr 11, 2026",
    label: "Terminal Hub v2",
    lastUsed: "3 mins ago",
    scope: "Read / Write",
    status: "Live",
  },
  {
    created: "Apr 08, 2026",
    label: "Python Script Alpha",
    lastUsed: "42 mins ago",
    scope: "Read Only",
    status: "Live",
  },
  {
    created: "Apr 03, 2026",
    label: "Dev Environment",
    lastUsed: "Yesterday",
    scope: "Sandbox",
    status: "Idle",
  },
];

const systemLinks = [
  { href: "#", label: "Developer Docs" },
  { href: "#", label: "Status" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Privacy" },
];

export default function ConnectPage() {
  return (
    <AdminShell
      topBar={
        <AdminTopBar
          navItems={[
            { href: "/history", label: "Analysis" },
            { active: true, href: "/connect", label: "Connect" },
            { href: "/settings", label: "Settings" },
          ]}
        />
      }
    >
      <div className="mx-auto max-w-[1600px]">
        <section className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-on-surface-variant">
              Secure Distribution Layer
            </p>
            <h1 className="font-headline text-4xl font-black tracking-tight text-primary md:text-6xl">
              Connect &amp; API Access
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-on-surface-variant">
              Manage your secure entry points to the financial data atelier. Generate controlled access,
              share credentials with your internal tools, and keep token activity readable at a glance.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start rounded-full bg-surface-container-lowest px-5 py-3 shadow-[0_18px_45px_rgba(49,32,27,0.08)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
              <span className="material-symbols-outlined text-3xl">person</span>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">Alexander Vance</p>
              <p className="text-xs uppercase tracking-[0.24em] text-on-surface-variant">Lead Administrator</p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.05fr_1.4fr]">
          <div className="space-y-8">
            <div className="rounded-[2.5rem] bg-surface-container p-4 shadow-[0_28px_80px_rgba(49,32,27,0.08)]">
              <div className="rounded-[2rem] bg-surface-container-lowest p-8 md:p-10">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                      Token Atelier
                    </p>
                    <h2 className="mt-3 font-headline text-3xl font-black text-on-surface">Generate New Token</h2>
                  </div>
                  <div className="rounded-full bg-primary-container/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                    Mock Flow
                  </div>
                </div>

                <label className="block text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                  Token Name
                  <input
                    className="ghost-input mt-3 w-full rounded-[1.5rem] px-5 py-4 text-sm font-medium text-on-surface"
                    defaultValue="Data Bridge / Internal Use"
                    type="text"
                  />
                </label>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-surface-container-low px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                      Scope
                    </p>
                    <p className="mt-2 text-sm font-semibold text-on-surface">Read / Write</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-surface-container-low px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                      Expiration
                    </p>
                    <p className="mt-2 text-sm font-semibold text-on-surface">90 Days</p>
                  </div>
                </div>

                <button className="btn-gradient mt-8 w-full rounded-full px-6 py-4 text-sm font-bold text-white transition-transform active:scale-[0.99]">
                  Generate Token
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] bg-[#1c1815] text-white shadow-[0_28px_80px_rgba(28,24,21,0.24)]">
              <div className="bg-[radial-gradient(circle_at_top_left,rgba(255,138,117,0.28),transparent_45%)] p-8 md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/60">Quick Start</p>
                <h2 className="mt-3 font-headline text-3xl font-black">Secure launch notes for your next client.</h2>
                <div className="mt-8 rounded-[1.75rem] bg-white/8 p-5 font-mono text-sm leading-7 text-white/85 backdrop-blur">
                  <p>Authorization: Bearer sk_live_xxxxxxx</p>
                  <p>Base URL: https://api.theledger.test/v1</p>
                  <p>Environment: Production Sandbox</p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1c1815] transition-transform active:scale-[0.99]"
                    href="/settings"
                  >
                    View Documentation
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                  <p className="text-sm leading-7 text-white/65">
                    Use the generated token inside dashboards, trading bots, and reporting notebooks.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-surface-container p-4 shadow-[0_28px_80px_rgba(49,32,27,0.08)]">
            <div className="rounded-[2rem] bg-surface-container-lowest">
              <div className="flex flex-col gap-4 px-8 py-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Connect Registry
                  </p>
                  <h2 className="mt-3 font-headline text-3xl font-black text-on-surface">Active Tokens</h2>
                </div>
                <div className="inline-flex items-center gap-3 self-start rounded-full bg-secondary-container px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  3 Active Keys
                </div>
              </div>

              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full min-w-[720px] border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface-variant">
                        Token
                      </th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface-variant">
                        Scope
                      </th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface-variant">
                        Created
                      </th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface-variant">
                        Last Used
                      </th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface-variant">
                        Status
                      </th>
                      <th className="px-4 py-4 text-right text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface-variant">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token) => (
                      <tr key={token.label}>
                        <td className="border-t border-surface-container-low px-4 py-5">
                          <div>
                            <p className="text-sm font-bold text-on-surface">{token.label}</p>
                            <p className="mt-1 text-xs text-on-surface-variant">Internal distribution channel</p>
                          </div>
                        </td>
                        <td className="border-t border-surface-container-low px-4 py-5 text-sm font-medium text-on-surface-variant">
                          {token.scope}
                        </td>
                        <td className="border-t border-surface-container-low px-4 py-5 text-sm font-medium text-on-surface-variant">
                          {token.created}
                        </td>
                        <td className="border-t border-surface-container-low px-4 py-5 text-sm font-medium text-on-surface-variant">
                          {token.lastUsed}
                        </td>
                        <td className="border-t border-surface-container-low px-4 py-5">
                          <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface">
                            <span
                              className={`h-2 w-2 rounded-full ${token.status === "Live" ? "bg-secondary" : "bg-amber-400"}`}
                            />
                            {token.status}
                          </span>
                        </td>
                        <td className="border-t border-surface-container-low px-4 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button className="rounded-full bg-surface-container-low p-2 text-on-surface-variant transition-colors hover:text-primary">
                              <span className="material-symbols-outlined text-lg">content_copy</span>
                            </button>
                            <button className="rounded-full bg-surface-container-low p-2 text-on-surface-variant transition-colors hover:text-primary">
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-4 pb-4">
                <div className="rounded-[1.75rem] bg-surface-container px-6 py-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                        API Uptime
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="font-headline text-2xl font-black text-secondary">99.98%</span>
                        <span className="text-sm font-medium text-on-surface-variant">Stable across all gateways</span>
                      </div>
                    </div>
                    <div className="relative h-14 w-full max-w-[440px] overflow-hidden rounded-full bg-surface-container-low md:w-[440px]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,138,117,0.22),transparent_32%),radial-gradient(circle_at_70%_35%,rgba(0,106,98,0.18),transparent_28%)]" />
                      <svg className="relative h-full w-full" preserveAspectRatio="none" viewBox="0 0 440 56">
                        <path
                          d="M0 39 C40 34, 72 18, 110 20 C150 22, 182 40, 220 36 C262 32, 300 12, 340 18 C380 24, 405 10, 440 16"
                          fill="none"
                          stroke="#ff7a59"
                          strokeLinecap="round"
                          strokeWidth="3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-4 px-2 pb-4 text-sm text-on-surface-variant md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 The Ledger. Secure access orchestration for the admin atelier.</p>
          <div className="flex flex-wrap gap-5">
            {systemLinks.map((item) => (
              <Link className="transition-colors hover:text-primary" href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </AdminShell>
  );
}
