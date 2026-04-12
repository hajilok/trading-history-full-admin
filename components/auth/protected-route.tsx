"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { getSafeRedirect } from "@/lib/auth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { error, status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      const nextPath = getSafeRedirect(pathname);
      router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
    }
  }, [pathname, router, status]);

  if (status !== "authenticated") {
    return (
      <main className="px-6 pb-16 pt-28 md:px-12">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-surface-container-low p-6 md:p-8">
          <div className="bento-shadow rounded-[2rem] bg-surface-container-lowest p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant">
              Route Protection
            </p>
            <h1 className="mt-4 font-headline text-3xl font-extrabold tracking-tight text-on-surface">
              Preparing your protected workspace.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-on-surface-variant">
              {error || "We are confirming that an editorial session is present before rendering the dashboard."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
