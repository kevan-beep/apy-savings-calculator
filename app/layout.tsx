import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { DisclosureBar } from "@/components/DisclosureBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "APY Calculator",
    template: "%s | APY Calculator",
  },
  description:
    "Compare high-yield savings accounts and calculate how much more your cash could earn.",
  openGraph: {
    siteName: "APY Calculator",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} ${barlow.className} min-h-screen bg-brand-black text-brand-bone antialiased`}
      >
        <Header />
        <DisclosureBar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
