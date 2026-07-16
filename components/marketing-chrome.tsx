"use client";
import { usePathname } from "next/navigation";

/** Hides the Driive marketing nav/footer on instructor sites (/schools/[slug]). */
export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (/^\/schools\/[^/]+/.test(pathname)) return null;
  return <>{children}</>;
}
