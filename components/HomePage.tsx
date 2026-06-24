"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  Laptop,
  PlusCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { Badge } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { defaultFilters } from "@/lib/constants";
import {
  filterOpportunities,
  getDashboardStats,
  getExpiringOpportunities,
  getFeaturedOpportunities,
} from "@/lib/utils";
import { useOpportunities } from "@/context/OpportunityContext";

export function HomePage() {
  const { opportunities } = useOpportunities();
  const [query, setQuery] = useState("");
  const stats = getDashboardStats(opportunities);
  const featured = getFeaturedOpportunities(opportunities).slice(0, 4);
  const expiring = getExpiringOpportunities(opportunities).slice(0, 4);
  const searchResults = useMemo(
    () =>
      query.trim()
        ? filterOpportunities(opportunities, { ...defaultFilters, query }).slice(
            0,
            6,
          )
        : featured,
    [featured, opportunities, query],
  );

  return (
    <div>
      <section className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="amber">Demo Data</Badge>
              <Badge tone="green">Afghan youth opportunity finder</Badge>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-normal text-neutral-950 dark:text-white sm:text-5xl">
              KaarYab Afghanistan
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
              Find jobs, internships, scholarships, remote work, online courses,
              training programs, and volunteer opportunities in one searchable
              platform.
            </p>

            <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
                  aria-hidden="true"
                />
                <input
                  className="h-12 w-full rounded-md border border-neutral-300 bg-white pl-10 pr-3 text-base text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:ring-emerald-900"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search React, scholarship, remote, Herat..."
                />
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/opportunities"
                  className={buttonStyles({ variant: "primary", size: "sm" })}
                >
                  Browse all
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/add-opportunity"
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  <PlusCircle className="h-4 w-4" aria-hidden="true" />
                  Submit opportunity
                </Link>
              </div>
            </div>
          </div>

          <aside className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
                  Closing soon
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Deadline countdowns are calculated live.
                </p>
              </div>
              <Clock3 className="h-6 w-6 text-amber-600" aria-hidden="true" />
            </div>
            <div className="mt-5 grid gap-3">
              {expiring.map((opportunity) => (
                <Link
                  key={opportunity.id}
                  href={`/opportunities/${opportunity.id}`}
                  className="rounded-md border border-neutral-200 bg-white p-3 transition hover:border-emerald-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-emerald-700"
                >
                  <p className="font-semibold text-neutral-950 dark:text-white">
                    {opportunity.title}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {opportunity.organization} · {opportunity.location}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <AnimatedSection className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-8 sm:px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
        <DashboardCard
          title="Total"
          value={stats.total}
          description="Demo and local submissions."
          icon={BriefcaseBusiness}
        />
        <DashboardCard
          title="Scholarships"
          value={stats.scholarships}
          description="Approved study support."
          icon={GraduationCap}
        />
        <DashboardCard
          title="Remote"
          value={stats.remote}
          description="Online-friendly options."
          icon={Laptop}
        />
        <DashboardCard
          title="Pending"
          value={stats.pending}
          description="Awaiting admin approval."
          icon={ShieldCheck}
        />
      </AnimatedSection>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-300">
              {query.trim() ? "Search results" : "Featured opportunities"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-950 dark:text-white">
              Start from a strong match
            </h2>
          </div>
          <Link
            href="/opportunities"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            Open full search
          </Link>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {searchResults.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No quick matches"
            description="Try the full opportunities page for more filters and broader search."
            actionHref="/opportunities"
            actionLabel="Open opportunities"
          />
        )}
      </section>
    </div>
  );
}
