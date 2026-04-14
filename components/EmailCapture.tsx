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
    <section className="mx-auto max-w-3xl px-4 text-center sm:px-6">
      <div className="rounded-2xl border border-brand-surface bg-brand-surface px-6 py-10 sm:px-10">
        <h2 className="text-center font-condensed text-2xl font-bold tracking-tight text-brand-bone sm:text-3xl">
          Rate Alert: We&apos;ll Notify You When Rates Change
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-brand-muted">
          High-yield savings rates change frequently. Enter your email and
          we&apos;ll alert you when top rates move so you never miss a better
          deal.
        </p>
        {done ? (
          <p className="mt-8 text-center text-lg font-semibold text-brand-gold">
            Thank you — you&apos;re on the list.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-center sm:flex-row"
          >
            <input
              type="email"
              required
              name="email"
              autoComplete="email"
              placeholder="you@email.com"
              className="w-full flex-1 rounded-lg border border-brand-surface bg-brand-card px-3 py-3 text-sm text-brand-bone placeholder:text-brand-muted outline-none ring-brand-gold/30 focus:border-brand-gold focus:ring-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-gold px-5 py-3 font-condensed text-sm font-bold text-brand-black transition hover:opacity-90"
            >
              Notify Me
            </button>
          </form>
        )}
        <p className="mt-4 text-center text-xs text-brand-muted">
          No spam. Unsubscribe anytime. See our{" "}
          <Link href="/privacy" className="text-brand-gold underline hover:text-brand-bone">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
