"use client";

import { useMemo } from "react";
import { useOpportunities } from "@/context/OpportunityContext";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function AboutStats() {
  const { opportunities } = useOpportunities();

  const stats = useMemo(() => {
    const organizationCount = new Set(
      opportunities.map((item) => item.organization),
    ).size;

    const categoryCount = new Set(
      opportunities.map((item) => item.category),
    ).size;

    const provinceCount = new Set(
      opportunities
        .filter((item) => item.location !== "Online")
        .map((item) => item.location),
    ).size;

    return [
      {
        value: opportunities.length,
        label: "Opportunities",
      },
      {
        value: organizationCount,
        label: "Organizations",
      },
      {
        value: categoryCount,
        label: "Categories",
      },
      {
        value: provinceCount,
        label: "Provinces",
      },
    ];
  }, [opportunities]);

  return (
    <AnimatedSection className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-neutral-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
        >
          <h2 className="text-3xl font-bold text-emerald-600">
            {item.value}
          </h2>

          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            {item.label}
          </p>
        </div>
      ))}
    </AnimatedSection>
  );
}
