import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://fabianndreko.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fabian Ndreko — Software Developer",
    template: "%s · Fabian Ndreko",
  },
  description:
    "Software developer in Tirana — frontend, backend, and QA. Shipping full-stack work with Next.js, React, and Node.",
  openGraph: {
    title: "Fabian Ndreko — Software Developer",
    description:
      "A frontend Dev who also knows how to join tables. Frontend, backend & QA.",
    url: siteUrl,
    siteName: "Fabian Ndreko",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Fabian Ndreko — Software Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabian Ndreko — Software Developer",
    description:
      "A frontend Dev who also knows how to join tables. Frontend, backend & QA.",
    images: ["/images/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
