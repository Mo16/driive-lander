import localFont from "next/font/local";

/** Display face for instructor sites only — Sentient (Fontshare, self-hosted). */
export const sentient = localFont({
  src: [
    { path: "./fonts/sentient/Sentient-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/sentient/Sentient-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/sentient/Sentient-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/sentient/Sentient-MediumItalic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-sentient",
  display: "swap",
});
