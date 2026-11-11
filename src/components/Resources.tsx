import Link from "next/link";
import { profileLinks } from "@/content/profile";
import { ExternalLink, Heading, Section } from "./ui";

export function Resources() {
  return (
    <Section id="resources">
      <Heading id="resources">
        Resources and profile links.
      </Heading>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h3 className="text-3xl">Academic CV</h3>
          <p className="mt-3 text-ink2">Opens a print-ready page. Choose &ldquo;Save as PDF&rdquo; in the print dialog.</p>
          <Link href="/cv" className="mt-6 inline-block rounded-full bg-[var(--forest)] px-7 py-3.5 text-[var(--forest-fg)] transition hover:opacity-90 active:scale-[0.98]">
            Open the academic CV
          </Link>
        </div>
        <ul className="md:col-span-7">
          {profileLinks.map((l) => (
            <li key={l.id} className="flex items-baseline justify-between gap-6 border-t border-[var(--line)] py-4">
              <ExternalLink href={l.url} className="font-serif text-[1.35rem]">{l.label}</ExternalLink>
              <span className="text-right text-sm text-muted">{l.note ?? (l.kind === "research" ? "Research profile" : l.kind === "editorial" ? "Editorial profile" : "Professional network")}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
