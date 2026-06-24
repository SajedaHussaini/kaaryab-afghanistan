"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { defaultFilters } from "@/lib/constants";
import {
  filterOpportunities,
  getUniqueLocations,
} from "@/lib/utils";
import { SearchFilter } from "@/components/opportunities/SearchFilter";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { buttonStyles } from "@/components/ui/Button";
import { useOpportunities } from "@/context/OpportunityContext";
import type { OpportunityFilters } from "@/types/opportunity";

export function OpportunitiesExplorer() {
  const { opportunities, isReady } = useOpportunities();
  const [filters, setFilters] = useState<OpportunityFilters>(defaultFilters);

  const locations = useMemo(
    () => getUniqueLocations(opportunities),
    [opportunities],
  );
  const filtered = useMemo(
    () => filterOpportunities(opportunities, filters),
    [filters, opportunities],
  );

  if (!isReady) {
    return <LoadingState label="Loading opportunities" />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Browse verified demo opportunities. User submissions appear after
          approval.
        </p>
        <Link
          href="/add-opportunity"
          className={buttonStyles({ variant: "primary", size: "sm" })}
        >
          <PlusCircle className="h-4 w-4" aria-hidden="true" />
          Add opportunity
        </Link>
      </div>

      <SearchFilter
        filters={filters}
        locations={locations}
        resultCount={filtered.length}
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
      />

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No opportunities match these filters"
            description="Try a different keyword, category, deadline range, or location."
            actionHref="/add-opportunity"
            actionLabel="Submit a new opportunity"
          />
        </div>
      )}
    </div>
  );
}
