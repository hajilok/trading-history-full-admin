export const ADMIN_ROUTE_PREFIXES = ["/history", "/connect", "/submit", "/profile"];

export type AdminNavKey = "analysis" | "connect" | "settings";

export function isAdminPath(pathname: string | null | undefined) {
  if (!pathname) {
    return false;
  }

  return ADMIN_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function getAdminNavKey(pathname: string | null | undefined): AdminNavKey | null {
  if (!pathname) {
    return null;
  }

  if (pathname === "/history" || pathname.startsWith("/history/")) {
    return "analysis";
  }

  if (pathname === "/connect" || pathname.startsWith("/connect/")) {
    return "connect";
  }

  if (pathname === "/profile" || pathname.startsWith("/profile/")) {
    return "settings";
  }

  return null;
}
