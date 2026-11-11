import { profile, profileLinks, SITE_URL } from "@/content/profile";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: profile.name,
      alternateName: ["Sanjay Laxmikant Nalbalwar", "Sanjay Nalbalwar", "S. L. Nalbalwar"],
      jobTitle: "Professor Emeritus, Electronics & Telecommunication Engineering",
      description: "Researcher in signal and image processing; academic leader at Dr. Babasaheb Ambedkar Technological University, Lonere.",
      image: `${SITE_URL}/images/portrait.webp`,
      url: SITE_URL,
      email: `mailto:${profile.email}`,
      worksFor: { "@type": "CollegeOrUniversity", name: "Dr. Babasaheb Ambedkar Technological University", address: { "@type": "PostalAddress", addressLocality: "Lonere", addressRegion: "Maharashtra", addressCountry: "IN" } },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Delhi" },
        { "@type": "CollegeOrUniversity", name: "Shri Guru Gobind Singhji Institute of Engineering and Technology, Nanded" },
      ],
      knowsAbout: ["Digital signal processing", "Image processing", "Compressed sensing", "Multirate signal processing", "Biomedical signal processing", "Antenna design", "Quantum technologies"],
      sameAs: profileLinks.map((l) => l.url),
      identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: "0000-0001-7307-0243" },
    },
  };
}
