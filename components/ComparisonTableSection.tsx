"use client";

import { useEffect, useState } from "react";
import type { Offer } from "@/lib/offers";
import type { RatesApiResponse } from "@/lib/rates/types";
import { RateDisclaimer } from "@/components/RateDisclaimer";

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
    <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
      FDIC Verified ✓
    </span>
  ) : (
    <span className="ml-2 inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
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
    <section id="compare" className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
        Top High-Yield Savings Accounts Compared
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm font-medium text-slate-700">
        National average savings rate:{" "}
        <span className="font-semibold text-slate-900">
          {rates.nationalAverageSavingsAPY.toFixed(2)}%
        </span>
      </p>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3 sm:px-6">Account Name</th>
              <th className="px-4 py-3 sm:px-6">Advertised APY (up to)</th>
              <th className="px-4 py-3 sm:px-6">Key Feature</th>
              <th className="px-4 py-3 sm:px-6">Open Account</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {offers.map((o) => {
              const bank = certByName.get(o.name);
              const cert = bank?.fdicCertNumber ?? "";
              return (
                <tr key={o.name} className="text-slate-800">
                  <td className="px-4 py-4 font-medium sm:px-6">
                    <span className="inline-flex flex-wrap items-center gap-y-1">
                      {o.name}
                      {cert ? (
                        <FdicBadge
                          cert={cert}
                          initialVerified={Boolean(bank?.fdicVerified)}
                        />
                      ) : null}
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <span className="font-semibold text-slate-900">
                      Up to {o.apy.toFixed(2)}%
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
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">
        Rates last verified: {lastVerifiedLabel}
      </p>
      <p className="mt-1 text-center text-[11px] text-slate-500">
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
      <ul className="mx-auto mt-4 max-w-3xl list-disc space-y-2 pl-5 text-xs text-slate-600">
        <li>
          Individual bank APY rates are advertised rates verified monthly.
          Actual rates may vary — always verify on the bank&apos;s website
          before opening an account.
        </li>
        <li>
          National average rate sourced from Federal Reserve H.15 statistical
          release, updated weekly.
        </li>
        <li>
          FDIC insurance status verified via FDIC BankFind public database.
        </li>
      </ul>
      <div className="mx-auto mt-8 flex max-w-4xl items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-xs text-slate-500">
        {/* DISPLAY AD UNIT — INSERT ADSENSE CODE HERE */}
        <span>728×90 display ad placeholder</span>
      </div>
    </section>
  );
}
