import { ImageResponse } from "next/og";
import { BLUE, INK, PINK } from "@/lib/brand";
import {
  DEFAULT_DESCRIPTION,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/site";

export const alt = SOCIAL_IMAGE_ALT;
export const size = {
  width: SOCIAL_IMAGE_WIDTH,
  height: SOCIAL_IMAGE_HEIGHT,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BLUE,
          color: PINK,
          fontFamily: "Arial, sans-serif",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: PINK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="54" height="54" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 23.5C14.5 22 20.5 16 22.5 8.5"
                  stroke={BLUE}
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeDasharray="4.5 4.5"
                />
              </svg>
            </div>
            <div style={{ fontSize: 46, fontWeight: 700 }}>Driive</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                fontSize: 86,
                lineHeight: 0.96,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                maxWidth: 900,
              }}
            >
              Driving instructor software for diary, payments and progress.
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.35,
                maxWidth: 900,
                color: "rgba(249, 215, 226, 0.86)",
              }}
            >
              {DEFAULT_DESCRIPTION}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 64,
            bottom: 64,
            display: "flex",
            gap: 18,
          }}
        >
          {["Diary", "Payments", "DVSA progress"].map((item) => (
            <div
              key={item}
              style={{
                borderRadius: 999,
                background: PINK,
                color: INK,
                fontSize: 22,
                fontWeight: 700,
                padding: "16px 24px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
