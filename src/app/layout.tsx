import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Instrument_Sans, Spectral } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DRAFT } from "@/lib/content";
import "./globals.css";

// Fonts are downloaded at build time and served from this site, so pages make no third-party requests.
const sans = Instrument_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Spectral({ variable: "--font-serif", subsets: ["latin"], weight: ["300", "400"], style: ["normal", "italic"] });
const mono = Fragment_Mono({ variable: "--font-mono", subsets: ["latin"], weight: "400" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4173";
const DESCRIPTION =
  "Do AI watchdogs check the approvals other agents claim? A companion site to the Apart Research Swarm Alignment Sprint report.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Laundered Consensus", template: "%s · Laundered Consensus" },
  description: DESCRIPTION,
  // While the site is a draft, ask search engines to stay away. Removed automatically when DRAFT is false.
  robots: DRAFT ? { index: false, follow: false } : undefined,
  openGraph: {
    type: "website",
    title: "Laundered Consensus",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Laundered Consensus: do AI watchdogs check the approvals other agents claim?" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { themeColor: "#0b1224", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {DRAFT && (
          <div className="draft-bar" role="note">
            Draft for the three authors. Not public: it goes live only when Liezl, Deepayan and Prashanth all agree.
          </div>
        )}
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
