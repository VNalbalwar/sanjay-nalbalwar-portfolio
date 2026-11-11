import type { Metadata, Viewport } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { profile, SITE_URL } from "@/content/profile";
import { JsonLd } from "@/components/JsonLd";
import { personSchema } from "@/lib/schema";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", axes: ["opsz"], style: ["normal", "italic"], display: "swap" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

const description =
  "Professor Emeritus of Electronics & Telecommunication Engineering at DBATU, Lonere. Researcher in signal and image processing, mentor of 19 Ph.D. scholars, and academic leader in NEP-2020 implementation, quality assurance and innovation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${profile.name} — Professor Emeritus, DBATU`, template: `%s — ${profile.short}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  keywords: ["Sanjay Nalbalwar", "Sanjay Laxmikant Nalbalwar", "DBATU", "signal processing", "compressed sensing", "Professor Emeritus", "Lonere"],
  alternates: { canonical: "/" },
  openGraph: { type: "profile", siteName: profile.name, title: profile.name, description, url: "/", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: profile.name, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceee6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a120e" },
  ],
};

// Runs before paint so there is no flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={personSchema()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
