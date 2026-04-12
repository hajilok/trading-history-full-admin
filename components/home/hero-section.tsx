import { SearchIcon, TrendUpIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";

function DeviceChart() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 420 300">
      <defs>
        <linearGradient id="chart-fill" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 90, 95, 0.28)" />
          <stop offset="100%" stopColor="rgba(255, 90, 95, 0)" />
        </linearGradient>
        <linearGradient id="chart-line" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#ff8e90" />
          <stop offset="100%" stopColor="#b52330" />
        </linearGradient>
        <linearGradient id="accent-line" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#94f7ea" />
          <stop offset="100%" stopColor="#006a62" />
        </linearGradient>
      </defs>

      <rect fill="#fff9f8" height="300" rx="30" width="420" />
      <g opacity="0.55" stroke="#eadfdd" strokeWidth="1">
        <path d="M44 54h332" />
        <path d="M44 108h332" />
        <path d="M44 162h332" />
        <path d="M44 216h332" />
        <path d="M80 34v224" />
        <path d="M144 34v224" />
        <path d="M208 34v224" />
        <path d="M272 34v224" />
        <path d="M336 34v224" />
      </g>

      <path
        d="M44 214C79 185 109 158 142 167C175 176 195 110 232 104C262 99 282 140 320 118C343 104 360 84 376 72L376 258L44 258Z"
        fill="url(#chart-fill)"
      />
      <path
        d="M44 214C79 185 109 158 142 167C175 176 195 110 232 104C262 99 282 140 320 118C343 104 360 84 376 72"
        stroke="url(#chart-line)"
        strokeWidth="8"
      />
      <path
        d="M44 236C74 220 112 208 148 212C184 216 210 176 240 172C278 168 320 194 376 136"
        stroke="url(#accent-line)"
        strokeWidth="5"
      />

      {[
        { x: 142, y: 167 },
        { x: 232, y: 104 },
        { x: 320, y: 118 },
      ].map((point) => (
        <g key={`${point.x}-${point.y}`}>
          <circle cx={point.x} cy={point.y} fill="#fbf9f8" r="9" />
          <circle cx={point.x} cy={point.y} fill="#ff5a5f" r="5" />
        </g>
      ))}
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-8 md:px-6 md:pb-28 md:pt-12">
      <div className="mx-auto grid max-w-shell items-center gap-14 md:grid-cols-[1.04fr_0.96fr]">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex rounded-capsule bg-primary-fixed px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-on-primary-fixed shadow-insetSoft">
            Premium Trading Journal
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[0.96] tracking-editorial text-on-surface md:text-7xl">
            Master Your
            <span className="mt-2 block text-primary-container">Trading Journey</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-on-surface-variant md:text-xl">
            Treat your trade data like a luxury itinerary. Archive, review, and refine your
            history with an editorial interface built for calm, high-signal analysis.
          </p>

          <form
            action="#"
            className="mt-10 flex max-w-xl flex-col gap-3 rounded-[2rem] border border-white/70 bg-surface-container-lowest/95 p-3 shadow-ambient backdrop-blur sm:flex-row sm:items-center"
          >
            <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2" htmlFor="hero-search">
              <SearchIcon className="h-5 w-5 text-outline" />
              <span className="sr-only">Search tickers</span>
              <input
                className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-outline-variant md:text-base"
                id="hero-search"
                name="hero-search"
                placeholder="Search tickers, dates, or a market narrative..."
                type="text"
              />
            </label>
            <Button className="w-full sm:w-auto" size="lg" type="submit">
              Get Started
            </Button>
          </form>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center md:min-h-[560px]">
          <div className="absolute inset-0 rounded-[3rem] bg-hero-glow opacity-90 blur-3xl" />
          <div className="absolute right-4 top-10 h-[82%] w-[82%] rounded-[3rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,236,233,0.88))] shadow-editorial md:right-0 md:top-4" />
          <div className="relative w-full max-w-[540px] rotate-[7deg] rounded-[3rem] border border-white/75 bg-white p-4 shadow-editorial">
            <div className="overflow-hidden rounded-[2.5rem] bg-[#fff7f6] p-4">
              <div className="rounded-[2rem] bg-[linear-gradient(180deg,#fffdfc_0%,#f5f0ef_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div className="flex items-center justify-between px-3 pb-4 pt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-outline">
                  <span>Quarterly Lens</span>
                  <span>Live Signal</span>
                </div>
                <div className="aspect-[1.32/1] overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_35px_-26px_rgba(181,35,48,0.65)]">
                  <DeviceChart />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 max-w-[280px] rounded-[2rem] border border-white/70 bg-surface-container-lowest/95 p-5 shadow-editorial backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-secondary">
                <TrendUpIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-outline">
                  Net Profit
                </p>
                <p className="mt-1 text-2xl font-bold text-secondary">+$14,280.45</p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-container">
              <div className="h-full w-[72%] rounded-full bg-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
