import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-surface bg-brand-black/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold">
          <Logo />
        </Link>
        <Link
          href="/about"
          className="text-sm text-brand-muted transition-colors hover:text-brand-bone"
        >
          About
        </Link>
      </div>
    </header>
  );
}
