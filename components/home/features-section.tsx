import { FilterIcon, HistoryIcon } from "@/components/site/icons";
import { Card } from "@/components/ui/card";

const ribbonBars = [
  "h-[40%] bg-secondary/20",
  "h-[34%] bg-secondary/25",
  "h-[50%] bg-secondary/35",
  "h-[64%] bg-secondary/45",
  "h-[82%] bg-secondary/55",
  "h-[76%] bg-secondary/65",
  "h-[92%] bg-secondary/75",
  "h-[100%] bg-secondary",
];

export function FeaturesSection() {
  return (
    <section className="bg-surface-container-low px-4 py-[4.5rem] md:px-6 md:py-24">
      <div className="mx-auto max-w-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-editorial text-on-surface md:text-5xl">
              Built for Financial Precision
            </h2>
            <p className="mt-4 text-lg leading-8 text-on-surface-variant">
              Every surface follows the no-line editorial philosophy: tonal layering, measured
              whitespace, and instantly legible information hierarchy.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-capsule bg-surface-container-lowest px-4 py-2 text-sm font-semibold shadow-ambient">
              v2.4 Live
            </div>
            <div className="rounded-capsule bg-surface-container-lowest px-4 py-2 text-sm font-semibold shadow-ambient">
              99.9% Uptime
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 md:grid md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-8">
            <div>
              <h3 className="text-2xl font-bold text-on-surface">API Token Generation</h3>
              <p className="mt-4 text-base leading-7 text-on-surface-variant">
                Connect your favorite tools with private ledger access, encrypted issuance, and
                permission-aware token governance.
              </p>
              <div className="mt-6 rounded-2xl bg-surface-container px-4 py-4 font-mono text-xs text-on-surface-variant">
                ledger_live_tk_8829_x992...
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] bg-[linear-gradient(180deg,#1d2228_0%,#16191f_100%)] p-4 text-white shadow-[0_18px_35px_-26px_rgba(9,11,14,1)] md:mt-0">
              <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/55">
                  <span>Permissions</span>
                  <span>Encrypted</span>
                </div>
                <div className="space-y-3">
                  {["Read History", "Revoke Access", "Audit Scope"].map((line) => (
                    <div
                      className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-3 text-sm"
                      key={line}
                    >
                      <span>{line}</span>
                      <span className="rounded-full bg-secondary/20 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-secondary-fixed">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-primary-gradient text-white shadow-editorial">
            <FilterIcon className="h-10 w-10" />
            <h3 className="mt-8 text-2xl font-bold">Advanced Paging &amp; Filters</h3>
            <p className="mt-4 text-base leading-7 text-white/90">
              Search years of trading history by ticker, date range, portfolio delta, or workflow
              state with a single calm interface.
            </p>
          </Card>

          <Card className="border border-white/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-on-surface-variant">
              <HistoryIcon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-on-surface">Immutable Audit Logs</h3>
            <p className="mt-4 text-base leading-7 text-on-surface-variant">
              Every privileged action and ingestion event is recorded in a tamper-resistant ledger
              built for transparency and compliance review.
            </p>
          </Card>

          <Card className="md:col-span-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-on-surface">The Performance Ribbon</h3>
              <p className="text-base leading-7 text-on-surface-variant">
                A horizontal equity visualization that gives instant context before you ever open a
                full report.
              </p>
            </div>

            <div className="mt-8 flex h-36 items-end gap-2 overflow-hidden rounded-[1.75rem] bg-surface-container p-4">
              {ribbonBars.map((barClass) => (
                <div
                  className={`flex-1 rounded-t-[0.35rem] ${barClass}`}
                  key={barClass}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
