import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for using APY Calculator (apysavingscalculator.com), operated by 2K Ventures LLC.",
  openGraph: {
    title: "Terms of Service",
    description:
      "Terms of service for using APY Calculator (apysavingscalculator.com), operated by 2K Ventures LLC.",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        Effective date: April 12, 2026 · Operator: 2K Ventures LLC
      </p>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          These Terms of Service (the <strong>&quot;Terms&quot;</strong>) govern
          your access to and use of the website{" "}
          <strong>apysavingscalculator.com</strong> (the{" "}
          <strong>&quot;Site&quot;</strong>) operated by{" "}
          <strong>2K Ventures LLC</strong> (&quot;<strong>2K Ventures</strong>,&quot;
          &quot;<strong>we</strong>,&quot; &quot;<strong>us</strong>&quot;). By
          using the Site, you agree to these Terms. If you do not agree, do not
          use the Site.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          1. Informational use only
        </h2>
        <p>
          The Site provides educational content, calculators, and comparisons for
          informational purposes. The Site does not provide legal, tax, or
          personalized financial advice. Any rates, yields, examples, or rankings
          may be incomplete, rounded, delayed, or otherwise inaccurate. Always
          verify current rates, fees, insurance coverage, and account terms with
          the financial institution before opening an account.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          2. Not a bank; no fiduciary relationship
        </h2>
        <p>
          2K Ventures is not a bank, credit union, broker-dealer, or registered
          investment adviser. Use of the Site does not create a fiduciary
          relationship. You are solely responsible for your financial decisions.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          3. Affiliate relationships and advertising
        </h2>
        <p>
          The Site may display affiliate links and advertisements. We may earn
          commissions or other compensation when you click links or open accounts
          through partners. Compensation arrangements may influence which offers
          are highlighted or ordered. See our{" "}
          <Link href="/methodology" className="text-emerald-600 underline">
            Methodology
          </Link>{" "}
          page for additional context.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          4. No guarantees
        </h2>
        <p>
          We make no warranties regarding uninterrupted access, error-free
          operation, or specific financial outcomes. To the fullest extent
          permitted by law, the Site is provided &quot;as is&quot; and &quot;as
          available.&quot;
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          5. Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, 2K Ventures and its owners,
          employees, and affiliates will not be liable for any indirect,
          incidental, special, consequential, or exemplary damages, or any loss
          of profits, revenues, data, or goodwill, arising from your use of the
          Site or reliance on any content. Our aggregate liability for any claim
          arising out of the Site will not exceed the greater of (a) $100 USD or
          (b) amounts you paid us (if any) for the specific service giving rise to
          the claim in the twelve months preceding the claim.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">6. Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless 2K Ventures from claims,
          damages, liabilities, and expenses (including reasonable attorneys&apos;
          fees) arising from your misuse of the Site, violation of these Terms, or
          violation of applicable law.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          7. Third-party sites
        </h2>
        <p>
          The Site may link to third-party websites. We do not control and are
          not responsible for third-party content, policies, or practices.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          8. Intellectual property
        </h2>
        <p>
          Site content is owned by 2K Ventures or its licensors and is protected
          by intellectual property laws. You may not copy, scrape, or
          redistribute Site content for commercial purposes without permission,
          except as allowed by law or with explicit written consent.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          9. Changes; termination
        </h2>
        <p>
          We may modify these Terms at any time by posting an updated version on
          the Site. Continued use after changes constitutes acceptance. We may
          suspend or discontinue the Site at any time.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          10. Governing law; disputes
        </h2>
        <p>
          These Terms are governed by the laws of the State of Nevada, excluding
          conflict-of-law rules. Subject to applicable law, you agree that
          exclusive jurisdiction and venue for disputes will be in state or
          federal courts located in Clark County, Nevada, unless a different
          forum is required by applicable consumer protection law.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">11. Contact</h2>
        <p>
          See our{" "}
          <Link href="/about" className="text-emerald-600 underline">
            About
          </Link>{" "}
          page for contact details if provided.
        </p>

        <p className="pt-8 text-xs text-slate-500">
          For data practices, see our{" "}
          <Link href="/privacy" className="text-emerald-600 underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
