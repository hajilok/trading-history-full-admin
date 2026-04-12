"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { ApiError, getCurrentUser, login as loginRequest, logout as logoutRequest } from "@/lib/api";
import type { AuthUser } from "@/lib/api-types";

type AuthStatus = "authenticated" | "loading" | "unauthenticated";

type AuthContextValue = {
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  status: AuthStatus;
  user: AuthUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return "Your session has expired. Please sign in again.";
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "We could not reach the admin service.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);

  async function refresh() {
    try {
      const nextUser = await getCurrentUser();

      startTransition(() => {
        setError(null);
        setStatus("authenticated");
        setUser(nextUser);
      });
    } catch (nextError) {
      startTransition(() => {
        setError(nextError instanceof ApiError && nextError.status === 401 ? null : getErrorMessage(nextError));
        setStatus("unauthenticated");
        setUser(null);
      });
    }
  }

  async function login(email: string, password: string) {
    setError(null);
    await loginRequest(email, password);
    await refresh();
  }

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      startTransition(() => {
        setError(null);
        setStatus("unauthenticated");
        setUser(null);
      });
    }
  }

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    initializedRef.current = true;
    void refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        error,
        login,
        logout,
        refresh,
        status,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
