const DEFAULT_API_URL = "http://43.156.38.173:3002";

export function getApiBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_URL;

  return apiUrl.replace(/\/+$/, "");
}
