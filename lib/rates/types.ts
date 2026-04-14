export type FdicInstitutionSnapshot = {
  verified: boolean;
  officialName?: string;
  active?: boolean;
  insfdic?: boolean;
};

export type RatesSnapshot = {
  nationalAverageSavingsAPY: number;
  nationalAverageSource: "fed_h15" | "fallback";
  nationalAverageAsOf?: string;
  fdicByCert: Record<string, FdicInstitutionSnapshot>;
  lastCronSuccessAt: string;
};

export type RatesApiBank = {
  name: string;
  fdicVerified: boolean;
  advertisedAPY: number;
  fdicCertNumber: string;
  fdicOfficialName?: string;
};

export type RatesApiResponse = {
  nationalAverageSavingsAPY: number;
  nationalAverageSource: RatesSnapshot["nationalAverageSource"];
  nationalAverageAsOf?: string;
  lastUpdated: string;
  banks: RatesApiBank[];
};
