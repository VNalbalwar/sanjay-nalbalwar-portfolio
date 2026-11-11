import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.email("Enter a valid email address").max(200),
  organisation: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(20, "Write at least 20 characters").max(4000),
  website: z.string().max(0).optional().default(""), // honeypot: real people leave it empty
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

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "Messaging is not configured yet. Please email directly." }, { status: 503 });

  try {
    const { error } = await new Resend(key).emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Website contact <onboarding@resend.dev>",
      to,
      replyTo: d.email,
      subject: `Website enquiry from ${d.name}${d.organisation ? `, ${d.organisation}` : ""}`,
      text: `From: ${d.name} <${d.email}>\nOrganisation: ${d.organisation || "—"}\n\n${d.message}`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The message could not be sent. Please try again or email directly." }, { status: 502 });
  }
}
