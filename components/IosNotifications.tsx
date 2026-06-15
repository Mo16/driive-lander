import { BLUE, PINK, LogoMark } from "./ui";
import { RevealStack } from "./RevealStack";

export type IosAlert = { title: string; body: string; when: string };

/* iOS-style notification stack — the Driive app icon, bold title + timestamp,
   body beneath, on solid white (no glass/blur, per the design system). Each
   banner springs in one at a time via RevealStack, like Notification Center. */
export function IosNotifications({ alerts }: { alerts: IosAlert[] }) {
  return (
    <RevealStack
      className="w-full max-w-md space-y-2.5"
      step={1100}
      hold={4000}
      gap={800}
      loop
    >
      {alerts.map((alert) => (
        <div
          key={alert.title}
          className="flex items-start gap-3 rounded-[1.55rem] bg-white px-3.5 py-3 shadow-[0_18px_40px_-18px_rgba(12,12,14,0.35)]"
        >
          <LogoMark
            tile={BLUE}
            road={PINK}
            className="h-11 w-11 shrink-0 rounded-[24%]"
          />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-[15px] font-semibold tracking-tight text-neutral-900">
                {alert.title}
              </p>
              <span className="shrink-0 text-xs text-neutral-400">
                {alert.when}
              </span>
            </div>
            <p className="mt-0.5 text-sm leading-snug text-neutral-600">
              {alert.body}
            </p>
          </div>
        </div>
      ))}
    </RevealStack>
  );
}
