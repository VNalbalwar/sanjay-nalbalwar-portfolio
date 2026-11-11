import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Biography } from "@/components/Biography";
import { Journey } from "@/components/Journey";
import { Impact } from "@/components/Impact";
import { Research } from "@/components/Research";
import { Library } from "@/components/Library";
import { Books } from "@/components/Books";
import { Scholars } from "@/components/Scholars";
import { Patents } from "@/components/Patents";
import { Projects } from "@/components/Projects";
import { Leadership } from "@/components/Leadership";
import { Innovation } from "@/components/Innovation";
import { Service } from "@/components/Service";
import { Recognition } from "@/components/Recognition";
import { Engagement } from "@/components/Engagement";
import { Teaching } from "@/components/Teaching";
import { Reflections } from "@/components/Reflections";
import { Resources } from "@/components/Resources";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getOpenAlexMetrics, getPublications } from "@/lib/data";

export const revalidate = 86400;

export default async function Home() {
  const [metrics, pubs] = await Promise.all([getOpenAlexMetrics(), getPublications()]);
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Biography />
        <Journey />
        <Impact live={metrics} pubCount={pubs.items.length} />
        <Research items={pubs.items} />
        <Library items={pubs.items} live={pubs.live} retrieved={pubs.retrieved} />
        <Books />
        <Scholars />
        <Patents />
        <Projects />
        <Leadership />
        <Innovation />
        <Service />
        <Recognition />
        <Engagement />
        <Teaching />
        <Reflections />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
