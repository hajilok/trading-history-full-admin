export type AuthUser = {
  email: string | null;
  id: string | null;
  name: string;
  role: string;
};

export type DashboardStats = {
  activeTokens: number | null;
  totalBalance: number | null;
  totalPnl: number | null;
  totalTrades: number | null;
  winRate: number | null;
};

export type TradeFilters = {
  fromDate: string;
  page: number;
  pageSize: number;
  positionType: string;
  status: string;
  symbol: string;
  toDate: string;
};

export type TradeRecord = {
  closedAt: string | null;
  createdAt: string | null;
  entryPrice: number | null;
  id: string;
  leverage: number | null;
  margin: number | null;
  openedAt: string | null;
  pnl: number | null;
  positionType: string;
  quantity: number | null;
  status: string;
  symbol: string;
  updatedAt: string | null;
  volume: number | null;
};

export type TradeListResult = {
  items: TradeRecord[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type TokenRecord = {
  createdAt: string | null;
  id: string;
  lastUsedAt: string | null;
  name: string;
  status: string;
  tokenPreview: string | null;
};

export type TokenCreateResult = {
  createdToken: TokenRecord | null;
  rawToken: string | null;
};
