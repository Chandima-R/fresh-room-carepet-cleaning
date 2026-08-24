import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Freshroom | Carpet & Upholstery Cleaning",
    template: "%s | Freshroom",
  },
  description:
    "Professional carpet, upholstery and rug cleaning for homes and businesses across England. A cleaner carpet. A fresher room. A better home.",
  keywords: [
    "carpet cleaning",
    "carpet cleaning England",
    "professional carpet cleaning",
    "upholstery cleaning",
    "rug cleaning",
    "stain treatment",
    "end of tenancy carpet cleaning",
    "commercial carpet cleaning",
  ],
  authors: [{ name: "Freshroom" }],
  creator: "Freshroom",
  publisher: "Freshroom",
  metadataBase: new URL("https://freshroom.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Freshroom",
    title: "Freshroom | Carpet & Upholstery Cleaning",
    description:
      "Professional carpet, upholstery and rug cleaning for homes and businesses across England.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freshroom | Carpet & Upholstery Cleaning",
    description:
      "A cleaner carpet. A fresher room. A better home.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}