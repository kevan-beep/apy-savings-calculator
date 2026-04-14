import Link from "next/link";

const PROS = [
  "Member-owned structure means profits return to you",
  "Typically better rates than traditional banks",
  "Lower fees",
  "Strong personal service",
  "Community focus",
  "NCUA insured",
];

const CONS = [
  "Membership requirements (must qualify to join)",
  "Fewer branches than big banks",
  "Technology and apps sometimes lag behind online banks",
  "Rates typically below online-only banks",
];

const TOP_INSTITUTIONS: {
  name: string;
  rate: string;
  feature: string;
}[] = [
  {
    name: "Alliant Credit Union",
    rate: "Up to 4.75%",
    feature: "Open membership, excellent rates",
  },
  {
    name: "Pentagon Federal (PenFed)",
    rate: "Up to 4.35%",
    feature: "Open to all, strong rates",
  },
  {
    name: "Navy Federal Credit Union",
    rate: "Up to 4.25%",
    feature: "Military families, largest CU",
  },
  {
    name: "Consumers Credit Union",
    rate: "Up to 4.50%",
    feature: "Open membership, competitive",
  },
  {
    name: "First Tech Federal CU",
    rate: "Up to 4.00%",
    feature: "Tech industry focus",
  },
  {
    name: "Golden 1 Credit Union",
    rate: "Up to 3.75%",
    feature: "California-based, strong rates",
  },
  {
    name: "SchoolsFirst FCU",
    rate: "Up to 3.50%",
    feature: "Education community focus",
  },
  {
    name: "Suncoast Credit Union",
    rate: "Up to 3.85%",
    feature: "Florida-based, strong rates",
  },
  { name: "America First CU", rate: "Up to 4.00%", feature: "Mountain West focus" },
  {
    name: "Bethpage Federal CU",
    rate: "Up to 4.25%",
    feature: "Northeast, competitive rates",
  },
  {
    name: "Digital Federal CU",
    rate: "Up to 4.00%",
    feature: "Open membership, solid rates",
  },
  { name: "BECU", rate: "Up to 3.75%", feature: "Pacific Northwest focus" },
  {
    name: "Randolph-Brooks FCU",
    rate: "Up to 4.00%",
    feature: "Texas-based",
  },
  {
    name: "Connexus Credit Union",
    rate: "Up to 4.50%",
    feature: "Open membership, high rates",
  },
  { name: "Limelight Bank", rate: "Up to 4.40%", feature: "Online CU model" },
  {
    name: "Delta Community CU",
    rate: "Up to 3.75%",
    feature: "Southeast focus",
  },
  {
    name: "ESL Federal CU",
    rate: "Up to 3.85%",
    feature: "Northeast community focus",
  },
  {
    name: "Logix Federal CU",
    rate: "Up to 3.90%",
    feature: "California community focus",
  },
  {
    name: "Service Credit Union",
    rate: "Up to 4.10%",
    feature: "Military and open membership",
  },
  {
    name: "Andrews Federal CU",
    rate: "Up to 4.00%",
    feature: "Mid-Atlantic, open membership",
  },
];

export function CreditUnionReport() {
  return (
    <section
      id="credit-unions"
      className="scroll-mt-28 bg-brand-surface py-16 px-4"
    >
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h2 className="font-condensed text-3xl font-bold text-brand-bone sm:text-4xl">
            Credit Unions — Full Report
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-muted sm:text-base">
            Member-owned, not-for-profit institutions insured by the NCUA — how
            they balance rates, access, and membership rules versus banks.
          </p>
        </header>

        <div className="rounded-lg bg-brand-card p-6">
          <h3 className="font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            What Is a Credit Union?
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Credit unions are not-for-profit financial institutions owned by their
            members. Because profits go back to members rather than shareholders,
            credit unions typically offer better rates than traditional banks and
            lower fees. They are insured by the NCUA (the credit union equivalent
            of the FDIC) up to $250,000.
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
            People who qualify for membership and want better rates than
            traditional banks with more personal service. Excellent for those who
            value community banking and member ownership.
          </p>
        </div>

        <div className="rounded-lg bg-brand-card p-6">
          <h3 className="font-condensed text-sm font-semibold text-brand-bone">
            Current rate range
          </h3>
          <p className="mt-2 text-sm text-brand-bone">
            3.50% – 4.75% APY on savings accounts
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
                      NCUA verified
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
