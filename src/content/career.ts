import type { Role, Verified } from "./types";

/** Source: biodata sections 1, 3, 8, 9. Tenure at DBATU ends 31 July 2026; Emeritus from 5 Aug 2026. */
export const ranks: Role[] = [
  { title: "Professor Emeritus, Electronics & Telecommunication Engineering", org: "DBATU, Lonere", from: "2026-08-05", to: "present", group: "academic", current: true, verified: true },
  { title: "Senior Professor (L-15), Electronics & Telecommunication Engineering", org: "DBATU, Lonere", from: "2022-08-21", to: "2026-08-04", group: "academic", verified: true, note: "End date inferred from the start of the Emeritus appointment." },
  { title: "Professor (L-14), Electronics & Telecommunication Engineering", org: "DBATU, Lonere", from: "2012-08-20", to: "2022-08-20", group: "academic", verified: true, note: "End date inferred from the start of the Senior Professor appointment." },
  { title: "Joined the university", org: "Dr. Babasaheb Ambedkar Technological University, Lonere", from: "1996-08-24", to: "1996-08-24", group: "academic", verified: true, summary: "Date of joining per the biodata. Designations between 1996 and 2012 are not listed in it." },
  { title: "Ph.D., Communication and Signal Processing", org: "IIT Delhi (QIP fellow, 2001–2004)", from: "2001-07-01", to: "2008-12-31", group: "academic", verified: true, summary: "Degree awarded 2008; QIP fellowship July 2001 – July 2004." },
];

export const leadership: Role[] = [
  { title: "Dean (Academics), Faculty of Engineering & Technology", org: "DBATU", from: "2019-10-16", to: "2026-07-31", group: "administrative", verified: true, summary: "Quality oversight of all 455 affiliated colleges through expert academic audits; annual audits of university departments; curriculum renewed every academic year; one of the first universities in the country to implement NEP-2020." },
  { title: "Head, University Department of Electronics & Telecommunication Engineering", org: "DBATU", from: "2010-05-29", to: "2026-07-31", group: "administrative", verified: true },
  { title: "Chairman, Board of Studies and Research Committee", org: "DBATU", from: "2010-05-29", to: "2026-07-31", group: "statutory", verified: true, summary: "Designed curricula for 5 UG and 11 PG programmes across the university and its affiliated colleges." },
  { title: "Director, Information & Communication Technology", org: "DBATU", from: "2016-10-03", to: "2026-07-31", group: "administrative", verified: true },
  { title: "Director, DBATU Forum of Innovation, Incubation & Enterprise (DFIIE, Section-8 company)", org: "DBATU", from: "2018-08-29", to: "2026-07-31", group: "administrative", verified: true, summary: "Two years as Director and CEO; Chairman from 31 March 2026." },
  { title: "Director, Internal Quality Assurance Cell (IQAC)", org: "DBATU", from: "2023-09-15", to: "2026-07-31", group: "administrative", verified: true, summary: "IQAC member since 2010; steering committee chairman for NAAC; maintained AQAR reports." },
  { title: "Member, Executive Council", org: "DBATU", from: "2013-10-01", to: "2016-09-30", group: "statutory", verified: true, summary: "A second term ran 6 Oct 2020 – 5 Oct 2023." },
  { title: "Member, Academic Council", org: "DBATU", from: "2010-05-29", to: "2026-07-31", group: "statutory", verified: true },
  { title: "Member, Finance Committee", org: "DBATU", from: "2021-04-05", to: "2024-04-04", group: "statutory", verified: true, summary: "A second term ran 28 Aug 2024 – 31 Jul 2026." },
  { title: "Member, Planning and Monitoring Board", org: "DBATU", from: "2024-09-01", to: "2026-07-31", group: "statutory", verified: true },
  { title: "In-charge Vice-Chancellor", org: "DBATU", from: "—", to: "—", group: "administrative", verified: true, summary: "40 days across several short spells between 2020 and 2026." },
  { title: "In-charge Registrar", org: "DBATU", from: "—", to: "—", group: "administrative", verified: true, summary: "36 days across several spells in 2024–2026." },
  { title: "In-charge Finance Officer", org: "DBATU", from: "2024-10-14", to: "2024-10-22", group: "administrative", verified: true, summary: "9 days." },
  { title: "NEP-2020 implementation — Member, Sukanu Samiti for Engineering Education", org: "Government of Maharashtra", from: "2022", to: "present", group: "national", verified: true, summary: "Also University Coordinator for NEP-2020 School Connect programmes, 2023–2025." },
  { title: "Technical Book Translation Coordinator for Maharashtra", org: "AICTE / Ministry of Education", from: "2021", to: "present", group: "national", verified: true },
  { title: "Member and Chairman, Perspective Plan Committees 2025–2030", org: "Government of Maharashtra / DBATU", from: "2025", to: "2030", group: "national", verified: true, summary: "Member of the state committee for technical education; chaired DBATU's own perspective plan committee." },
  { title: "Member, UGC Screening Expert Committee (Online & ODL programmes)", org: "UGC", from: "2025", to: "2026", group: "national", verified: true },
  { title: "Member, AICTE Subject Expert Committee — Electronics Engineering", org: "AICTE", from: "—", to: "—", group: "national", verified: true, summary: "Curriculum revamp around AI, IoT and outcome-based education." },
  { title: "AICTE Scrutiny Expert", org: "AICTE", from: "2014", to: "present", group: "national", verified: true },
  { title: "Performance Auditor and Mentor for engineering colleges", org: "MHRD", from: "2018-06-13", to: "2021-06-13", group: "external", verified: true, summary: "Auditor for NIT Kurukshetra and IET Bundelkhand; mentor to Govt. College of Engineering, Banswara and CoE Vallabh Vidyanagar." },
  { title: "TEQIP (World Bank) — Nodal Officer, MIS and University Coordinator", org: "DBATU", from: "—", to: "—", group: "external", verified: true, summary: "TEQIP-I, II and III, nine years in total." },
];

export type Stat = { label: string; value: number; suffix?: string; note?: string };

export const careerSpans: Stat[] = [
  { label: "Years of teaching", value: 36 },
  { label: "Years of research", value: 20 },
  { label: "Years in administration", value: 16 },
];

export const newPrograms: (Verified & { level: string; name: string; year: number; intake: number })[] = [
  { level: "UG", name: "VLSI Design and Technology", year: 2022, intake: 30, verified: true },
  { level: "UG", name: "E & TC Regional Language", year: 2023, intake: 30, verified: true },
  { level: "UG", name: "Hotel Management and Catering Technology", year: 2024, intake: 30, verified: true },
  { level: "PG", name: "Computer Science & Engineering (Integrated)", year: 2024, intake: 60, verified: true },
  { level: "PG", name: "Cyber Security", year: 2022, intake: 18, verified: true },
  { level: "PG", name: "Remote Sensing and GIS", year: 2022, intake: 18, verified: true },
  { level: "PG", name: "MBA (Innovation, Entrepreneurship and Venture Development)", year: 2022, intake: 30, verified: true },
  { level: "PG", name: "MCA", year: 2023, intake: 30, verified: true },
  { level: "PG", name: "Electronics and Communication (VLSI Design)", year: 2023, intake: 18, verified: true },
  { level: "PG", name: "Electronics and Communication (ACT)", year: 2023, intake: 18, verified: true },
  { level: "PG", name: "AI & DS", year: 2024, intake: 18, verified: true },
  { level: "PG", name: "M. Pharma", year: 2024, intake: 15, verified: true },
];
