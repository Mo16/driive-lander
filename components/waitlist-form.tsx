"use client";

import { useState } from "react";
import Link from "next/link";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function WaitlistForm({
  variant = "blue",
  source = "site",
}: {
  /** "blue" for blue backgrounds, "light" for white/cream backgrounds */
  variant?: "blue" | "light";
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const onBlue = variant === "blue";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source }),
      });
      const data = await res.json();
      setStatus(data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`max-w-xl rounded-xl p-6 ${
          onBlue ? "bg-white/10 ring-1 ring-white/20" : "bg-[#2546F5]/5 ring-1 ring-[#2546F5]/15"
        }`}
      >
        <p
          className={`text-lg font-semibold ${
            onBlue ? "text-white" : "text-neutral-900"
          }`}
        >
          You&apos;re on the list.
        </p>
        <p
          className={`mt-1.5 text-sm leading-relaxed ${
            onBlue ? "text-[#F9D7E2]/90" : "text-neutral-500"
          }`}
        >
          We open access in waves — you&apos;ll get one email when it&apos;s
          your turn. No spam in the meantime.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <form
        onSubmit={submit}
        className={`flex items-center gap-1.5 rounded-full p-1.5 pl-6 ${
          onBlue
            ? "bg-white"
            : "border border-neutral-200 bg-white shadow-[0_20px_50px_-25px_rgba(37,70,245,0.35)]"
        }`}
      >
        <label htmlFor={`waitlist-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`waitlist-email-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.co.uk"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        />
        {/* honeypot — humans never see or fill this */}
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2546F5] px-6 py-3.5 text-[15px] font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Join the waitlist"}
          <Arrow />
        </button>
      </form>
      {status === "error" && (
        <p
          className={`mt-3 text-sm ${onBlue ? "text-white" : "text-neutral-700"}`}
        >
          That didn&apos;t go through — check the address and try again.
        </p>
      )}
      <p
        className={`mt-3 text-[13px] leading-relaxed ${
          onBlue ? "text-[#F9D7E2]/75" : "text-neutral-400"
        }`}
      >
        Free to join · No spam · By joining you agree to our{" "}
        <Link
          href="/privacy"
          className={`underline underline-offset-2 ${
            onBlue ? "hover:text-white" : "hover:text-neutral-600"
          }`}
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
