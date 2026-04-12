import { SparklesIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ComingSoonPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function ComingSoonPage({ description, eyebrow, title }: ComingSoonPageProps) {
  return (
    <main className="px-4 pb-16 pt-8 md:px-6 md:pb-24">
      <section className="mx-auto max-w-shell">
        <Card className="relative overflow-hidden px-8 py-12 md:px-14 md:py-16">
          <div className="absolute inset-x-0 top-0 h-32 bg-hero-glow opacity-90" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-capsule bg-primary-fixed px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-on-primary-fixed">
              <SparklesIcon className="h-4 w-4" />
              {eyebrow}
            </span>
            <h1 className="mt-6 font-headline text-4xl font-extrabold tracking-editorial text-on-surface md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">{description}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/">Back to Home</Button>
              <Button href="/submit" variant="secondary">
                Explore the Shell
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
