import { NextResponse } from "next/server";

import { fetchFdicInstitutionByCert } from "@/lib/rates/fdic";

export const dynamic = "force-dynamic";

type RouteContext = { params: { cert: string } };

export async function GET(_request: Request, context: RouteContext) {
  const cert = decodeURIComponent(context.params.cert ?? "").trim();
  if (!/^\d+$/.test(cert)) {
    return NextResponse.json({ error: "Invalid cert" }, { status: 400 });
  }

  const fdic = await fetchFdicInstitutionByCert(cert);
  return NextResponse.json({
    cert,
    verified: fdic.verified,
    officialName: fdic.officialName,
    active: fdic.active,
    insfdic: fdic.insfdic,
  });
}
