"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { Offer } from "@/lib/offers";

const GOAL_OPTIONS = [
  { emoji: "🏖️", label: "Build an Emergency Fund" },
  { emoji: "📈", label: "Grow Long-Term Wealth" },
  { emoji: "🏠", label: "Save for a Big Purchase" },
  { emoji: "🌱", label: "Just Getting Started" },
] as const;

const LABOUR_MESSAGES = [
  "Analyzing current market savings rates...",
  "Comparing 200+ high-yield account options...",
  "Calculating your personalized opportunity...",
  "Building your savings report...",
] as const;

const HIGH_YIELD_APY = 4.5;

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function parseBalanceDigits(raw: string): number {
  const n = Number(String(raw).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatBalanceDisplayFromDigits(digits: string): string {
  if (!digits) return "";
  const n = parseBalanceDigits(digits);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function goalEncouragement(goal: string): string {
  switch (goal) {
    case "Build an Emergency Fund":
      return "Building a real emergency fund starts with making your money work as hard as you do.";
    case "Grow Long-Term Wealth":
      return "Long-term wealth building starts with making your money work as hard as you do.";
    case "Save for a Big Purchase":
      return "Saving for that big purchase starts with making your money work as hard as you do.";
    case "Just Getting Started":
      return "Getting started on the right foot means making your money work as hard as you do.";
    default:
      return "Making your money work as hard as you do.";
  }
}

export function CalculatorSection({ offers }: { offers: Offer[] }) {
  void offers;

  const [currentStep, setCurrentStep] = useState(1);
  const [savingsGoal, setSavingsGoal] = useState("");
  const [currentBalance, setCurrentBalance] = useState(10_000);
  const [currentAPY, setCurrentAPY] = useState(0.46);
  const [isLoadingRate, setIsLoadingRate] = useState(true);
  const [illusionMsgIndex, setIllusionMsgIndex] = useState(0);

  const [balanceDigits, setBalanceDigits] = useState("10000");
  const [apyInput, setApyInput] = useState("0.46");

  const [contentOpacity, setContentOpacity] = useState(1);
  const [displayStep, setDisplayStep] = useState(1);
  const stepTransitionSkip = useRef(true);

  const [labourProgress, setLabourProgress] = useState(60);
  const [progressHidden, setProgressHidden] = useState(false);

  const [email, setEmail] = useState("");
  const [emailDone, setEmailDone] = useState(false);

  const [labourMsgOpacity, setLabourMsgOpacity] = useState(1);
  const labourFadePrimed = useRef(false);

  const progressPercent =
    currentStep === 1
      ? 20
      : currentStep === 2
        ? 40
        : currentStep === 3
          ? 60
          : currentStep === 4
            ? labourProgress
            : 100;

  useEffect(() => {
    if (stepTransitionSkip.current) {
      stepTransitionSkip.current = false;
      return;
    }
    setContentOpacity(0);
    const t = window.setTimeout(() => {
      setDisplayStep(currentStep);
      setContentOpacity(1);
    }, 300);
    return () => window.clearTimeout(t);
  }, [currentStep]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/rates")
      .then((r) => r.json())
      .then((data: { nationalAverageSavingsAPY?: number }) => {
        if (cancelled) return;
        const n = data.nationalAverageSavingsAPY;
        if (typeof n === "number" && Number.isFinite(n)) {
          setCurrentAPY(n);
          setApyInput(n.toFixed(2));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoadingRate(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (currentStep !== 5) {
      setProgressHidden(false);
      return;
    }
    const t = window.setTimeout(() => setProgressHidden(true), 500);
    return () => window.clearTimeout(t);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep !== 4) {
      labourFadePrimed.current = false;
      setLabourMsgOpacity(1);
      return;
    }

    setIllusionMsgIndex(0);
    setLabourProgress(60);

    const start = Date.now();
    const duration = 3200;

    const msgTimer = window.setInterval(() => {
      setIllusionMsgIndex((i) => (i + 1) % LABOUR_MESSAGES.length);
    }, 800);

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min(1, elapsed / duration);
      setLabourProgress(60 + (95 - 60) * t);
      if (t >= 1) window.clearInterval(progressTimer);
    }, 50);

    const doneTimer = window.setTimeout(() => {
      setCurrentStep(5);
    }, 3200);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progressTimer);
      clearTimeout(doneTimer);
    };
  }, [currentStep]);

  useEffect(() => {
    if (currentStep !== 4) return;

    if (!labourFadePrimed.current) {
      labourFadePrimed.current = true;
      setLabourMsgOpacity(1);
      return;
    }

    setLabourMsgOpacity(0);
    const t = window.setTimeout(() => setLabourMsgOpacity(1), 220);
    return () => window.clearTimeout(t);
  }, [currentStep, illusionMsgIndex]);

  function parseApy(raw: string): number {
    const n = Number(String(raw).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function onEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setEmailDone(true);
  }

  function scrollToCompare() {
    document.getElementById("compare")?.scrollIntoView({ behavior: "smooth" });
  }

  function resetAll() {
    setCurrentStep(1);
    setDisplayStep(1);
    setContentOpacity(1);
    stepTransitionSkip.current = true;
    setSavingsGoal("");
    setCurrentBalance(10_000);
    setCurrentAPY(0.46);
    setApyInput("0.46");
    setBalanceDigits("10000");
    setIsLoadingRate(true);
    setIllusionMsgIndex(0);
    setLabourMsgOpacity(1);
    labourFadePrimed.current = false;
    setLabourProgress(60);
    setProgressHidden(false);
    setEmail("");
    setEmailDone(false);

    fetch("/api/rates")
      .then((r) => r.json())
      .then((data: { nationalAverageSavingsAPY?: number }) => {
        const n = data.nationalAverageSavingsAPY;
        if (typeof n === "number" && Number.isFinite(n)) {
          setCurrentAPY(n);
          setApyInput(n.toFixed(2));
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingRate(false);
      });
  }

  const bankPaid = currentBalance * (currentAPY / 100);
  const highYieldPaid = currentBalance * (HIGH_YIELD_APY / 100);
  const difference = Math.max(0, highYieldPaid - bankPaid);

  return (
    <section className="mx-auto w-full max-w-[560px] px-0 sm:px-0">
      <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200/60">
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            progressHidden ? "pointer-events-none max-h-0 opacity-0" : "max-h-2 opacity-100"
          }`}
          aria-hidden={progressHidden}
        >
          <div className="h-1.5 w-full bg-navy">
            <div
              className="h-full bg-emerald-500 transition-[width] duration-[400ms] ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div
          className="transition-opacity duration-300 ease-in-out"
          style={{ opacity: contentOpacity }}
        >
          {displayStep === 1 ? (
            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold leading-tight text-navy sm:text-3xl">
                  What&apos;s your primary savings goal?
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  This helps us find the most relevant comparison for you.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GOAL_OPTIONS.map((g) => (
                  <button
                    key={g.label}
                    type="button"
                    onClick={() => {
                      setSavingsGoal(g.label);
                      setCurrentStep(2);
                    }}
                    className="flex flex-col items-center gap-2 rounded-xl border-2 border-navy bg-white px-3 py-5 text-center transition hover:border-emerald-500 hover:bg-emerald-50"
                  >
                    <span className="text-3xl" aria-hidden>
                      {g.emoji}
                    </span>
                    <span className="text-sm font-semibold leading-snug text-navy">
                      {g.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {displayStep === 2 ? (
            <div className="space-y-6 p-6 sm:p-8">
              <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
                How much do you currently have saved?
              </h2>
              <div>
                <label className="sr-only" htmlFor="calc-balance">
                  Current balance
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-navy">
                    $
                  </span>
                  <input
                    id="calc-balance"
                    inputMode="numeric"
                    className="w-full rounded-xl border-2 border-navy py-3 pl-10 pr-4 text-2xl font-semibold text-navy outline-none ring-emerald-500/25 focus:border-emerald-500 focus:ring-4"
                    value={formatBalanceDisplayFromDigits(balanceDigits)}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/[^0-9]/g, "");
                      if (!digits) {
                        setBalanceDigits("");
                        setCurrentBalance(0);
                        return;
                      }
                      const cleaned = digits.replace(/^0+(?=\d)/, "");
                      setBalanceDigits(cleaned);
                      setCurrentBalance(parseBalanceDigits(cleaned));
                    }}
                  />
                </div>
                <p className="mt-3 text-center text-sm text-slate-500">
                  Don&apos;t worry — this stays in your browser. We never store
                  your financial information.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="w-full rounded-xl bg-emerald-500 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-600"
              >
                Continue →
              </button>
            </div>
          ) : null}

          {displayStep === 3 ? (
            <div className="space-y-6 p-6 sm:p-8">
              <h2 className="text-center text-2xl font-bold text-navy sm:text-3xl">
                What interest rate is your bank currently paying you?
              </h2>
              <div>
                <label className="sr-only" htmlFor="calc-apy">
                  Current APY percent
                </label>
                <div className="relative">
                  <input
                    id="calc-apy"
                    inputMode="decimal"
                    disabled={isLoadingRate}
                    className="w-full rounded-xl border-2 border-navy py-3 pl-4 pr-10 text-2xl font-semibold text-navy outline-none ring-emerald-500/25 focus:border-emerald-500 focus:ring-4 disabled:opacity-60"
                    value={apyInput}
                    onChange={(e) => {
                      const v = e.target.value;
                      setApyInput(v);
                      setCurrentAPY(parseApy(v));
                    }}
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-slate-500">
                    %
                  </span>
                  {isLoadingRate ? (
                    <span
                      className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2"
                      aria-label="Loading rate"
                    >
                      <span className="inline-block size-5 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" />
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-center text-sm text-slate-500">
                  Pre-filled with the current national average savings rate from
                  the Federal Reserve. Most big bank customers earn even less.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="w-full rounded-xl bg-emerald-500 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-600"
              >
                See My Results →
              </button>
            </div>
          ) : null}

          {displayStep === 4 ? (
            <div
              className="pointer-events-none select-none space-y-6 px-6 py-14 sm:px-8 sm:py-16"
              aria-busy="true"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative flex size-20 items-center justify-center">
                  <div
                    className="absolute inset-0 animate-pulse rounded-full bg-emerald-400/25"
                    aria-hidden
                  />
                  <div
                    className="relative size-16 shrink-0 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"
                    role="status"
                  />
                </div>
                <p
                  className="min-h-[3.5rem] max-w-sm text-center text-lg font-medium text-navy transition-opacity duration-300 ease-in-out"
                  style={{ opacity: labourMsgOpacity }}
                >
                  {LABOUR_MESSAGES[illusionMsgIndex]}
                </p>
              </div>
            </div>
          ) : null}

          {displayStep === 5 ? (
            <div className="space-y-8 p-6 sm:p-8">
              <div className="space-y-4 text-center">
                <p className="text-xl font-bold text-navy sm:text-2xl">
                  Your bank paid you{" "}
                  <span className="whitespace-nowrap text-orange-500">
                    {formatMoney(bankPaid)}
                  </span>{" "}
                  this year.
                </p>
                <p className="text-2xl font-bold text-navy sm:text-3xl">
                  A high-yield account could have paid you{" "}
                  <span className="whitespace-nowrap text-emerald-600">
                    {formatMoney(highYieldPaid)}
                  </span>{" "}
                  instead.
                </p>
                <p className="text-3xl font-bold leading-tight text-navy sm:text-4xl">
                  That&apos;s{" "}
                  <span className="whitespace-nowrap">
                    {formatMoney(difference)}
                  </span>{" "}
                  still in your bank&apos;s pocket — not yours.
                </p>
                <p className="text-sm italic text-slate-500">
                  {goalEncouragement(savingsGoal)}
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToCompare}
                className="w-full rounded-xl bg-emerald-500 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-600"
              >
                See Today&apos;s Top Savings Rates →
              </button>

              <div className="rounded-xl bg-slate-100 p-4 sm:p-5">
                <p className="text-center text-sm font-medium text-navy">
                  📬 Want us to alert you when top rates change?
                </p>
                <p className="mt-1 text-center text-xs text-slate-600">
                  Enter your email below — we&apos;ll only write when it matters.
                </p>
                {emailDone ? (
                  <p className="mt-5 text-center text-sm font-semibold text-emerald-600">
                    Thank you — you&apos;re on the list.
                  </p>
                ) : (
                  <form
                    onSubmit={onEmailSubmit}
                    className="mx-auto mt-4 flex max-w-md flex-col gap-3 sm:flex-row"
                  >
                    <input
                      type="email"
                      required
                      name="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      className="w-full flex-1 rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-3 text-sm text-white placeholder:text-slate-500 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-4"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
                <p className="mt-3 text-center text-[11px] text-slate-500">
                  No sales emails. No spam. Unsubscribe instantly anytime.
                </p>
              </div>

              <button
                type="button"
                onClick={resetAll}
                className="w-full text-center text-sm font-medium text-emerald-700 underline-offset-2 hover:underline"
              >
                ← Start over with different numbers
              </button>

              <p className="text-center text-xs text-slate-500">
                This calculator provides estimates for informational purposes
                only. We are not a financial advisor. Rates shown are
                illustrative — always verify current rates directly with any
                financial institution before opening an account.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
