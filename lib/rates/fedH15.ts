const FED_H15_JSON_URL =
  "https://www.federalreserve.gov/datadownload/Output.aspx?rel=H15&series=e372d9c85f810b34d85573b2bdcce363&lastobs=1&startdate=&enddate=&filetype=json&label=include&layout=seriescolumn";

const FETCH_HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (compatible; APYSavingsCalculator/1.0; +https://apysavingscalculator.com)",
  Accept: "application/json,text/plain,*/*",
};

function isPlausibleNationalSavingsApy(n: number): boolean {
  return Number.isFinite(n) && n >= 0 && n <= 8;
}

function collectObservations(node: unknown, out: number[]): void {
  if (node === null || node === undefined) return;

  if (Array.isArray(node)) {
    for (const item of node) {
      if (Array.isArray(item) && item.length >= 2) {
        const raw = item[item.length - 1];
        const v =
          typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
        if (isPlausibleNationalSavingsApy(v)) out.push(v);
      } else {
        collectObservations(item, out);
      }
    }
    return;
  }

  if (typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (Array.isArray(obj.obs)) {
      collectObservations(obj.obs, out);
    }
    for (const value of Object.values(obj)) {
      collectObservations(value, out);
    }
  }
}

export function parseFedH15NationalSavingsApy(jsonText: string): number | null {
  const trimmed = jsonText.trim();
  if (!trimmed || trimmed.startsWith("<")) return null;
  try {
    const parsed: unknown = JSON.parse(trimmed);
    const values: number[] = [];
    collectObservations(parsed, values);
    if (!values.length) return null;
    return values[values.length - 1] ?? null;
  } catch {
    return null;
  }
}

export async function fetchFedH15NationalSavingsApy(): Promise<{
  apy: number;
  asOf?: string;
} | null> {
  const res = await fetch(FED_H15_JSON_URL, {
    headers: FETCH_HEADERS,
    cache: "no-store",
  });
  const text = await res.text();
  const apy = parseFedH15NationalSavingsApy(text);
  if (apy === null) return null;
  return { apy, asOf: new Date().toISOString() };
}
