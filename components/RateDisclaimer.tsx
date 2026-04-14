import { ratesAsOfLabel } from "@/lib/site";

export function RateDisclaimer({
  className = "text-slate-500",
}: {
  className?: string;
}) {
  return (
    <p className={`text-xs ${className}`}>
      Rates as of {ratesAsOfLabel()} — verify current rates before opening any
      account.
    </p>
  );
}
