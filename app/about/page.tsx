import type { Metadata } from "next";
import { CheckCircle2, Globe2, HeartHandshake, Target } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn why KaarYab Afghanistan helps Afghan youth find useful opportunities in one place.",
};

const values = [
  {
    title: "One clear place",
    description:
      "Jobs, internships, scholarships, courses, remote work, and training are organized into one searchable board.",
    icon: Globe2,
  },
  {
    title: "Youth focused",
    description:
      "The platform is designed for students, fresh graduates, job seekers, women seeking remote work, and organizations.",
    icon: Target,
  },
  {
    title: "Trust and safety",
    description:
      "Demo records are labeled, submissions require review, and users are reminded to verify real opportunities before applying.",
    icon: CheckCircle2,
  },
  {
    title: "Career growth",
    description:
      "A built-in CV builder, saved list, and deadline badges support practical job-search workflows.",
    icon: HeartHandshake,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A useful capstone for a real community need"
        description="KaarYab Afghanistan addresses scattered opportunity information by giving Afghan youth a clean, responsive platform to browse, filter, save, submit, and manage opportunities."
        badge="Educational project"
      />

      <AnimatedSection className="mx-auto grid w-full max-w-7xl gap-5 px-4 pb-14 sm:px-6 md:grid-cols-2 lg:px-8">
        {values.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xl font-bold text-neutral-950 dark:text-white">
              {item.title}
            </h2>
            <p className="mt-2 leading-7 text-neutral-600 dark:text-neutral-300">
              {item.description}
            </p>
          </article>
        ))}
      </AnimatedSection>
    </>
  );
}
