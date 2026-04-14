import { get } from "@vercel/edge-config";

import type { RatesSnapshot } from "@/lib/rates/types";

const SNAPSHOT_KEY = "rates_snapshot";

function defaultFallbackApy(): number {
  const raw = process.env.NATIONAL_AVERAGE_FALLBACK_APY;
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 0.46;
}

export function emptySnapshot(nowIso: string): RatesSnapshot {
  return {
    nationalAverageSavingsAPY: defaultFallbackApy(),
    nationalAverageSource: "fallback",
    fdicByCert: {},
    lastCronSuccessAt: nowIso,
  };
}

export async function readRatesSnapshotFromEdge(): Promise<RatesSnapshot | null> {
  if (!process.env.EDGE_CONFIG) {
    return null;
  }
  try {
    const raw = await get<string | RatesSnapshot>(SNAPSHOT_KEY);
    if (!raw) return null;
    if (typeof raw === "string") {
      return JSON.parse(raw) as RatesSnapshot;
    }
    return raw as RatesSnapshot;
  } catch {
    return null;
  }
}

export async function patchEdgeConfigRatesSnapshot(
  snapshot: RatesSnapshot
): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = process.env.VERCEL_API_TOKEN;
  const edgeConfigUrl = process.env.EDGE_CONFIG;
  const explicitId = process.env.EDGE_CONFIG_ID;

  if (!token) {
    return { ok: false, error: "VERCEL_API_TOKEN is not set; skipping Edge Config write." };
  }

  const id =
    explicitId ??
    (edgeConfigUrl ? /ecfg_[a-z0-9]+/i.exec(edgeConfigUrl)?.[0] : undefined);
  if (!id) {
    return {
      ok: false,
      error: "Could not resolve EDGE_CONFIG_ID (set explicitly or use EDGE_CONFIG URL).",
    };
  }

  const teamId = process.env.VERCEL_TEAM_ID;
  const url = new URL(`https://api.vercel.com/v1/edge-config/${id}/items`);
  if (teamId) url.searchParams.set("teamId", teamId);

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          operation: "upsert",
          key: SNAPSHOT_KEY,
          value: JSON.stringify(snapshot),
        },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    return {
      ok: false,
      error: `Edge Config PATCH failed (${res.status}): ${errText || res.statusText}`,
    };
  }

  return { ok: true };
}
