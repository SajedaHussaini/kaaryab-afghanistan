"use client";

import { BookmarkX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { useSaved } from "@/context/SavedContext";
import { useCallback } from "react";

export function SavedOpportunities() {
  const { savedOpportunities, clearSaved } = useSaved();
  const handleClearSaved = useCallback(() => {
  clearSaved();
}, [clearSaved]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      {savedOpportunities.length > 0 ? (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {savedOpportunities.length} saved opportunities in this browser.
            </p>
            <Button variant="outline" size="sm" onClick={handleClearSaved}>
              <BookmarkX className="h-4 w-4" aria-hidden="true" />
              Clear saved
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {savedOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={BookmarkX}
          title="No saved opportunities yet"
          description="Save jobs, scholarships, internships, and remote work so you can come back to them quickly."
          actionHref="/opportunities"
          actionLabel="Browse opportunities"
        />
      )}
    </div>
  );
}
