import Link from "next/link";

function TrendIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-emerald-500"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 16L9 11L13 15L20 8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8H20V12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900"
    >
      <TrendIcon />
      <span>
        APY <span className="text-slate-700">Calculator</span>
      </span>
    </Link>
  );
}
