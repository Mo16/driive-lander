import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: string; company?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field — pretend success, store nothing.
  if (body.company) return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "site").slice(0, 64);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  // 1) Persist to Supabase (if configured)
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } },
      );
      const { error } = await supabase
        .from("waitlist")
        .upsert({ email, source }, { onConflict: "email", ignoreDuplicates: true });
      if (error) console.error("[waitlist] supabase error:", error.message);
    } catch (err) {
      console.error("[waitlist] supabase failed:", err);
    }
  } else {
    console.log("[waitlist] signup (supabase not configured):", email, source);
  }

  // 2) Notify via Resend (if configured)
  if (process.env.RESEND_API_KEY && process.env.WAITLIST_NOTIFY_EMAIL) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? "Driive <onboarding@resend.dev>",
        to: process.env.WAITLIST_NOTIFY_EMAIL,
        subject: `New waitlist signup — ${email}`,
        text: `Email: ${email}\nSource: ${source}\nTime: ${new Date().toISOString()}`,
      });
    } catch (err) {
      console.error("[waitlist] resend failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
