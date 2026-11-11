# Prof. Sanjay L. Nalbalwar: academic portfolio and digital archive

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Recharts · Zod · Nodemailer (Gmail SMTP). Free tiers only.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

`dev` and `build` preload `scripts/ipv4.cjs`, which forces IPv4 DNS lookups. It fixes `EAI_AGAIN` stalls on
networks whose DNS is slow to answer IPv6 queries; it is harmless elsewhere. If `pnpm` fails with a DNS error on
such a network, use `npm` (as above).

## Architecture

```
src/content/   curated records (TypeScript). Edit these; no component changes needed.
src/lib/data.ts  live data: ORCID public API (publications) + OpenAlex (metrics), cached 24 h
src/components/  one component per section, shared primitives in ui.tsx
src/app/api/contact  validated, rate-limited, Turnstile-checked email via Nodemailer + Gmail
src/app/cv       print-ready academic CV (Save as PDF), built from the same records
```

### Data policy
- Every curated record has `verified: boolean`; unverified items show "Awaiting confirmation".
- Metrics are never merged: each source is shown with its retrieval date (`src/content/profile.ts`).
- Google Scholar, ResearchGate, LinkedIn, AD Index, Vidwan and Web of Science are **link-only** (no scraping).
  The Scholar row is a manual snapshot: update it from the public profile when you want it refreshed.
- Publications: three sources merge, with duplicates collapsed by DOI or title: ORCID (live), OpenAlex (live, with authors) and the curated biodata list (`publications-biodata.ts`).
  OpenAlex needs a free API key on shared hosts (`OPENALEX_API_KEY`); without one the site falls back to the dated copy in
  `src/content/openalex-snapshot.json`. Refresh that copy with `OPENALEX_API_KEY=... node scripts/refresh-openalex-snapshot.mjs`.
- To make new papers appear without effort, turn on ORCID auto-update (orcid.org → Works → Add works → Search & link) and keep the OpenAlex key set.

## Updating information
| Change | Edit |
|---|---|
| New paper | Add to ORCID (appears within 24 h) or `publications-biodata.ts` |
| Patent status change | `src/content/patents.ts` (`status`, dates, `verified`) |
| Award, membership, book | `src/content/credentials.ts` |
| Role, programme | `src/content/career.ts` |
| Project | `src/content/projects.ts` |
| Reflections (his words) | `src/content/reflections.ts` (`answer`) |
| Scholar metrics snapshot | `metricSources` in `src/content/profile.ts` |

Force a refresh of live data: redeploy, or wait for the 24 h revalidation.

## Environment variables
See `.env.example`. All secrets are server-side; only `NEXT_PUBLIC_*` values reach the browser.

## Deploy to Vercel (free Hobby plan)
1. Push to GitHub, import the repo at vercel.com/new.
2. Add the variables from `.env.example` in Project Settings → Environment Variables.
3. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the final URL and redeploy.

## Docker
```bash
cp .env.example .env.local   # fill in values
docker compose up --build    # http://localhost:3000
```

## Privacy
The source biodata PDF lives in `.private/` (git-ignored) because it contains phone numbers and referees' details. No phone number is published.
