import type { Metadata } from "next";
import Link from "next/link";
import { RateDisclaimer } from "@/components/RateDisclaimer";

export const metadata: Metadata = {
  title: "Methodology — How We Select and Rank Offers",
  description:
    "How APY Calculator compares high-yield savings accounts, ranks offers, and discloses affiliate relationships.",
  openGraph: {
    title: "Methodology — How We Select and Rank Offers",
    description:
      "How APY Calculator compares high-yield savings accounts, ranks offers, and discloses affiliate relationships.",
  },
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        How We Select and Rank Offers
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        <RateDisclaimer />
      </p>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          APY Calculator is published by 2K Ventures LLC as an informational
          comparison resource. Our goal is to help readers understand savings
          yields in cash terms and compare accounts that are broadly suitable
          for emergency funds and short-to-medium-term cash savings.
        </p>
        <h2 className="pt-4 text-xl font-bold text-slate-900">
          What we optimize for
        </h2>
        <p>
          We rank and compare featured offers using a practical checklist:{" "}
          <strong>APY</strong> (annual percentage yield),{" "}
          <strong>FDIC insurance status</strong> for bank deposit products
          presented as insured (we only feature FDIC-insured accounts on this
          site), <strong>fee structure</strong> (especially recurring monthly
          fees that erode savings), and <strong>minimum balance requirements</strong>{" "}
          that may disqualify smaller savers.
        </p>
        <h2 className="pt-4 text-xl font-bold text-slate-900">
          Affiliate relationships (clear disclosure)
        </h2>
        <p>
          2K Ventures LLC may earn commissions when you open an account or take
          certain actions through our links. Those commissions can influence{" "}
          <em>which products we highlight prominently</em>, which is why we
          publish a persistent site-wide disclosure and repeat disclosures near
          calls-to-action. Commissions do not change the math in our calculator:
          the inputs are yours, and the outputs are computed from the APYs you
          enter and the APYs we display.
        </p>
        <p>
          When we label an offer as a &quot;top recommendation,&quot; that
          designation reflects a combination of competitive APY and the
          editorial/commercial prioritization described on this page — not a
          personalized suitability determination for your individual tax,
          legal, or investment situation.
        </p>
        <h2 className="pt-4 text-xl font-bold text-slate-900">
          What we are not doing
        </h2>
        <p>
          We do not claim to review every account in the market. We do not
          provide financial, tax, or legal advice. We do not see your bank
          statements, and we do not know your full financial picture. Rates and
          account features change; always verify details on the institution&apos;s
          official website before applying.
        </p>
        <p className="pt-6 text-sm text-slate-500">
          Questions? Visit our{" "}
          <Link href="/about" className="text-emerald-600 underline">
            About
          </Link>{" "}
          page for contact context. This page is informational and not financial
          advice.
        </p>
      </div>
    </div>
  );
}
