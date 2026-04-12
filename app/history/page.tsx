import { ProtectedRoute } from "@/components/auth/protected-route";

const stats = [
  {
    label: "Total PnL",
    value: "$2.48M",
    detail: "Growth vs last month",
    accent: (
      <span className="flex items-center gap-1 text-sm font-bold text-secondary">
        <span className="material-symbols-outlined text-sm">trending_up</span>
        12.4%
      </span>
    ),
  },
  {
    label: "Balance",
    value: "$412.9M",
    detail: "Total settled trades (24h)",
  },
  {
    label: "Active Tokens",
    value: "1,284",
    detail: "API keys in execution",
    accent: <span className="ml-2 inline-block h-2 w-2 rounded-full bg-secondary align-middle" />,
  },
  {
    label: "Winrate",
    value: "99.98%",
    detail: "Valid submissions ratio",
  },
];

const trades = [
  {
    symbol: "ETH/USD",
    type: "BUY",
    typeClassName: "bg-secondary-container text-on-secondary-container",
    margin: "1,500 USDT",
    leverage: "20x",
    pnl: "+$420.50",
    pnlClassName: "text-secondary",
    status: "Success",
    statusDotClassName: "bg-secondary",
    statusTextClassName: "text-secondary",
  },
  {
    symbol: "SOL/USDT",
    type: "SELL",
    typeClassName: "bg-primary-fixed text-on-primary-fixed-variant",
    margin: "2,800 USDT",
    leverage: "10x",
    pnl: "-$125.20",
    pnlClassName: "text-primary",
    status: "Pending",
    statusDotClassName: "bg-amber-400",
    statusTextClassName: "text-amber-600",
  },
  {
    symbol: "BTC/USD",
    type: "BUY",
    typeClassName: "bg-secondary-container text-on-secondary-container",
    margin: "5,000 USDT",
    leverage: "50x",
    pnl: "+$1,280.00",
    pnlClassName: "text-secondary",
    status: "Success",
    statusDotClassName: "bg-secondary",
    statusTextClassName: "text-secondary",
  },
  {
    symbol: "AVAX/USD",
    type: "BUY",
    typeClassName: "bg-secondary-container text-on-secondary-container",
    margin: "800 USDT",
    leverage: "5x",
    pnl: "+$45.15",
    pnlClassName: "text-secondary",
    status: "Success",
    statusDotClassName: "bg-secondary",
    statusTextClassName: "text-secondary",
  },
];

function SidebarLink({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  if (active) {
    return (
      <a
        className="flex items-center gap-3 rounded-xl bg-stone-100 px-4 py-3 font-bold text-primary transition-all duration-150 active:scale-95"
        href="#"
      >
        <span className="material-symbols-outlined text-xl"> {icon}</span>
        <span className="text-sm">{label}</span>
        <span className="ml-auto h-10 w-1 rounded-full bg-primary-container" />
      </a>
    );
  }

  return (
    <a
      className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-stone-500 transition-colors duration-150 hover:bg-stone-200/50 active:scale-95"
      href="#"
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </a>
  );
}

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-surface text-on-surface">
        <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-stone-50 px-6 py-8">
          <div className="mb-10 px-2">
            <h1 className="text-2xl font-black tracking-editorial text-primary">The Ledger</h1>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              Premium Tier
            </p>
          </div>

          <nav className="flex-1 space-y-1">
            <SidebarLink active icon="insights" label="Analysis" />
            <SidebarLink icon="link" label="Connect" />
            <SidebarLink icon="settings" label="Settings" />
          </nav>

          <div className="mt-auto px-2">
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-surface-container-low p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white">
                <span className="material-symbols-outlined text-lg">person</span>
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-sm font-bold">Alexander Vance</p>
                <p className="truncate text-xs text-on-surface-variant">Lead Administrator</p>
              </div>
            </div>
            <button className="w-full rounded-full bg-surface-container-highest py-3 text-sm font-bold text-on-surface transition-colors duration-150 hover:bg-stone-200 active:scale-95">
              Export History
            </button>
          </div>
        </aside>

        <main className="ml-64 min-h-screen">
          <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between bg-white/70 px-12 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-8">
              <div className="group relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-64 rounded-full bg-surface-container-low py-2 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary-container focus:outline-none"
                  placeholder="Search accounts, assets..."
                  type="text"
                />
              </div>

              <nav className="hidden items-center gap-8 font-label text-sm font-medium tracking-wide lg:flex">
                <a className="text-stone-600 transition-all hover:text-primary-container" href="#">
                  Overview
                </a>
                <a className="border-b-2 border-primary-container pb-1 text-primary" href="#">
                  Calendar
                </a>
                <a className="text-stone-600 transition-all hover:text-primary-container" href="#">
                  Reports
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <button className="p-2 text-on-surface-variant transition-colors hover:text-primary">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-on-surface-variant transition-colors hover:text-primary">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] px-12 py-8">
            <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
                  System Control
                </p>
                <h2 className="font-headline text-4xl font-extrabold tracking-tight">Admin Overview</h2>
              </div>

              <div className="flex flex-wrap items-center gap-2 rounded-full bg-surface-container-lowest p-1 shadow-sm">
                <button className="rounded-full bg-surface-container-high px-5 py-2 text-sm font-semibold">
                  Last 30 Days
                </button>
                <button className="rounded-full px-5 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low">
                  Quarterly
                </button>
                <button className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                  Custom
                </button>
              </div>
            </div>

            <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  className="rounded-3xl bg-surface-container-lowest p-8 transition-all duration-200 hover:-translate-y-1"
                  key={stat.label}
                >
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    {stat.label}
                  </p>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="font-headline text-4xl font-black text-on-surface">{stat.value}</span>
                    {stat.accent ?? null}
                  </div>
                  <p className="text-xs font-medium text-on-surface-variant">{stat.detail}</p>
                </div>
              ))}
            </section>

            <section className="grid grid-cols-1 gap-8">
              <div className="w-full">
                <div className="overflow-hidden rounded-3xl bg-surface-container-lowest">
                  <div className="flex items-center justify-between bg-white/50 px-8 py-6">
                    <h3 className="font-headline text-xl font-bold">Global Trading History</h3>
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-surface-container p-2 transition-colors hover:bg-surface-container-high">
                        <span className="material-symbols-outlined text-lg">filter_list</span>
                      </button>
                      <button className="rounded-lg bg-surface-container p-2 transition-colors hover:bg-surface-container-high">
                        <span className="material-symbols-outlined text-lg">download</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-surface-container-low/50">
                          <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                            Symbol
                          </th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                            Type
                          </th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                            Margin
                          </th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                            Lev
                          </th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                            PnL
                          </th>
                          <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                            Status
                          </th>
                          <th className="px-8 py-4 text-right" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-low">
                        {trades.map((trade) => (
                          <tr
                            className="group transition-colors hover:bg-surface-bright"
                            key={`${trade.symbol}-${trade.margin}`}
                          >
                            <td className="px-8 py-6 text-sm font-bold">{trade.symbol}</td>
                            <td className="px-6 py-6">
                              <span
                                className={`rounded-full px-3 py-1 text-[10px] font-bold ${trade.typeClassName}`}
                              >
                                {trade.type}
                              </span>
                            </td>
                            <td className="px-6 py-6 text-sm font-medium text-on-surface-variant">
                              {trade.margin}
                            </td>
                            <td className="px-6 py-6 text-sm text-on-surface-variant">{trade.leverage}</td>
                            <td className={`px-6 py-6 text-sm font-bold ${trade.pnlClassName}`}>{trade.pnl}</td>
                            <td className="px-6 py-6">
                              <div className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${trade.statusDotClassName}`} />
                                <span className={`text-xs font-medium ${trade.statusTextClassName}`}>
                                  {trade.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <button className="rounded-full p-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-surface-container">
                                <span className="material-symbols-outlined text-lg">more_horiz</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between bg-white/30 px-8 py-6">
                    <span className="text-xs font-medium text-on-surface-variant">
                      Showing 1-10 of 2,482 transactions
                    </span>
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-surface-container px-4 py-2 text-xs font-bold transition-colors hover:bg-surface-container-low">
                        Previous
                      </button>
                      <button className="rounded-lg border border-surface-container px-4 py-2 text-xs font-bold transition-colors hover:bg-surface-container-low">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="px-12 pb-12">
            <div className="rounded-3xl bg-surface-container p-1">
              <div className="flex items-center gap-8 overflow-hidden rounded-[1.25rem] bg-surface-container-lowest p-6">
                <div className="shrink-0">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Global 24h Trend
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-2xl font-black text-secondary">+4.12%</span>
                    <span className="material-symbols-outlined text-secondary">show_chart</span>
                  </div>
                </div>

                <div className="relative h-12 flex-grow">
                  <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                    <defs>
                      <linearGradient id="gradient-teal" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0,106,98,0.2)" />
                        <stop offset="100%" stopColor="rgba(0,106,98,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q50,70 100,75 T200,60 T300,85 T400,40 T500,55 T600,20 T700,45 T800,10 T900,35 T1000,5"
                      fill="none"
                      stroke="#006a62"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <path
                      d="M0,80 Q50,70 100,75 T200,60 T300,85 T400,40 T500,55 T600,20 T700,45 T800,10 T900,35 T1000,5 L1000,100 L0,100 Z"
                      fill="url(#gradient-teal)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
