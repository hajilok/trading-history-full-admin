import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTopBar } from "@/components/admin/admin-top-bar";

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

export default function HistoryPage() {
  return (
    <AdminShell
      topBar={
        <AdminTopBar
          navItems={[
            { href: "/history", label: "Overview" },
            { active: true, href: "/history", label: "Calendar" },
            { href: "/connect", label: "Connections" },
          ]}
        />
      }
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
              System Control
            </p>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight">Admin Overview</h1>
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
              className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_24px_60px_rgba(49,32,27,0.08)] transition-all duration-200 hover:-translate-y-1"
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
          <div className="overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-[0_28px_80px_rgba(49,32,27,0.08)]">
            <div className="flex items-center justify-between bg-white/50 px-8 py-6">
              <h2 className="font-headline text-xl font-bold">Global Trading History</h2>
              <div className="flex gap-2">
                <button className="rounded-xl bg-surface-container p-2 transition-colors hover:bg-surface-container-high">
                  <span className="material-symbols-outlined text-lg">filter_list</span>
                </button>
                <button className="rounded-xl bg-surface-container p-2 transition-colors hover:bg-surface-container-high">
                  <span className="material-symbols-outlined text-lg">download</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-low/60">
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
                    <tr className="group transition-colors hover:bg-surface-bright" key={`${trade.symbol}-${trade.margin}`}>
                      <td className="px-8 py-6 text-sm font-bold">{trade.symbol}</td>
                      <td className="px-6 py-6">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${trade.typeClassName}`}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-sm font-medium text-on-surface-variant">{trade.margin}</td>
                      <td className="px-6 py-6 text-sm text-on-surface-variant">{trade.leverage}</td>
                      <td className={`px-6 py-6 text-sm font-bold ${trade.pnlClassName}`}>{trade.pnl}</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${trade.statusDotClassName}`} />
                          <span className={`text-xs font-medium ${trade.statusTextClassName}`}>{trade.status}</span>
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
              <span className="text-xs font-medium text-on-surface-variant">Showing 1-10 of 2,482 transactions</span>
              <div className="flex gap-2">
                <button className="rounded-xl border border-surface-container px-4 py-2 text-xs font-bold transition-colors hover:bg-surface-container-low">
                  Previous
                </button>
                <button className="rounded-xl border border-surface-container px-4 py-2 text-xs font-bold transition-colors hover:bg-surface-container-low">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 rounded-[2rem] bg-surface-container p-1">
          <div className="flex items-center gap-8 overflow-hidden rounded-[1.5rem] bg-surface-container-lowest p-6">
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
    </AdminShell>
  );
}
