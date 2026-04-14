import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorSection } from "@/components/CalculatorSection";
import { ComparisonTableSection } from "@/components/ComparisonTableSection";
import { EmailCapture } from "@/components/EmailCapture";
import { CreditUnionReport } from "@/components/reports/CreditUnionReport";
import { OnlineBankReport } from "@/components/reports/OnlineBankReport";
import { TraditionalBankReport } from "@/components/reports/TraditionalBankReport";
import {
  BANK_RATE_CONFIG,
  bankConfigToOffers,
  ratesLastVerifiedLabel,
} from "@/lib/rateConfig";
import { buildRatesApiResponse } from "@/lib/rates/buildRatesResponse";
import { blogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

const offers = bankConfigToOffers(BANK_RATE_CONFIG);

export const metadata: Metadata = {
  title: "APY Calculator — Find Out How Much Your Bank Is Costing You",
  description:
    "Free APY savings calculator. Compare high-yield savings accounts and find out how much more you could be earning. Updated monthly.",
  openGraph: {
    title: "APY Calculator — Find Out How Much Your Bank Is Costing You",
    description:
      "Free APY savings calculator. Compare high-yield savings accounts and find out how much more you could be earning. Updated monthly.",
    type: "website",
  },
};

export default async function HomePage() {
  const rates = await buildRatesApiResponse();
  const lastVerifiedLabel = ratesLastVerifiedLabel(BANK_RATE_CONFIG);

  return (
    <div className="bg-brand-black text-brand-bone">
      <section className="border-b border-brand-surface bg-brand-black pb-10 pt-10 text-center sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-condensed text-3xl font-bold leading-tight tracking-tight text-brand-bone sm:text-4xl md:text-5xl lg:text-6xl">
            Your Bank Is Quietly Keeping Your Money
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-brand-muted sm:text-lg">
            This free calculator shows you exactly how much interest you&apos;re
            leaving on the table every year — and what high-yield savings
            accounts are actually paying right now. No sign-up. No sales pitch.
            Just the math.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-surface bg-brand-black pb-14 pt-6 text-center sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <CalculatorSection offers={offers} />
        </div>
      </section>

      <p className="text-center text-brand-muted text-sm mt-8 mb-2">
        Not sure where to start? Learn how each account type works before
        comparing rates.
      </p>
      <div className="flex justify-center mt-6 mb-10">
        <a
          href="#traditional-banks"
          className="inline-flex items-center gap-2 border border-brand-gold text-brand-gold font-condensed font-bold text-lg px-8 py-3 rounded hover:bg-brand-gold hover:text-brand-black transition-all duration-200"
        >
          📚 Educate Yourself First →
        </a>
      </div>

      <ComparisonTableSection
        rates={rates}
        lastVerifiedLabel={lastVerifiedLabel}
      />

      <TraditionalBankReport />
      <div className="bg-brand-surface px-4" aria-hidden>
        <div className="mx-auto h-px max-w-5xl bg-brand-gold/40" />
      </div>
      <OnlineBankReport />
      <div className="bg-brand-surface px-4" aria-hidden>
        <div className="mx-auto h-px max-w-5xl bg-brand-gold/40" />
      </div>
      <CreditUnionReport />

      <section className="bg-brand-black py-14 text-center">
        <EmailCapture />
      </section>

      <section className="bg-brand-surface py-14 text-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "FDIC Insured Only",
              "No Sponsored Rankings",
              "Updated Monthly",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 rounded-xl border border-brand-surface bg-brand-black px-4 py-5 text-center text-sm font-semibold text-brand-gold shadow-sm"
              >
                <span className="text-brand-gold" aria-hidden>
                  ✓
                </span>
                {label}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-brand-muted">
            We rank and compare offers using APY, FDIC insurance status, fee
            structure, and minimum balance requirements — then we disclose
            affiliate relationships clearly so you can judge incentives yourself.{" "}
            <Link
              href="/methodology"
              className="font-semibold text-brand-gold hover:text-brand-bone"
            >
              Read our methodology
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-brand-surface bg-brand-black py-14 text-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-condensed text-2xl font-bold text-brand-bone sm:text-3xl">
            Learn More About High-Yield Savings
          </h2>
          <div className="mt-10 grid gap-6 text-center md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-brand-surface bg-brand-card p-5 text-center shadow-sm transition hover:border-brand-gold/40 hover:bg-brand-surface/40"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  {post.date}
                </p>
                <h3 className="mt-2 font-condensed text-lg font-bold text-brand-bone group-hover:text-brand-gold">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                  {post.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-brand-gold">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
