import { projects } from "@/content/projects";
import { Badge, Heading, Pending, Reveal, Section } from "./ui";

const statusTone = { Completed: "sage", Ongoing: "brass", "Status not stated": "line" } as const;

export function Projects() {
  const research = projects.filter((p) => p.category === "Research" || p.category === "Innovation & Industry");
  const institutional = projects.filter((p) => p.category === "Laboratory & Infrastructure" || p.category === "Institutional Development");
  return (
    <Section id="projects">
      <Heading id="projects" lead="Individual research grants are kept apart from the large institutional programmes he coordinated, since they differ in kind and scale. Values and dates are as printed in the biodata.">
        Funded research, and funded institution-building.
      </Heading>

      <h3 className="text-3xl">Research and industry-sponsored projects</h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[46rem] text-left">
          <thead>
            <tr className="border-b border-[var(--ink)] text-[0.92rem] text-muted">
              <th className="py-3 pr-6 font-normal">Project</th>
              <th className="py-3 pr-6 font-normal">Funding agency</th>
              <th className="py-3 pr-6 font-normal">Value</th>
              <th className="py-3 pr-6 font-normal">Period</th>
              <th className="py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {research.map((p) => (
              <tr key={p.id} className="border-b border-[var(--line)] align-top">
                <td className="py-5 pr-6">
                  <span className="font-serif text-[1.15rem] leading-snug">{p.title}</span>
                  {!p.verified && <span className="mt-2 block"><Pending note={p.note} /></span>}
                </td>
                <td className="py-5 pr-6 text-ink2">{p.agency}</td>
                <td className="num py-5 pr-6 whitespace-nowrap text-xl">{p.value}</td>
                <td className="py-5 pr-6 text-ink2">{p.start}{p.end ? ` – ${p.end}` : ""}</td>
                <td className="py-5"><Badge tone={statusTone[p.status]}>{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-24 text-3xl">Laboratories, infrastructure and institutional development</h3>
      <div className="mt-8 grid gap-px overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-3">
        {institutional.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.06} className="flex flex-col bg-paper p-7">
            <p className="num text-[clamp(2rem,3.4vw,2.8rem)] leading-none text-forest">{p.value.replace("Rs. ", "₹").replace("Rs ", "₹")}</p>
            <h4 className="mt-4 text-[1.35rem] leading-snug">{p.title}</h4>
            <p className="mt-2 text-ink2">{p.agency}</p>
            {p.note && <p className="mt-3 text-[0.95rem] text-muted">{p.note}</p>}
            <div className="mt-auto flex items-center gap-3 pt-5 text-sm text-muted">
              <Badge tone={statusTone[p.status]}>{p.status}</Badge>
              <span>{p.start !== "—" ? p.start : ""}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
