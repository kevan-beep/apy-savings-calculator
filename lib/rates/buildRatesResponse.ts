import { BANK_RATE_CONFIG } from "@/lib/rateConfig";
import { fetchFedH15NationalSavingsApy } from "@/lib/rates/fedH15";
import { fetchFdicInstitutionByCert } from "@/lib/rates/fdic";
import type { RatesApiResponse, RatesSnapshot } from "@/lib/rates/types";
import { emptySnapshot, readRatesSnapshotFromEdge } from "@/lib/rates/edgeSnapshot";

function mergeFdic(
  prior: Record<string, RatesSnapshot["fdicByCert"][string]> | undefined,
  next: Record<string, RatesSnapshot["fdicByCert"][string]>
): RatesSnapshot["fdicByCert"] {
  const merged: RatesSnapshot["fdicByCert"] = { ...prior };
  for (const [cert, snap] of Object.entries(next)) {
    if (snap.verified) {
      merged[cert] = snap;
    } else if (!merged[cert]) {
      merged[cert] = snap;
    }
  }
  return merged;
}

function mergeNational(
  prior: RatesSnapshot | null,
  fresh: { apy: number; asOf?: string; source: RatesSnapshot["nationalAverageSource"] } | null
): Pick<RatesSnapshot, "nationalAverageSavingsAPY" | "nationalAverageSource" | "nationalAverageAsOf"> {
  if (fresh && fresh.source === "fed_h15") {
    return {
      nationalAverageSavingsAPY: fresh.apy,
      nationalAverageSource: "fed_h15",
      nationalAverageAsOf: fresh.asOf,
    };
  }
  if (prior && prior.nationalAverageSource === "fed_h15") {
    return {
      nationalAverageSavingsAPY: prior.nationalAverageSavingsAPY,
      nationalAverageSource: prior.nationalAverageSource,
      nationalAverageAsOf: prior.nationalAverageAsOf,
    };
  }
  const fallback = prior ?? emptySnapshot(new Date().toISOString());
  return {
    nationalAverageSavingsAPY: fallback.nationalAverageSavingsAPY,
    nationalAverageSource: "fallback",
    nationalAverageAsOf: fallback.nationalAverageAsOf,
  };
}

export async function collectLiveRatesSnapshot(
  prior: RatesSnapshot | null
): Promise<RatesSnapshot> {
  const nowIso = new Date().toISOString();
  const fed = await fetchFedH15NationalSavingsApy();
  const national = mergeNational(prior, fed ? { ...fed, source: "fed_h15" } : null);

  const fdicEntries = await Promise.all(
    BANK_RATE_CONFIG.map(async (b) => {
      const snap = await fetchFdicInstitutionByCert(b.fdicCert);
      return [b.fdicCert, snap] as const;
    })
  );
  const fdicNext = Object.fromEntries(fdicEntries);
  const fdicByCert = mergeFdic(prior?.fdicByCert, fdicNext);

  return {
    ...national,
    fdicByCert,
    lastCronSuccessAt: nowIso,
  };
}

export async function buildRatesApiResponse(): Promise<RatesApiResponse> {
  const edge = await readRatesSnapshotFromEdge();
  let snapshot = edge;

  if (!snapshot) {
    snapshot = await collectLiveRatesSnapshot(null);
  }

  const banks = BANK_RATE_CONFIG.map((b) => {
    const fdic = snapshot!.fdicByCert[b.fdicCert];
    return {
      name: b.name,
      fdicVerified: Boolean(fdic?.verified),
      advertisedAPY: b.advertisedAPY,
      fdicCertNumber: b.fdicCert,
      fdicOfficialName: fdic?.officialName,
    };
  });

  return {
    nationalAverageSavingsAPY: snapshot.nationalAverageSavingsAPY,
    nationalAverageSource: snapshot.nationalAverageSource,
    nationalAverageAsOf: snapshot.nationalAverageAsOf,
    lastUpdated: snapshot.lastCronSuccessAt,
    banks,
  };
}
