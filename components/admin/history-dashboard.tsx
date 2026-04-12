"use client";

import { useEffect, useMemo, useState } from "react";

import { ApiError, deleteTrade, getDashboardStats, getTrades } from "@/lib/api";
import type { DashboardStats, TradeFilters, TradeListResult } from "@/lib/api-types";
import { cn } from "@/lib/cn";

const defaultFilterDraft = {
  fromDate: "",
  positionType: "",
  status: "",
  symbol: "",
  toDate: "",
};

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return "Your session expired while loading trading data.";
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "We could not load the latest trading data.";
}

function formatCurrency(value: number | null) {
  if (value === null) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

function formatCompactCurrency(value: number | null) {
  if (value === null) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 2,
    notation: "compact",
    style: "currency",
  }).format(value);
}

function formatPercent(value: number | null) {
  if (value === null) {
    return "--";
  }

  return `${value.toFixed(2)}%`;
}

function formatDate(value: string | null) {
  if (!value) {
    return "--";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatNumber(value: number | null) {
  if (value === null) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function buildRequestFilters(
  filters: typeof defaultFilterDraft,
  page: number,
  pageSize: number,
): TradeFilters {
  return {
    fromDate: filters.fromDate,
    page,
    pageSize,
    positionType: filters.positionType,
    status: filters.status,
    symbol: filters.symbol.trim(),
    toDate: filters.toDate,
  };
}

export function HistoryDashboard() {
  const [filterDraft, setFilterDraft] = useState(defaultFilterDraft);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilterDraft);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [trades, setTrades] = useState<TradeListResult | null>(null);
  const [tradesError, setTradesError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingTradeId, setDeletingTradeId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setIsLoading(true);

      const requestFilters = buildRequestFilters(appliedFilters, page, pageSize);
      const [statsResult, tradesResult] = await Promise.allSettled([
        getDashboardStats(),
        getTrades(requestFilters),
      ]);

      if (cancelled) {
        return;
      }

      if (statsResult.status === "fulfilled") {
        setStats(statsResult.value);
        setStatsError(null);
      } else {
        setStatsError(getErrorMessage(statsResult.reason));
      }

      if (tradesResult.status === "fulfilled") {
        setTrades(tradesResult.value);
        setTradesError(null);
      } else {
        setTradesError(getErrorMessage(tradesResult.reason));
      }

      setIsLoading(false);
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [appliedFilters, page, pageSize, refreshKey]);

  const statCards = useMemo(() => {
    const safeStats = stats ?? {
      activeTokens: null,
      totalBalance: null,
      totalPnl: null,
      totalTrades: null,
      winRate: null,
    };

    return [
      {
        detail: "Net performance across all recorded trades",
        label: "Total PnL",
        value: formatCompactCurrency(safeStats.totalPnl),
      },
      {
        detail: "Current balance tracked by the backend",
        label: "Total Balance",
        value: formatCompactCurrency(safeStats.totalBalance),
      },
      {
        detail: "Closed-trade hit rate from the analytics service",
        label: "Win Rate",
        value: formatPercent(safeStats.winRate),
      },
      {
        detail: "Total trades ingested through Openclaw",
        label: "Total Trades",
        value: safeStats.totalTrades === null ? "--" : formatNumber(safeStats.totalTrades),
      },
    ];
  }, [stats]);

  async function handleDeleteTrade(id: string) {
    if (!window.confirm("Delete this trade history entry? This action cannot be undone.")) {
      return;
    }

    setDeletingTradeId(id);

    try {
      await deleteTrade(id);

      if (trades && trades.items.length === 1 && page > 1) {
        setPage((currentPage) => Math.max(1, currentPage - 1));
      } else {
        setRefreshKey((current) => current + 1);
      }
    } catch (error) {
      setTradesError(getErrorMessage(error));
    } finally {
      setDeletingTradeId(null);
    }
  }

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
            System Control
          </p>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight">Admin Overview</h1>
        </div>

        <div className="rounded-[2rem] bg-surface-container-lowest p-5 shadow-sm">
          <form
            className="grid gap-3 md:grid-cols-2 xl:grid-cols-6"
            onSubmit={(event) => {
              event.preventDefault();
              setPage(1);
              setAppliedFilters(filterDraft);
            }}
          >
            <input
              className="ghost-input rounded-xl px-4 py-3 text-sm text-on-surface"
              onChange={(event) => setFilterDraft((current) => ({ ...current, symbol: event.target.value }))}
              placeholder="Filter by symbol"
              type="text"
              value={filterDraft.symbol}
            />
            <select
              className="ghost-input rounded-xl px-4 py-3 text-sm text-on-surface"
              onChange={(event) => setFilterDraft((current) => ({ ...current, positionType: event.target.value }))}
              value={filterDraft.positionType}
            >
              <option value="">All Types</option>
              <option value="LONG">Long</option>
              <option value="SHORT">Short</option>
            </select>
            <select
              className="ghost-input rounded-xl px-4 py-3 text-sm text-on-surface"
              onChange={(event) => setFilterDraft((current) => ({ ...current, status: event.target.value }))}
              value={filterDraft.status}
            >
              <option value="">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>
            <input
              className="ghost-input rounded-xl px-4 py-3 text-sm text-on-surface"
              onChange={(event) => setFilterDraft((current) => ({ ...current, fromDate: event.target.value }))}
              type="date"
              value={filterDraft.fromDate}
            />
            <input
              className="ghost-input rounded-xl px-4 py-3 text-sm text-on-surface"
              onChange={(event) => setFilterDraft((current) => ({ ...current, toDate: event.target.value }))}
              type="date"
              value={filterDraft.toDate}
            />
            <div className="flex gap-2">
              <button
                className="btn-gradient flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white"
                type="submit"
              >
                Apply
              </button>
              <button
                className="rounded-xl border border-outline-variant/30 px-4 py-3 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low"
                onClick={() => {
                  setFilterDraft(defaultFilterDraft);
                  setAppliedFilters(defaultFilterDraft);
                  setPage(1);
                }}
                type="button"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div
            className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_24px_60px_rgba(49,32,27,0.08)] transition-all duration-200 hover:-translate-y-1"
            key={stat.label}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-on-surface-variant">
              {stat.label}
            </p>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-headline text-4xl font-black text-on-surface">{stat.value}</span>
            </div>
            <p className="text-xs font-medium text-on-surface-variant">{stat.detail}</p>
          </div>
        ))}
      </section>

      {statsError ? (
        <div className="mb-8 rounded-[1.5rem] bg-primary-fixed px-6 py-4 text-sm text-primary">{statsError}</div>
      ) : null}

      <section className="grid grid-cols-1 gap-8">
        <div className="overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-[0_28px_80px_rgba(49,32,27,0.08)]">
          <div className="flex flex-col gap-4 bg-white/50 px-8 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-headline text-xl font-bold">Global Trading History</h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                Live records loaded from the admin backend with pagination and delete support.
              </p>
            </div>

            <label className="flex items-center gap-3 text-sm text-on-surface-variant">
              Page size
              <select
                className="ghost-input rounded-xl px-3 py-2 text-sm text-on-surface"
                onChange={(event) => {
                  setPage(1);
                  setPageSize(Number(event.target.value));
                }}
                value={pageSize}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>

          {tradesError ? (
            <div className="px-8 py-8 text-sm text-primary">{tradesError}</div>
          ) : isLoading && !trades ? (
            <div className="px-8 py-8 text-sm text-on-surface-variant">Loading trade history...</div>
          ) : trades && trades.items.length ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-left">
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
                        Volume
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                        PnL
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                        Status
                      </th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                        Opened
                      </th>
                      <th className="px-8 py-4 text-right text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    {trades.items.map((trade) => {
                      const isDeleting = deletingTradeId === trade.id;
                      const isPositivePnl = (trade.pnl ?? 0) >= 0;

                      return (
                        <tr className="transition-colors hover:bg-surface-bright" key={trade.id}>
                          <td className="px-8 py-6 text-sm font-bold">{trade.symbol}</td>
                          <td className="px-6 py-6">
                            <span
                              className={cn(
                                "rounded-full px-3 py-1 text-[10px] font-bold uppercase",
                                trade.positionType === "LONG"
                                  ? "bg-secondary-container text-on-secondary-container"
                                  : "bg-primary-fixed text-on-primary-fixed-variant",
                              )}
                            >
                              {trade.positionType}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-sm font-medium text-on-surface-variant">
                            {formatCurrency(trade.margin)}
                          </td>
                          <td className="px-6 py-6 text-sm text-on-surface-variant">
                            {formatNumber(trade.volume ?? trade.quantity)}
                          </td>
                          <td
                            className={cn(
                              "px-6 py-6 text-sm font-bold",
                              isPositivePnl ? "text-secondary" : "text-primary",
                            )}
                          >
                            {formatCurrency(trade.pnl)}
                          </td>
                          <td className="px-6 py-6">
                            <span className="rounded-full bg-surface-container-low px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface">
                              {trade.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-sm text-on-surface-variant">{formatDate(trade.openedAt)}</td>
                          <td className="px-8 py-6 text-right">
                            <button
                              className="rounded-full bg-surface-container-low p-2 text-on-surface-variant transition-colors hover:text-primary disabled:cursor-wait disabled:opacity-70"
                              disabled={isDeleting}
                              onClick={() => void handleDeleteTrade(trade.id)}
                              type="button"
                            >
                              <span className="material-symbols-outlined text-lg">
                                {isDeleting ? "progress_activity" : "delete"}
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 bg-white/30 px-8 py-6 md:flex-row md:items-center md:justify-between">
                <span className="text-xs font-medium text-on-surface-variant">
                  Showing {(trades.page - 1) * trades.pageSize + 1}-
                  {Math.min(trades.page * trades.pageSize, trades.total)} of {trades.total} transactions
                </span>
                <div className="flex gap-2">
                  <button
                    className="rounded-xl border border-surface-container px-4 py-2 text-xs font-bold transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={trades.page <= 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    type="button"
                  >
                    Previous
                  </button>
                  <button
                    className="rounded-xl border border-surface-container px-4 py-2 text-xs font-bold transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={trades.page >= trades.totalPages}
                    onClick={() => setPage((current) => current + 1)}
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="px-8 py-8 text-sm text-on-surface-variant">
              No trade records matched the current filters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
