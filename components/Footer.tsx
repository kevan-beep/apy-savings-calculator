import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-surface bg-brand-black">
      <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6">
        <p className="text-center text-sm text-brand-muted">
          © 2025 2K Ventures LLC. All rights reserved.
        </p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-brand-muted">
          <Link className="transition-colors hover:text-brand-bone" href="/privacy">
            Privacy Policy
          </Link>
          <span className="text-brand-surface" aria-hidden>
            |
          </span>
          <Link className="transition-colors hover:text-brand-bone" href="/terms">
            Terms of Service
          </Link>
          <span className="text-brand-surface" aria-hidden>
            |
          </span>
          <Link
            className="transition-colors hover:text-brand-bone"
            href="/methodology"
          >
            Methodology
          </Link>
          <span className="text-brand-surface" aria-hidden>
            |
          </span>
          <Link className="transition-colors hover:text-brand-bone" href="/about">
            About
          </Link>
        </nav>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-brand-muted">
          APY Calculator is an independent comparison tool. We are not a bank or
          financial advisor. All content is for informational purposes only.
        </p>
      </div>
    </footer>
  );
}
