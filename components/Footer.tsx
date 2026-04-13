import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <p className="text-center text-sm text-slate-600">
          © 2025 2K Ventures LLC. All rights reserved.
        </p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <Link className="hover:text-slate-900" href="/privacy">
            Privacy Policy
          </Link>
          <span className="text-slate-300" aria-hidden>
            |
          </span>
          <Link className="hover:text-slate-900" href="/terms">
            Terms of Service
          </Link>
          <span className="text-slate-300" aria-hidden>
            |
          </span>
          <Link className="hover:text-slate-900" href="/methodology">
            Methodology
          </Link>
          <span className="text-slate-300" aria-hidden>
            |
          </span>
          <Link className="hover:text-slate-900" href="/about">
            About
          </Link>
        </nav>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
          APY Calculator is an independent comparison tool. We are not a bank or
          financial advisor. All content is for informational purposes only.
        </p>
      </div>
    </footer>
  );
}
