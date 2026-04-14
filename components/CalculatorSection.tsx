"use client";

import { useEffect, useMemo, useState } from "react";
import type { Offer } from "@/lib/offers";
import { getPrimaryOffer } from "@/lib/offers";
import { RateDisclaimer } from "./RateDisclaimer";

type TimeframeYears = 1 | 3 | 5;

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function compoundInterestEarned(
  balance: number,
  apyPercent: number,
  years: number
): number {
  if (balance <= 0 || years <= 0) return 0;
  const r = apyPercent / 100;
  return balance * (Math.pow(1 + r, years) - 1);
}

function periodLabel(years: number): string {
  if (years === 1) return "this year";
  return `over ${years} years`;
}

export function CalculatorSection({ offers }: { offers: Offer[] }) {
  const primary = useMemo(() => getPrimaryOffer(offers), [offers]);

  const [balanceInput, setBalanceInput] = useState("10000");
  const [apyInput, setApyInput] = useState("0.46");
  const [ratesLoaded, setRatesLoaded] = useState(false);
  const [timeframe, setTimeframe] = useState<TimeframeYears>(1);
  const [showResult, setShowResult] = useState(false);
  const [bankEarn, setBankEarn] = useState(0);
  const [betterEarn, setBetterEarn] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/rates")
      .then((r) => r.json())
      .then((data: { nationalAverageSavingsAPY?: number }) => {
        if (cancelled) return;
        const n = data.nationalAverageSavingsAPY;
        if (typeof n === "number" && Number.isFinite(n)) {
          setApyInput(n.toFixed(2));
        }
        setRatesLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setRatesLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function parseBalance(raw: string): number {
    const n = Number(String(raw).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function formatBalanceDisplay(raw: string): string {
    if (!raw) return "";
    const n = parseBalance(raw);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function parseApy(raw: string): number {
    const n = Number(String(raw).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function calculate() {
    const balance = parseBalance(balanceInput);
    const apy = parseApy(apyInput);
    const years = timeframe;
    const bank = compoundInterestEarned(balance, apy, years);
    const better = compoundInterestEarned(balance, primary.apy, years);
    setBankEarn(bank);
    setBetterEarn(better);
    setShowResult(true);
  }

  const leftOnTable = Math.max(0, betterEarn - bankEarn);
  function badgesFor(offer: Offer): string[] {
    const out: string[] = [];
    const joined = offer.features.join(" ");
    if (joined.includes("FDIC")) out.push("FDIC Insured");
    const min = offer.features.find((f) =>
      f.toLowerCase().includes("minimum")
    );
    if (min) out.push(min);
    else if (offer.features[0]) out.push(offer.features[0]);
    const quick = offer.features.find((f) => f.includes("3 minutes"));
    if (quick) out.push(quick);
    else out.push("Takes a few minutes to open");
    return out.slice(0, 3);
  }

  const uniqueBadges = badgesFor(primary);

  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300">
        <div
          className={`transition-opacity duration-300 ${showResult ? "hidden" : "block opacity-100"}`}
          aria-hidden={showResult}
        >
          <div className="space-y-5 p-6 sm:p-8">
            <div>
              <label
                htmlFor="balance"
                className="block text-sm font-medium text-slate-800"
              >
                Current Savings Balance
              </label>
              <input
                id="balance"
                inputMode="decimal"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none ring-emerald-500/30 focus:border-emerald-500 focus:ring-4"
                value={formatBalanceDisplay(balanceInput)}
                onChange={(e) => {
                  const digits = e.target.value.replace(/[^0-9]/g, "");
                  if (!digits) {
                    setBalanceInput("");
                    return;
                  }
                  setBalanceInput(digits.replace(/^0+(?=\d)/, ""));
                }}
              />
            </div>
            <div>
              <label
                htmlFor="apy"
                className="block text-sm font-medium text-slate-800"
              >
                Your Current APY
              </label>
              <div className="relative mt-1.5">
                <input
                  id="apy"
                  inputMode="decimal"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-8 text-slate-900 outline-none ring-emerald-500/30 focus:border-emerald-500 focus:ring-4"
                  value={apyInput}
                  onChange={(e) => setApyInput(e.target.value)}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>
              </div>
              {ratesLoaded ? (
                <p className="mt-1.5 text-xs text-slate-500">
                  Pre-filled with current national average savings rate from the
                  Federal Reserve
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="tf"
                className="block text-sm font-medium text-slate-800"
              >
                Timeframe
              </label>
              <select
                id="tf"
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-emerald-500/30 focus:border-emerald-500 focus:ring-4"
                value={timeframe}
                onChange={(e) =>
                  setTimeframe(Number(e.target.value) as TimeframeYears)
                }
              >
                <option value={1}>1 year</option>
                <option value={3}>3 years</option>
                <option value={5}>5 years</option>
              </select>
            </div>
            <button
              type="button"
              onClick={calculate}
              className="w-full rounded-xl bg-emerald-500 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            >
              Calculate What You&apos;re Missing
            </button>
            <RateDisclaimer />
          </div>
        </div>

        <div
          className={`transition-opacity duration-300 ${showResult ? "block opacity-100" : "hidden"}`}
          role="region"
          aria-live="polite"
        >
          <div className="animate-fade-in-up space-y-6 p-6 sm:p-8">
            <div className="space-y-3 text-center">
              <p className="text-lg font-semibold text-orange-600 sm:text-xl">
                Your bank will pay you:{" "}
                <span className="whitespace-nowrap">
                  {formatMoney(bankEarn)} {periodLabel(timeframe)}
                </span>
              </p>
              <p className="text-2xl font-bold text-emerald-600 sm:text-3xl">
                You could be earning:{" "}
                <span className="whitespace-nowrap">
                  {formatMoney(betterEarn)} {periodLabel(timeframe)}
                </span>
              </p>
              <p className="text-lg font-bold text-slate-900 sm:text-xl">
                That&apos;s {formatMoney(leftOnTable)} you&apos;re leaving on
                the table.
              </p>
              <p className="text-xs text-slate-500">
                This is not financial advice. Estimates use compound interest at
                the APYs entered and shown; actual earnings may differ.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/80 to-white p-5 sm:p-6">
              <h3 className="text-center text-lg font-bold text-slate-900 sm:text-xl">
                Based on your balance, here&apos;s our top recommendation:
              </h3>
              <div className="mt-4 flex flex-col items-center gap-2">
                <p className="text-2xl font-bold text-slate-900">{primary.name}</p>
                <p className="text-3xl font-extrabold text-emerald-600">
                  {primary.apy.toFixed(2)}% APY
                </p>
                <RateDisclaimer />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {uniqueBadges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <a
                href={primary.affiliateLink}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-emerald-600"
              >
                {primary.name.toLowerCase().includes("sofi")
                  ? `Open a SoFi Account and Earn ${formatMoney(betterEarn)} →`
                  : `Open ${primary.name} and Earn ${formatMoney(betterEarn)} →`}
              </a>
              <p className="mt-2 text-center text-[11px] text-slate-500">
                Affiliate disclosure: We earn a commission if you open an
                account. This never affects our recommendations.
              </p>
              <p className="mt-3 text-center text-sm text-slate-600">
                SoFi is one of the most popular high-yield savings accounts in
                the US
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowResult(false)}
              className="w-full text-center text-sm font-medium text-emerald-700 underline-offset-2 hover:underline"
            >
              Recalculate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
