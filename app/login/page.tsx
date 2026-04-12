import { LoginForm } from "@/components/auth/login-form";
import { getSafeRedirect } from "@/lib/auth";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const nextPath = getSafeRedirect(resolvedSearchParams?.next);

  return (
    <main className="flex flex-1 items-center justify-center px-6 pb-12 pt-24">
      <LoginForm nextPath={nextPath} />
    </main>
  );
}
