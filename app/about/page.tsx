import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About 2K Ventures LLC",
  description:
    "About the team behind APY Calculator, an independent comparison tool focused on high-yield savings education.",
  openGraph: {
    title: "About 2K Ventures LLC",
    description:
      "About the team behind APY Calculator, an independent comparison tool focused on high-yield savings education.",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        About APY Calculator &amp; 2K Ventures LLC
      </h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          APY Calculator is owned and operated by{" "}
          <strong>2K Ventures LLC</strong>, based in <strong>Henderson, Nevada</strong>.
          We build independent financial comparison tools designed to translate
          abstract rates into concrete dollars so everyday savers can make
          clearer decisions.
        </p>
        <p>
          Our mission is simple: help Americans find better yields on cash they
          already intend to keep safe and liquid — without pretending we know
          your full financial picture. We publish educational content, calculators,
          and comparisons that emphasize FDIC-insured savings products and
          transparent disclosures.
        </p>
        <p>
          We may earn affiliate commissions when readers open accounts through
          our links. Those commercial relationships help fund the site and are
          disclosed prominently. We still aim to keep explanations accurate,
          conservative, and useful even when a commission is possible.
        </p>
        <p>
          This site is not a bank, not a broker-dealer, and not a registered
          investment adviser. Nothing here is personalized financial advice.
        </p>
        <p className="pt-4 text-sm text-slate-500">
          Policies:{" "}
          <Link className="text-emerald-600 underline" href="/privacy">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link className="text-emerald-600 underline" href="/terms">
            Terms
          </Link>{" "}
          ·{" "}
          <Link className="text-emerald-600 underline" href="/methodology">
            Methodology
          </Link>
        </p>
      </div>
    </div>
  );
}
