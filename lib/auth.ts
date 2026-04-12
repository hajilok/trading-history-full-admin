export const DEFAULT_AUTH_REDIRECT = "/history";

export function getSafeRedirect(path: string | null | undefined) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return DEFAULT_AUTH_REDIRECT;
  }

  return path;
}
