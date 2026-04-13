"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="rounded-2xl bg-[#0F172A] px-6 py-10 text-white shadow-lg sm:px-10">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Rate Alert: We&apos;ll Notify You When Rates Change
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-slate-300">
          High-yield savings rates change frequently. Enter your email and
          we&apos;ll alert you when top rates move so you never miss a better
          deal.
        </p>
        {done ? (
          <p className="mt-8 text-center text-lg font-semibold text-emerald-400">
            Thank you — you&apos;re on the list.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
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
        <p className="mt-4 text-center text-xs text-slate-400">
          No spam. Unsubscribe anytime. See our{" "}
          <Link href="/privacy" className="text-emerald-400 underline">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
