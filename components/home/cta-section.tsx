import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="px-4 py-[4.5rem] md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-primary-gradient px-8 py-14 text-center text-white shadow-editorial md:px-14 md:py-20">
        <div className="relative">
          <div className="pointer-events-none absolute -left-28 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold leading-tight tracking-editorial md:text-6xl">
              Ready to Curate Your
              <span className="block">Financial Future?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
              Join traders and operators moving beyond spreadsheet fatigue into a calmer, more
              premium review experience.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button className="bg-white text-primary hover:bg-surface-bright" href="/login" size="lg">
                Open Your Ledger
              </Button>
              <Button href="/history" size="lg" variant="outline">
                View Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
