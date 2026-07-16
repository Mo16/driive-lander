"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase-public";
import { cn } from "@/lib/cn";
import { titleCaseName } from "@/lib/site-format";
import type { EnquiryFormInfo } from "@/lib/site-types";

const START_OPTIONS = [
  "As soon as possible",
  "Within a few weeks",
  "In 1–3 months",
  "Just looking for info",
];
const EXPERIENCE_OPTIONS = [
  "Complete beginner",
  "Had a few lessons",
  "Coming back after a break",
  "Test already booked",
];

type Trans = "either" | "manual" | "automatic";

function transmissionOptions(taught: EnquiryFormInfo["transmission_taught"]): { value: Trans; label: string }[] {
  if (taught === "manual") return [{ value: "manual", label: "Manual" }];
  if (taught === "automatic") return [{ value: "automatic", label: "Automatic" }];
  return [
    { value: "either", label: "Either" },
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
  ];
}

// --- Validation --------------------------------------------------------------
function isUkPhone(raw: string): boolean {
  const v = raw.replace(/[^\d+]/g, "");
  return /^0\d{10}$/.test(v) || /^(?:\+?44)\d{10}$/.test(v);
}
function isEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}
function isUkPostcode(raw: string): boolean {
  return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(raw.trim());
}

type FormState = {
  full_name: string;
  phone: string;
  email: string;
  postcode: string;
  transmission: Trans;
  preferred_start: string;
  experience: string;
  message: string;
  company: string; // honeypot
};
type FieldKey = "full_name" | "phone" | "email" | "postcode";
type Errors = Partial<Record<FieldKey, string>>;

function validate(form: FormState): Errors {
  const e: Errors = {};
  const name = form.full_name.trim();
  if (!name) e.full_name = "Please enter your name";
  else if (name.length < 2) e.full_name = "That name looks too short";

  const hasPhone = !!form.phone.trim();
  const hasEmail = !!form.email.trim();
  if (!hasPhone && !hasEmail) e.phone = "Add a phone or email so we can reach you";
  else if (hasPhone && !isUkPhone(form.phone)) e.phone = "Enter a valid UK phone number";
  if (hasEmail && !isEmail(form.email)) e.email = "Enter a valid email address";
  if (form.postcode.trim() && !isUkPostcode(form.postcode)) e.postcode = "Enter a valid UK postcode";
  return e;
}

export function PublicEnquiryForm({
  code,
  branding,
  embed = false,
}: {
  code: string;
  branding: EnquiryFormInfo;
  embed?: boolean;
}) {
  const transOptions = transmissionOptions(branding.transmission_taught);
  const [form, setForm] = useState<FormState>({
    full_name: "",
    phone: "",
    email: "",
    postcode: "",
    transmission: transOptions[0].value,
    preferred_start: "",
    experience: "",
    message: "",
    company: "",
  });
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const errors = useMemo(() => validate(form), [form]);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function blur(k: FieldKey) {
    setTouched((t) => ({ ...t, [k]: true }));
  }
  function showErr(k: FieldKey): string | undefined {
    return touched[k] || submitAttempted ? errors[k] : undefined;
  }

  // When embedded, tell the parent how tall we are so the iframe can resize.
  useEffect(() => {
    if (!embed) return;
    function postHeight() {
      window.parent?.postMessage(
        { type: "driive:height", code, value: document.documentElement.scrollHeight },
        "*",
      );
    }
    postHeight();
    const ro = new ResizeObserver(postHeight);
    ro.observe(document.documentElement);
    window.addEventListener("load", postHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", postHeight);
    };
  }, [embed, code, done, errors, touched, submitAttempted]);

  // The page's "Choose" buttons (Task 4 prices grid) prefill the message.
  useEffect(() => {
    function onPrefill(e: Event) {
      const d = (e as CustomEvent<{ message: string }>).detail;
      if (d?.message) set("message", d.message);
    }
    window.addEventListener("driive:enquiry-prefill", onPrefill);
    return () => window.removeEventListener("driive:enquiry-prefill", onPrefill);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) return;
    setBusy(true);
    setServerError(null);
    const { error } = await createClient().rpc("submit_enquiry", {
      p_code: code,
      p_full_name: titleCaseName(form.full_name),
      p_phone: form.phone || null,
      p_email: form.email || null,
      p_postcode: form.postcode || null,
      p_transmission: form.transmission,
      p_message: form.message || null,
      p_preferred_start: form.preferred_start || null,
      p_experience: form.experience || null,
      p_hp: form.company || null,
    });
    setBusy(false);
    if (error) return setServerError(error.message);
    setDone(true);
  }

  if (done) {
    return (
      <div className="animate-fade-in flex flex-col items-center gap-3 rounded-xl bg-[var(--paper)] px-6 py-12 text-center">
        <svg viewBox="0 0 24 24" className="h-9 w-9 text-[var(--brand-deep)]" aria-hidden>
          <path
            d="M4.5 12.5 10 18 19.5 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="font-display text-2xl font-medium text-[var(--ink)]">
          Thanks, {form.full_name.split(" ")[0] || "there"}!
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-[color-mix(in_oklab,var(--ink)_72%,transparent)]">
          Your enquiry has been sent to {branding.business_name}. They&apos;ll be in touch very soon to
          get you started.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field label="Your name" error={showErr("full_name")}>
        <input
          className={inputCls(showErr("full_name"))}
          required
          autoComplete="name"
          value={form.full_name}
          onChange={(e) => set("full_name", e.target.value)}
          onBlur={() => blur("full_name")}
          placeholder="e.g. Alex Taylor"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Phone" error={showErr("phone")}>
          <input
            className={inputCls(showErr("phone"))}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value.replace(/[^\d\s+()-]/g, ""))}
            onBlur={() => blur("phone")}
            placeholder="07845 931234"
          />
        </Field>
        <Field label="Email" error={showErr("email")}>
          <input
            className={inputCls(showErr("email"))}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            placeholder="you@email.com"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={transOptions.length > 1 ? undefined : "sm:col-span-2"}>
          <Field label="Postcode" error={showErr("postcode")}>
            <input
              className={inputCls(showErr("postcode"))}
              autoComplete="postal-code"
              value={form.postcode}
              onChange={(e) => set("postcode", e.target.value.toUpperCase())}
              onBlur={() => blur("postcode")}
              placeholder="e.g. M1 4WT"
            />
          </Field>
        </div>
        {transOptions.length > 1 && (
          <div>
            <span className={labelCls}>Gearbox</span>
            <div
              role="group"
              aria-label="Gearbox"
              className="flex h-11 rounded-lg border border-[color-mix(in_oklab,var(--ink)_12%,transparent)] bg-[#FBFAF8] p-1"
            >
              {transOptions.map((o) => {
                const active = form.transmission === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => set("transmission", o.value)}
                    className={cn(
                      "flex-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand)]",
                      !active && "text-[color-mix(in_oklab,var(--ink)_60%,transparent)] hover:text-[var(--ink)]",
                    )}
                    style={active ? { backgroundColor: "var(--brand)", color: "var(--cta-text)" } : undefined}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="When do you want to start?">
          <div className="relative">
            <select
              className={cn(inputCls(), "appearance-none pr-9")}
              value={form.preferred_start}
              onChange={(e) => set("preferred_start", e.target.value)}
            >
              <option value="">Choose…</option>
              {START_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <Chevron />
          </div>
        </Field>
        <Field label="Your experience">
          <div className="relative">
            <select
              className={cn(inputCls(), "appearance-none pr-9")}
              value={form.experience}
              onChange={(e) => set("experience", e.target.value)}
            >
              <option value="">Choose…</option>
              {EXPERIENCE_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <Chevron />
          </div>
        </Field>
      </div>

      <Field label="Anything else?" optional>
        <textarea
          className={cn(baseControlCls(), "min-h-[92px] w-full py-2.5")}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Availability, goals, questions…"
        />
      </Field>

      {/* Honeypot field, hidden from humans. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      {serverError && (
        <p className="animate-fade-in rounded-lg bg-danger-light px-3 py-2 text-sm font-medium text-danger">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-medium transition-[filter] hover:brightness-[1.06] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand)]"
        style={{ backgroundColor: "var(--brand)", color: "var(--cta-text)" }}
      >
        {busy && <Spinner />}
        Send enquiry
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[color-mix(in_oklab,var(--ink)_58%,transparent)]">
        <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden>
          <path
            d="M2 6.4 4.8 9 10 3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        No spam — your details go straight to {branding.business_name}.
      </p>
    </form>
  );
}

// --- Field primitives ----------------------------------------------------------
const labelCls = "mb-1.5 block text-sm font-medium text-[var(--ink)]";

/** Warm input surface + brand focus, shared by inputs, selects and the textarea. */
function baseControlCls(err?: string): string {
  return cn(
    "rounded-lg border bg-[#FBFAF8] px-3.5 text-sm text-[var(--ink)] outline-none transition",
    "placeholder:text-[color-mix(in_oklab,var(--ink)_38%,transparent)] focus:ring-2",
    err
      ? "border-danger focus:border-danger focus:ring-danger/20"
      : "border-[color-mix(in_oklab,var(--ink)_12%,transparent)] focus:border-[var(--brand)] focus:ring-[color-mix(in_oklab,var(--brand)_25%,transparent)]",
  );
}

function inputCls(err?: string): string {
  return cn("h-11 w-full", baseControlCls(err));
}

function Field({
  label, error, optional, children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>
        {label}
        {optional && (
          <span className="font-normal text-[color-mix(in_oklab,var(--ink)_55%,transparent)]"> (optional)</span>
        )}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-danger">{error}</span>}
    </label>
  );
}

/** Bare hand-drawn chevron for the selects — no icon pack. */
function Chevron() {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden
      className="pointer-events-none absolute right-3.5 top-1/2 h-[7px] w-[11px] -translate-y-1/2 text-[color-mix(in_oklab,var(--ink)_48%,transparent)]"
    >
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 animate-spin" aria-hidden>
      <circle
        cx="8"
        cy="8"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="28 13"
      />
    </svg>
  );
}
