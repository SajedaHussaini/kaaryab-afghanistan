import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,

  BookmarkCheck,
  BriefcaseBusiness,

  Globe,

  Search,

  ShieldCheck,

  Users,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { AboutStats } from "@/components/about/AboutStats";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about KaarYab Afghanistan and our mission to connect Afghan youth with opportunities.",
};

const features = [
  {
    title: "Browse Opportunities",
    description: "Jobs, internships, scholarships, and more.",
    icon: BriefcaseBusiness,
  },
  {
    title: "For Everyone",
    description: "Students, graduates, job seekers, women in tech.",
    icon: Users,
  },
  {
    title: "Remote & Local",
    description: "Both remote and on-site opportunities.",
    icon: Globe,
  },
  {
    title: "Save & Track",
    description: "Save opportunities and track deadlines.",
    icon: BookmarkCheck,
  },
  {
    title: "Smart Search",
    description: "Filter by category, location, type, and deadline.",
    icon: Search,
  },
  {
    title: "Trusted Sources",
    description: "Verified organizations and opportunities.",
    icon: ShieldCheck,
  },
];

const audience = [
  "Students",
  "Fresh Graduates",
  "Job Seekers",
  "Women in Tech",
  "Remote Workers",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader

        title={
          <>
            About{" "}
            <span className="text-emerald-600 ">
              KaarYab
            </span>
            {" "} Afghanistan
          </>
        }
        description="KaarYab means 'Capable' in Dari. We believe every Afghan youth deserves access to opportunities that can transform their future."
      />

      {/* Statistics */}
      <AboutStats />

      {/* Mission */}
      <AnimatedSection className="mx-auto max-w-5xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-neutral-950 dark:text-white">
          Our Mission
        </h2>

        <p className="mt-5 leading-8 text-neutral-600 text-center dark:text-neutral-300">
          Many young people in Afghanistan need better access to opportunities
          such as jobs, internships, scholarships, online work, training
          programs, and career resources. Information is scattered across
          different websites and social media platforms.
        </p>

        <p className="mt-4 leading-8 text-neutral-600 text-center dark:text-neutral-300">
          KaarYab solves this by creating a clean, easy-to-use platform where
          people can browse, search, filter, save, and submit opportunities all
          in one place.
        </p>
      </AnimatedSection>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-bold text-neutral-950 text-center dark:text-white">
          What We Offer
        </h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm transition hover:border-emerald-300 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">


                <item.icon className="h-6 w-6" />
              </span>

              <h3 className="mt-5 text-xl font-bold text-neutral-950 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>

      </section>

      {/* Green Banner */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl bg-emerald-600 p-8 text-white text-center shadow-lg">
          <h2 className="text-3xl font-bold">
            Built for Afghan Youth
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-center text-emerald-50">
            Whether you are a student, fresh graduate, or job seeker,
            KaarYab is designed to help you find the right opportunity.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {audience.map((item) => (
              <Badge
                key={item}
                className="bg-white/15 px-4 py-2 text-white text-center backdrop-blur"
              >
                {item}
              </Badge>
            ))}
          </div>
        </section>

      </section>

      {/* CTA */}
      <AnimatedSection className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-neutral-950 dark:text-white">
          Ready to Get Started?
        </h2>

        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
          Start exploring opportunities today.
        </p>

        <Link
          href="/opportunities"
          className={`${buttonStyles({
            variant: "primary",
            size: "lg",
          })} mt-8 inline-flex`}
        >
          Browse Opportunities
          <ArrowRight className="h-5 w-5" />
        </Link>
      </AnimatedSection>
    </>
  );
}
