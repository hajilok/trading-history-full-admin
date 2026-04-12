"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { ApiError } from "@/lib/api";
import { getSafeRedirect } from "@/lib/auth";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath = "/history" }: LoginFormProps) {
  const router = useRouter();
  const { login, status } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const safeNextPath = getSafeRedirect(nextPath);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(safeNextPath);
    }
  }, [router, safeNextPath, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      await login(email, password);
      startTransition(() => {
        router.replace(safeNextPath);
      });
    } catch (nextError) {
      if (nextError instanceof ApiError && nextError.status === 401) {
        setError("Invalid email or password.");
        return;
      }

      setError(nextError instanceof ApiError ? nextError.message : "We could not sign you in.");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bento-shadow rounded-xl bg-surface-container-lowest p-8 md:p-10">
        <div className="mb-10">
          <h1 className="mb-2 font-headline text-3xl font-extrabold tracking-tight text-on-surface">
            Welcome Back
          </h1>
          <p className="text-sm font-medium text-on-surface-variant">
            Access your financial atelier and trade journals.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label
              className="font-label text-xs font-bold uppercase tracking-[0.28em] text-on-surface-variant"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              autoComplete="email"
              className="ghost-input w-full rounded-xl px-4 py-4 font-body text-sm text-on-surface placeholder:text-stone-400 transition-all focus:outline-none focus:ring-0"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your editorial account email"
              type="email"
              value={email}
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="font-label text-xs font-bold uppercase tracking-[0.28em] text-on-surface-variant"
              htmlFor="password"
            >
              Password
            </label>
            <div className="group relative">
              <input
                autoComplete="current-password"
                className="ghost-input w-full rounded-xl px-4 py-4 pr-14 font-body text-sm text-on-surface placeholder:text-stone-400 transition-all focus:outline-none focus:ring-0"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-4 flex items-center text-stone-400 transition-colors hover:text-on-surface"
                onClick={() => setShowPassword((current) => !current)}
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {error ? (
            <p className="rounded-2xl bg-primary-fixed px-4 py-3 text-sm leading-6 text-primary">{error}</p>
          ) : null}

          <button
            className="btn-gradient bento-shadow w-full rounded-full py-4 font-headline font-bold text-white transition-transform active:scale-95 disabled:cursor-wait disabled:opacity-90"
            disabled={isPending || status === "loading"}
            type="submit"
          >
            {isPending || status === "loading" ? "Opening Dashboard..." : "Login"}
          </button>
        </form>
      </div>

      <div className="mt-12 flex justify-center opacity-40">
        <div className="flex gap-4">
          <div className="h-2 w-2 rounded-full bg-primary-container" />
          <div className="h-2 w-2 rounded-full bg-secondary-container" />
          <div className="h-2 w-2 rounded-full bg-tertiary-container" />
        </div>
      </div>
    </div>
  );
}
