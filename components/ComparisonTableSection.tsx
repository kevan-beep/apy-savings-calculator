"use client";

import { useEffect, useState } from "react";
import type { Offer } from "@/lib/offers";
import type { RatesApiResponse } from "@/lib/rates/types";
import { RateDisclaimer } from "@/components/RateDisclaimer";

const TIER_LABELS = [
  "Top Pick — Online Bank",
  "Strong Option — Online Bank",
  "Solid Choice — Online Bank",
] as const;

function FdicBadge({
  cert,
  initialVerified,
}: {
  cert: string;
  initialVerified: boolean;
}) {
  const [verified, setVerified] = useState(initialVerified);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/verify-fdic/${encodeURIComponent(cert)}`)
      .then((r) => r.json())
      .then((d: { verified?: boolean }) => {
        if (cancelled || typeof d.verified !== "boolean") return;
        setVerified(d.verified);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [cert]);

  return verified ? (
    <span
      title="FDIC Insured ✓"
      className="ml-2 inline-flex items-center rounded-full bg-brand-black px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-gold ring-1 ring-brand-gold/40"
    >
      FDIC Insured ✓
    </span>
  ) : (
    <span className="ml-2 inline-flex items-center rounded-full bg-brand-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-muted ring-1 ring-brand-surface">
      FDIC status unavailable
    </span>
  );
}

export function ComparisonTableSection({
  offers,
  rates,
  lastVerifiedLabel,
}: {
  offers: Offer[];
  rates: RatesApiResponse;
  lastVerifiedLabel: string;
}) {
  const certByName = new Map(rates.banks.map((b) => [b.name, b]));

  return (
    <section
      id="compare"
      className="border-y border-brand-surface bg-brand-black py-14"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center font-condensed text-2xl font-bold text-brand-bone sm:text-3xl">
          What High-Yield Savings Actually Pays
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-brand-muted">
          Most Americans earn near nothing on their savings. The accounts below
          are independently verified as FDIC-insured and currently offering rates
          dramatically above the national average. We don&apos;t name specific
          banks here — we verify the tier, you choose what&apos;s right for you.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm font-medium text-brand-muted">
          National average savings rate:{" "}
          <span className="font-semibold text-brand-bone">
            {rates.nationalAverageSavingsAPY.toFixed(2)}%
          </span>
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-surface bg-brand-card shadow-sm">
          <table className="min-w-full divide-y divide-brand-surface text-left text-sm">
            <thead className="bg-brand-surface text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-4 py-3 sm:px-6">Account tier</th>
                <th className="px-4 py-3 sm:px-6">Advertised APY (up to)</th>
                <th className="px-4 py-3 sm:px-6">Key Feature</th>
                <th className="px-4 py-3 sm:px-6">Learn More</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-surface bg-brand-card">
              {offers.map((o, index) => {
                const bank = certByName.get(o.name);
                const cert = bank?.fdicCertNumber ?? "";
                const tierLabel =
                  TIER_LABELS[index] ?? `Option ${index + 1} — Online Bank`;
                return (
                  <tr
                    key={o.name}
                    className="text-brand-bone transition-colors hover:bg-brand-surface/60"
                  >
                    <td className="px-4 py-4 font-medium sm:px-6">
                      <span className="inline-flex flex-wrap items-center gap-y-1">
                        {tierLabel}
                        {cert ? (
                          <FdicBadge
                            cert={cert}
                            initialVerified={Boolean(bank?.fdicVerified)}
                          />
                        ) : null}
                      </span>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span className="font-semibold text-brand-bone">
                        Up to {o.apy.toFixed(2)}%
                      </span>
                      <div className="mt-2 max-w-xs">
                        <RateDisclaimer className="text-brand-muted" />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-brand-muted sm:px-6">
                      {o.tableFeature}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <a
                        href={o.affiliateLink}
                        className="font-semibold text-brand-gold hover:text-brand-bone"
                      >
                        Learn More →
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-xs text-brand-muted">
          Rates last verified: {lastVerifiedLabel}
        </p>
        <p className="mt-1 text-center text-[11px] text-brand-muted">
          National average & FDIC checks last refreshed:{" "}
          {new Date(rates.lastUpdated).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          })}
        </p>
        <div className="mx-auto mt-4 max-w-3xl space-y-2 text-center text-xs leading-relaxed text-brand-muted">
          <p>
            • Individual bank APY rates are advertised rates verified monthly.
            Actual rates may vary — always verify on the bank&apos;s website
            before opening an account.
          </p>
          <p>
            • National average rate sourced from Federal Reserve H.15 statistical
            release, updated weekly.
          </p>
          <p>
            • FDIC insurance status verified via FDIC BankFind public database.
          </p>
        </div>
        <div className="mx-auto mt-8 flex max-w-4xl items-center justify-center rounded-lg border border-dashed border-brand-surface bg-brand-surface/50 px-4 py-6 text-center text-xs text-brand-muted">
          {/* DISPLAY AD UNIT — INSERT ADSENSE CODE HERE */}
          <span>728×90 display ad placeholder</span>
        </div>
      </div>
    </section>
  );
}
