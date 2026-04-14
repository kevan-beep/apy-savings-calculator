import type { Offer } from "@/lib/offers";

export type BankRateConfigEntry = {
  name: string;
  fdicCert: string;
  advertisedAPY: number;
  lastVerified: string;
  affiliateLink: string;
  features: string[];
  commissionRank: number;
  tableFeature: string;
};

/**
 * Advertised APYs are maintained here (monthly). FDIC certs must match BankFind;
 * SoFi Bank, National Association is CERT 26881 (35546 is a different institution in BankFind).
 */
export const BANK_RATE_CONFIG: BankRateConfigEntry[] = [
  {
    name: "SoFi High Yield Savings",
    fdicCert: "26881",
    advertisedAPY: 4.5,
    lastVerified: "April 2026",
    affiliateLink: "[SOFI_AFFILIATE_LINK]",
    features: ["No minimum balance", "FDIC Insured", "Takes 3 minutes"],
    commissionRank: 1,
    tableFeature: "No minimum balance",
  },
  {
    name: "Marcus by Goldman Sachs",
    fdicCert: "33124",
    advertisedAPY: 4.4,
    lastVerified: "April 2026",
    affiliateLink: "[MARCUS_AFFILIATE_LINK]",
    features: ["No fees ever", "FDIC Insured", "Goldman Sachs backing"],
    commissionRank: 2,
    tableFeature: "No fees ever",
  },
  {
    name: "Ally Bank Online Savings",
    fdicCert: "57803",
    advertisedAPY: 4.35,
    lastVerified: "April 2026",
    affiliateLink: "[ALLY_AFFILIATE_LINK]",
    features: ["No minimum", "No fees", "24/7 support"],
    commissionRank: 3,
    tableFeature: "No minimum, no fees",
  },
];

export function bankConfigToOffers(config: BankRateConfigEntry[]): Offer[] {
  return [...config]
    .sort((a, b) => a.commissionRank - b.commissionRank)
    .map((b) => ({
      name: b.name,
      apy: b.advertisedAPY,
      features: b.features,
      affiliateLink: b.affiliateLink,
      minBalance: 0,
      maxBalance: 999999999,
      commissionRank: b.commissionRank,
      tableFeature: b.tableFeature,
    }));
}

export function ratesLastVerifiedLabel(config: BankRateConfigEntry[]): string {
  return config[0]?.lastVerified ?? "";
}
