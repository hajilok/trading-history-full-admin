import { getApiBaseUrl } from "@/lib/env";
import type {
  AuthUser,
  DashboardStats,
  TokenCreateResult,
  TokenRecord,
  TradeFilters,
  TradeListResult,
  TradeRecord,
} from "@/lib/api-types";

type JsonObject = Record<string, unknown>;

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | JsonObject | null;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return null;
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().replace(/,/g, "");

    if (!normalized) {
      return null;
    }

    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function asObject(value: unknown) {
  return isObject(value) ? value : null;
}

function getFromObject(source: JsonObject | null, keys: string[]) {
  if (!source) {
    return null;
  }

  for (const key of keys) {
    if (key in source && source[key] !== undefined && source[key] !== null) {
      return source[key];
    }
  }

  return null;
}

function unwrapPayload(payload: unknown): unknown {
  let current = payload;

  while (isObject(current)) {
    const next =
      getFromObject(current, ["data"]) ??
      getFromObject(current, ["result"]) ??
      getFromObject(current, ["payload"]);

    if (next === null) {
      break;
    }

    current = next;
  }

  return current;
}

function extractMessage(payload: unknown) {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (!isObject(payload)) {
    return null;
  }

  const directMessage = getFromObject(payload, ["message", "error", "detail", "title"]);
  const nestedError = getFromObject(payload, ["error", "errors"]);

  if (typeof directMessage === "string" && directMessage.trim()) {
    return directMessage;
  }

  if (isObject(nestedError)) {
    return extractMessage(nestedError);
  }

  return null;
}

async function apiRequest<T = unknown>(path: string, options: ApiRequestOptions = {}) {
  const url = `${getApiBaseUrl()}${path}`;
  const headers = new Headers(options.headers);
  let body = options.body;

  if (isObject(body)) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...options,
    body: body ?? undefined,
    credentials: "include",
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : await response.text().catch(() => "");

  if (!response.ok) {
    throw new ApiError(extractMessage(payload) ?? `Request failed with status ${response.status}.`, response.status);
  }

  return payload as T;
}

function normalizeAuthUser(payload: unknown): AuthUser {
  const root = asObject(payload);
  const unwrapped = asObject(unwrapPayload(payload));
  const candidate =
    asObject(getFromObject(unwrapped, ["user", "currentUser", "session"])) ??
    asObject(getFromObject(root, ["user", "currentUser", "session"])) ??
    unwrapped ??
    root;

  const email = asString(getFromObject(candidate, ["email"]));
  const role = asString(getFromObject(candidate, ["role", "userRole"])) || "Admin";
  const name =
    asString(getFromObject(candidate, ["name", "fullName", "username", "displayName"])) ||
    email ||
    "Administrator";

  return {
    email,
    id: asString(getFromObject(candidate, ["id", "userId"])),
    name,
    role,
  };
}

function normalizeDashboardStats(payload: unknown): DashboardStats {
  const root = asObject(payload);
  const unwrapped = asObject(unwrapPayload(payload));
  const candidate =
    asObject(getFromObject(unwrapped, ["stats", "summary", "dashboard"])) ??
    asObject(getFromObject(root, ["stats", "summary", "dashboard"])) ??
    unwrapped ??
    root ??
    {};

  return {
    activeTokens: asNumber(getFromObject(candidate, ["activeTokens", "tokenCount"])),
    totalBalance: asNumber(getFromObject(candidate, ["totalBalance", "balance", "netBalance"])),
    totalPnl: asNumber(getFromObject(candidate, ["totalPnl", "totalPnL", "pnl"])),
    totalTrades: asNumber(getFromObject(candidate, ["totalTrades", "tradeCount", "count"])),
    winRate: asNumber(getFromObject(candidate, ["winRate", "winrate"])),
  };
}

function normalizeTradeRecord(payload: unknown, index: number): TradeRecord {
  const source = asObject(payload) ?? {};
  const id =
    asString(getFromObject(source, ["id", "_id", "tradeId"])) || `trade-${index}-${Date.now()}`;

  return {
    closedAt: asString(getFromObject(source, ["closedAt", "exitAt"])),
    createdAt: asString(getFromObject(source, ["createdAt"])),
    entryPrice: asNumber(getFromObject(source, ["entryPrice"])),
    id,
    leverage: asNumber(getFromObject(source, ["leverage"])),
    margin: asNumber(getFromObject(source, ["margin"])),
    openedAt: asString(getFromObject(source, ["openedAt", "entryAt"])),
    pnl: asNumber(getFromObject(source, ["pnl", "profitLoss"])),
    positionType: asString(getFromObject(source, ["positionType", "type"])) || "UNKNOWN",
    quantity: asNumber(getFromObject(source, ["quantity"])),
    status: asString(getFromObject(source, ["status"])) || "UNKNOWN",
    symbol: asString(getFromObject(source, ["symbol"])) || "Unknown",
    updatedAt: asString(getFromObject(source, ["updatedAt"])),
    volume: asNumber(getFromObject(source, ["volume"])),
  };
}

function normalizeTradeList(payload: unknown, requestedPage: number, requestedPageSize: number): TradeListResult {
  const root = asObject(payload);
  const unwrapped = unwrapPayload(payload);
  const base = asObject(unwrapped) ?? root;
  const nestedPagination =
    asObject(getFromObject(base, ["pagination", "meta"])) ??
    asObject(getFromObject(root, ["pagination", "meta"]));

  const itemsSource =
    (Array.isArray(unwrapped) ? unwrapped : null) ??
    (Array.isArray(getFromObject(base, ["items", "trades", "rows"])) ? getFromObject(base, ["items", "trades", "rows"]) : null) ??
    (Array.isArray(getFromObject(root, ["items", "trades", "rows"])) ? getFromObject(root, ["items", "trades", "rows"]) : null) ??
    [];

  const items = (itemsSource as unknown[]).map((item, index) => normalizeTradeRecord(item, index));
  const total =
    asNumber(getFromObject(base, ["total", "totalItems", "count"])) ??
    asNumber(getFromObject(nestedPagination, ["total", "totalItems", "count"])) ??
    items.length;
  const page =
    asNumber(getFromObject(base, ["page"])) ??
    asNumber(getFromObject(nestedPagination, ["page", "currentPage"])) ??
    requestedPage;
  const pageSize =
    asNumber(getFromObject(base, ["pageSize", "limit", "perPage"])) ??
    asNumber(getFromObject(nestedPagination, ["pageSize", "limit", "perPage"])) ??
    requestedPageSize;
  const totalPages =
    asNumber(getFromObject(base, ["totalPages"])) ??
    asNumber(getFromObject(nestedPagination, ["totalPages"])) ??
    Math.max(1, Math.ceil(total / Math.max(pageSize, 1)));

  return {
    items,
    page,
    pageSize,
    total,
    totalPages,
  };
}

function normalizeTokenRecord(payload: unknown, index: number): TokenRecord {
  const source = asObject(payload) ?? {};
  const id =
    asString(getFromObject(source, ["id", "_id", "tokenId"])) || `token-${index}-${Date.now()}`;

  return {
    createdAt: asString(getFromObject(source, ["createdAt", "issuedAt"])),
    id,
    lastUsedAt: asString(getFromObject(source, ["lastUsedAt", "lastUsed"])),
    name: asString(getFromObject(source, ["tokenName", "name", "label"])) || "Untitled Token",
    status: asString(getFromObject(source, ["status"])) || "ACTIVE",
    tokenPreview: asString(getFromObject(source, ["tokenPreview", "maskedToken", "prefix"])),
  };
}

function normalizeTokenList(payload: unknown) {
  const root = asObject(payload);
  const unwrapped = unwrapPayload(payload);
  const itemsSource =
    (Array.isArray(unwrapped) ? unwrapped : null) ??
    (Array.isArray(getFromObject(asObject(unwrapped), ["items", "tokens", "rows"])) ? getFromObject(asObject(unwrapped), ["items", "tokens", "rows"]) : null) ??
    (Array.isArray(getFromObject(root, ["items", "tokens", "rows"])) ? getFromObject(root, ["items", "tokens", "rows"]) : null) ??
    [];

  return (itemsSource as unknown[]).map((item, index) => normalizeTokenRecord(item, index));
}

function normalizeTokenCreateResult(payload: unknown): TokenCreateResult {
  const root = asObject(payload);
  const unwrapped = asObject(unwrapPayload(payload));
  const candidate =
    asObject(getFromObject(unwrapped, ["token", "createdToken", "item"])) ??
    asObject(getFromObject(root, ["token", "createdToken", "item"])) ??
    unwrapped ??
    root;
  const rawToken =
    asString(getFromObject(candidate, ["rawToken", "plainToken", "token", "secret"])) ??
    asString(getFromObject(root, ["rawToken", "plainToken", "token", "secret"]));

  return {
    createdToken: candidate ? normalizeTokenRecord(candidate, 0) : null,
    rawToken,
  };
}

export async function login(email: string, password: string) {
  await apiRequest("/api/auth/login", {
    body: { email, password },
    method: "POST",
  });
}

export async function getCurrentUser() {
  const payload = await apiRequest("/api/auth/me");

  return normalizeAuthUser(payload);
}

export async function logout() {
  await apiRequest("/api/auth/logout", {
    method: "POST",
  });
}

export async function getDashboardStats() {
  const payload = await apiRequest("/api/dashboard/stats");

  return normalizeDashboardStats(payload);
}

export async function getTrades(filters: TradeFilters) {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(filters.page));
  searchParams.set("pageSize", String(filters.pageSize));

  if (filters.symbol) {
    searchParams.set("symbol", filters.symbol);
  }

  if (filters.positionType) {
    searchParams.set("positionType", filters.positionType);
  }

  if (filters.status) {
    searchParams.set("status", filters.status);
  }

  if (filters.fromDate) {
    searchParams.set("fromDate", new Date(filters.fromDate).toISOString());
  }

  if (filters.toDate) {
    const toDate = new Date(filters.toDate);
    toDate.setHours(23, 59, 59, 999);
    searchParams.set("toDate", toDate.toISOString());
  }

  const payload = await apiRequest(`/api/trades/?${searchParams.toString()}`);

  return normalizeTradeList(payload, filters.page, filters.pageSize);
}

export async function deleteTrade(id: string) {
  await apiRequest(`/api/trades/${id}`, {
    method: "DELETE",
  });
}

export async function getTokens() {
  const payload = await apiRequest("/api/tokens/");

  return normalizeTokenList(payload);
}

export async function createToken(tokenName: string) {
  const payload = await apiRequest("/api/tokens/", {
    body: { tokenName },
    method: "POST",
  });

  return normalizeTokenCreateResult(payload);
}

export async function revokeToken(id: string) {
  await apiRequest(`/api/tokens/${id}`, {
    method: "DELETE",
  });
}
