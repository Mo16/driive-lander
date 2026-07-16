/** Server-side theme derivation for instructor sites (spec §3.1). */
export interface SiteTheme {
  brand: string;
  accent: string;
  ctaText: string;
  vars: Record<string, string>;
}

export function sanitiseHex(raw: string | null | undefined, fallback: string): string {
  const v = (raw ?? "").trim();
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v) ? v : fallback;
}

/** WCAG relative luminance of a #RGB/#RRGGBB colour, 0 (black) .. 1 (white). */
export function relativeLuminance(hex: string): number {
  let h = hex.slice(1);
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function siteTheme(brandRaw: string | null | undefined, accentRaw: string | null | undefined): SiteTheme {
  const brand = sanitiseHex(brandRaw, "#2546F5");
  const accent = sanitiseHex(accentRaw, "#F9D7E2");
  const ctaText = relativeLuminance(brand) < 0.45 ? "#FFFFFF" : "#221F1B";
  return {
    brand, accent, ctaText,
    vars: {
      "--brand": brand,
      "--paper": `color-mix(in oklab, ${brand} 6%, #FAF8F4)`,
      "--wash": `color-mix(in oklab, ${brand} 16%, #F5F1EA)`,
      "--wash-deep": `color-mix(in oklab, ${brand} 32%, #EDE8DE)`,
      "--ink": `color-mix(in oklab, ${brand} 14%, #1D1B18)`,
      "--brand-deep": `color-mix(in oklab, ${brand} 60%, #1D1B18)`,
      "--cta-text": ctaText,
      "--accent": accent,
    },
  };
}
