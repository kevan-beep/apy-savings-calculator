import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <Link
          href="/about"
          className="text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          About
        </Link>
      </div>
    </header>
  );
}
