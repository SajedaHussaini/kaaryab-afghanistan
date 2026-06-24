import type { Metadata } from "next";
import { AppProviders } from "@/context/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KaarYab Afghanistan | Opportunity Finder Platform",
    template: "%s | KaarYab Afghanistan",
  },
  description:
    "A modern opportunity finder platform for Afghan youth to discover jobs, internships, scholarships, remote work, and skill-building opportunities.",
  keywords: [
    "Afghanistan jobs",
    "scholarships",
    "internships",
    "remote work",
    "Next.js capstone",
    "KaarYab Afghanistan",
  ],
  openGraph: {
    title: "KaarYab Afghanistan",
    description:
      "Find jobs, internships, scholarships, remote work, and training opportunities in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
