"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { ApiError, createToken, getTokens, revokeToken } from "@/lib/api";
import type { TokenRecord } from "@/lib/api-types";
import { getApiBaseUrl } from "@/lib/env";

const systemLinks = [
  { href: "#", label: "Developer Docs" },
  { href: "#", label: "Status" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Privacy" },
];

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "We could not reach the token service.";
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

export function ConnectTokenManager() {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<TokenRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [tokenName, setTokenName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRevokingId, setIsRevokingId] = useState<string | null>(null);
  const [revealedToken, setRevealedToken] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  async function loadTokens() {
    setIsLoading(true);

    try {
      const nextTokens = await getTokens();
      setTokens(nextTokens);
      setError(null);
    } catch (nextError) {
      setError(getErrorMessage(nextError));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadTokens();
  }, []);

  async function handleCreateToken() {
    const normalizedTokenName = tokenName.trim();

    if (normalizedTokenName.length < 3) {
      setError("Token name must be at least 3 characters long.");
      setNotice(null);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createToken(normalizedTokenName);
      setTokenName("");
      setRevealedToken(result.rawToken);
      setCopyFeedback(null);
      setError(null);
      setNotice(
        result.rawToken
          ? "Token generated successfully. Copy it now before dismissing this panel."
          : "Token generated successfully. The backend did not return the raw token again.",
      );
      await loadTokens();
    } catch (nextError) {
      setError(getErrorMessage(nextError));
      setNotice(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRevokeToken(id: string) {
    if (!window.confirm("Revoke this token? Any connected automation will lose access immediately.")) {
      return;
    }

    setIsRevokingId(id);

    try {
      await revokeToken(id);
      setError(null);
      setNotice("Token revoked successfully.");
      await loadTokens();
    } catch (nextError) {
      setError(getErrorMessage(nextError));
      setNotice(null);
    } finally {
      setIsRevokingId(null);
    }
  }

  async function handleCopyToken() {
    if (!revealedToken) {
      return;
    }

    try {
      await navigator.clipboard.writeText(revealedToken);
      setCopyFeedback("Token copied to clipboard.");
    } catch {
      setCopyFeedback("Clipboard copy failed. Please copy it manually.");
    }
  }

  return (
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
            Manage active Openclaw tokens, generate access for internal tools, and revoke compromised keys from one place.
          </p>
        </div>

        <div className="flex items-center gap-4 self-start rounded-full bg-surface-container-lowest px-5 py-3 shadow-[0_18px_45px_rgba(49,32,27,0.08)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
            <span className="material-symbols-outlined text-3xl">person</span>
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">{user?.name || "Administrator"}</p>
            <p className="text-xs uppercase tracking-[0.24em] text-on-surface-variant">{user?.role || "Admin"}</p>
          </div>
        </div>
      </section>

      {error ? (
        <div className="mb-6 rounded-[1.5rem] bg-primary-fixed px-6 py-4 text-sm text-primary">{error}</div>
      ) : null}

      {notice ? (
        <div className="mb-6 rounded-[1.5rem] bg-secondary-container px-6 py-4 text-sm text-secondary">{notice}</div>
      ) : null}

      {revealedToken ? (
        <section className="mb-8 rounded-[2rem] bg-[#1c1815] p-6 text-white shadow-[0_28px_80px_rgba(28,24,21,0.24)] md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/60">Copy Once</p>
              <h2 className="mt-3 font-headline text-3xl font-black">Your new token is ready.</h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                This raw token may only be visible once. Copy it now and store it in a secure vault before leaving the page.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1c1815] transition-transform active:scale-[0.99]"
                onClick={() => void handleCopyToken()}
                type="button"
              >
                Copy Token
              </button>
              <button
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white/80 transition-colors hover:bg-white/10"
                onClick={() => {
                  setRevealedToken(null);
                  setCopyFeedback(null);
                }}
                type="button"
              >
                Dismiss
              </button>
            </div>
          </div>
          <div className="mt-6 rounded-[1.5rem] bg-white/8 p-5 font-mono text-sm leading-7 text-white/90 backdrop-blur">
            {revealedToken}
          </div>
          {copyFeedback ? <p className="mt-4 text-sm text-white/70">{copyFeedback}</p> : null}
        </section>
      ) : null}

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
                  Live Backend
                </div>
              </div>

              <label className="block text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                Token Name
                <input
                  className="ghost-input mt-3 w-full rounded-[1.5rem] px-5 py-4 text-sm font-medium text-on-surface"
                  onChange={(event) => setTokenName(event.target.value)}
                  placeholder="Data Bridge / Internal Use"
                  type="text"
                  value={tokenName}
                />
              </label>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] bg-surface-container-low px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Scope
                  </p>
                  <p className="mt-2 text-sm font-semibold text-on-surface">Token management only</p>
                </div>
                <div className="rounded-[1.5rem] bg-surface-container-low px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                    Delivery
                  </p>
                  <p className="mt-2 text-sm font-semibold text-on-surface">One-time reveal when supported</p>
                </div>
              </div>

              <button
                className="btn-gradient mt-8 w-full rounded-full px-6 py-4 text-sm font-bold text-white transition-transform active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
                disabled={isSubmitting}
                onClick={() => void handleCreateToken()}
                type="button"
              >
                {isSubmitting ? "Generating Token..." : "Generate Token"}
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] bg-[#1c1815] text-white shadow-[0_28px_80px_rgba(28,24,21,0.24)]">
            <div className="bg-[radial-gradient(circle_at_top_left,rgba(255,138,117,0.28),transparent_45%)] p-8 md:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/60">Quick Start</p>
              <h2 className="mt-3 font-headline text-3xl font-black">Secure launch notes for your next client.</h2>
              <div className="mt-8 rounded-[1.75rem] bg-white/8 p-5 font-mono text-sm leading-7 text-white/85 backdrop-blur">
                <p>Authorization: Bearer sk_live_xxxxxxx</p>
                <p>Base URL: {getApiBaseUrl()}</p>
                <p>Environment: Production</p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1c1815] transition-transform active:scale-[0.99]"
                  href="/settings"
                >
                  View Settings
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <p className="text-sm leading-7 text-white/65">
                  Use the generated token inside dashboards, bots, and reporting notebooks.
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
                {tokens.length} Active Keys
              </div>
            </div>

            <div className="overflow-x-auto px-4 pb-4">
              {isLoading ? (
                <div className="px-4 py-6 text-sm text-on-surface-variant">Loading active tokens...</div>
              ) : tokens.length ? (
                <table className="w-full min-w-[720px] border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface-variant">
                        Token
                      </th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface-variant">
                        Preview
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
                    {tokens.map((token) => {
                      const isRevoking = isRevokingId === token.id;

                      return (
                        <tr key={token.id}>
                          <td className="border-t border-surface-container-low px-4 py-5">
                            <div>
                              <p className="text-sm font-bold text-on-surface">{token.name}</p>
                              <p className="mt-1 text-xs text-on-surface-variant">Managed from the admin dashboard</p>
                            </div>
                          </td>
                          <td className="border-t border-surface-container-low px-4 py-5 font-mono text-sm text-on-surface-variant">
                            {token.tokenPreview || "Hidden by backend"}
                          </td>
                          <td className="border-t border-surface-container-low px-4 py-5 text-sm font-medium text-on-surface-variant">
                            {formatDate(token.createdAt)}
                          </td>
                          <td className="border-t border-surface-container-low px-4 py-5 text-sm font-medium text-on-surface-variant">
                            {formatDate(token.lastUsedAt)}
                          </td>
                          <td className="border-t border-surface-container-low px-4 py-5">
                            <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface">
                              <span className="h-2 w-2 rounded-full bg-secondary" />
                              {token.status}
                            </span>
                          </td>
                          <td className="border-t border-surface-container-low px-4 py-5">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                className="rounded-full bg-surface-container-low p-2 text-on-surface-variant transition-colors hover:text-primary disabled:cursor-wait disabled:opacity-70"
                                disabled={isRevoking}
                                onClick={() => void handleRevokeToken(token.id)}
                                type="button"
                              >
                                <span className="material-symbols-outlined text-lg">
                                  {isRevoking ? "progress_activity" : "delete"}
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="px-4 py-6 text-sm text-on-surface-variant">
                  No active tokens have been issued yet.
                </div>
              )}
            </div>

            <div className="px-4 pb-4">
              <div className="rounded-[1.75rem] bg-surface-container px-6 py-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
                      API Base
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="font-headline text-2xl font-black text-secondary">{tokens.length}</span>
                      <span className="text-sm font-medium text-on-surface-variant">Tokens currently active</span>
                    </div>
                  </div>
                  <div className="w-full max-w-[440px] overflow-hidden rounded-full bg-surface-container-low px-5 py-4 font-mono text-xs text-on-surface-variant md:w-[440px]">
                    {getApiBaseUrl()}
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
  );
}
