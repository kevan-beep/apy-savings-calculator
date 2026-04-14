import Link from "next/link";

const PROS = [
  "Convenient branch access",
  "ATM networks",
  "Full product suite",
  "Established trust and familiarity",
  "In-person customer service",
  "Easy cash deposits",
];

const CONS = [
  "Lowest savings rates in the market",
  "Often charge monthly fees",
  "Slower to adopt new technology",
  "Rates rarely competitive with online alternatives",
];

const TOP_INSTITUTIONS: {
  name: string;
  rate: string;
  feature: string;
}[] = [
  { name: "Chase Bank", rate: "0.01%", feature: "Largest US bank by assets" },
  { name: "Bank of America", rate: "0.01%", feature: "Nationwide branch network" },
  { name: "Wells Fargo", rate: "0.01%", feature: "Coast-to-coast presence" },
  { name: "Citibank", rate: "0.04%", feature: "Strong international access" },
  { name: "US Bank", rate: "0.01%", feature: "Strong Midwest presence" },
  { name: "PNC Bank", rate: "0.01%", feature: "Mid-Atlantic and Southeast" },
  { name: "Truist", rate: "0.01%", feature: "Southeast regional leader" },
  { name: "TD Bank", rate: "0.02%", feature: "Northeast focus" },
  { name: "Regions Bank", rate: "0.01%", feature: "Southeast and Midwest" },
  { name: "Fifth Third Bank", rate: "0.01%", feature: "Midwest regional" },
  { name: "KeyBank", rate: "0.01%", feature: "Northeast and Northwest" },
  { name: "Huntington Bank", rate: "0.01%", feature: "Great Lakes region" },
  { name: "M&T Bank", rate: "0.01%", feature: "Mid-Atlantic regional" },
  { name: "Comerica", rate: "0.01%", feature: "Texas and Midwest" },
  { name: "Zions Bank", rate: "0.01%", feature: "Mountain West" },
  { name: "First Horizon", rate: "0.01%", feature: "Southeast regional" },
  { name: "Synovus", rate: "0.01%", feature: "Southeast community focus" },
  { name: "Glacier Bank", rate: "0.05%", feature: "Northwest community bank" },
  { name: "First National Bank", rate: "0.02%", feature: "Midwest community bank" },
  { name: "Heartland Financial", rate: "0.03%", feature: "Midwest regional" },
];

export function TraditionalBankReport() {
  return (
    <section
      id="traditional-banks"
      className="scroll-mt-28 bg-brand-surface py-16 px-4"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h2 className="font-condensed text-3xl font-bold text-brand-bone sm:text-4xl">
            Traditional Banks — Full Report
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-muted sm:text-base">
            How branch-based national and regional banks compare on savings
            rates, fees, and everyday banking — and who they fit best.
          </p>
        </header>

        <div className="rounded-lg bg-brand-card p-6">
          <h3 className="font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            What Is a Traditional Bank?
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Traditional banks are physical branch institutions regulated by the
            FDIC. They offer the full suite of banking products — checking,
            savings, loans, mortgages — under one roof. The tradeoff is that
            their savings rates are typically the lowest in the market, often
            below 0.10% APY.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-brand-card p-6">
            <h3 className="font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-brand-bone">
              PROS
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-bone">
              {PROS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="shrink-0 text-brand-emerald" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-brand-card p-6">
            <h3 className="font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-brand-bone">
              CONS
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-bone">
              {CONS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="shrink-0 text-brand-orange" aria-hidden>
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-brand-card p-6">
          <p className="font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            BEST FOR
          </p>
          <p className="mt-3 text-sm leading-relaxed text-brand-bone">
            People who regularly need in-person banking, handle cash frequently,
            or prefer face-to-face service for complex financial needs.
          </p>
        </div>

        <div className="rounded-lg bg-brand-card p-6">
          <h3 className="font-condensed text-sm font-semibold text-brand-bone">
            Current rate range
          </h3>
          <p className="mt-2 text-sm text-brand-bone">
            0.01% – 0.10% APY on standard savings accounts
          </p>
          <p className="mt-4 text-xs text-brand-muted">
            Source: Federal Reserve H.15 / FDIC BankFind
          </p>
          <p className="mt-2 text-xs text-brand-muted">
            Rates change frequently. Verify before opening any account.
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-brand-muted/50 bg-brand-surface p-8 text-center">
          <p className="text-sm text-brand-muted">
            Featured Partner Slot — Available
          </p>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-brand-muted">
            Institutions may apply for featured placement. Featured status is
            clearly disclosed and does not affect our data rankings.
          </p>
        </div>

        <div>
          <h3 className="font-condensed text-2xl font-bold text-brand-bone sm:text-3xl">
            Top Institutions by Savings Rate
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-muted">
            Ranked by advertised APY. All institutions on this list are verified
            FDIC/NCUA insured. Data sourced from public regulatory filings.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-brand-surface bg-brand-card">
            <ul className="divide-y divide-brand-surface">
              {TOP_INSTITUTIONS.map((row, i) => (
                <li
                  key={row.name}
                  className={`flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
                    i % 2 === 1 ? "bg-brand-surface" : "bg-brand-card"
                  }`}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <span className="shrink-0 font-condensed text-sm font-bold text-brand-gold">
                      {i + 1}.
                    </span>
                    <span className="font-medium text-brand-bone">{row.name}</span>
                    <span className="text-sm text-brand-muted">{row.rate}</span>
                    <span className="text-sm text-brand-muted">{row.feature}</span>
                    <span className="inline-flex w-fit items-center rounded-full bg-brand-black px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-gold ring-1 ring-brand-gold/40">
                      FDIC verified
                    </span>
                  </div>
                  <Link
                    href="#"
                    className="shrink-0 text-sm font-semibold text-brand-gold hover:text-brand-bone"
                  >
                    Learn More →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-brand-muted">
            Data last updated: April 2026. This list is compiled from public FDIC
            BankFind and NCUA data. It is not a paid ranking.
          </p>
        </div>
      </div>
    </section>
  );
}
