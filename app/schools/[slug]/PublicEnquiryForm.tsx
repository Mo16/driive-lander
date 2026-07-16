"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2, Loader2, ShieldCheck, User, Phone, Mail, MapPin,
  CalendarClock, GraduationCap, Send,
} from "lucide-react";
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
      <div className="flex animate-fade-in flex-col items-center gap-3 rounded-2xl bg-success-light/60 px-6 py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </span>
        <h2 className="text-xl font-bold text-ink">Thanks, {form.full_name.split(" ")[0] || "there"}!</h2>
        <p className="max-w-sm text-sm text-muted">
          Your enquiry has been sent to {branding.business_name}. They&apos;ll be in touch very soon to
          get you started.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <IconField label="Your name" icon={User} error={showErr("full_name")}>
        <input
          className={inputCls(showErr("full_name"))}
          required
          autoComplete="name"
          value={form.full_name}
          onChange={(e) => set("full_name", e.target.value)}
          onBlur={() => blur("full_name")}
          placeholder="e.g. Alex Taylor"
        />
      </IconField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <IconField label="Phone" icon={Phone} error={showErr("phone")}>
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
        </IconField>
        <IconField label="Email" icon={Mail} error={showErr("email")}>
          <input
            className={inputCls(showErr("email"))}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            placeholder="you@email.com"
          />
        </IconField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <IconField label="Postcode" icon={MapPin} error={showErr("postcode")}>
          <input
            className={inputCls(showErr("postcode"))}
            autoComplete="postal-code"
            value={form.postcode}
            onChange={(e) => set("postcode", e.target.value.toUpperCase())}
            onBlur={() => blur("postcode")}
            placeholder="e.g. M1 4WT"
          />
        </IconField>
        {transOptions.length > 1 && (
          <div>
            <label className={labelCls}>Gearbox</label>
            <div className="flex rounded-xl border border-line bg-primary-soft p-1">
              {transOptions.map((o) => {
                const active = form.transmission === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => set("transmission", o.value)}
                    className={cn(
                      "flex-1 rounded-lg px-2 py-2 text-sm font-semibold transition-all active:scale-95",
                      active ? "bg-primary text-white shadow-glow" : "text-muted hover:text-primary",
                    )}
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
        <IconField label="When do you want to start?" icon={CalendarClock}>
          <select
            className={inputCls() + " appearance-none pr-8"}
            value={form.preferred_start}
            onChange={(e) => set("preferred_start", e.target.value)}
          >
            <option value="">Choose…</option>
            {START_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </IconField>
        <IconField label="Your experience" icon={GraduationCap}>
          <select
            className={inputCls() + " appearance-none pr-8"}
            value={form.experience}
            onChange={(e) => set("experience", e.target.value)}
          >
            <option value="">Choose…</option>
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </IconField>
      </div>

      <div>
        <label className={labelCls}>Anything else? <span className="font-normal text-muted">(optional)</span></label>
        <textarea
          className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-subtle outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[88px]"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Availability, goals, questions…"
        />
      </div>

      {/* Honeypot field, hidden from humans. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      {serverError && (
        <p className="animate-fade-in rounded-xl bg-danger-light px-3 py-2 text-sm font-medium text-danger">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-bold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-primary-dark active:translate-y-0 active:scale-[.99] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
      >
        {busy ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
        Send my enquiry
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-subtle">
        <ShieldCheck className="h-3.5 w-3.5" />
        No spam — your details go straight to {branding.business_name}.
      </p>
    </form>
  );
}

// --- Field primitives --------------------------------------------------------
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";

function inputCls(err?: string): string {
  return cn(
    "peer w-full rounded-xl border bg-surface pl-10 pr-3.5 h-11 text-sm text-ink placeholder:text-subtle outline-none transition focus:ring-2",
    err
      ? "border-danger focus:border-danger focus:ring-danger/20"
      : "border-line focus:border-primary focus:ring-primary/20",
  );
}

function IconField({
  label, icon: Icon, error, children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="group relative">
        <Icon
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
            error ? "text-danger" : "text-subtle group-focus-within:text-primary",
          )}
        />
        {children}
      </div>
      {error && <span className="mt-1 block text-xs font-medium text-danger">{error}</span>}
    </div>
  );
}
