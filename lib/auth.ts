export const AUTH_SESSION_KEY = "auth_session";
export const MOCK_AUTH_EMAIL = "admin@test.com";
export const MOCK_AUTH_PASSWORD = "password123";
export const DEFAULT_AUTH_REDIRECT = "/history";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isMockCredential(email: string, password: string) {
  return normalizeEmail(email) === MOCK_AUTH_EMAIL && password === MOCK_AUTH_PASSWORD;
}

export function buildAuthSession(email: string) {
  return JSON.stringify({
    authenticated: true,
    email: normalizeEmail(email),
    signedInAt: new Date().toISOString(),
  });
}

export function getSafeRedirect(path: string | null | undefined) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return DEFAULT_AUTH_REDIRECT;
  }

  return path;
}
