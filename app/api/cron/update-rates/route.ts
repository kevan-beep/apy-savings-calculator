import { NextResponse } from "next/server";

import { BANK_RATE_CONFIG } from "@/lib/rateConfig";
import { collectLiveRatesSnapshot } from "@/lib/rates/buildRatesResponse";
import {
  patchEdgeConfigRatesSnapshot,
  readRatesSnapshotFromEdge,
} from "@/lib/rates/edgeSnapshot";

export const dynamic = "force-dynamic";

function authorizeCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization");
  const url = new URL(request.url);
  const qp = url.searchParams.get("secret");
  return auth === `Bearer ${secret}` || qp === secret;
}

export async function GET(request: Request) {
  if (!authorizeCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prior = await readRatesSnapshotFromEdge();
  const snapshot = await collectLiveRatesSnapshot(prior);

  console.log("[cron/update-rates] snapshot", {
    nationalAverageSavingsAPY: snapshot.nationalAverageSavingsAPY,
    nationalAverageSource: snapshot.nationalAverageSource,
    lastCronSuccessAt: snapshot.lastCronSuccessAt,
    banks: BANK_RATE_CONFIG.map((b) => ({
      cert: b.fdicCert,
      verified: Boolean(snapshot.fdicByCert[b.fdicCert]?.verified),
    })),
  });

  const patch = await patchEdgeConfigRatesSnapshot(snapshot);
  if (!patch.ok) {
    console.warn("[cron/update-rates] edge write:", patch.error);
    return NextResponse.json(
      {
        ok: false,
        warning: patch.error,
        snapshot,
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true, snapshot });
}
