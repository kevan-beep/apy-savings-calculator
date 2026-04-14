function TrendIcon() {
  return (
    <svg
      className="h-7 w-7 shrink-0 text-brand-gold"
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

export function Logo() {
  return (
    <div className="group flex items-center gap-2 font-condensed text-2xl font-bold tracking-tight text-brand-gold">
      <TrendIcon />
      <span>
        APY <span className="text-brand-gold">Calculator</span>
      </span>
    </div>
  );
}
