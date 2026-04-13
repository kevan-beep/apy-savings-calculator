import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorSection } from "@/components/CalculatorSection";
import { EmailCapture } from "@/components/EmailCapture";
import { RateDisclaimer } from "@/components/RateDisclaimer";
import { blogPosts } from "@/lib/blog";
import type { Offer } from "@/lib/offers";
import { ratesAsOfLabel } from "@/lib/site";

const offers: Offer[] = [
  {
    name: "SoFi High Yield Savings",
    apy: 4.5,
    features: ["No minimum balance", "FDIC Insured", "Takes 3 minutes"],
    affiliateLink: "[SOFI_AFFILIATE_LINK]",
    minBalance: 0,
    maxBalance: 999999999,
    commissionRank: 1,
    tableFeature: "No minimum balance",
  },
  {
    name: "Marcus by Goldman Sachs",
    apy: 4.4,
    features: ["No fees ever", "FDIC Insured", "Goldman Sachs backing"],
    affiliateLink: "[MARCUS_AFFILIATE_LINK]",
    minBalance: 0,
    maxBalance: 999999999,
    commissionRank: 2,
    tableFeature: "No fees ever",
  },
  {
    name: "Ally Bank Online Savings",
    apy: 4.35,
    features: ["No minimum", "No fees", "24/7 support"],
    affiliateLink: "[ALLY_AFFILIATE_LINK]",
    minBalance: 0,
    maxBalance: 999999999,
    commissionRank: 3,
    tableFeature: "No minimum, no fees",
  },
];

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

export default function HomePage() {
  const ratesNote = `Rates current as of ${ratesAsOfLabel()}. Rates change frequently — verify before opening.`;

  return (
    <div className="bg-white text-slate-900">
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Find Out How Much Your Bank Is Costing You
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Enter your current balance and rate below. Most Americans are
            leaving hundreds of dollars on the table every year.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white pb-14 pt-6 sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <CalculatorSection offers={offers} />
        </div>
      </section>

      <section id="compare" className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Top High-Yield Savings Accounts Compared
        </h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3 sm:px-6">Account Name</th>
                <th className="px-4 py-3 sm:px-6">Current APY</th>
                <th className="px-4 py-3 sm:px-6">Key Feature</th>
                <th className="px-4 py-3 sm:px-6">Open Account</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {offers.map((o) => (
                <tr key={o.name} className="text-slate-800">
                  <td className="px-4 py-4 font-medium sm:px-6">{o.name}</td>
                  <td className="px-4 py-4 sm:px-6">
                    <span className="font-semibold text-slate-900">
                      {o.apy.toFixed(2)}%
                    </span>
                    <div className="mt-2 max-w-xs">
                      <RateDisclaimer />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600 sm:px-6">
                    {o.tableFeature}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <a
                      href={o.affiliateLink}
                      className="font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Open account →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">{ratesNote}</p>
        <div className="mx-auto mt-8 flex max-w-4xl items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-xs text-slate-500">
          {/* DISPLAY AD UNIT — INSERT ADSENSE CODE HERE */}
          <span>728×90 display ad placeholder</span>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <EmailCapture />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            "FDIC Insured Only",
            "No Sponsored Rankings",
            "Updated Monthly",
          ].map((label) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-semibold text-slate-800 shadow-sm"
            >
              {label}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-slate-600">
          We rank and compare offers using APY, FDIC insurance status, fee
          structure, and minimum balance requirements — then we disclose
          affiliate relationships clearly so you can judge incentives yourself.{" "}
          <Link href="/methodology" className="font-semibold text-emerald-600">
            Read our methodology
          </Link>
          .
        </p>
      </section>

      <section className="border-t border-slate-100 bg-white py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Learn More About High-Yield Savings
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm transition hover:border-emerald-200 hover:bg-white"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {post.date}
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-emerald-600">
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
