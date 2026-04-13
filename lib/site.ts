export const SITE_URL = "https://apysavingscalculator.com";

export function ratesAsOfLabel(date: Date = new Date()): string {
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}
