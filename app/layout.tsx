import type { Metadata } from "next";
import { AppProviders } from "@/context/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaaryab.af"),
  icons:{
    icon: "/web-favicon.png"
  },

  title: {
    default: "KaarYab Afghanistan | Opportunity Finder Platform",
    template: "%s | KaarYab Afghanistan",
  },

  description:
    "Discover jobs, internships, scholarships, remote work, online courses, training programs, and volunteer opportunities across Afghanistan in one modern platform.",

  keywords: [
    "Afghanistan",
    "jobs",
    "internships",
    "scholarships",
    "remote work",
    "online courses",
    "volunteer",
    "career",
    "KaarYab Afghanistan",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "KaarYab Afghanistan | Opportunity Finder Platform",

    description:
      "Discover jobs, internships, scholarships, remote work, online courses, training programs, and volunteer opportunities across Afghanistan.",

    url: "https://kaaryab.af",

    siteName: "KaarYab Afghanistan",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/web-logo.png",
        width: 1200,
        height: 630,
        alt: "KaarYab Afghanistan | Opportunity finder platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KaarYab Afghanistan | Opportunity Finder Platform",
    description:
      "Discover jobs, internships, scholarships, remote work, online courses, training programs, and volunteer opportunities across Afghanistan.",
    images: ["/web-logo.png"],
  },

};


type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
