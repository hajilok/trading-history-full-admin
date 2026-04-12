const trades = [
  {
    ticker: "NVDA",
    position: "Long",
    date: "12 Apr 2026",
    note: "Momentum continuation after earnings expansion.",
    pnl: "+$3,280.00",
    value: "$42,180",
    positionTone: "bg-secondary-fixed text-secondary",
    pnlTone: "text-secondary",
  },
  {
    ticker: "TSLA",
    position: "Short",
    date: "10 Apr 2026",
    note: "Fade trade on overextended intraday move.",
    pnl: "-$940.00",
    value: "$18,420",
    positionTone: "bg-primary-fixed text-primary",
    pnlTone: "text-primary",
  },
  {
    ticker: "AAPL",
    position: "Long",
    date: "08 Apr 2026",
    note: "Swing position managed with staged exits.",
    pnl: "+$1,860.00",
    value: "$27,950",
    positionTone: "bg-secondary-fixed text-secondary",
    pnlTone: "text-secondary",
  },
];

const ribbonHeights = ["48%", "38%", "58%", "62%", "76%", "70%", "88%", "100%"];

export default function HistoryPage() {
  return (
    <main className="px-6 pb-16 pt-28 md:px-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        <section className="rounded-[2rem] bg-surface-container-low p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-primary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-[0.28em] text-on-primary-fixed">
                Editorial Dashboard
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
                  Net Profit
                </p>
                <h1 className="mt-3 font-headline text-5xl font-extrabold tracking-editorial text-on-surface md:text-6xl">
                  $18,640.45
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-on-surface-variant md:text-lg">
                  A calmer, paper-layered review of your open and closed positions, with emphasis on
                  portfolio shape instead of dense grids.
                </p>
              </div>
            </div>

            <div className="bento-shadow rounded-[2rem] bg-surface-container-lowest p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
                    Performance Ribbon
                  </p>
                  <p className="mt-2 text-sm text-on-surface-variant">
                    Equity growth across your recent journal window.
                  </p>
                </div>
                <span className="rounded-full bg-secondary-fixed px-3 py-1 text-xs font-semibold text-secondary">
                  +12.4%
                </span>
              </div>

              <div className="mt-8 flex h-28 items-end gap-2 overflow-hidden rounded-[1.5rem] bg-surface-container p-4">
                {ribbonHeights.map((height, index) => (
                  <div
                    className="flex-1 rounded-t-sm bg-secondary"
                    key={height}
                    style={{ height, opacity: 0.24 + index * 0.08 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-surface-container-low p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
                Trade Journal
              </p>
              <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-on-surface">
                Recent positions with editorial spacing
              </h2>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
              <input
                className="ghost-input min-w-[220px] rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-stone-400 focus:outline-none focus:ring-0"
                placeholder="Filter by ticker"
                type="text"
              />
              <input
                className="ghost-input min-w-[220px] rounded-full px-5 py-3 text-sm text-on-surface placeholder:text-stone-400 focus:outline-none focus:ring-0"
                placeholder="Portfolio or date range"
                type="text"
              />
            </div>
          </div>

          <div className="mt-10 space-y-6">
            {trades.map((trade) => (
              <article
                className="bento-shadow rounded-[2rem] bg-surface-container-lowest p-6 transition-all duration-300 hover:bg-surface-bright"
                key={`${trade.ticker}-${trade.date}`}
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-headline text-2xl font-bold text-on-surface">
                        {trade.ticker}
                      </h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${trade.positionTone}`}>
                        {trade.position}
                      </span>
                      <span className="text-sm text-on-surface-variant">{trade.date}</span>
                    </div>
                    <p className="max-w-2xl text-base leading-7 text-on-surface-variant">{trade.note}</p>
                  </div>

                  <div className="grid gap-5 text-left md:grid-cols-2 md:text-right">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
                        Position Value
                      </p>
                      <p className="mt-2 text-xl font-semibold text-on-surface">{trade.value}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
                        P&amp;L
                      </p>
                      <p className={`mt-2 text-xl font-semibold ${trade.pnlTone}`}>{trade.pnl}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
