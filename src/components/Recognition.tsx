import { awards, memberships } from "@/content/credentials";
import { Badge, Heading, Reveal, Section } from "./ui";

const groups = [
  { k: "Award", label: "Awards and honours" },
  { k: "Fellowship", label: "Fellowships" },
  { k: "Appreciation", label: "Institutional appreciation and recognition" },
] as const;

export function Recognition() {
  return (
    <Section id="recognition" tone="surface">
      <Heading id="recognition" lead="Awards are named with the body that gave them, since they come from foundations and conferences of differing standing. Fellowships and institutional appreciation are shown separately.">
        Honours, and the professional bodies behind them.
      </Heading>
      {groups.map((g) => {
        const rows = awards.filter((a) => a.kind === g.k);
        return (
          <div key={g.k} className="mb-16">
            <h3 className="text-3xl">{g.label}</h3>
            <ul className="mt-6">
              {rows.map((a) => (
                <Reveal key={a.title}>
                  <li className="grid gap-x-8 gap-y-1 border-t border-[var(--line)] py-6 md:grid-cols-[11rem_1fr]">
                    <span className="num text-xl text-brassink">{a.year}</span>
                    <div>
                      <h4 className="text-[1.5rem] leading-snug">{a.title}</h4>
                      <p className="mt-1 text-ink2">{a.by}</p>
                      {a.detail && <p className="mt-2 text-[0.95rem] text-muted">{a.detail}</p>}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        );
      })}

      <h3 id="memberships" className="mt-24 text-3xl">Professional memberships</h3>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
        {memberships.map((m) => (
          <li key={m.body + m.grade} className="flex flex-col bg-paper p-6">
            <Badge tone="sage">{m.grade}</Badge>
            <p className="mt-4 font-serif text-xl leading-snug">{m.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
