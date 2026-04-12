type AdminPlaceholderPageProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function AdminPlaceholderPage({
  description,
  eyebrow,
  title,
}: AdminPlaceholderPageProps) {
  return (
    <section className="mx-auto max-w-[1200px]">
      <div className="rounded-[2.5rem] bg-surface-container-low p-4">
        <div className="rounded-[2rem] bg-surface-container-lowest p-10 md:p-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-variant">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-on-surface-variant md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
