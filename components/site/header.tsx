import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 md:px-12">
        <Link className="font-headline text-xl font-extrabold tracking-editorial text-primary" href="/">
          The Editorial Ledger
        </Link>

        <nav
          aria-label="Marketing"
          className="hidden items-center gap-8 font-headline text-sm font-medium tracking-tight md:flex"
        >
          <a className="text-stone-500 transition-colors duration-200 hover:text-primary-container" href="#">
            Features
          </a>
          <a className="text-stone-500 transition-colors duration-200 hover:text-primary-container" href="#">
            Security
          </a>
          <a className="text-stone-500 transition-colors duration-200 hover:text-primary-container" href="#">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden font-headline text-sm font-medium text-stone-500 transition-colors hover:text-primary-container md:block">
            Support
          </button>
          <Button className="btn-gradient bento-shadow font-headline font-bold" size="sm">
            Create Account
          </Button>
        </div>
      </div>
    </header>
  );
}
