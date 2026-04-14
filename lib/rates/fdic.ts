import type { FdicInstitutionSnapshot } from "@/lib/rates/types";

type FdicInstitutionsResponse = {
  data?: Array<{ data?: Record<string, unknown> }>;
};

export async function fetchFdicInstitutionByCert(
  cert: string
): Promise<FdicInstitutionSnapshot> {
  const url = new URL("https://banks.data.fdic.gov/api/institutions");
  url.searchParams.set("filters", `CERT:${cert}`);
  url.searchParams.set("fields", "NAME,ACTIVE,CERT,INSFDIC");
  url.searchParams.set("limit", "1");

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (compatible; APYSavingsCalculator/1.0; +https://apysavingscalculator.com)",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      return { verified: false };
    }
    const body = (await res.json()) as FdicInstitutionsResponse;
    const row = body.data?.[0]?.data;
    if (!row) {
      return { verified: false };
    }
    const name = typeof row.NAME === "string" ? row.NAME : undefined;
    const active = row.ACTIVE === 1 || row.ACTIVE === "1";
    const insfdic = row.INSFDIC === 1 || row.INSFDIC === "1";
    const verified = Boolean(active && insfdic);
    return { verified, officialName: name, active, insfdic };
  } catch {
    return { verified: false };
  }
}
