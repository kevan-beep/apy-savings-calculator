import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for APY Calculator (apysavingscalculator.com), operated by 2K Ventures LLC — GDPR and CCPA disclosures.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "Privacy policy for APY Calculator (apysavingscalculator.com), operated by 2K Ventures LLC — GDPR and CCPA disclosures.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        Effective date: April 12, 2026 · Applies to: apysavingscalculator.com
      </p>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          This Privacy Policy explains how <strong>2K Ventures LLC</strong> (
          &quot;<strong>2K Ventures</strong>,&quot; &quot;<strong>we</strong>,&quot;
          &quot;<strong>us</strong>,&quot; or &quot;<strong>our</strong>&quot;)
          collects, uses, discloses, and protects information in connection with
          the website <strong>apysavingscalculator.com</strong> (the{" "}
          <strong>&quot;Site&quot;</strong>). We aim to comply with the EU
          General Data Protection Regulation (<strong>GDPR</strong>) where
          applicable, and the California Consumer Privacy Act / California
          Privacy Rights Act (<strong>CCPA / CPRA</strong>) where applicable.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          1. Data controller
        </h2>
        <p>
          For purposes of GDPR, the data controller is{" "}
          <strong>2K Ventures LLC</strong>, Henderson, NV, United States. Contact:
          use the contact details provided on our{" "}
          <Link href="/about" className="text-emerald-600 underline">
            About
          </Link>{" "}
          page (if listed) or the inquiry method we publish there.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          2. Information we collect
        </h2>
        <p>Depending on how you use the Site, we may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Usage data</strong> (e.g., pages viewed, approximate
            location derived from IP, device/browser type, timestamps, referral
            URLs). This is commonly collected via analytics tools and server
            logs.
          </li>
          <li>
            <strong>Cookie and similar technologies data</strong> (e.g., a
            cookie consent preference stored locally in your browser via
            localStorage on the Site).
          </li>
          <li>
            <strong>Information you submit</strong> (e.g., if you submit an email
            address through a form).{" "}
            <em>
              Note: some Site forms may be demonstrative while we build backend
              infrastructure; do not submit sensitive information unless a form
              explicitly states how it will be processed.
            </em>
          </li>
          <li>
            <strong>Affiliate / referral metadata</strong> when you click
            outbound partner links (commonly handled by third-party networks and
            partner sites, not stored as &quot;your application status&quot; by
            us unless we integrate a backend for that purpose).
          </li>
        </ul>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          3. Purposes of processing (GDPR lawful bases)
        </h2>
        <p>We process information for purposes including:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Providing the Site</strong> (legitimate interests /
            contract): operating pages, calculators, and navigation.
          </li>
          <li>
            <strong>Measuring performance and improving content</strong>{" "}
            (legitimate interests): understanding aggregated usage and errors.
          </li>
          <li>
            <strong>Advertising and monetization</strong> (consent and/or
            legitimate interests, depending on jurisdiction and implementation):
            displaying ads, working with ad partners, and affiliate tracking as
            described in partner policies.
          </li>
          <li>
            <strong>Compliance</strong> (legal obligation / legitimate
            interests): fraud prevention, responding to lawful requests, and
            maintaining required records.
          </li>
        </ul>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          4. Cookies and choices
        </h2>
        <p>
          We may use cookies and similar technologies. Where required, we
          present a cookie notice and store your choice (for example, in
          browser localStorage). You can also control cookies through your
          browser settings. Blocking some cookies may impact Site functionality
          or measurement accuracy.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          5. Sharing with third parties
        </h2>
        <p>
          We may share information with vendors and partners who help us operate
          the Site, including hosting providers, analytics providers, advertising
          networks (if enabled), and affiliate partners. These recipients process
          data under contractual terms and their own privacy policies.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          6. International transfers
        </h2>
        <p>
          If you access the Site from outside the United States, your information
          may be processed in the United States or other countries where privacy
          laws differ. Where GDPR requires safeguards for transfers from the EEA/
          UK, we rely on appropriate mechanisms such as Standard Contractual
          Clauses where applicable, in addition to vendor safeguards.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          7. Retention
        </h2>
        <p>
          We retain information for as long as necessary for the purposes above,
          unless a longer period is required by law. Aggregated analytics may be
          retained in a de-identified form.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          8. Security
        </h2>
        <p>
          We use reasonable administrative, technical, and organizational
          measures appropriate to the nature of the Site. No method of transmission
          or storage is 100% secure.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          9. Your GDPR rights
        </h2>
        <p>
          If GDPR applies, you may have rights to access, rectify, erase,
          restrict processing, object, and data portability, and the right to
          lodge a complaint with a supervisory authority. To exercise rights,
          contact us using the method on the{" "}
          <Link href="/about" className="text-emerald-600 underline">
            About
          </Link>{" "}
          page. We may need to verify your request.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          10. California privacy rights (CCPA / CPRA)
        </h2>
        <p>
          If you are a California resident, you may have the right to know,
          delete, and correct personal information, and to limit use of certain
          sensitive personal information (if collected). You may also have the
          right to opt out of &quot;sale&quot; or &quot;sharing&quot; of personal
          information as defined by California law.
        </p>
        <p>
          <strong>Categories collected (illustrative)</strong>: identifiers
          (such as IP address, email if submitted), internet activity, and
          inferences drawn from usage.
        </p>
        <p>
          <strong>Sale/share</strong>: we do not sell personal information for
          money. We may use advertising or analytics partners that could
          constitute &quot;sharing&quot; for cross-context behavioral advertising
          under California law depending on configuration. Where required, we
          provide opt-out mechanisms (including a &quot;Do Not Sell or Share My
          Personal Information&quot; link if applicable once ad tech is enabled).
        </p>
        <p>
          <strong>Non-discrimination</strong>: we will not discriminate against
          you for exercising CCPA rights, subject to permitted differences
          reasonably related to the value of data.
        </p>
        <p>
          <strong>Shine the Light</strong>: California residents may request
          certain information regarding disclosure of personal information to
          third parties for direct marketing purposes under California Civil Code
          Section 1798.83, where applicable.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          11. Children
        </h2>
        <p>
          The Site is not directed to children under 16, and we do not knowingly
          collect personal information from children.
        </p>

        <h2 className="pt-6 text-xl font-bold text-slate-900">
          12. Changes
        </h2>
        <p>
          We may update this policy from time to time. We will post the updated
          version on this page and update the effective date.
        </p>

        <p className="pt-8 text-xs text-slate-500">
          This policy is informational and not legal advice. For product terms,
          see our{" "}
          <Link href="/terms" className="text-emerald-600 underline">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
