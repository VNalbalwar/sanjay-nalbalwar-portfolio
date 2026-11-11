/** Source: biodata sections 6, 7, 14, 15, 2.5, 11. */
export type Event = { title: string; when: string; where: string; role: "Session chair & paper" | "Session chair" | "Organised" | "Attended" | "Workshop" | "Lecture"; abroad?: boolean };

export const international: Event[] = [
  { title: "International Conference on Biomedical Engineering and Sciences", when: "30 Nov – 2 Dec 2010", where: "Kuala Lumpur, Malaysia", role: "Session chair & paper", abroad: true },
  { title: "CCISP 2016 (Communication, Image and Signal Processing)", when: "18–20 Nov 2016", where: "Dubai, UAE", role: "Session chair & paper", abroad: true },
  { title: "IEEE International Conference on Quantum Photonics, AI and Networking (QPAIN) 2025", when: "Aug 2025", where: "Bangladesh Army University of Science and Technology", role: "Session chair", abroad: true },
  { title: "IEEE 2nd International Conference on Quantum Photonics, AI and Networking (QPAIN 2026)", when: "16–18 Apr 2026", where: "CUET, Chattogram, Bangladesh", role: "Session chair", abroad: true },
];

export const organised: Event[] = [
  { title: "International Conference ICCEEE-2013", when: "26–27 Dec 2013", where: "DBATU, Lonere", role: "Organised" },
  { title: "International Conference on Communication and Signal Processing (ICCASP)", when: "26–27 Dec 2016", where: "DBATU, Lonere", role: "Organised" },
  { title: "3rd International Conference on Computing, Communication and Signal Processing", when: "26–27 Jan 2018", where: "DBATU, Lonere", role: "Organised" },
  { title: "4th International Conference on Computing in Engineering and Technology (ICCET-2019)", when: "9–11 Jan 2019", where: "MIT, Aurangabad", role: "Organised" },
  { title: "5th International Conference on Computing in Engineering and Technology (ICCET-2020)", when: "9–11 Jan 2020", where: "MGM, Nanded", role: "Organised" },
  { title: "1st International Conference on Emerging Trends in Technology and Application", when: "1–2 Feb 2020", where: "Dehradun", role: "Organised" },
  { title: "International Conference on Contemporary Computing and Applications (IC3A)", when: "5–7 Feb 2020", where: "REC Kannauj, Uttar Pradesh", role: "Organised" },
  { title: "TEDx DBATU", when: "2016 and 2020", where: "DBATU, Lonere", role: "Organised" },
];

export const fdpsOrganised = [
  "Cyber Security: Advanced Level (ATAL) · Jan 2022",
  "Cyber Security (ATAL) · Nov 2021",
  "Innovation Management (ATAL) · Sep 2021",
  "STTP Statistical Inferences and Linear Algebra, Series I and II (AICTE) · 2021",
  "Online FDP on IoT (ATAL) · May 2020",
  "Online FDP on Data Science (ATAL) · Apr–May 2020",
  "Cyber Security (ATAL) · Jan 2020",
  "Artificial Intelligence (ATAL) · Dec 2019",
  "Blockchain (ATAL) · Oct 2019",
  "Recent Trends in Signal Representation: A Multirate Approach (AICTE) · Nov 2017",
];

export const quantumFdps = [
  { code: "QT-01", name: "Quantum Technologies and Applications", when: "28 Feb – 22 Mar 2025" },
  { code: "QT-02", name: "Fundamentals of Quantum Technologies", when: "11 Apr – 3 May 2025" },
  { code: "QT-03", name: "Basic Quantum Programming", when: "16 May – 6 Jun 2025" },
  { code: "QT-04", name: "Quantum Technologies Lab", when: "Listed as “often covered with QT-03”" },
  { code: "QT-05", name: "Quantum Computation", when: "11 Jul – 2 Aug 2025" },
  { code: "QT-06", name: "Quantum Communication", when: "18 Aug – 11 Sep 2025" },
  { code: "QT-07", name: "Quantum Sensing", when: "26 Sep – 17 Oct 2025" },
  { code: "QT-08", name: "Quantum Materials", when: "8 Mar – 2 Apr 2026" },
  { code: "QT-09", name: "Engineering Foundations of Quantum Technologies", when: "10 Apr – 2 May 2026" },
  { code: "QT-10", name: "Solid State Physics for Quantum Technologies", when: "8 – 30 May 2026" },
];

export const quantumNote =
  "Each programme is 40 hours and 3 credits, funded by MeitY and endorsed by DST, NQM, AICTE and UGC, hosted by MNIT Jaipur, NIT Patna, IIT Kanpur, IIT Roorkee, IIT Guwahati, IIITDM Jabalpur and NIT Warangal.";

export const courses = {
  UG: ["Signals & Systems", "Digital Signal Processing", "Linear Algebra", "Probability and Random Processes", "Operating System", "Microprocessor and Interfacing", "Computer Programming in C", "Computer Oriented Numerical Methods"],
  PG: ["Advanced Digital Signal Processing", "Statistical Signal Processing", "Estimation and Detection Theory", "Multirate Signal Processing", "Signal Theory", "Quantum Technology"],
};

export const editorial = [
  { role: "Editor", journal: "Journal of Advances in Engineering and Technology", publisher: "Asia Pacific Science Press", term: "Three years from 18 Jan 2026", detail: "ISSN (O) 3005-7507 · ISSN (P) 3005-7493" },
  { role: "Editor", journal: "IETE Journal of Research", publisher: "Taylor & Francis", term: "Two years" },
  { role: "Editor", journal: "International Journal of Optical Innovations & Research", publisher: "STM Journals", term: "From 30 Apr 2026" },
  { role: "Editorial Board Member", journal: "International Journal of Artificial Intelligence, Information Technology and Computer Engineering (IJAIITCE)", publisher: "Varad Publishing House", term: "Two years" },
  { role: "Associate Editor", journal: "IEEE Journal of Signal Processing Systems Letters", publisher: "IEEE", term: "Two years", detail: "Biodata: “Journal of SPS Letters”; exact title to be confirmed." },
];

export const reviewerFor = ["Biomedical Signal Processing and Control", "Computers and Electrical Engineering", "Engineering Applications of Artificial Intelligence", "Process Safety and Environmental Protection", "Measurement", "IEEE Access", "Taylor & Francis journals"];

export const academicService = [
  "Ph.D. examiner: SPPU Pune, University of Mumbai, SRTMU Nanded, DAVV Indore, Punjab University",
  "Research committee member: SPPU Pune, VJTI Mumbai, MIT Pune",
  "Member Secretary for Maharashtra NBA activities under Parish-Sparsh, Government of Maharashtra",
  "NAAC Peer Team member / coordinator for assessments of universities and colleges",
  "Board of Studies member at more than ten engineering colleges, and at SPPU, BAMU and the University of Mumbai",
  "AICTE Post-Doctoral Fellowship evaluation expert (2025)",
  "UGC SWAYAM MOOC mapping initiative (2026)",
  "University Liaison Officer to the DBATU Vice-Chancellor search committee (twice)",
  "Programme committee: ICEGOV 2017 (MeitY) and ICCS 2017",
];

export const innovation = [
  { name: "Institute Innovation Council", detail: "President. Rated 4.5 of 5 by the MHRD Innovation Cell; the university ranked 151–200 in NIRF 2023." },
  { name: "Smart India Hackathon", detail: "University coordinator and SPOC. In SIH 2020, 35 teams of 210 students took part and 6 were chosen as winners, with incubation-centre support." },
  { name: "Business Idea Competition", detail: "2019. 66 students took part across two rounds." },
  { name: "Avishkar 2020", detail: "4,546 students applied across Maharashtra; 32 reached the state round." },
  { name: "Innovative Product Development workshops", detail: "January 2020. 50 students built working prototypes." },
  { name: "TEDx DBATU", detail: "Convener, 2016 and 2020." },
  { name: "RUSA coordination", detail: "Rs. 20 crore secured in FY 2019-20 for an Incubation Centre, a Research Centre and classroom digitisation." },
  { name: "School Connect", detail: "NEP-2020 awareness programmes for students, parents and teachers, 2023–2025." },
];
