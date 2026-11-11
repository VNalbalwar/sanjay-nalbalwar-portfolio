import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.email("Enter a valid email address").max(200),
  organisation: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(20, "Write at least 20 characters").max(4000),
  website: z.string().max(500).optional().default(""), // honeypot: real people leave it empty
  turnstile: z.string().optional(),
});

// Best-effort limiter per server instance; Turnstile is the real spam control on Vercel.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 4;
}

async function turnstileOk(token?: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: honeypot + rate limit only
  if (!token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }) });
  return ((await r.json()) as { success?: boolean }).success === true;
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The request could not be read." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    return NextResponse.json({ error: "Please check the highlighted fields.", fields }, { status: 422 });
  }
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // silently drop bots
  if (!(await turnstileOk(d.turnstile, ip))) return NextResponse.json({ error: "Spam check failed. Reload the page and try again." }, { status: 400 });

  // Gmail SMTP with an App Password (a normal Google password is rejected). Set in the host's env vars only.
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD?.replace(/\s+/g, "");
  const to = process.env.CONTACT_TO_EMAIL ?? user;
  if (!user || !pass || !to) return NextResponse.json({ error: "Messaging is not configured yet. Please email directly." }, { status: 503 });

  try {
    const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass }, connectionTimeout: 10_000, socketTimeout: 15_000 });
    await transport.sendMail({
      from: `"Website contact" <${user}>`,
      to,
      replyTo: `"${d.name.replace(/["\r\n]/g, "")}" <${d.email}>`,
      subject: `Website enquiry from ${d.name.replace(/[\r\n]/g, " ")}${d.organisation ? `, ${d.organisation.replace(/[\r\n]/g, " ")}` : ""}`,
      text: `From: ${d.name} <${d.email}>\nOrganisation: ${d.organisation || "—"}\n\n${d.message}`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The message could not be sent. Please try again or email directly." }, { status: 502 });
  }
}
