"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Building2,
  CalendarDays,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DeadlineBadge } from "@/components/opportunities/DeadlineBadge";
import { StatusBadge } from "@/components/opportunities/StatusBadge";
import { formatDate } from "@/lib/utils";
import { useSaved } from "@/context/SavedContext";
import type { Opportunity } from "@/types/opportunity";

type OpportunityCardProps = {
  opportunity: Opportunity;
  showStatus?: boolean;
};

export function OpportunityCard({
  opportunity,
  showStatus = false,
}: OpportunityCardProps) {
  const { isSaved, toggleSaved } = useSaved();
  const saved = isSaved(opportunity.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-emerald-700"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge tone="green">{opportunity.category}</Badge>
          <Badge tone="sky">{opportunity.type}</Badge>
          {opportunity.featured ? (
            <Badge tone="amber">
              <Sparkles className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
              Featured
            </Badge>
          ) : null}
          {showStatus ? <StatusBadge status={opportunity.status} /> : null}
        </div>
        <Button
          size="icon"
          variant={saved ? "primary" : "outline"}
          onClick={() => toggleSaved(opportunity.id)}
          aria-label={saved ? "Remove saved opportunity" : "Save opportunity"}
        >
          {saved ? (
            <BookmarkCheck className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Bookmark className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      <div className="mt-4 flex-1">
        <Link href={`/opportunities/${opportunity.id}`}>
          <h2 className="text-xl font-bold tracking-normal text-neutral-950 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-300">
            {opportunity.title}
          </h2>
        </Link>
        <div className="mt-3 grid gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <p className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0 text-neutral-400" />
            {opportunity.organization}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-neutral-400" />
            {opportunity.location}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-neutral-400" />
            Deadline: {formatDate(opportunity.deadline)}
          </p>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          {opportunity.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
        <DeadlineBadge deadline={opportunity.deadline} />
        <Link
          href={`/opportunities/${opportunity.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
        >
          View details
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}
