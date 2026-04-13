import { ratesAsOfLabel } from "@/lib/site";

export function RateDisclaimer() {
  return (
    <p className="text-xs text-slate-500">
      Rates as of {ratesAsOfLabel()} — verify current rates before opening any
      account.
    </p>
  );
}
