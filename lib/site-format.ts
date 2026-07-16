// Formatting helpers used by the public instructor-site renderer — ported from
// driive-admin/lib/format.ts (only the money/name helpers; no date-fns here).

/** Pence -> "£34.00". Money is always stored as integer minor units. */
function gbp(pence: number | null | undefined): string {
  const p = pence ?? 0;
  return `£${(p / 100).toFixed(2)}`;
}

/** Pence -> "£34" (drops .00 for whole pounds). Nicer for headline stats. */
export function gbpShort(pence: number | null | undefined): string {
  const p = pence ?? 0;
  return p % 100 === 0 ? `£${p / 100}` : gbp(p);
}

/**
 * Title-case a PERSON's display name so "mohammed choudhury" / "JACK WILSON"
 * render as "Mohammed Choudhury" / "Jack Wilson". Mixed-case input is left
 * untouched (respects intentional casing like "McDonald" / "de Souza").
 * People only — never call this on business_name / school_name / car labels.
 */
export function titleCaseName(name: string | null | undefined): string {
  const trimmed = (name ?? "").trim().replace(/\s+/g, " ");
  if (!trimmed) return "";
  const hasLower = /[a-z]/.test(trimmed);
  const hasUpper = /[A-Z]/.test(trimmed);
  if (hasLower && hasUpper) return trimmed; // intentional casing — leave as-is
  return trimmed
    .toLowerCase()
    .replace(/(^|[\s'’-])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

export function initials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
