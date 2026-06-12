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

  // 1) Persist to Supabase (if configured). With ignoreDuplicates, the upsert
  // returns the row only when it was actually inserted — repeat signups come
  // back empty, so we skip re-sending the confirmation email.
  let isNewSignup = true;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } },
      );
      const { data, error } = await supabase
        .from("waitlist")
        .upsert({ email, source }, { onConflict: "email", ignoreDuplicates: true })
        .select("id");
      if (error) console.error("[waitlist] supabase error:", error.message);
      else isNewSignup = (data?.length ?? 0) > 0;
    } catch (err) {
      console.error("[waitlist] supabase failed:", err);
    }
  } else {
    console.log("[waitlist] signup (supabase not configured):", email, source);
  }

  // 2) Emails via Resend (if configured)
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM ?? "Driive <onboarding@resend.dev>";

    // Add to the marketing segment — every valid signup, not just new ones,
    // so resubmissions backfill contacts that predate this integration.
    // Resend dedupes contacts by email; failures are logged, never surfaced.
    if (process.env.RESEND_SEGMENT_ID) {
      try {
        const { error } = await resend.contacts.create({
          email,
          unsubscribed: false,
          segments: [{ id: process.env.RESEND_SEGMENT_ID }],
        });
        if (error) console.error("[waitlist] resend contact error:", error.message);
      } catch (err) {
        console.error("[waitlist] resend contact failed:", err);
      }
    }

    // Confirmation to the person signing up (first signup only)
    if (isNewSignup) {
      try {
        await resend.emails.send({
          from,
          to: email,
          subject: "You're on the Driive waitlist",
          text: [
            "You're on the waitlist.",
            "",
            "Thanks for joining. We'll email this address the moment Driive opens up — you'll be among the first instructors in.",
            "",
            "No action needed. Keep an eye on your inbox.",
            "",
            "— The Driive team",
            "",
            "You're receiving this because this address joined the waitlist at driive.app. If that wasn't you, you can ignore this email.",
          ].join("\n"),
          html: confirmationHtml(),
        });
      } catch (err) {
        console.error("[waitlist] confirmation email failed:", err);
      }
    }

    // Internal notification
    if (process.env.WAITLIST_NOTIFY_EMAIL) {
      try {
        await resend.emails.send({
          from,
          to: process.env.WAITLIST_NOTIFY_EMAIL,
          subject: `New waitlist signup — ${email}`,
          text: `Email: ${email}\nSource: ${source}\nNew: ${isNewSignup ? "yes" : "no (already on list)"}\nTime: ${new Date().toISOString()}`,
        });
      } catch (err) {
        console.error("[waitlist] resend failed:", err);
      }
    }
  }

  return NextResponse.json({ ok: true });
}

// Brand tokens from components/ui.tsx (BLUE / CREAM / INK) — email clients
// can't import them, so the hexes are repeated here, inline-styled.
function confirmationHtml(): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#F0EEE7;">
    <div style="background:#F0EEE7;padding:40px 16px;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:24px;padding:40px;">
        <p style="margin:0 0 28px;font-size:22px;font-weight:600;letter-spacing:-0.04em;color:#2546F5;">driive</p>
        <h1 style="margin:0 0 16px;font-size:26px;font-weight:600;letter-spacing:-0.03em;line-height:1.1;color:#0C0C0E;">You&rsquo;re on the waitlist.</h1>
        <p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#525252;">Thanks for joining. We&rsquo;ll email this address the moment Driive opens up &mdash; you&rsquo;ll be among the first instructors in.</p>
        <p style="margin:0;font-size:16px;line-height:1.6;color:#525252;">No action needed. Keep an eye on your inbox.</p>
        <p style="margin:32px 0 0;font-size:13px;line-height:1.5;color:#a3a3a3;">You&rsquo;re receiving this because this address joined the waitlist at <a href="https://driive.app" style="color:#a3a3a3;">driive.app</a>. If that wasn&rsquo;t you, you can ignore this email.</p>
      </div>
    </div>
  </body>
</html>`;
}
