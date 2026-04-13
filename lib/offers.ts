export type Offer = {
  name: string;
  apy: number;
  features: string[];
  affiliateLink: string;
  minBalance: number;
  maxBalance: number;
  commissionRank: number;
  /** Short label used in the homepage comparison table */
  tableFeature: string;
};

export function getPrimaryOffer(list: Offer[]): Offer {
  return [...list].sort((a, b) => a.commissionRank - b.commissionRank)[0];
}
