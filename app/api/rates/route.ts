import { NextResponse } from "next/server";

import { buildRatesApiResponse } from "@/lib/rates/buildRatesResponse";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const body = await buildRatesApiResponse();
    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (e) {
    console.error("[api/rates]", e);
    return NextResponse.json(
      { error: "Failed to build rates payload" },
      { status: 500 }
    );
  }
}
