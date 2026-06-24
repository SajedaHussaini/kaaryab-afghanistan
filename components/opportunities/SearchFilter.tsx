"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import {
  opportunityCategories,
  opportunityKinds,
  opportunityTypes,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import type { OpportunityFilters } from "@/types/opportunity";

type SearchFilterProps = {
  filters: OpportunityFilters;
  locations: string[];
  resultCount: number;
  onChange: (filters: OpportunityFilters) => void;
  onReset: () => void;
};

export function SearchFilter({
  filters,
  locations,
  resultCount,
  onChange,
  onReset,
}: SearchFilterProps) {
  const updateFilter = <K extends keyof OpportunityFilters>(
    key: K,
    value: OpportunityFilters[K],
  ) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
            <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-semibold text-neutral-950 dark:text-white">
              Search and filter
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {resultCount} matching opportunities
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </Button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <label className="grid gap-1 xl:col-span-2">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Title or keyword
          </span>
          <span className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              className="h-11 w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900"
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Search jobs, scholarships..."
            />
          </span>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Category
          </span>
          <select
            className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900"
            value={filters.category}
            onChange={(event) =>
              updateFilter(
                "category",
                event.target.value as OpportunityFilters["category"],
              )
            }
          >
            <option value="All">All categories</option>
            {opportunityCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Location
          </span>
          <select
            className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900"
            value={filters.location}
            onChange={(event) => updateFilter("location", event.target.value)}
          >
            <option value="All">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Remote or on-site
          </span>
          <select
            className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900"
            value={filters.type}
            onChange={(event) =>
              updateFilter("type", event.target.value as OpportunityFilters["type"])
            }
          >
            <option value="All">All work modes</option>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Deadline
          </span>
          <select
            className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900"
            value={filters.deadline}
            onChange={(event) =>
              updateFilter(
                "deadline",
                event.target.value as OpportunityFilters["deadline"],
              )
            }
          >
            <option value="All">Any deadline</option>
            <option value="7">Next 7 days</option>
            <option value="14">Next 14 days</option>
            <option value="30">Next 30 days</option>
            <option value="Expired">Expired</option>
          </select>
        </label>

        <label className="grid gap-1 md:col-span-2 xl:col-span-2">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Opportunity type
          </span>
          <select
            className="h-11 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:ring-emerald-900"
            value={filters.opportunityType}
            onChange={(event) =>
              updateFilter(
                "opportunityType",
                event.target.value as OpportunityFilters["opportunityType"],
              )
            }
          >
            <option value="All">All types</option>
            {opportunityKinds.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
