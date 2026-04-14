"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "apy_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-surface bg-brand-surface p-4 text-center shadow-lg sm:p-5"
      role="dialog"
      aria-label="Cookie notice"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-6">
        <p className="max-w-3xl text-sm leading-relaxed text-brand-bone">
          We use cookies and similar technologies to remember your preferences,
          measure traffic, and support affiliate disclosures required by law.
          By continuing, you agree to our use of cookies as described in our{" "}
          <Link href="/privacy" className="text-brand-gold underline hover:text-brand-bone">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-lg bg-brand-gold px-5 py-2.5 font-condensed text-sm font-bold text-brand-black transition hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
