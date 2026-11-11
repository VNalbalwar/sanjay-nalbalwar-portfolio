"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { profile, profileLinks } from "@/content/profile";
import { ExternalLink, Heading, Section } from "./ui";

type State = { status: "idle" | "sending" | "sent" | "error"; error?: string; fields?: Record<string, string> };
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function Contact() {
  const [s, setS] = useState<State>({ status: "idle" });
  const form = useRef<HTMLFormElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setS({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(fd), turnstile: fd.get("cf-turnstile-response") ?? undefined }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; fields?: Record<string, string> };
      if (res.ok && data.ok) {
        form.current?.reset();
        setS({ status: "sent" });
      } else setS({ status: "error", error: data.error ?? "Something went wrong.", fields: data.fields });
    } catch {
      setS({ status: "error", error: "No connection. Check your network and send again." });
    }
  }

  const field = "w-full rounded-[3px] border border-[var(--line)] bg-paper px-4 py-3 transition focus:border-[var(--forest)] focus:outline-none";
  const err = (k: string) => s.fields?.[k] && <p id={`${k}-e`} className="mt-1 text-sm text-oxide">{s.fields[k]}</p>;

  return (
    <Section id="contact" tone="surface">
      <Heading id="contact" lead="For universities, publishers, conference organisers, researchers and institutions. Messages go to Prof. Nalbalwar's professional inbox.">
        Write to Prof. Nalbalwar.
      </Heading>
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-muted">Email</p>
          <a href={`mailto:${profile.email}`} className="link font-serif text-[1.6rem] break-all">{profile.email}</a>
          <p className="mt-10 text-muted">Find him on</p>
          <ul className="mt-2 space-y-1.5">
            {profileLinks.filter((l) => l.id === "linkedin" || l.id === "orcid" || l.id === "scholar").map((l) => (
              <li key={l.id}><ExternalLink href={l.url}>{l.label}</ExternalLink></li>
            ))}
          </ul>
        </div>

        <form ref={form} onSubmit={submit} noValidate className="grid gap-5 md:col-span-8 md:grid-cols-2" aria-describedby="form-status">
          <label className="block">Name
            <input name="name" required autoComplete="name" className={`${field} mt-1.5`} aria-invalid={!!s.fields?.name} aria-describedby="name-e" />
            {err("name")}
          </label>
          <label className="block">Email
            <input name="email" type="email" required autoComplete="email" className={`${field} mt-1.5`} aria-invalid={!!s.fields?.email} aria-describedby="email-e" />
            {err("email")}
          </label>
          <label className="block md:col-span-2">Institution or organisation <span className="text-muted">(optional)</span>
            <input name="organisation" autoComplete="organization" className={`${field} mt-1.5`} />
          </label>
          <label className="block md:col-span-2">Message
            <textarea name="message" required rows={6} className={`${field} mt-1.5`} aria-invalid={!!s.fields?.message} aria-describedby="message-e" />
            {err("message")}
          </label>
          <div aria-hidden className="absolute -left-[9999px]"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          {siteKey && <div className="cf-turnstile md:col-span-2" data-sitekey={siteKey} />}
          <div className="flex flex-wrap items-center gap-5 md:col-span-2">
            <button disabled={s.status === "sending"} className="flex items-center gap-2 rounded-full bg-[var(--forest)] px-8 py-3.5 text-[var(--forest-fg)] transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60">
              {s.status === "sending" && <Loader2 size={16} className="animate-spin" />} {s.status === "sending" ? "Sending" : "Send message"}
            </button>
            <p id="form-status" role="status" aria-live="polite" className={s.status === "error" ? "text-oxide" : "text-forest"}>
              {s.status === "sent" && (<span className="flex items-center gap-2"><Check size={16} /> Message sent. Thank you.</span>)}
              {s.status === "error" && s.error}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
