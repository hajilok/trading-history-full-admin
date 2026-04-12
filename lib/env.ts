const DEFAULT_API_URL = "https://api.yukimalas.my.id";

export function getApiBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_URL;

  return apiUrl.replace(/\/+$/, "");
}
