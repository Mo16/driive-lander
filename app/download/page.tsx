import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { meta } from "@/lib/meta";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { PageIntro } from "@/components/sections";
import { Arrow, CONTAINER } from "@/components/ui";

const DESCRIPTION =
  "Download Driive for iPhone and Android. Open this page on your phone and we'll take you straight to the right app store.";

export const metadata = meta("Get the Driive app", DESCRIPTION, "/download");

/** Match the OS from the request User-Agent so mobile visitors go straight to their store. */
function storeForUserAgent(ua: string): string | null {
  if (/iPhone|iPad|iPod/i.test(ua)) return APP_STORE_URL;
  if (/Android/i.test(ua)) return PLAY_STORE_URL;
  return null;
}

export default async function DownloadPage() {
  const ua = (await headers()).get("user-agent") ?? "";
  const store = storeForUserAgent(ua);
  // Phones jump straight to their store; everyone else sees the choice below.
  if (store) redirect(store);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/download",
            name: "Get the Driive app",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Get the app", path: "/download" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="Get the app"
        title="Download Driive"
        lede="On a phone? We'll send you straight to the right store. On desktop, pick your platform below — or open driive.app/download on your phone."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="flex max-w-xl flex-col gap-4">
            <StoreButton
              href={APP_STORE_URL}
              label="Download on the App Store"
              sublabel="For iPhone and iPad"
              icon={<AppleIcon />}
            />
            <StoreButton
              href={PLAY_STORE_URL}
              label="Get it on Google Play"
              sublabel="For Android phones"
              icon={<PlayIcon />}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function StoreButton({
  href,
  label,
  sublabel,
  icon,
}: {
  href: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-6 py-5 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center text-neutral-900">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-sm text-neutral-500">{sublabel}</span>
        <span className="text-lg font-medium text-neutral-900">{label}</span>
      </span>
      <Arrow className="ml-auto text-neutral-900 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 2.99-.75.86-1.98 1.52-3.02 1.44-.13-1.1.42-2.27 1.09-3.01.74-.83 2.03-1.46 3.05-1.42zM20.5 17.14c-.55 1.27-.81 1.84-1.52 2.96-.99 1.57-2.39 3.52-4.12 3.53-1.54.01-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.02-3.05-1.79-4.04-3.36C-.06 16.05-.35 10.9 1.66 8.16 3.06 6.2 5.22 5.06 7.24 5.06c2.06 0 3.35 1.12 5.05 1.12 1.65 0 2.65-1.13 5.03-1.13 1.8 0 3.71.98 5.07 2.68-4.45 2.44-3.73 8.79-1.89 9.41z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.02a1 1 0 0 0-.6.92v18.12a1 1 0 0 0 .6.92l10.2-9.99L3.6 2.02zM15.2 10.9 5.5 1.4l11.9 6.86-2.2 2.64zM17.4 15.74 5.5 22.6l9.7-9.5 2.2 2.64zM18.9 9.05l2.7 1.55a1 1 0 0 1 0 1.74l-2.7 1.56L16.3 12l2.6-2.95z" />
    </svg>
  );
}
