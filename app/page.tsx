export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 pb-12 pt-24">
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

          <form className="space-y-6">
            <div className="space-y-1.5">
              <label
                className="font-label text-xs font-bold uppercase tracking-[0.28em] text-on-surface-variant"
                htmlFor="api-key"
              >
                API Key / Token
              </label>
              <div className="group relative">
                <input
                  className="ghost-input w-full rounded-xl px-4 py-4 font-body text-sm text-on-surface placeholder:text-stone-400 transition-all focus:outline-none focus:ring-0"
                  id="api-key"
                  placeholder="Enter your secure token"
                  type="password"
                />
                <div className="absolute inset-y-0 right-4 flex items-center">
                  <span className="material-symbols-outlined cursor-pointer text-stone-400 transition-colors hover:text-on-surface">
                    visibility
                  </span>
                </div>
              </div>
            </div>

            <button
              className="btn-gradient bento-shadow w-full rounded-full py-4 font-headline font-bold text-white transition-transform active:scale-95"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center">
            <a
              className="inline-flex items-center gap-2 font-headline text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:text-primary-container"
              href="#"
            >
              <span className="material-symbols-outlined text-base">help</span>
              Need help finding your token?
            </a>
          </div>
        </div>

        <div className="mt-12 flex justify-center opacity-40">
          <div className="flex gap-4">
            <div className="h-2 w-2 rounded-full bg-primary-container" />
            <div className="h-2 w-2 rounded-full bg-secondary-container" />
            <div className="h-2 w-2 rounded-full bg-tertiary-container" />
          </div>
        </div>
      </div>
    </main>
  );
}
